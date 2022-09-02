import { ExhibitionGuideBasic } from '../types/exhibition-guides';
import type { PaginatedResults } from '@weco/common/services/prismic/types';
import { createClient } from '../services/prismic/fetch';
import { fetchExhibitionGuides } from '../services/prismic/fetch/exhibition-guides';
import { transformQuery } from '../services/prismic/transformers/paginated-results';
import {
  transformExhibitionGuide,
  transformExhibitionGuideToExhibitionGuideBasic,
} from '../services/prismic/transformers/exhibition-guides';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { appError, AppErrorProps } from '@weco/common/views/pages/_app';
import { getServerData } from '@weco/common/server-data';
import { exhibitionGuideLd } from '../services/prismic/transformers/json-ld';
import { getPage } from '../utils/query-params';
import { pageDescriptions } from '@weco/common/data/microcopy';
import { JsonLdObj } from '@weco/common/views/components/JsonLd/JsonLd';
import SpacingSection from '@weco/common/views/components/SpacingSection/SpacingSection';
import LayoutPaginatedResults from '../components/LayoutPaginatedResults/LayoutPaginatedResults';
import { exhibitionGuidesLinks } from '@weco/common/views/components/Header/Header';

type Props = {
  exhibitionGuides: PaginatedResults<ExhibitionGuideBasic>;
  jsonLd: JsonLdObj[];
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);
    const page = getPage(context.query);

    if (!serverData.toggles.exhibitionGuides) {
      return { notFound: true };
    }

    if (typeof page !== 'number') {
      return appError(context, 400, page.message);
    }

    const client = createClient(context);
    const exhibitionGuidesQuery = await fetchExhibitionGuides(client, { page });

    const exhibitionGuides = transformQuery(
      exhibitionGuidesQuery,
      transformExhibitionGuide
    );

    const basicExhibitionGuides = {
      ...exhibitionGuides,
      results: exhibitionGuides.results.map(
        transformExhibitionGuideToExhibitionGuideBasic
      ),
    };

    const jsonLd = exhibitionGuides.results.map(exhibitionGuideLd);

    return {
      props: {
        exhibitionGuides: basicExhibitionGuides,
        jsonLd,
        serverData,
      },
    };
  };

const ExhibitionGuidesPage: FC<Props> = props => {
  const { exhibitionGuides } = props;
  const image = exhibitionGuides.results[0]?.image;

  return (
    <PageLayout
      title={'Exhibition Guides'}
      description={pageDescriptions.exhibitionGuides}
      url={{ pathname: `/guides/exhibitions` }}
      jsonLd={{ '@type': 'WebPage' }} // TODO
      openGraphType={'website'}
      siteSection={'exhibition-guides'}
      image={image}
      headerProps={{
        customNavLinks: exhibitionGuidesLinks,
        showLibraryLogin: false,
      }}
      hideNewsletterPromo={true}
      hideFooter={true}
    >
      <SpacingSection>
        <LayoutPaginatedResults
          showFreeAdmissionMessage={false}
          title={'Exhibition guides'}
          paginatedResults={exhibitionGuides}
          paginationRoot={'exhibition-guides'}
        />
      </SpacingSection>
    </PageLayout>
  );
};

export default ExhibitionGuidesPage;
