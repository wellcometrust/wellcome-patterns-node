import { FunctionComponent } from 'react';
import { font } from '@weco/common/utils/classnames';
import { trackGaEvent } from '@weco/common/utils/ga';
import LabelsList from '@weco/common/views/components/LabelsList/LabelsList';
import Dot from '@weco/common/views/components/Dot/Dot';
import EventDateRange from '../EventDateRange/EventDateRange';
import { EventBasic } from '../../types/events';
import { upcomingDatesFullyBooked } from '../../services/prismic/events';
import Space from '@weco/common/views/components/styled/Space';
import {
  CardOuter,
  CardBody,
  CardPostBody,
  CardLabels,
  CardImageWrapper,
} from '../Card/Card';
import Divider from '@weco/common/views/components/Divider/Divider';
import WatchLabel from '@weco/common/views/components/WatchLabel/WatchLabel';
import Icon from '@weco/common/views/components/Icon/Icon';
import { location } from '@weco/common/icons';
import { PlaceBasic } from '../../types/places';
import { isNotUndefined } from '@weco/common/utils/array';
import { inOurBuilding } from '@weco/common/data/microcopy';
import PrismicImage from '@weco/common/views/components/PrismicImage/PrismicImage';

type Props = {
  event: EventBasic;
  position?: number;
  dateString?: string;
  timeString?: string;
  fromDate?: Date;
};

export function getLocationText(
  isOnline?: boolean,
  places?: PlaceBasic[]
): string {
  // Acceptance criteria from https://github.com/wellcomecollection/wellcomecollection.org/issues/7818
  // * If an event is only in venue, in a single location, we display the specific location (e.g. 'Reading Room')
  // * If an event is only in venue, in multiple locations, we display 'In our building'
  // * If an event is only online, we display 'Online'
  // * If an event is online and in venue, we display 'Online | In our building'
  // * If an event has a single Prismic location, 'Throughout the building', we display 'In our building'
  //   This is how the editorial team used to do multi-location events before we added proper support
  //   for multiple locations.
  if (!isOnline && isNotUndefined(places) && places.length === 1) {
    return places[0].title === 'Throughout the building'
      ? inOurBuilding
      : places[0].title;
  }

  if (!isOnline && isNotUndefined(places) && places.length > 1) {
    return inOurBuilding;
  }

  return `Online${
    isNotUndefined(places) && places.length > 0 ? ` | ${inOurBuilding}` : ''
  }`;
}

const EventPromo: FunctionComponent<Props> = ({
  event,
  position = 0,
  dateString,
  timeString,
  fromDate,
}) => {
  const isPast = event.isPast;
  return (
    <CardOuter
      data-component="EventPromo"
      data-component-state={JSON.stringify({ position: position })}
      href={(event.promo && event.promo.link) || `/events/${event.id}`}
      onClick={() => {
        trackGaEvent({
          category: 'EventPromo',
          action: 'follow link',
          label: `${event.id} | position: ${position}`,
        });
      }}
    >
      <CardImageWrapper>
        {event.promo?.image && (
          <PrismicImage
            // We intentionally omit the alt text on promos, so screen reader
            // users don't have to listen to the alt text before hearing the
            // title of the item in the list.
            image={{
              ...event.promo.image,
              alt: '',
            }}
            sizes={{
              xlarge: 1 / 4,
              large: 1 / 3,
              medium: 1 / 2,
              small: 1,
            }}
            quality="low"
          />
        )}

        {event.primaryLabels.length > 0 && (
          <CardLabels labels={event.primaryLabels} />
        )}
      </CardImageWrapper>

      <CardBody>
        <div>
          <Space
            v={{
              size: 's',
              properties: ['margin-bottom'],
            }}
            as="h2"
            className={`promo-link__title ${font('wb', 3)}`}
          >
            {event.title}
          </Space>

          {(event.isOnline || event.locations.length > 0) && (
            <Space
              v={{ size: 's', properties: ['margin-top', 'margin-bottom'] }}
              className={`${font('intr', 5)} flex flex--v-center`}
            >
              <Icon icon={location} matchText />
              <Space h={{ size: 'xs', properties: ['margin-left'] }}>
                {getLocationText(event.isOnline, event.locations)}
              </Space>
            </Space>
          )}

          {event.availableOnline && (
            <Space v={{ size: 's', properties: ['margin-top'] }}>
              <WatchLabel text="Available to watch" />
            </Space>
          )}

          {!isPast && (
            <>
              <p className={`${font('intr', 5)} no-padding no-margin`}>
                <EventDateRange
                  event={event}
                  splitTime={true}
                  fromDate={fromDate}
                />
              </p>

              {dateString && (
                <p className={`${font('intr', 5)} no-padding no-margin`}>
                  {dateString}
                </p>
              )}

              {timeString && (
                <p className={`${font('intr', 5)} no-padding no-margin`}>
                  {timeString}
                </p>
              )}
            </>
          )}

          {upcomingDatesFullyBooked(event) && (
            <Space
              v={{ size: 'm', properties: ['margin-top'] }}
              className={`${font('intr', 5)} flex flex--v-center`}
            >
              <Dot dotColor="validation.red" />
              Fully booked
            </Space>
          )}

          {!isPast && event.times.length > 1 && (
            <p className={font('intb', 6)}>See all dates/times</p>
          )}

          {isPast && !event.availableOnline && (
            <div className={`${font('intr', 5)} flex flex--v-center`}>
              <Dot dotColor="neutral.500" />
              Past
            </div>
          )}
        </div>
      </CardBody>
      {event.series.length > 0 && (
        <CardPostBody>
          {event.series.map(series => (
            <p key={series.title} className={`${font('intb', 6)} no-margin`}>
              <span className={font('intr', 6)}>Part of</span> {series.title}
            </p>
          ))}
        </CardPostBody>
      )}
      {event.secondaryLabels.length > 0 && (
        <Space
          h={{ size: 'm', properties: ['padding-left', 'padding-right'] }}
          v={{ size: 'm', properties: ['padding-bottom'] }}
        >
          <Divider lineColor="white" />
          <Space v={{ size: 's', properties: ['padding-top'] }}>
            <LabelsList
              labels={event.secondaryLabels}
              defaultLabelColor="black"
            />
          </Space>
        </Space>
      )}
    </CardOuter>
  );
};

export default EventPromo;
