import sortBy from 'lodash.sortby';
import { Moment } from 'moment';
import {
  london,
  formatDayDate,
  isDatePast,
} from '@weco/common/utils/format-date';
import { getNextWeekendDateRange } from '@weco/common/utils/dates';
import { Event, EventTime } from '../../types/events';

function getNextDateInFuture(event: Event): EventTime | undefined {
  const now = london();
  const futureTimes = event.times.filter(time => {
    const end = london(time.range.endDateTime);
    return end.isSameOrAfter(now, 'day');
  });

  if (futureTimes.length === 0) {
    return undefined;
  } else {
    return futureTimes.reduce((closestStartingDate, time) => {
      const start = london(time.range.startDateTime);
      if (start.isBefore(closestStartingDate.range.startDateTime)) {
        return time;
      } else {
        return closestStartingDate;
      }
    });
  }
}

function filterEventsByTimeRange(
  events: Event[],
  start: Moment,
  end: Moment
): Event[] {
  return events.filter(event => {
    return event.times.find(time => {
      const eventStart = london(time.range.startDateTime);
      const eventEnd = london(time.range.endDateTime);
      return (
        eventStart.isBetween(start, end) ||
        eventEnd.isBetween(start, end) ||
        (eventStart.isSameOrBefore(start) && eventEnd.isSameOrAfter(end))
      );
    });
  });
}

export function filterEventsForNext7Days(events: Event[]): Event[] {
  const startOfToday = london().startOf('day');
  const endOfNext7Days = startOfToday.clone().add(7, 'day').endOf('day');
  return filterEventsByTimeRange(events, startOfToday, endOfNext7Days);
}

export function filterEventsForToday(events: Event[]): Event[] {
  const startOfToday = london().startOf('day');
  const endOfToday = london().endOf('day');
  return filterEventsByTimeRange(events, startOfToday, endOfToday);
}

export function filterEventsForWeekend(events: Event[]): Event[] {
  const { start, end } = getNextWeekendDateRange(new Date());
  return filterEventsByTimeRange(events, london(start), london(end));
}

export function orderEventsByNextAvailableDate(events: Event[]): Event[] {
  const reorderedEvents = sortBy(
    [...events].filter(getNextDateInFuture),
    getNextDateInFuture
  );

  return reorderedEvents;
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
    ({ range }) => !isDatePast(range.endDateTime)
  );
  return !hasFutureEvents;
}
