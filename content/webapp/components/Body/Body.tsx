import dynamic from 'next/dynamic';
import React, {
  ReactNode,
  ReactElement,
  FunctionComponent,
  Fragment,
} from 'react';
import { classNames } from '@weco/common/utils/classnames';
import { Link } from '@weco/common/model/link';
import {
  defaultSerializer,
  dropCapSerializer,
} from '../HTMLSerializers/HTMLSerializers';
import { prismicPageIds } from '@weco/common/services/prismic/hardcoded-id';
import { CaptionedImage } from '@weco/common/views/components/Images/Images';
import SpacingComponent from '@weco/common/views/components/SpacingComponent/SpacingComponent';
import SectionHeader from '@weco/common/views/components/SectionHeader/SectionHeader';
import Space from '@weco/common/views/components/styled/Space';
import Quote from '@weco/common/views/components/Quote/Quote';
import PrismicHtmlBlock from '@weco/common/views/components/PrismicHtmlBlock/PrismicHtmlBlock';
import FeaturedText from '@weco/common/views/components/FeaturedText/FeaturedText';
import VideoEmbed from '@weco/common/views/components/VideoEmbed/VideoEmbed';
import GifVideo from '../GifVideo/GifVideo';
import Contact from '@weco/common/views/components/Contact/Contact';
import Iframe from '@weco/common/views/components/Iframe/Iframe';
import DeprecatedImageList from '@weco/common/views/components/DeprecatedImageList/DeprecatedImageList';
import Layout from '@weco/common/views/components/Layout/Layout';
import Layout8 from '@weco/common/views/components/Layout8/Layout8';
import Layout10 from '@weco/common/views/components/Layout10/Layout10';
import Layout12 from '@weco/common/views/components/Layout12/Layout12';
import OnThisPageAnchors from '@weco/common/views/components/OnThisPageAnchors/OnThisPageAnchors';
import VenueClosedPeriods from '../VenueClosedPeriods/VenueClosedPeriods';
import Table from '@weco/common/views/components/Table/Table';
import MediaObjectList from '@weco/common/views/components/MediaObjectList/MediaObjectList';
import InfoBlock from '@weco/common/views/components/InfoBlock/InfoBlock';
import TitledTextList from '@weco/common/views/components/TitledTextList/TitledTextList';
import TagsGroup from '@weco/common/views/components/TagsGroup/TagsGroup';
import Discussion from '@weco/common/views/components/Discussion/Discussion';
import WobblyEdgedContainer from '@weco/common/views/components/WobblyEdgedContainer/WobblyEdgedContainer';
import WobblyEdge from '@weco/common/views/components/WobblyEdge/WobblyEdge';
import GridFactory, { sectionLevelPageGrid } from './GridFactory';
import Card from '@weco/common/views/components/Card/Card';
import { convertItemToCardProps } from '@weco/common/model/card';
import { BodyType } from '@weco/common/model/generic-content-fields';
import VisitUsStaticContent from './VisitUsStaticContent';
import CollectionsStaticContent from './CollectionsStaticContent';
import AsyncSearchResults from '../SearchResults/AsyncSearchResults';
import SearchResults from '../SearchResults/SearchResults';
import VenueHours from '../VenueHours/VenueHours';
import FeaturedCard, {
  convertItemToFeaturedCardProps,
  convertCardToFeaturedCardProps,
} from '../FeaturedCard/FeaturedCard';
import ImageGallery from '../ImageGallery/ImageGallery';

const Map = dynamic(import('../Map/Map'), {
  ssr: false,
});

type LayoutWidthProps = {
  width: 8 | 10;
  children: ReactNode;
};

const LayoutWidth: FunctionComponent<LayoutWidthProps> = ({
  width,
  children,
}: LayoutWidthProps): ReactElement | null => {
  switch (true) {
    case width === 10:
      return <Layout10>{children}</Layout10>;
    case width === 8:
      return <Layout8>{children}</Layout8>;
    default:
      return null;
  }
};

