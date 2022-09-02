import { Fragment, useState, useEffect, FC } from 'react';
import { isPast, isFuture } from '@weco/common/utils/dates';
import { formatDate } from '@weco/common/utils/format-date';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import PageHeader from '@weco/common/views/components/PageHeader/PageHeader';
import { getFeaturedMedia, getHeroPicture } from '../../utils/page-header';
import DateRange from '@weco/common/views/components/DateRange/DateRange';
import HTMLDate from '@weco/common/views/components/HTMLDate/HTMLDate';
import StatusIndicator from '@weco/common/views/components/StatusIndicator/StatusIndicator';
import InfoBox from '../InfoBox/InfoBox';
import { font } from '@weco/common/utils/classnames';
import { Page as PageType } from '../../types/pages';
import Space from '@weco/common/views/components/styled/Space';
import { LabelField } from '@weco/common/model/label-field';
import {
  calendar,
  clock,
  ticket,
  location,
  a11Y,
  a11YVisual,
  information,
  family,
  IconSvg,
  britishSignLanguage,
  audioDescribed,
} from '@weco/common/icons';
import Body from '../Body/Body';
import SearchResults from '../SearchResults/SearchResults';
import ContentPage from '../ContentPage/ContentPage';
import Contributors from '../Contributors/Contributors';
import { isNotUndefined } from '@weco/common/utils/array';
import { a11y } from '@weco/common/data/microcopy';
import { fetchExhibitionRelatedContentClientSide } from '../../services/prismic/fetch/exhibitions';
import {
  Exhibition as ExhibitionType,
  ExhibitionAbout,
} from '../../types/exhibitions';

import { Event as EventType } from '../../types/events';
import * as prismicT from '@prismicio/types';
import { JsonLdObj } from '@weco/common/views/components/JsonLd/JsonLd';

type ExhibitionItem = LabelField & {
  icon?: IconSvg;
};

function getUpcomingExhibitionObject(
  exhibition: ExhibitionType
): ExhibitionItem | undefined {
  return isFuture(exhibition.start)
    ? {
        id: undefined,
        title: undefined,
        description: [
          {
            type: 'paragraph',
            text: `Opening on ${formatDate(exhibition.start)}`,
            spans: [],
          },
        ],
        icon: calendar,
      }
    : undefined;
}

function getadmissionObject(): ExhibitionItem {
  return {
    id: undefined,
    title: undefined,
    description: [
      {
        type: 'paragraph',
        text: 'Free admission',
        spans: [],
      },
    ],
    icon: ticket,
  };
}

function getTodaysHoursObject(): ExhibitionItem {
  const todaysHoursText = 'Galleries open Tuesday–Sunday, Opening times';

  const link = {
    type: 'hyperlink',
    start: todaysHoursText.length - 13,
    end: todaysHoursText.length,
    data: {
      link_type: 'Web',
      url: '/opening-times',
    },
  } as prismicT.RTLinkNode;

  return {
    id: undefined,
    title: undefined,
    description: [
      {
        type: 'paragraph',
        text: todaysHoursText,
        spans: [link],
      },
    ],
    icon: clock,
  };
}

function getPlaceObject(
  exhibition: ExhibitionType
): ExhibitionItem | undefined {
  return (
    exhibition.place && {
      id: undefined,
      title: undefined,
      description: [
        {
          type: 'paragraph',
          text: `${exhibition.place.title}, level ${exhibition.place.level}`,
          spans: [],
        },
      ],
      icon: location,
    }
  );
}

// These options are defined in exhibition-resources.ts
const resourceIcons: { [key: string]: IconSvg } = {
  information: information,
  family: family,
};

function getResourcesItems(exhibition: ExhibitionType): ExhibitionItem[] {
  return exhibition.resources.map(resource => {
    return {
      id: undefined,
      title: undefined,
      description: resource.description,
      icon: resource.icon ? resourceIcons[resource.icon] : undefined,
    };
  });
}

function getBslAdItems(exhibition: ExhibitionType): ExhibitionItem[] {
  return [exhibition.bslInfo, exhibition.audioDescriptionInfo]
    .filter(Boolean)
    .map(item => {
      return {
        id: undefined,
        title: undefined,
        description: item,
        icon:
          item === exhibition.bslInfo ? britishSignLanguage : audioDescribed,
      };
    });
}

function getAccessibilityItems(): ExhibitionItem[] {
  return [
    {
      id: undefined,
      title: undefined,
      description: [
        {
          type: 'paragraph',
          text: a11y.stepFreeAccess,
          spans: [],
        },
      ],
      icon: a11Y,
    },
    {
      id: undefined,
      title: undefined,
      description: [
        {
          type: 'paragraph',
          text: a11y.largePrintGuides,
          spans: [],
        },
      ],
      icon: a11YVisual,
    },
  ];
}

