import {
  Audience,
  DateRange,
  DateTimeRange,
  EventTime,
  Interpretation,
  Team,
  ThirdPartyBooking,
} from '@weco/common/model/events';
import { Event } from '../../../types/events';
import {
  EventPrismicDocument,
  EventPolicy as EventPolicyPrismicDocument,
} from '../types/events';
import { link } from './vendored-helpers';
import { isNotUndefined } from '@weco/common/utils/array';
import { GroupField, Query, RelationField } from '@prismicio/types';
import {
  asText,
  parseLabelType,
  parseSingleLevelGroup,
  parseTitle,
} from '@weco/common/services/prismic/parsers';
import { isPast } from '@weco/common/utils/dates';
import { transformFormat, transformGenericFields, transformTimestamp } from '.';
import { HTMLString } from '@weco/common/services/prismic/types';
import { transformSeason } from './seasons';
import { transformEventSeries } from './event-series';
import { transformPlace } from './places';
import isEmptyObj from '@weco/common/utils/is-empty-object';
import { london } from '@weco/common/utils/format-date';
import { LabelField } from '@weco/common/model/label-field';
import {
  InferDataInterface,
  isFilledLinkToDocumentWithData,
  isFilledLinkToWebField,
} from '../types';

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

function determineDateRange(times: EventTime[]): DateRange {
  const firstDate = times
    .map(({ range: { startDateTime } }) => london(startDateTime))
    .reduce((a, b) => (a.isBefore(b, 'day') ? a : b))
    .toDate();

  const lastDate = times
    .map(({ range: { endDateTime } }) => london(endDateTime))
    .reduce((a, b) => (a.isAfter(b, 'day') ? a : b))
    .toDate();

  return {
    firstDate,
    lastDate,
    repeats: times.length,
  };
}

function determineDisplayTime(times: EventTime[]): EventTime {
  const upcomingDates = times.filter(t => {
    return london(t.range.startDateTime).isSameOrAfter(london(), 'day');
  });
  return upcomingDates.length > 0 ? upcomingDates[0] : times[0];
}

