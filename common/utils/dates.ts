import { DateRange } from '../model/date-range';
import { formatDayDate } from './format-date';

// This is to allow us to mock values in tests
//
//    import * as dateUtils from '@weco/common/utils/dates';
//
//    const spyOnToday = jest.spyOn(dateUtils, 'today');
//    spyOnToday.mockImplementation(() => {
//      return new Date('2021-11-30');
//    });
//
export function today(): Date {
  return new Date();
}

export function getEarliestFutureDateRange(
  dateRanges: DateRange[],
  fromDate: Date | undefined = new Date()
): DateRange | undefined {
  const now = new Date();

  return dateRanges
    .sort((a, b) => (a.start > b.start ? 1 : -1))
    .find(
      ({ end }) =>
        (isSameDay(end, fromDate) || end > fromDate) &&
        (isSameDay(end, now) || end > now)
    );
}

export function isPast(date: Date): boolean {
  const now = new Date();
  return date < now;
}

export function isFuture(date: Date): boolean {
  const now = new Date();
  return date > now;
}

export function isSameMonth(date1: Date, date2: Date): boolean {
  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth()
  );
}

type ComparisonMode = 'UTC' | 'London';

/** Returns true if `date1` is on the same day as `date2`, false otherwise.
 *
 * Note: this function supports UTC or London comparisons.  We suspect we always
 * want London comparisons -- uses of this function should be examined and tested
 * to decide the correct behaviour, and updated as necessary.
 *
 * If we get to a point where every comparison uses London, we should delete the
 * mode argument and document that requirement explicitly.
 */
export function isSameDay(
  date1: Date,
  date2: Date,
  mode: ComparisonMode = 'UTC'
): boolean {
  if (mode === 'UTC') {
    return (
      isSameMonth(date1, date2) && date1.getUTCDate() === date2.getUTCDate()
    );
  } else {
    return formatDayDate(date1) === formatDayDate(date2);
  }
}

/** Returns true if `date1` is on the same day or before `date2`,
 * false otherwise.
 *
 * This compares the dates in London, not UTC.  See the tests for examples
 * of edge cases where there are different UTC days but this function still
 * returns true.
 *
 * Note: the order of arguments to this function is designed so you can
 * concatenate them and get sensible-looking results.
 *
 *    isSameDayOrBefore(A, B) && isSameDayOrBefore(B, C)
 *      => isSameDayOrBefore(A, C)
 *
 * (The fancy term is "transitive".)
 *
 */
export function isSameDayOrBefore(date1: Date, date2: Date): boolean {
  return isSameDay(date1, date2, 'London') || date1 <= date2;
}

// Returns true if 'date' falls on a past day; false otherwise.
export function isDayPast(date: Date): boolean {
  const now = new Date();
  if (isSameDay(date, now) || date > now) {
    return false;
  } else {
    return true;
  }
}

// Returns the day before the current date
export function dayBefore(date: Date): Date {
  const prevDay = new Date(date);
  prevDay.setDate(date.getDate() - 1);
  return prevDay;
}

// TODO: Does setting these to UTC 00:00:00 cause issues in London?
export function startOfDay(d: Date): Date {
  const res = new Date(d);
  res.setUTCHours(0, 0, 0, 0);
  return res;
}

export function endOfDay(d: Date): Date {
  const res = new Date(d);
  res.setUTCHours(23, 59, 59, 999);
  return res;
}

export function addDays(d: Date, days: number): Date {
  const res = new Date(d);
  res.setDate(res.getDate() + days);
  return res;
}

/** Finds the start and end of the week.
 *
 * For the purposes of these two functions, weeks start on a Sunday.
 *
 */
export function startOfWeek(d: Date): Date {
  return addDays(d, -d.getDay());
}

export function endOfWeek(d: Date): Date {
  return addDays(d, 6 - d.getDay());
}

/** Returns a loose range of Friday–Sunday for the next weekend after the
 * given date, possibly including it.
 *
 * Note: including Friday seems like a slightly odd choice, but it's the way
 * this function was originally written. ¯\_ (ツ)_/¯
 */
export function getNextWeekendDateRange(date: Date): DateRange {
  const dayInteger = date.getDay(); // getDay() return Sun as 0, Sat as 6
  const todayIsSunday = dayInteger === 0;

  const start = todayIsSunday
    ? addDays(date, -2)
    : addDays(date, 5 - dayInteger);
  const end = addDays(start, 2);

  return {
    start: startOfDay(start),
    end: endOfDay(end),
  };
}

/** Returns an array containing all the dates between `start` and `end`.
 *
 * e.g. getDatesBetween({ start: new Date(2001-01-01), end: new Date(2001-01-04) })
 *          => [2001-01-01, 2001-01-02, 2001-01-03, 2001-04-01]
 *
 */
export function getDatesBetween({
  start,
  end,
}: {
  start: Date;
  end: Date;
}): Date[] {
  const dateArray: Date[] = [];
  let currentDate = start;
  while (currentDate <= end) {
    dateArray.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }
  return dateArray;
}

export function countDaysBetween(a: Date, b: Date): number {
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  return Math.floor((a.valueOf() - b.valueOf()) / millisecondsInDay);
}