export function getInfoItems(exhibition: ExhibitionType): ExhibitionItem[] {
  return [
    getUpcomingExhibitionObject(exhibition),
    getadmissionObject(),
    getTodaysHoursObject(),
    getPlaceObject(exhibition),
    ...getResourcesItems(exhibition),
    ...getAccessibilityItems(),
    ...getBslAdItems(exhibition),
  ].filter(isNotUndefined);
}

type Props = {
  exhibition: ExhibitionType;
  jsonLd: JsonLdObj;
  pages: PageType[];
};

const Exhibition: FC<Props> = ({ exhibition, jsonLd, pages }) => {
  type ExhibitionOf = (ExhibitionType | EventType)[];

  const [exhibitionOfs, setExhibitionOfs] = useState<ExhibitionOf>([]);
  const [exhibitionAbouts, setExhibitionAbouts] = useState<ExhibitionAbout[]>(
    []
  );

  useEffect(() => {
    const ids = exhibition.relatedIds;

    fetchExhibitionRelatedContentClientSide(ids).then(relatedContent => {
      if (isNotUndefined(relatedContent)) {
        setExhibitionOfs(relatedContent.exhibitionOfs);
        setExhibitionAbouts(relatedContent.exhibitionAbouts);
      }
    });
  }, []);

  const breadcrumbs = {
    items: [
      {
        url: '/exhibitions',
        text: 'Exhibitions',
      },
      {
        url: `/exhibitions/${exhibition.id}`,
        text: exhibition.title,
        isHidden: true,
      },
    ],
  };

  const DateInfo = exhibition.end ? (
    <DateRange start={exhibition.start} end={exhibition.end} />
  ) : (
    <HTMLDate date={exhibition.start} />
  );

  // This is for content that we don't have the crops for in Prismic
  const maybeHeroPicture = getHeroPicture(exhibition);
  const maybeFeaturedMedia = !maybeHeroPicture
    ? getFeaturedMedia(exhibition)
    : undefined;

  const Header = (
    <PageHeader
      breadcrumbs={breadcrumbs}
      labels={{ labels: exhibition.labels }}
      title={exhibition.title}
      Background={undefined}
      ContentTypeInfo={
        <Fragment>
          {!exhibition.isPermanent && (
            <Space v={{ size: 'xs', properties: ['margin-bottom'] }}>
              {DateInfo}
            </Space>
          )}
          <StatusIndicator
            start={exhibition.start}
            end={exhibition.end || new Date()}
            statusOverride={exhibition.statusOverride}
          />
        </Fragment>
      }
      FeaturedMedia={maybeFeaturedMedia}
      HeroPicture={maybeHeroPicture}
      isFree={true}
      isContentTypeInfoBeforeMedia={true}
    />
  );

  return (
    <PageLayout
      title={exhibition.title}
      description={
        exhibition.metadataDescription || exhibition.promo?.caption || ''
      }
      url={{ pathname: `/exhibitions/${exhibition.id}` }}
      jsonLd={jsonLd}
      openGraphType={'website'}
      siteSection={'whats-on'}
      image={exhibition.image}
    >
      <ContentPage
        id={exhibition.id}
        Header={Header}
        Body={<Body body={exhibition.body} pageId={exhibition.id} />}
        seasons={exhibition.seasons}
        // We hide contributors as we show them further up the page
        hideContributors={true}
      >
        {exhibition.contributors.length > 0 && (
          <Contributors contributors={exhibition.contributors} />
        )}

        {/* TODO: This probably isn't going to be the final resting place for related `pages`, but it's
        a reasonable starting place. Update this once the UX has shaken out. */}
        {(exhibitionOfs.length > 0 || pages.length > 0) && (
          <SearchResults
            items={[...exhibitionOfs, ...pages]}
            title={`In this exhibition`}
          />
        )}

        {exhibition.end && !isPast(exhibition.end) && (
          <InfoBox title="Visit us" items={getInfoItems(exhibition)}>
            <p className={`no-margin ${font('intr', 5)}`}>
              <a href="/access">All our accessibility services</a>
            </p>
          </InfoBox>
        )}
        {exhibitionAbouts.length > 0 && (
          <SearchResults
            items={exhibitionAbouts}
            title={`About this exhibition`}
          />
        )}
      </ContentPage>
    </PageLayout>
  );
};
export default Exhibition;