type Props = {
  body: BodyType;
  onThisPage?: Link[];
  showOnThisPage?: boolean;
  isDropCapped?: boolean;
  pageId: string;
  minWidth?: 10 | 8;
  isLanding?: boolean;
  sectionLevelPage?: boolean;
};

const Body: FunctionComponent<Props> = ({
  body,
  onThisPage,
  showOnThisPage,
  isDropCapped,
  pageId,
  minWidth = 8,
  isLanding = false,
  sectionLevelPage = false,
}: Props) => {
  const filteredBody = body
    .filter(slice => !(slice.type === 'picture' && slice.weight === 'featured'))
    // The standfirst is now put into the header
    // and used exclusively by articles / article series
    .filter(slice => slice.type !== 'standfirst');

  const firstTextSliceIndex = filteredBody
    .map(slice => slice.type)
    .indexOf('text');
  let imageGalleryIdCount = 1;

  const sections = body.filter(slice => slice.type === 'contentList');
  const sectionThemes = [
    {
      rowBackground: 'white',
      cardBackground: 'cream',
      featuredCardBackground: 'charcoal',
      featuredCardText: 'white',
    },
    {
      rowBackground: 'cream',
      cardBackground: 'white',
      featuredCardBackground: 'white',
      featuredCardText: 'black',
    },
    {
      rowBackground: 'white',
      cardBackground: 'cream',
      featuredCardBackground: 'cream',
      featuredCardText: 'black',
    },
    {
      rowBackground: 'charcoal',
      cardBackground: 'transparent',
      featuredCardBackground: 'white',
      featuredCardText: 'black',
    },
  ];
  const AdditionalContent = ({
    index,
    sections = [],
    isLanding = false,
  }: {
    index: number;
    sections: BodyType;
    isLanding: boolean;
  }): ReactElement<Props> | null => {
    if (index === 0) {
      return (
        <>
          {pageId === prismicPageIds.visitUs && <VisitUsStaticContent />}
          {pageId === prismicPageIds.collections && (
            <CollectionsStaticContent />
          )}
          {onThisPage && onThisPage.length > 2 && showOnThisPage && (
            <SpacingComponent>
              <LayoutWidth width={minWidth}>
                <OnThisPageAnchors links={onThisPage} />
              </LayoutWidth>
            </SpacingComponent>
          )}
          {isLanding &&
            sections.map((section, index) => {
              const isFirst = index === 0;
              const isLast = index === sections.length - 1;
              const sectionTheme = sectionThemes[index % sectionThemes.length];
              const hasFeatured =
                Boolean(section.value.hasFeatured) ||
                section.value.items.length === 1;
              const firstItem = section.value.items?.[0];
              const isCardType = firstItem?.type === 'card';

              const firstItemProps =
                firstItem &&
                (isCardType
                  ? convertCardToFeaturedCardProps(firstItem)
                  : convertItemToFeaturedCardProps(firstItem));

              const cardItems = hasFeatured
                ? section.value.items.slice(1)
                : section.value.items;
              const featuredItem =
                hasFeatured && firstItem ? (
                  <FeaturedCard
                    {...firstItemProps}
                    background={sectionTheme.featuredCardBackground}
                    color={sectionTheme.featuredCardText}
                    isReversed={false}
                  >
                    <h2 className="font-wb font-size-2">{firstItem.title}</h2>
                    {isCardType && firstItem.description && (
                      <p className="font-hnr font-size-5">
                        {firstItem.description}
                      </p>
                    )}
                    {firstItem.promo && (
                      <p className="font-hnr font-size-5">
                        {firstItem.promo.caption}
                      </p>
                    )}
                  </FeaturedCard>
                ) : null;

              const cards = cardItems.map((item, i) => {
                const cardProps =
                  item.type === 'card' ? item : convertItemToCardProps(item);
                return <Card key={i} item={cardProps} />;
              });

              return (
                <Fragment key={index}>
                  {!isFirst && (
                    <WobblyEdge
                      background={sectionTheme.rowBackground}
                      isStatic
                    />
                  )}
                  <Space
                    v={{
                      size: 'xl',
                      properties:
                        isLast && sectionTheme.rowBackground === 'white'
                          ? ['padding-top']
                          : ['padding-top', 'padding-bottom'],
                    }}
                    className={classNames({
                      'row card-theme': true,
                      [`bg-${sectionTheme.rowBackground}`]: true,
                      [`card-theme--${sectionTheme.cardBackground}`]: true,
                    })}
                  >
                    {section.value.title && (
                      <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
                        <SectionHeader title={section.value.title} />
                      </Space>
                    )}
                    {featuredItem && (
                      <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
                        <Layout12>{featuredItem}</Layout12>
                      </Space>
                    )}
                    {cards.length > 0 && (
                      <GridFactory
                        items={cards}
                        overrideGridSizes={
                          sectionLevelPage && sectionLevelPageGrid
                        }
                      />
                    )}
                  </Space>
                  {!isLast && <WobblyEdge background={'white'} isStatic />}
                </Fragment>
              );
            })}
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <div
      className={classNames({
        'basic-body': true,
      })}
    >
      {filteredBody.length < 1 && (
        <AdditionalContent
          index={0}
          sections={sections}
          isLanding={isLanding}
        />
      )}

      {filteredBody.map((slice, i) => (
        <Fragment key={i}>
          {/* If the first slice is featured text we display it any static content, i.e. <AdditionalContent /> */}
          {i === 0 && slice.type === 'text' && slice.weight === 'featured' && (
            <Layout8 shift={!sectionLevelPage}>
              <div className="body-text spaced-text">
                <Space
                  v={{
                    size: sectionLevelPage ? 'xl' : 'l',
                    properties: ['margin-bottom'],
                  }}
                >
                  <FeaturedText
                    html={slice.value}
                    htmlSerializer={defaultSerializer}
                  />
                </Space>
              </div>
            </Layout8>
          )}

          <AdditionalContent
            index={i}
            sections={sections}
            isLanding={isLanding}
          />
          {!(
            i === 0 &&
            slice.type === 'text' &&
            slice.weight === 'featured'
          ) && (
            <SpacingComponent>
              <div>
                {slice.type === 'text' && (
                  <LayoutWidth width={minWidth}>
                    <div className="body-text spaced-text">
                      {slice.weight !== 'featured' &&
                        (firstTextSliceIndex === i && isDropCapped ? (
                          <PrismicHtmlBlock
                            html={slice.value}
                            htmlSerializer={dropCapSerializer}
                          />
                        ) : (
                          <PrismicHtmlBlock
                            html={slice.value}
                            htmlSerializer={defaultSerializer}
                          />
                        ))}
                    </div>
                  </LayoutWidth>
                )}

                {/* TODO: use one layout for all image weights if/when it's established
              that width isn't an adequate means to illustrate a difference */}
                {slice.type === 'picture' && slice.weight === 'default' && (
                  <Layout10>
                    <CaptionedImage {...slice.value} sizesQueries={''} />
                  </Layout10>
                )}
                {slice.type === 'picture' && slice.weight === 'standalone' && (
                  <Layout12>
                    <CaptionedImage {...slice.value} sizesQueries={''} />
                  </Layout12>
                )}
                {slice.type === 'picture' && slice.weight === 'supporting' && (
                  <LayoutWidth width={minWidth}>
                    <CaptionedImage {...slice.value} sizesQueries={''} />
                  </LayoutWidth>
                )}
                {slice.type === 'imageGallery' && (
                  <ImageGallery
                    isStandalone={slice.weight === 'standalone'}
                    {...slice.value}
                    id={imageGalleryIdCount++}
                  />
                )}
                {slice.type === 'quote' && (
                  <LayoutWidth width={minWidth}>
                    <Quote {...slice.value} />
                  </LayoutWidth>
                )}
                {slice.type === 'titledTextList' && (
                  <LayoutWidth width={minWidth}>
                    <TitledTextList {...slice.value} />
                  </LayoutWidth>
                )}
                {slice.type === 'contentList' && !isLanding && (
                  <LayoutWidth width={minWidth}>
                    {/* FIXME: this makes what-we-do contentLists synchronous, but it's hacky. */}
                    {pageId === prismicPageIds.whatWeDo ? (
                      <SearchResults
                        title={slice.value.title}
                        items={slice.value.items}
                      />
                    ) : (
                      <AsyncSearchResults
                        title={slice.value.title}
                        query={slice.value.items
                          .map(({ id }) => `id:${id}`)
                          .join(' ')}
                      />
                    )}
                  </LayoutWidth>
                )}
                {/* TODO: remove this slice type if we're not using it? */}
                {slice.type === 'searchResults' && (
                  <LayoutWidth width={minWidth}>
                    <AsyncSearchResults {...slice.value} />
                  </LayoutWidth>
                )}
                {slice.type === 'videoEmbed' && (
                  <LayoutWidth width={minWidth}>
                    <VideoEmbed {...slice.value} />
                  </LayoutWidth>
                )}
                {slice.type === 'soundcloudEmbed' && (
                  <LayoutWidth width={minWidth}>
                    <iframe
                      width="100%"
                      height="140"
                      frameBorder="no"
                      title="soundcloud player"
                      src={slice.value.embedUrl}
                    />
                  </LayoutWidth>
                )}
                {slice.type === 'map' && (
                  <LayoutWidth width={minWidth}>
                    <Map {...slice.value} />
                  </LayoutWidth>
                )}
                {slice.type === 'gifVideo' && (
                  <Layout10>
                    <GifVideo {...slice.value} />
                  </Layout10>
                )}
                {slice.type === 'iframe' && (
                  <Layout10>
                    <Iframe {...slice.value} />
                  </Layout10>
                )}
                {slice.type === 'contact' && (
                  <LayoutWidth width={minWidth}>
                    <Contact {...slice.value} />
                  </LayoutWidth>
                )}
                {slice.type === 'collectionVenue' && (
                  <>
                    {slice.value.showClosingTimes && (
                      <LayoutWidth width={minWidth}>
                        <VenueClosedPeriods venue={slice.value.content} />
                      </LayoutWidth>
                    )}
                    {!slice.value.showClosingTimes && (
                      <>
                        <Layout
                          gridSizes={
                            slice.weight === 'featured'
                              ? {
                                  s: 12,
                                  m: 12,
                                  l: 11,
                                  shiftL: 1,
                                  xl: 10,
                                  shiftXL: 2,
                                }
                              : {
                                  s: 12,
                                  m: 10,
                                  shiftM: 1,
                                  l: 8,
                                  shiftL: 2,
                                  xl: 8,
                                  shiftXL: 2,
                                }
                          }
                        >
                          <VenueHours
                            venue={slice.value.content}
                            weight={slice.weight || 'default'}
                          />
                        </Layout>
                      </>
                    )}
                  </>
                )}
                {slice.type === 'table' && (
                  <LayoutWidth width={minWidth}>
                    <Table {...slice.value} />
                  </LayoutWidth>
                )}
                {slice.type === 'infoBlock' && (
                  <LayoutWidth width={minWidth}>
                    <InfoBlock {...slice.value} />
                  </LayoutWidth>
                )}
                {slice.type === 'discussion' && (
                  <WobblyEdgedContainer>
                    <Discussion
                      title={slice.value.title}
                      text={slice.value.text}
                    />
                  </WobblyEdgedContainer>
                )}
                {slice.type === 'tagList' && (
                  <LayoutWidth width={minWidth}>
                    <TagsGroup
                      title={slice.value.title}
                      tags={slice.value.tags}
                    />
                  </LayoutWidth>
                )}
                {/* deprecated */}
                {slice.type === 'deprecatedImageList' && (
                  <LayoutWidth width={minWidth}>
                    <DeprecatedImageList {...slice.value} />
                  </LayoutWidth>
                )}
                {slice.type === 'mediaObjectList' && (
                  <LayoutWidth width={minWidth}>
                    <MediaObjectList {...slice.value} />
                  </LayoutWidth>
                )}
              </div>
            </SpacingComponent>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Body;
