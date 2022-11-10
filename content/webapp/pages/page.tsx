import { FunctionComponent, ReactElement } from 'react';
import PageLayout, {
  SiteSection,
} from '@weco/common/views/components/PageLayout/PageLayout';
import HTMLDate from '@weco/common/views/components/HTMLDate/HTMLDate';
import HeaderBackground from '@weco/common/views/components/HeaderBackground/HeaderBackground';
import PageHeader from '@weco/common/views/components/PageHeader/PageHeader';
import VideoEmbed from '@weco/common/views/components/VideoEmbed/VideoEmbed';
import ImageWithTasl from '../components/ImageWithTasl/ImageWithTasl';
import PrismicImage from '@weco/common/views/components/PrismicImage/PrismicImage';
import { Page as PageType } from '../types/pages';
import { SiblingsGroup } from '../types/siblings-group';
import {
  headerBackgroundLs,
  landingHeaderBackgroundLs,
} from '@weco/common/utils/backgrounds';
import {
  prismicPageIds,
  sectionLevelPages,
} from '@weco/common/data/hardcoded-ids';
import SpacingSection from '@weco/common/views/components/SpacingSection/SpacingSection';
import SpacingComponent from '@weco/common/views/components/SpacingComponent/SpacingComponent';
import SectionHeader from '@weco/common/views/components/SectionHeader/SectionHeader';
import { PageFormatIds } from '@weco/common/data/content-format-ids';
import { links } from '@weco/common/views/components/Header/Header';
import { Props as LabelsListProps } from '@weco/common/views/components/LabelsList/LabelsList';
import { AppErrorProps } from '@weco/common/services/app';
import { GaDimensions } from '@weco/common/services/app/google-analytics';
import { GetServerSideProps } from 'next';
import { removeUndefinedProps } from '@weco/common/utils/json';
import { getServerData } from '@weco/common/server-data';
import CardGrid from '../components/CardGrid/CardGrid';
import Body from '../components/Body/Body';
import ContentPage from '../components/ContentPage/ContentPage';
import { contentLd } from '../services/prismic/transformers/json-ld';
import {
  fetchChildren,
  fetchPage,
  fetchSiblings,
} from '../services/prismic/fetch/pages';
import { createClient } from '../services/prismic/fetch';
import { transformPage } from '../services/prismic/transformers/pages';
import { getCrop } from '@weco/common/model/image';
import { isPicture, isVideoEmbed, BodySlice } from '../types/body';
import { isNotUndefined } from '@weco/common/utils/array';
import { JsonLdObj } from '@weco/common/views/components/JsonLd/JsonLd';

export type Props = {
  page: PageType;
  siblings: SiblingsGroup<PageType>[];
  children: SiblingsGroup<PageType>;
  ordersInParents: OrderInParent[];
  staticContent: ReactElement | null;
  postOutroContent: ReactElement | null;
  jsonLd: JsonLdObj;
  gaDimensions: GaDimensions;
};

type OrderInParent = {
  id: string;
  title: string;
  order: number;
  type: 'pages' | 'exhibitions';
};

function getFeaturedPictureWithTasl(
  featuredPicture: BodySlice & { type: 'picture' }
) {
  const image =
    getCrop(featuredPicture.value.image, '16:9') || featuredPicture.value.image;

  return (
    <ImageWithTasl
      Image={
        <PrismicImage
          image={image}
          sizes={{
            xlarge: 1,
            large: 1,
            medium: 1,
            small: 1,
          }}
          quality="low"
        />
      }
      tasl={image?.tasl}
    />
  );
}

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);
    const { id } = context.query;

    const client = createClient(context);

    const pageLookup = await fetchPage(client, id as string);
    const page = pageLookup && transformPage(pageLookup);

    if (page) {
      const siblings: SiblingsGroup<PageType>[] = (
        await fetchSiblings(client, page)
      ).map(group => {
        return {
          ...group,
          siblings: group.siblings.map(transformPage),
        };
      });
      const ordersInParents: OrderInParent[] =
        page.parentPages.map(p => {
          return {
            id: p.id,
            title: p.title,
            order: p.order,
            type: p.type,
          };
        }) || [];

      // TODO: Why are we putting 'children' in a 'siblings' attribute?
      // Fix this janky naming.
      const children = {
        id: page.id,
        title: page.title,
        siblings: (await fetchChildren(client, page)).map(transformPage),
      };

      const jsonLd = contentLd(page);

      return {
        props: removeUndefinedProps({
          page,
          siblings,
          children,
          ordersInParents,
          staticContent: null,
          postOutroContent: null,
          jsonLd,
          serverData,
          gaDimensions: {
            partOf: page.seasons.map(season => season.id),
          },
        }),
      };
    } else {
      return { notFound: true };
    }
  };

