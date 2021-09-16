// @flow
import dayjs from 'dayjs';
import { Predicates } from 'prismic-javascript';
// $FlowFixMe (ts)
import { getNextWeekendDateRange, londonDjs } from '../../utils/dates';
import type { Period } from '../../model/periods';

export function getPeriodPredicates(
  period: ?Period,
  startField: string,
  endField: string
): Predicates[] {
  const now = londonDjs(new Date());
  const startOfDay = dayjs().startOf('day');
  const endOfDay = dayjs().endOf('day');
  const weekendDateRange = getNextWeekendDateRange(now);
  const predicates =
    period === 'coming-up'
      ? [Predicates.dateAfter(startField, endOfDay.toDate())]
      : period === 'current-and-coming-up'
      ? [Predicates.dateAfter(endField, startOfDay.toDate())]
      : period === 'past'
      ? [Predicates.dateBefore(endField, startOfDay.toDate())]
      : period === 'today'
      ? [
          Predicates.dateBefore(startField, endOfDay.toDate()),
          Predicates.dateAfter(endField, startOfDay.toDate()),
        ]
      : period === 'this-weekend'
      ? [
          Predicates.dateBefore(startField, weekendDateRange.end),
          Predicates.dateAfter(endField, weekendDateRange.start),
        ]
      : period === 'this-week'
      ? [
          Predicates.dateBefore(startField, now.endOf('week').toDate()),
          Predicates.dateAfter(startField, now.startOf('week').toDate()),
        ]
      : period === 'next-seven-days'
      ? [
          Predicates.dateBefore(
            startField,
            now.add(6, 'days').endOf('day').toDate()
          ),
          Predicates.dateAfter(endField, startOfDay.toDate()),
        ]
      : [];

  return predicates;
}
