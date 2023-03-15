import { FunctionComponent } from 'react';
import { isPast, isFuture } from '@weco/common/utils/dates';
import { formatDate } from '@weco/common/utils/format-date';
import InfoBox from '../InfoBox/InfoBox';
import { font } from '@weco/common/utils/classnames';
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
import { isNotUndefined } from '@weco/common/utils/array';
import { a11y } from '@weco/common/data/microcopy';
import { Exhibition as ExhibitionType } from '../../types/exhibitions';
import * as prismicT from '@prismicio/types';

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
  information,
  family,
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
};

export const ExhibitionInfoBox: FunctionComponent<Props> = ({ exhibition }) =>
  exhibition.end && !isPast(exhibition.end) ? (
    <InfoBox title="Visit us" items={getInfoItems(exhibition)}>
      <p className={`no-margin ${font('intr', 5)}`}>
        <a href="/access">All our accessibility services</a>
      </p>
    </InfoBox>
  ) : null;