export function getLastEndTime(times: EventTime[]) {
  return times
    .map(({ range: { endDateTime } }) => london(endDateTime))
    .reduce((a, b) => (a.isAfter(b, 'day') ? a : b));
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
    .map(label => parseLabelType(label));
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
      link(interpretation.interpretationType)
        ? {
            interpretationType: {
              id: interpretation.interpretationType.id,
              title: parseTitle(interpretation.interpretationType.data?.title),
              abbreviation: asText(
                interpretation.interpretationType.data?.abbreviation
              ),
              description: interpretation.interpretationType.data
                ?.description as HTMLString,
              primaryDescription: interpretation.interpretationType.data
                ?.primaryDescription as HTMLString,
            },
            isPrimary: Boolean(interpretation.isPrimary),
            extraInformation: interpretation.extraInformation as HTMLString,
          }
        : undefined
    )
    .filter(isNotUndefined);

  const matchedId =
    data.eventbriteEvent && data.eventbriteEvent.url
      ? /\/e\/([0-9]+)/.exec(data.eventbriteEvent.url)
      : null;
  const eventbriteId =
    data.eventbriteEvent && matchedId !== null ? matchedId[1] : '';

  const audiences: Audience[] = data.audiences
    .map(audience =>
      link(audience.audience)
        ? {
            id: audience.audience.id,
            title: asText(audience.audience.data?.title),
            description: audience.audience.data?.description as
              | HTMLString
              | undefined,
          }
        : undefined
    )
    .filter(isNotUndefined);

  const bookingEnquiryTeam: Team | undefined = isFilledLinkToDocumentWithData(
    data.bookingEnquiryTeam
  )
    ? {
        id: data.bookingEnquiryTeam.id,
        title: asText(data.bookingEnquiryTeam.data?.title) || '',
        email: data.bookingEnquiryTeam.data!.email!,
        phone: data.bookingEnquiryTeam.data!.phone!,
        url: data.bookingEnquiryTeam.data!.url!,
      }
    : undefined;

  const thirdPartyBooking: ThirdPartyBooking | undefined =
    isFilledLinkToWebField(data.thirdPartyBookingUrl)
      ? {
          name: data.thirdPartyBookingName || undefined,
          url: data.thirdPartyBookingUrl.url!,
        }
      : undefined;

  const series = parseSingleLevelGroup(data.series, 'series').map(series => {
    return transformEventSeries(series);
  });

  const seasons = parseSingleLevelGroup(data.seasons, 'season').map(season => {
    return transformSeason(season);
  });

  const times: EventTime[] = (data.times || [])
    .map(({ startDateTime, endDateTime, isFullyBooked }) => {
      const range = {
        startDateTime: transformTimestamp(startDateTime),
        endDateTime: transformTimestamp(endDateTime),
      };

      return isNotUndefined(range.startDateTime) && isNotUndefined(range.endDateTime)
        ? {
          range: range as DateTimeRange,
          isFullyBooked
        }
        : undefined;
    })
    .filter(isNotUndefined);

  const displayTime = determineDisplayTime(times);
  const lastEndTime = getLastEndTime(times);
  const isRelaxedPerformance = data.isRelaxedPerformance;
  const isOnline = data.isOnline;
  const availableOnline = data.availableOnline;
  const schedule = eventSchedule.map((event, i) => {
    const scheduleItem = data.schedule[i];
    return {
      event,
      isNotLinked: scheduleItem.isNotLinked === 'yes',
    };
  });

  const locations = parseSingleLevelGroup(data.locations, 'location').map(
    location => transformPlace(location)
  );

  // We want to display the scheduleLength on EventPromos,
  // but don't want to make an extra API request to populate the schedule for every event in a list.
  // We therefore return the scheduleLength property.
  const event = {
    ...genericFields,
    // place,
    locations,
    audiences,
    bookingEnquiryTeam,
    thirdPartyBooking,
    bookingInformation:
      data.bookingInformation && data.bookingInformation.length > 1
        ? (data.bookingInformation as HTMLString)
        : undefined,
    bookingType: transformEventBookingType(document),
    cost: data.cost || undefined,
    format: transformFormat(document),
    interpretations,
    policies: Array.isArray(data.policies)
      ? transformEventPolicyLabels(data.policies, 'policy')
      : [],
    hasEarlyRegistration: Boolean(data.hasEarlyRegistration),
    series,
    seasons,
    scheduleLength,
    schedule,
    backgroundTexture:
      link(data.backgroundTexture) && data.backgroundTexture.data?.image.url
        ? data.backgroundTexture.data.image.url
        : undefined,
    eventbriteId,
    isCompletelySoldOut:
      data.times && data.times.filter(time => !time.isFullyBooked).length === 0,
    ticketSalesStart: transformTimestamp(data.ticketSalesStart),
    times,
    displayStart: (displayTime && displayTime.range.startDateTime) || null,
    displayEnd: (displayTime && displayTime.range.endDateTime) || null,
    dateRange: determineDateRange(times),
    isPast: lastEndTime ? isPast(lastEndTime) : true,
    isRelaxedPerformance: isRelaxedPerformance === 'yes',
    isOnline,
    availableOnline,
    prismicDocument: document,
  };

  const eventFormat = event.format
    ? [
        {
          text: event.format.title,
        },
      ]
    : [{ text: 'Event' }];
  const eventAudiences = event.audiences
    ? event.audiences.map(a => ({
        text: a.title,
      }))
    : [];
  const eventInterpretations = event.interpretations
    ? event.interpretations.map(i => ({
        text: i.interpretationType.title,
      }))
    : [];
  const relaxedPerformanceLabel = event.isRelaxedPerformance
    ? [
        {
          text: 'Relaxed',
        },
      ]
    : [];

  const labels = [
    ...eventFormat,
    ...eventAudiences,
    ...eventInterpretations,
    ...relaxedPerformanceLabel,
  ];

  const primaryLabels = [
    ...eventFormat,
    ...eventAudiences,
    ...relaxedPerformanceLabel,
  ];
  const secondaryLabels = [...eventInterpretations];

  return { ...event, type: 'events', labels, primaryLabels, secondaryLabels };
}

export const getScheduleIds = (
  eventDocument: EventPrismicDocument
): string[] => {
  return eventDocument.data.schedule
    .map(linkField => (link(linkField.event) ? linkField.event.id : undefined))
    .filter(isNotUndefined);
};
