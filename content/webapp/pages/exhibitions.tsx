import type { GetServerSideProps } from 'next';
import { FC } from 'react';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import LayoutPaginatedResults from '../components/LayoutPaginatedResults/LayoutPaginatedResults';
import type { Period } from '@weco/common/model/periods';
import type { PaginatedResults } from '@weco/common/services/prismic/types';
import SpacingSection from '@weco/common/views/components/SpacingSection/SpacingSection';
import { appError, AppErrorProps } from '@weco/common/views/pages/_app';
import { removeUndefinedProps } from '@weco/common/utils/json';
import { getServerData } from '@weco/common/server-data';
import { exhibitionLd } from '../services/prismic/transformers/json-ld';
import { getPage } from '../utils/query-params';
import { pageDescriptions } from '@weco/common/data/microcopy';
import { fetchExhibitions } from '../services/prismic/fetch/exhibitions';
import { transformExhibitionsQuery } from '../services/prismic/transformers/exhibitions';
import { createClient } from '../services/prismic/fetch';
import { Exhibition } from '../types/exhibitions';

type Props = {
  exhibitions: PaginatedResults<Exhibition>;
  period?: Period;
  displayTitle: string;
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
    const exhibitionsQuery = await fetchExhibitions(client, { page, period });
    const exhibitions = transformExhibitionsQuery(exhibitionsQuery);

    if (exhibitions && exhibitions.results.length > 0) {
      const title = (period === 'past' ? 'Past e' : 'E') + 'xhibitions';
      return {
        props: removeUndefinedProps({
          exhibitions,
          displayTitle: title,
          period,
          serverData,
        }),
      };
    } else {
      return { notFound: true };
    }
  };

const ExhibitionsPage: FC<Props> = props => {
  const { exhibitions, period, displayTitle } = props;
  const firstExhibition = exhibitions[0];

  return (
    <PageLayout
      title={displayTitle}
      description={pageDescriptions.exhibitions}
      url={{ pathname: `/exhibitions${period ? `/${period}` : ''}` }}
      jsonLd={exhibitions.results.map(exhibitionLd)}
      openGraphType={'website'}
      siteSection={'whats-on'}
      image={firstExhibition && firstExhibition.image}
    >
      <SpacingSection>
        <LayoutPaginatedResults
          showFreeAdmissionMessage={true}
          title={displayTitle}
          description={[
            {
              type: 'paragraph',
              text: pageDescriptions.exhibitions,
              spans: [],
            },
          ]}
          paginatedResults={exhibitions}
          paginationRoot={`exhibitions${period ? `/${period}` : ''}`}
        />
      </SpacingSection>
    </PageLayout>
  );
};

export default ExhibitionsPage;
