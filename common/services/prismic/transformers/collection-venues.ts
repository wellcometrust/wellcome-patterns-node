import {
  ResultsLite,
  CollectionVenuePrismicDocumentLite,
} from '../../../server-data/prismic';
import { formatTime } from '../../../utils/format-date';
import { Day, Venue, OpeningHoursDay } from '../../../model/opening-hours';
import {
  CollectionVenuePrismicDocument,
  ModifiedDayOpeningTime,
} from '../documents';
import { isNotUndefined } from '../../../utils/array';
import * as prismicH from '@prismicio/helpers';
import { transformImage } from './images';

function createRegularDay(
  day: Day,
  venue: CollectionVenuePrismicDocument | CollectionVenuePrismicDocumentLite
): OpeningHoursDay {
  const { data } = venue;
  const lowercaseDay = day.toLowerCase();
  const start = data && data[lowercaseDay][0].startDateTime;
  const end = data && data[lowercaseDay][0].endDateTime;
  const isClosed = !start;
  // If there is no start time from prismic, then we set both opens and closes to 00:00.
  // This is necessary for the json-ld schema data, so Google knows when the venues are closed.
  // See https://developers.google.com/search/docs/advanced/structured-data/local-business#business-hours (All-day hours tab)
  // "To show a business is closed all day, set both opens and closes properties to '00:00'""
  return {
    dayOfWeek: day,
    opens: start ? formatTime(start) : '00:00',
    closes: start && end ? formatTime(end) : '00:00',
    isClosed,
  };
}

export function transformCollectionVenue(
  venue: CollectionVenuePrismicDocument | CollectionVenuePrismicDocumentLite
): Venue {
  const data = venue.data;
  const exceptionalOpeningHours = data.modifiedDayOpeningTimes
    ? data.modifiedDayOpeningTimes
        .filter((modified: ModifiedDayOpeningTime) => modified.overrideDate)
        .map(modified => {
          const start = modified.startDateTime;
          const end = modified.endDateTime;
          const isClosed = !start;
          const overrideDate =
            modified.overrideDate && new Date(modified.overrideDate);
          const overrideType = modified.type ?? 'other';
          if (overrideDate) {
            return {
              overrideDate,
              overrideType,
              // If there is no start time from prismic, then we set both opens and closes to 00:00.
              // This is necessary for the json-ld schema data, so Google knows when the venues are closed.
              // See https://developers.google.com/search/docs/advanced/structured-data/local-business#business-hours (All-day hours tab)
              // "To show a business is closed all day, set both opens and closes properties to '00:00'""
              opens: start ? formatTime(start) : '00:00',
              closes: start && end ? formatTime(end) : '00:00',
              isClosed,
            };
          }
        })
    : [];

  return {
    id: venue.id,
    order: data.order ?? undefined,
    name: data.title ?? '',
    openingHours: {
      regular: [
        createRegularDay('Monday', venue),
        createRegularDay('Tuesday', venue),
        createRegularDay('Wednesday', venue),
        createRegularDay('Thursday', venue),
        createRegularDay('Friday', venue),
        createRegularDay('Saturday', venue),
        createRegularDay('Sunday', venue),
      ],
      exceptional: exceptionalOpeningHours.filter(isNotUndefined),
    },
    image: 'image' in data ? transformImage(data.image) : undefined,
    url: 'link' in data && 'url' in data.link ? data.link.url : undefined,
    linkText: 'linkText' in data ? prismicH.asText(data.linkText) : undefined,
  };
}

export function transformCollectionVenues(doc: ResultsLite): Venue[] {
  const venues = doc.results.map(venue => transformCollectionVenue(venue));

  return venues.sort((a, b) => {
    return Number(a.order) - Number(b.order);
  });
}