export const Page: FunctionComponent<Props> = ({
  page,
  siblings,
  children,
  ordersInParents,
  staticContent,
  postOutroContent,
  jsonLd,
}) => {
  function makeLabels(title?: string): LabelsListProps | undefined {
    if (!title) return;

    return { labels: [{ text: title }] };
  }

  const DateInfo = page.datePublished && <HTMLDate date={page.datePublished} />;
  const isLanding = page.format && page.format.id === PageFormatIds.Landing;
  const labels =
    !isLanding && page.format?.title
      ? makeLabels(page.format?.title)
      : undefined;

  const backgroundTexture = isLanding
    ? landingHeaderBackgroundLs
    : headerBackgroundLs;

  const featuredPicture =
    page.body.length > 1 && isPicture(page.body[0]) ? page.body[0] : undefined;

  const featuredVideo =
    page.body.length > 1 && isVideoEmbed(page.body[0])
      ? page.body[0]
      : undefined;

  const hasFeaturedMedia =
    isNotUndefined(featuredPicture) || isNotUndefined(featuredVideo);

  const body = hasFeaturedMedia
    ? page.body.slice(1, page.body.length)
    : page.body;

  const featuredMedia = featuredPicture ? (
    getFeaturedPictureWithTasl(featuredPicture)
  ) : featuredVideo ? (
    <VideoEmbed {...featuredVideo.value} />
  ) : undefined;

  const hiddenBreadcrumbPages = [prismicPageIds.covidWelcomeBack];

  const sectionLevelPage = sectionLevelPages.includes(page.id);

  function getBreadcrumbText(siteSection: string): string {
    return hiddenBreadcrumbPages.includes(page.id) || isLanding
      ? '\u200b'
      : links.find(link => link.siteSection === siteSection)?.title ||
          siteSection;
  }

  // TODO: This is not the way to do site sections
  const sectionItem = page.siteSection
    ? [
        {
          text: getBreadcrumbText(page.siteSection),
          url: page.siteSection ? `/${page.siteSection}` : '',
        },
      ]
    : [];

  const breadcrumbs = {
    items: [
      ...sectionItem,
      ...ordersInParents.map(siblingGroup => ({
        url: `/${siblingGroup.type}/${siblingGroup.id}`,
        text: siblingGroup.title || '',
        prefix: `Part ${siblingGroup.order || ''} of`,
      })),
    ],
  };

  const displayBackground =
    featuredMedia && !sectionLevelPage ? (
      <HeaderBackground
        backgroundTexture={backgroundTexture}
        hasWobblyEdge={!isLanding}
      />
    ) : undefined;

  const Header = (
    <PageHeader
      breadcrumbs={breadcrumbs}
      labels={labels}
      title={page.title}
      FeaturedMedia={featuredMedia}
      Background={displayBackground}
      ContentTypeInfo={DateInfo}
      backgroundTexture={
        !featuredMedia && !sectionLevelPage ? backgroundTexture : undefined
      }
      highlightHeading={true}
      isContentTypeInfoBeforeMedia={false}
      sectionLevelPage={sectionLevelPage}
    />
  );

  // Find the items that have an 'order' property, and sort by those first,
  // Then any remaining will be added to the end in the order they
  // come from Prismic (date created)
  function orderItems(group: SiblingsGroup<PageType>): PageType[] {
    const groupWithOrder = group.siblings.map(sibling => {
      const parent = sibling.parentPages.find(p => p.id === group.id);
      const order = parent?.order;

      return {
        ...sibling,
        order,
      };
    });

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const orderedItems: PageType[] = groupWithOrder
      .filter(s => Boolean(s.order))
      .sort((a, b) => a.order! - b.order!);
    /* eslint-enable @typescript-eslint/no-non-null-assertion */

    const unorderedItems: PageType[] = groupWithOrder.filter(s => !s.order);

    return [...orderedItems, ...unorderedItems];
  }

  const Siblings = siblings.map((siblingGroup, i) => {
    if (siblingGroup.siblings.length > 0) {
      return (
        <SpacingSection key={i}>
          <SpacingComponent>
            <SectionHeader title={`More from ${siblingGroup.title}`} />
          </SpacingComponent>
          <SpacingComponent>
            <CardGrid items={orderItems(siblingGroup)} itemsPerRow={3} />
          </SpacingComponent>
        </SpacingSection>
      );
    }
  });

  const Children =
    children.siblings.length > 0
      ? [
          <SpacingSection key={1}>
            <SpacingComponent>
              <CardGrid items={orderItems(children)} itemsPerRow={3} />
            </SpacingComponent>
          </SpacingSection>,
        ]
      : [];

  return (
    <PageLayout
      title={page.title}
      description={page.metadataDescription || page.promo?.caption || ''}
      url={{ pathname: `/pages/${page.id}` }}
      jsonLd={jsonLd}
      openGraphType="website"
      siteSection={page?.siteSection as SiteSection}
      image={page.image}
    >
      <ContentPage
        id={page.id}
        Header={Header}
        Body={
          <Body
            body={body}
            pageId={page.id}
            onThisPage={page.onThisPage}
            showOnThisPage={page.showOnThisPage}
            isLanding={isLanding}
            sectionLevelPage={sectionLevelPage}
            staticContent={staticContent}
          />
        }
        /**
         * We use this order because people want to:
         * - Explore deeper into a subject (children)
         * - Explore around a subject (siblings)
         */
        RelatedContent={[...Children, ...Siblings]}
        postOutroContent={postOutroContent}
        contributors={page.contributors}
        seasons={page.seasons}
      />
    </PageLayout>
  );
};

export default Page;
