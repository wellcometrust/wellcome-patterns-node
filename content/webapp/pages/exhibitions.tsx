import type { GetServerSideProps } from 'next';
import { FC } from 'react';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import { Period } from '../types/periods';
import { PaginatedResults } from '@weco/common/services/prismic/types';
import SpacingSection from '@weco/common/views/components/SpacingSection/SpacingSection';
import { appError, AppErrorProps } from '@weco/common/views/pages/_app';
import { getServerData } from '@weco/common/server-data';
import { exhibitionLd } from '../services/prismic/transformers/json-ld';
import { getPage } from '../utils/query-params';
import {
  pageDescriptions,
  pastExhibitionsStrapline,
} from '@weco/common/data/microcopy';
import { fetchExhibitions } from '../services/prismic/fetch/exhibitions';
import { transformExhibitionsQuery } from '../services/prismic/transformers/exhibitions';
import { createClient } from '../services/prismic/fetch';
import { ExhibitionBasic } from '../types/exhibitions';
import { JsonLdObj } from '@weco/common/views/components/JsonLd/JsonLd';
import Layout12 from '@weco/common/views/components/Layout12/Layout12';
import Space from '@weco/common/views/components/styled/Space';
import CardGrid from '../components/CardGrid/CardGrid';
import SectionHeader from '@weco/common/views/components/SectionHeader/SectionHeader';
import PageHeader from '@weco/common/views/components/PageHeader/PageHeader';
import PrismicHtmlBlock from '@weco/common/views/components/PrismicHtmlBlock/PrismicHtmlBlock';
import { headerBackgroundLs } from '@weco/common/utils/backgrounds';
import Pagination from '@weco/common/views/components/Pagination/Pagination';
import { isFuture } from '@weco/common/utils/dates';

type Props = {
  exhibitions: PaginatedResults<ExhibitionBasic>;
  period?: Period;
  title: string;
  jsonLd: JsonLdObj[];
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);
    const client = createClient(context);

    const page = getPage(context.query);
    if (typeof page !== 'number') {
      return appError(context, 400, page.message);
    }

    const { period } = context.query;

    const exhibitionsQuery = await fetchExhibitions(client, {
      page,
      period: period as Period,
    });
    const exhibitions = transformExhibitionsQuery(exhibitionsQuery);

    if (exhibitions && exhibitions.results.length > 0) {
      const title = (period === 'past' ? 'Past e' : 'E') + 'xhibitions';
      const jsonLd = exhibitions.results.map(exhibitionLd);
      return {
        props: {
          exhibitions,
          title,
          period: period as Period,
          jsonLd,
          serverData,
        },
      };
    } else {
      return { notFound: true };
    }
  };

const ExhibitionsPage: FC<Props> = props => {
  const { exhibitions, period, title, jsonLd } = props;
  const firstExhibition = exhibitions[0];

  const partitionedExhibitionItems = exhibitions.results.reduce(
    (acc, result) => {
      if (result.end && isFuture(result.end)) {
        acc.currentAndUpcoming.push(result);
      } else {
        acc.past.push({
          ...result,
          hideStatus: true,
        });
      }
      return acc;
    },
    { currentAndUpcoming: [], past: [] } as {
      currentAndUpcoming: ExhibitionBasic[];
      past: ExhibitionBasic[];
    }
  );

  const paginationRoot = `exhibitions${period ? `/${period}` : ''}`;

  return (
    <PageLayout
      title={title}
      description={pageDescriptions.exhibitions}
      url={{ pathname: `/exhibitions${period ? `/${period}` : ''}` }}
      jsonLd={jsonLd}
      openGraphType={'website'}
      siteSection={'whats-on'}
      image={firstExhibition && firstExhibition.image}
    >
      <PageHeader
        breadcrumbs={{ items: [] }}
        title={title}
        ContentTypeInfo={
          pageDescriptions.exhibitions && (
            <PrismicHtmlBlock
              html={[
                {
                  type: 'paragraph',
                  text: pageDescriptions.exhibitions,
                  spans: [],
                },
              ]}
            />
          )
        }
        backgroundTexture={headerBackgroundLs}
        highlightHeading={true}
      />
      {partitionedExhibitionItems.currentAndUpcoming.length > 0 && (
        <>
          <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
            <SectionHeader title="Current exhibitions" />
          </Space>
          <SpacingSection>
            <CardGrid
              items={partitionedExhibitionItems.currentAndUpcoming}
              itemsPerRow={3}
            />
          </SpacingSection>
        </>
      )}

      {partitionedExhibitionItems.past.length > 0 && (
        <>
          {!period && (
            <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
              <SectionHeader title="Past Exhibitions" />
              <Layout12>
                <Space v={{ size: 'm', properties: ['margin-top'] }}>
                  <p className="no-margin">{pastExhibitionsStrapline}</p>
                </Space>
              </Layout12>
            </Space>
          )}
          <SpacingSection>
            <CardGrid
              items={partitionedExhibitionItems.past}
              itemsHaveTransparentBackground={true}
              itemsPerRow={3}
            />
            {exhibitions.totalPages > 1 && (
              <Layout12>
                <div className="text-align-right">
                  <Pagination
                    total={exhibitions.totalResults}
                    currentPage={exhibitions.currentPage}
                    pageCount={exhibitions.totalPages}
                    prevPage={
                      exhibitions.currentPage > 1
                        ? exhibitions.currentPage - 1
                        : undefined
                    }
                    nextPage={
                      exhibitions.currentPage < exhibitions.totalPages
                        ? exhibitions.currentPage + 1
                        : undefined
                    }
                    prevQueryString={
                      `/${paginationRoot}` +
                      (period ? `/${period}` : '') +
                      (exhibitions.currentPage > 1
                        ? `?page=${exhibitions.currentPage - 1}`
                        : '')
                    }
                    nextQueryString={
                      `/${paginationRoot}` +
                      (period ? `/${period}` : '') +
                      (exhibitions.currentPage < exhibitions.totalPages
                        ? `?page=${exhibitions.currentPage + 1}`
                        : '')
                    }
                  />
                </div>
              </Layout12>
            )}
          </SpacingSection>
        </>
      )}
    </PageLayout>
  );
};

export default ExhibitionsPage;
