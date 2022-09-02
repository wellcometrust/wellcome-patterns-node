import { Moment } from 'moment';
import { london, formatDayDate } from '@weco/common/utils/format-date';
import {
  addDays,
  endOfDay,
  getNextWeekendDateRange,
  isDayPast,
  isFuture,
  isPast,
  startOfDay,
} from '@weco/common/utils/dates';
import { Event, EventBasic, HasTimes } from '../../types/events';
import { isNotUndefined } from '@weco/common/utils/array';

function getNextDateInFuture(event: HasTimes): Date | undefined {
  const futureTimes = event.times.filter(time =>
    isFuture(time.range.startDateTime)
  );

  if (futureTimes.length === 0) {
    return undefined;
  } else {
    return futureTimes.reduce((closestStartingDate, time) =>
      time.range.startDateTime <= closestStartingDate.range.startDateTime
        ? time
        : closestStartingDate
    ).range.startDateTime;
  }
}

function filterEventsByTimeRange(
  events: EventBasic[],
  start: Date,
  end: Date
): EventBasic[] {
  return events.filter(event => {
    return event.times.find(time => {
      const eventStart = time.range.startDateTime;
      const eventEnd = time.range.endDateTime;

      return (
        (start <= eventStart && eventStart <= end) ||
        (start <= eventEnd && eventEnd <= end) ||
        (eventStart <= start && end <= eventEnd)
      );
    });
  });
}

export function filterEventsForNext7Days(events: EventBasic[]): EventBasic[] {
  const startOfToday = startOfDay(new Date());
  const endOfNext7Days = endOfDay(addDays(new Date(), 7));

  return filterEventsByTimeRange(events, startOfToday, endOfNext7Days);
}

export function filterEventsForToday(events: EventBasic[]): EventBasic[] {
  const startOfToday = startOfDay(new Date());
  const endOfToday = endOfDay(new Date());

  return filterEventsByTimeRange(events, startOfToday, endOfToday);
}

export function filterEventsForWeekend(events: EventBasic[]): EventBasic[] {
  const { start, end } = getNextWeekendDateRange(new Date());
  return filterEventsByTimeRange(events, start, end);
}

export function orderEventsByNextAvailableDate<T extends HasTimes>(
  events: T[]
): T[] {
  return events
    .map(event => {
      const nextFutureDate = getNextDateInFuture(event);
      return isNotUndefined(nextFutureDate)
        ? { event, nextFutureDate }
        : undefined;
    })
    .filter(isNotUndefined)
    .sort((a, b) => a.nextFutureDate.valueOf() - b.nextFutureDate.valueOf())
    .map(({ event }) => event);
}

const GroupByFormat = {
  day: 'dddd',
  month: 'MMMM',
};
type GroupDatesBy = keyof typeof GroupByFormat;
type EventsGroup = {
  label: string;
  start: Date;
  end: Date;
  events: Event[];
};

export function groupEventsBy(
  events: Event[],
  groupBy: GroupDatesBy
): EventsGroup[] {
  // Get the full range of all the events
  const range = events
    .map(({ times }) =>
      times.map(time => ({
        start: time.range.startDateTime,
        end: time.range.endDateTime,
      }))
    )
    .reduce((acc, ranges) => acc.concat(ranges))
    .reduce((acc, range) => {
      return {
        start: range.start < acc.start ? range.start : acc.start,
        end: range.end > acc.end ? range.end : acc.end,
      };
    });

  // Convert the range into an array of labeled event groups
  const ranges: EventsGroup[] = getRanges(
    {
      start: london(range.start).startOf(groupBy),
      end: london(range.end).endOf(groupBy),
    },
    groupBy
  ).map(range => ({
    label: range.label,
    start: range.start.toDate(),
    end: range.end.toDate(),
    events: [],
  }));

  // See which events should go into which event group
  events.forEach(event => {
    const times = event.times
      .filter(time => time.range && time.range.startDateTime)
      .map(time => ({
        start: time.range.startDateTime,
        end: time.range.endDateTime,
      }));

    ranges.forEach(range => {
      const isInRange = times.find(time => {
        if (
          (time.start >= range.start && time.start <= range.end) ||
          (time.end >= range.start && time.end <= range.end)
        ) {
          return true;
        }
      });
      const newEvents = isInRange ? range.events.concat([event]) : range.events;
      range.events = newEvents;
    });
  }, {});

  // Remove times from event that fall outside the range of the current event group it is in
  const rangesWithFilteredTimes = ranges.map(range => {
    const start = range.start;
    const end = range.end;
    const events = range.events.map(event => {
      const timesInRange = event.times.filter(time => {
        return (
          time.range.startDateTime >= start && time.range.endDateTime <= end
        );
      });

      return {
        ...event,
        times: timesInRange,
      };
    });

    return {
      ...range,
      events,
    };
  });

  return rangesWithFilteredTimes;
}

type RangeProps = {
  start: Moment;
  end: Moment;
};

type Range = {
  label: string;
  start: Moment;
  end: Moment;
};

// TODO: maybe use a Map?
function getRanges(
  { start, end }: RangeProps,
  groupBy: GroupDatesBy,
  acc: Range[] = []
): Range[] {
  if (start.isBefore(end, groupBy) || start.isSame(end, groupBy)) {
    const newStart = start.clone().add(1, groupBy);
    const newAcc: Range[] = acc.concat([
      {
        label: formatDayDate(start),
        start: start.clone().startOf(groupBy),
        end: start.clone().endOf(groupBy),
      },
    ]);
    return getRanges({ start: newStart, end }, groupBy, newAcc);
  } else {
    return acc;
  }
}

export function isEventPast({ times }: Event): boolean {
  const hasFutureEvents = times.some(
    ({ range }) => !isDayPast(range.endDateTime)
  );
  return !hasFutureEvents;
}

export function upcomingDatesFullyBooked(event: Event | EventBasic): boolean {
  const upcoming =
    event.times.length > 0
      ? event.times.filter(({ range }) => !isPast(range.endDateTime))
      : [];
  if (upcoming.length > 0) {
    return upcoming.every(({ isFullyBooked }) => {
      return isFullyBooked;
    });
  } else {
    return false;
  }
}
