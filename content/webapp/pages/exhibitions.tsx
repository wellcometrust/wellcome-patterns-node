import type { GetServerSideProps } from 'next';
import { FC } from 'react';
import { getExhibitions } from '@weco/common/services/prismic/exhibitions';
import { exhibitionLd } from '@weco/common/utils/json-ld';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import LayoutPaginatedResults from '@weco/common/views/components/LayoutPaginatedResults/LayoutPaginatedResults';
import type { UiExhibition } from '@weco/common/model/exhibitions';
import type { Period } from '@weco/common/model/periods';
import type { PaginatedResults } from '@weco/common/services/prismic/types';
import { convertImageUri } from '@weco/common/utils/convert-image-uri';
import SpacingSection from '@weco/common/views/components/SpacingSection/SpacingSection';
import {
  getGlobalContextData,
  WithGlobalContextData,
} from '@weco/common/views/components/GlobalContextProvider/GlobalContextProvider';
import { AppErrorProps } from '@weco/common/views/pages/_app';
import { removeUndefinedProps } from '@weco/common/utils/json';
import { getServerData } from '@weco/common/server-data';

type Props = {
  exhibitions: PaginatedResults<UiExhibition>;
  period?: Period;
  displayTitle: string;
} & WithGlobalContextData;

const pageDescription =
  'Explore the connections between science, medicine, life and art through our permanent and temporary exhibitions. Admission is always free.';

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);
    const globalContextData = getGlobalContextData(context);

    const { page = 1, period, memoizedPrismic } = context.query;
    const exhibitions = await getExhibitions(
      context.req,
      { page, period },
      memoizedPrismic
    );
    if (exhibitions && exhibitions.results.length > 0) {
      const title = (period === 'past' ? 'Past e' : 'E') + 'xhibitions';
      return {
        props: removeUndefinedProps({
          exhibitions,
          displayTitle: title,
          period,
          serverData,
          globalContextData,
        }),
      };
    } else {
      return { notFound: true };
    }
  };

const ExhibitionsPage: FC<Props> = props => {
  const { globalContextData, exhibitions, period, displayTitle } = props;
  const firstExhibition = exhibitions[0];

  return (
    <PageLayout
      title={displayTitle}
      description={pageDescription}
      url={{ pathname: `/exhibitions${period ? `/${period}` : ''}` }}
      jsonLd={exhibitions.results.map(exhibitionLd)}
      openGraphType={'website'}
      siteSection={'whats-on'}
      imageUrl={
        firstExhibition &&
        firstExhibition.image &&
        convertImageUri(firstExhibition.image.contentUrl, 800)
      }
      imageAltText={
        firstExhibition && firstExhibition.image && firstExhibition.image.alt
      }
      globalContextData={globalContextData}
    >
      <SpacingSection>
        <LayoutPaginatedResults
          showFreeAdmissionMessage={true}
          title={displayTitle}
          description={[
            {
              type: 'paragraph',
              text: pageDescription,
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
