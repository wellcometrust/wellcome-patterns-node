import {
  Audience,
  DateTimeRange,
  EventTime,
  Event,
  EventBasic,
  Interpretation,
  Team,
  ThirdPartyBooking,
} from '../../../types/events';
import {
  Team as PrismicTeam,
  EventPrismicDocument,
  EventPolicy as EventPolicyPrismicDocument,
} from '../types/events';
import { isNotUndefined } from '@weco/common/utils/array';
import {
  GroupField,
  Query,
  RelationField,
  LinkField,
  KeyTextField,
} from '@prismicio/types';
import { isPast } from '@weco/common/utils/dates';
import {
  asText,
  asTitle,
  transformFormat,
  transformGenericFields,
  transformLabelType,
  transformSingleLevelGroup,
  transformTimestamp,
} from '.';
import { transformSeason } from './seasons';
import {
  transformEventSeries,
  transformEventSeriesToEventSeriesBasic,
} from './event-series';
import { transformPlace } from './places';
import isEmptyObj from '@weco/common/utils/is-empty-object';
import { LabelField } from '@weco/common/model/label-field';
import {
  InferDataInterface,
  isFilledLinkToWebField,
  isFilledLinkToDocumentWithData,
} from '@weco/common/services/prismic/types';
import { SeasonPrismicDocument } from '../types/seasons';
import { EventSeriesPrismicDocument } from '../types/event-series';
import { PlacePrismicDocument } from '../types/places';
import {
  transformContributors,
  transformContributorToContributorBasic,
} from './contributors';
import * as prismicH from '@prismicio/helpers';

function transformEventBookingType(
  eventDoc: EventPrismicDocument
): string | undefined {
  return !isEmptyObj(eventDoc.data.eventbriteEvent)
    ? 'Ticketed'
    : isFilledLinkToDocumentWithData(eventDoc.data.bookingEnquiryTeam)
    ? 'Enquire to book'
    : eventDoc.data.locations &&
      isNotUndefined(eventDoc.data.locations[0]) &&
      isFilledLinkToDocumentWithData(eventDoc.data.locations[0].location) &&
      eventDoc.data.locations[0].location.data.capacity
    ? 'First come, first served'
    : undefined;
}

export function getLastEndTime(times: EventTime[]): Date | undefined {
  return times.length > 0
    ? times
        .map(({ range: { endDateTime } }) => endDateTime)
        .reduce((a, b) => (a.valueOf() > b.valueOf() ? a : b))
    : undefined;
}

export function transformEventPolicyLabels(
  fragment: GroupField<{
    policy: RelationField<
      'event-policy',
      'en-gb',
      InferDataInterface<EventPolicyPrismicDocument>
    >;
  }>,
  labelKey: string
): LabelField[] {
  return fragment
    .map(label => label[labelKey])
    .filter(Boolean)
    .filter(label => label.isBroken === false)
    .filter(label => isFilledLinkToDocumentWithData(label))
    .map(label => transformLabelType(label));
}

export function getEventbriteId(url: string): string | undefined {
  const match = /\/e\/(.+)/.exec(url);

  return match?.[1];
}

function transformBookingEnquiryTeam(
  team: RelationField<'teams', 'en-gb', InferDataInterface<PrismicTeam>>
): Team | undefined {
  return isFilledLinkToDocumentWithData(team)
    ? {
        id: team.id,
        title: asText(team.data?.title) || '',
        email: team.data!.email!,
        phone: team.data!.phone!,
        url: team.data!.url!,
      }
    : undefined;
}

function transformThirdPartyBooking(
  thirdPartyUrl: LinkField,
  thirdPartyName: KeyTextField
): ThirdPartyBooking | undefined {
  return isFilledLinkToWebField(thirdPartyUrl)
    ? {
        name: thirdPartyName || undefined,
        url: thirdPartyUrl.url,
      }
    : undefined;
}

