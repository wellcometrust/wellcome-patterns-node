import { GetServerSideProps } from 'next';
import { FunctionComponent } from 'react';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import SpacingSection from '@weco/common/views/components/SpacingSection/SpacingSection';
import LayoutPaginatedResults from '../components/LayoutPaginatedResults/LayoutPaginatedResults';
import Layout12 from '@weco/common/views/components/Layout12/Layout12';
import SegmentedControl from '@weco/common/views/components/SegmentedControl/SegmentedControl';
import { PaginatedResults } from '@weco/common/services/prismic/types';
import { pageDescriptions } from '@weco/common/data/microcopy';
import { createClient } from '../services/prismic/fetch';
import {
  fetchGuideFormats,
  fetchGuides,
} from '../services/prismic/fetch/guides';
import { transformQuery } from '../services/prismic/transformers/paginated-results';
import {
  transformGuide,
  transformGuideFormat,
} from '../services/prismic/transformers/guides';
import { getServerData } from '@weco/common/server-data';
import { AppErrorProps } from '@weco/common/views/pages/_app';
import { Guide } from '../types/guides';
import { Format } from '../types/format';
import { looksLikePrismicId } from '@weco/common/services/prismic';

const displayTitle = 'Guides';

type FiltersProps = {
  currentId: string | string[] | null;
  guideFormats: Format[];
};

const Filters: FunctionComponent<FiltersProps> = ({
  currentId,
  guideFormats,
}) => {
  const items = guideFormats.map(guide => {
    return {
      id: guide.id,
      url: `/guides?format=${guide.id}`,
      text: guide.title,
    };
  });
  items.unshift({
    id: 'all',
    url: '/guides',
    text: 'All',
  });
  return (
    <Layout12>
      <SegmentedControl
        id={'guidesFilter'}
        activeId={(currentId as string) || 'all'}
        items={items}
      />
    </Layout12>
  );
};

type Props = {
  guides: PaginatedResults<Guide>;
  guideFormats: Format[];
  formatId: string | string[] | null;
};

const GuidePage: FunctionComponent<Props> = ({
  guides,
  guideFormats,
  formatId,
}: Props) => {
  return (
    <PageLayout
      title={'Guides'}
      description={pageDescriptions.guides}
      url={{ pathname: '/guides' }}
      jsonLd={{ '@type': 'Webpage' }}
      openGraphType={'website'}
      siteSection={'what-we-do'}
      image={undefined}
    >
      <SpacingSection>
        <LayoutPaginatedResults
          showFreeAdmissionMessage={false}
          title={displayTitle}
          description={[
            {
              type: 'paragraph',
              text: pageDescriptions.guides,
              spans: [],
            },
          ]}
          paginatedResults={guides}
          paginationRoot={''}
        >
          <Filters currentId={formatId} guideFormats={guideFormats} />
        </LayoutPaginatedResults>
      </SpacingSection>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);
    const { format } = context.query;

    if (!looksLikePrismicId(format)) {
      return { notFound: true };
    }

    const client = createClient(context);

    const guidesQueryPromise = fetchGuides(client, { format });
    const guidesFormatQueryPromise = fetchGuideFormats(client);

    const [guidesQuery, guideFormatsQuery] = await Promise.all([
      guidesQueryPromise,
      guidesFormatQueryPromise,
    ]);

    const guides = transformQuery(guidesQuery, transformGuide);
    const guideFormats = transformQuery(
      guideFormatsQuery,
      transformGuideFormat
    );

    if (guides) {
      return {
        props: {
          guides,
          guideFormats: guideFormats.results,
          formatId: format || null,
          serverData,
        },
      };
    } else {
      return { notFound: true };
    }
  };

export default GuidePage;