export function transformEvent(
  document: EventPrismicDocument,
  scheduleQuery?: Query<EventPrismicDocument>
): Event {
  const data = document.data;
  const scheduleLength = isFilledLinkToDocumentWithData(
    data.schedule.map(s => s.event)[0]
  )
    ? data.schedule.length
    : 0;
  const genericFields = transformGenericFields(document);
  const eventSchedule =
    scheduleQuery && scheduleQuery.results
      ? scheduleQuery.results.map(doc => transformEvent(doc))
      : [];
  const interpretations: Interpretation[] = data.interpretations
    .map(interpretation =>
      prismicH.isFilled.link(interpretation.interpretationType)
        ? {
            interpretationType: {
              id: interpretation.interpretationType.id,
              title: asTitle(
                interpretation.interpretationType.data?.title || []
              ),
              abbreviation: interpretation.interpretationType.data?.abbreviation
                ? asText(interpretation.interpretationType.data?.abbreviation)
                : undefined,
              description: interpretation.interpretationType.data?.description,
              primaryDescription:
                interpretation.interpretationType.data?.primaryDescription,
            },
            isPrimary: Boolean(interpretation.isPrimary),
            extraInformation: interpretation.extraInformation,
          }
        : undefined
    )
    .filter(isNotUndefined);

  const eventbriteId = data.eventbriteEvent?.embed_url
    ? getEventbriteId(data.eventbriteEvent.embed_url)
    : undefined;

  const audiences: Audience[] = data.audiences
    .map(audience =>
      prismicH.isFilled.link(audience.audience)
        ? {
            id: audience.audience.id,
            title: audience.audience.data?.title
              ? asTitle(audience.audience.data?.title)
              : '',
            description: audience.audience.data?.description,
          }
        : undefined
    )
    .filter(isNotUndefined);

  const bookingEnquiryTeam = transformBookingEnquiryTeam(
    data.bookingEnquiryTeam
  );

  const thirdPartyBooking = transformThirdPartyBooking(
    data.thirdPartyBookingUrl,
    data.thirdPartyBookingName
  );
  const series = transformSingleLevelGroup(data.series, 'series')
    .map(series => transformEventSeries(series as EventSeriesPrismicDocument))
    .map(transformEventSeriesToEventSeriesBasic);

  const seasons = transformSingleLevelGroup(data.seasons, 'season').map(
    season => transformSeason(season as SeasonPrismicDocument)
  );

  const times: EventTime[] = (data.times || [])
    .map(
      ({ startDateTime, endDateTime, isFullyBooked, onlineIsFullyBooked }) => {
        const range = {
          startDateTime: transformTimestamp(startDateTime),
          endDateTime: transformTimestamp(endDateTime),
        };

        if (
          range.startDateTime &&
          range.endDateTime &&
          range.startDateTime > range.endDateTime
        ) {
          console.warn(
            `Start time for event ${document.id} is after the end time; this is probably a bug in Prismic`
          );
        }

        return isNotUndefined(range.startDateTime) &&
          isNotUndefined(range.endDateTime)
          ? {
              range: range as DateTimeRange,
              isFullyBooked,
              onlineIsFullyBooked,
            }
          : undefined;
      }
    )
    .filter(isNotUndefined);

  const lastEndTime = getLastEndTime(times);
  const isRelaxedPerformance = data.isRelaxedPerformance === 'yes';
  const isOnline = data.isOnline;
  const availableOnline = data.availableOnline;
  const schedule = eventSchedule.map((event, i) => {
    const scheduleItem = data.schedule[i];
    return {
      event,
      isNotLinked: scheduleItem.isNotLinked === 'yes',
    };
  });

  const locations = transformSingleLevelGroup(data.locations, 'location').map(
    location => transformPlace(location as PlacePrismicDocument)
  );

  const contributors = transformContributors(document);
  const format = transformFormat(document);

  const formatLabel = format ? format.title : 'Event';
  const audiencesLabels = audiences.map(a => a.title);
  const interpretationsLabels = interpretations.map(
    i => i.interpretationType.title
  );
  const relaxedPerformanceLabel = isRelaxedPerformance ? ['Relaxed'] : [];

  const labels = [
    formatLabel,
    ...audiencesLabels,
    ...interpretationsLabels,
    ...relaxedPerformanceLabel,
  ].map(text => ({ text }));

  const primaryLabels = [
    formatLabel,
    ...audiencesLabels,
    ...relaxedPerformanceLabel,
  ].map(text => ({ text }));

  const secondaryLabels = [...interpretationsLabels].map(text => ({ text }));

  const onlineBookingEnquiryTeam = transformBookingEnquiryTeam(
    data.onlineBookingEnquiryTeam
  );

  const onlineEventbriteId = data.onlineEventbriteEvent?.embed_url
    ? getEventbriteId(data.onlineEventbriteEvent.embed_url)
    : undefined;

  const onlineThirdPartyBooking = transformThirdPartyBooking(
    data.onlineThirdPartyBookingUrl,
    data.onlineThirdPartyBookingName
  );

  const hasInVenueBooking =
    eventbriteId || thirdPartyBooking || bookingEnquiryTeam;
  const hasOnlineBooking =
    onlineEventbriteId || onlineThirdPartyBooking || onlineBookingEnquiryTeam;

  // We want to display the scheduleLength on EventPromos,
  // but don't want to make an extra API request to populate the schedule for every event in a list.
  // We therefore return the scheduleLength property.
  return {
    type: 'events',
    ...genericFields,
    locations,
    audiences,
    bookingEnquiryTeam,
    thirdPartyBooking,
    bookingInformation:
      data.bookingInformation && data.bookingInformation.length > 1
        ? data.bookingInformation
        : undefined,
    bookingType: transformEventBookingType(document),
    cost: data.cost || undefined,
    format,
    interpretations,
    policies: Array.isArray(data.policies)
      ? transformEventPolicyLabels(data.policies, 'policy')
      : [],
    hasEarlyRegistration: Boolean(data.hasEarlyRegistration),
    series,
    seasons,
    contributors,
    scheduleLength,
    schedule,
    eventbriteId,
    isCompletelySoldOut:
      data.times?.filter((time: EventTime) => {
        const onlyInVenueAndItsFullyBooked =
          !hasOnlineBooking && hasInVenueBooking && time.isFullyBooked;
        const onlyOnlineAndItsFullyBooked =
          !hasInVenueBooking && hasOnlineBooking && time.onlineIsFullyBooked;
        const bothInVenueAndOnlineAndFullyBooked =
          hasInVenueBooking &&
          time.isFullyBooked &&
          hasOnlineBooking &&
          time.onlineIsFullyBooked;
        return !(
          onlyInVenueAndItsFullyBooked ||
          onlyOnlineAndItsFullyBooked ||
          bothInVenueAndOnlineAndFullyBooked
        );
      }).length === 0,
    onlineSoldOut:
      data.times?.filter((time: EventTime) => {
        return !time.onlineIsFullyBooked;
      }).length === 0,
    inVenueSoldOut:
      data.times?.filter((time: EventTime) => {
        return !time.isFullyBooked;
      }).length === 0,
    ticketSalesStart: transformTimestamp(data.ticketSalesStart),
    times,
    isPast: lastEndTime ? isPast(lastEndTime) : true,
    isRelaxedPerformance,
    isOnline,
    availableOnline,
    labels,
    primaryLabels,
    secondaryLabels,
    onlineTicketSalesStart: transformTimestamp(data.ticketSalesStart),
    onlineBookingEnquiryTeam,
    onlineEventbriteId,
    onlineThirdPartyBooking,
    onlineBookingInformation:
      data.onlineBookingInformation?.length > 1
        ? data.onlineBookingInformation
        : undefined,
    onlinePolicies: Array.isArray(data.onlinePolicies)
      ? transformEventPolicyLabels(data.onlinePolicies, 'policy')
      : [],
    onlineHasEarlyRegistration: Boolean(data.hasEarlyRegistration),
    onlineCost: data.onlineCost || undefined,
  };
}

export function transformEventToEventBasic(event: Event): EventBasic {
  // returns what is required to render EventPromos and event JSON-LD
  return (({
    type,
    promo,
    id,
    times,
    image,
    isPast,
    primaryLabels,
    title,
    isOnline,
    locations,
    availableOnline,
    scheduleLength,
    series,
    secondaryLabels,
    cost,
    contributors,
  }) => ({
    type,
    promo,
    id,
    times,
    image,
    isPast,
    primaryLabels,
    title,
    isOnline,
    locations,
    availableOnline,
    scheduleLength,
    series,
    secondaryLabels,
    cost,
    contributors: contributors.map(transformContributorToContributorBasic),
  }))(event);
}

export const getScheduleIds = (
  eventDocument: EventPrismicDocument
): string[] => {
  return eventDocument.data.schedule
    .map(linkField =>
      prismicH.isFilled.link(linkField.event) ? linkField.event.id : undefined
    )
    .filter(isNotUndefined);
};
