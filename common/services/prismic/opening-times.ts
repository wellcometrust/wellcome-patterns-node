import { formatDay, london } from '../../utils/format-date';
import groupBy from 'lodash.groupby';
import {
  OverrideType,
  ExceptionalPeriod,
  OverrideDate,
  Venue,
  OpeningHoursDay,
  ExceptionalOpeningHoursDay,
} from '../../model/opening-hours';
import { isNotUndefined } from '../../utils/array';
import {
  addDays,
  dayBefore,
  endOfDay,
  isSameDay,
  startOfDay,
  today,
} from '../../utils/dates';

export function exceptionalOpeningDates(venues: Venue[]): OverrideDate[] {
  return venues
    .flatMap(venue =>
      venue.openingHours.exceptional
        ? venue.openingHours.exceptional.map(exceptionalDate => ({
            overrideDate: exceptionalDate.overrideDate,
            overrideType: exceptionalDate.overrideType,
          }))
        : []
    )
    .filter(override => Boolean(override && override.overrideDate))
    .sort((a, b) => Number(a && a.overrideDate) - Number(b && b.overrideDate))
    .filter((item, i, array) => {
      const firstDate = item && item.overrideDate;
      const lastItem = array && array[i - 1];
      const prevDate = lastItem && lastItem.overrideDate;
      if (!i) {
        return true;
      } else if (firstDate && prevDate) {
        return !isSameDay(firstDate, prevDate);
      }
    });
}

export function exceptionalOpeningPeriods(
  dates: OverrideDate[]
): ExceptionalPeriod[] {
  dates.sort((a, b) => Number(a.overrideDate) - Number(b.overrideDate));

  const exceptionalPeriods = Object.values(
    groupBy(dates, date => date.overrideType)
  ).flat();

  let groupedIndex = 0;
  return exceptionalPeriods
    .reduce((acc, date, i, array) => {
      const previousDate = array[i - 1]?.overrideDate
        ? array[i - 1].overrideDate
        : null;
      if (!previousDate) {
        acc[groupedIndex] = {
          type: date.overrideType,
          dates: [date.overrideDate],
        };
      } else if (
        previousDate &&
        date.overrideDate &&
        date.overrideDate < addDays(previousDate, 6) &&
        date.overrideType === acc[groupedIndex].type
      ) {
        acc[groupedIndex].dates.push(date.overrideDate);
      } else {
        groupedIndex++;
        acc[groupedIndex] = {
          type: date.overrideType,
          dates: [date.overrideDate],
        };
      }
      return acc;
    }, [] as ExceptionalPeriod[])
    .sort((a, b) => {
      // order groups by their earliest date
      return a.dates[0] < b.dates[0] ? -1 : 1;
    });
}

export function exceptionalOpeningPeriodsAllDates(
  exceptionalOpeningPeriods: ExceptionalPeriod[]
): ExceptionalPeriod[] {
  return exceptionalOpeningPeriods.map(period => {
    const startDate = period.dates[0];
    const lastDate = period.dates[period.dates.length - 1];

    const arrayLength = london(lastDate).diff(startDate, 'days') + 1;
    const completeDateArray = [...Array(arrayLength).keys()].map(i =>
      addDays(startDate, i)
    );

    return {
      type: period.type,
      dates: completeDateArray,
    };
  });
}

export function getExceptionalVenueDays(
  venue: Venue
): ExceptionalOpeningHoursDay[] {
  return (venue.openingHours && venue.openingHours.exceptional) || [];
}

export function groupExceptionalVenueDays(
  exceptionalDays: ExceptionalOpeningHoursDay[]
): ExceptionalOpeningHoursDay[][] {
  return exceptionalDays.length > 0
    ? exceptionalDays
        .sort(
          (a, b) =>
            (a.overrideDate &&
              london(a.overrideDate).diff(b.overrideDate, 'days')) ??
            0
        )
        .reduce(
          (acc, date) => {
            const group = acc[acc.length - 1];
            if (
              ((date.overrideDate &&
                london(date.overrideDate).diff(
                  (group[0] && group[0].overrideDate) || date.overrideDate,
                  'days'
                )) ??
                0) > 14
            ) {
              acc.push([date]);
            } else {
              group.push(date);
            }
            return acc;
          },
          [[]] as ExceptionalOpeningHoursDay[][]
        )
    : [];
}

export function exceptionalFromRegular(
  venue: Venue,
  dateToGet: Date,
  type: OverrideType
): ExceptionalOpeningHoursDay {
  const currentDay = formatDay(dateToGet);
  const regular = venue.openingHours.regular.find(
    hours => hours.dayOfWeek === currentDay
  );

  return {
    overrideDate: dateToGet,
    overrideType: type,
    opens: regular?.opens || '00:00',
    closes: regular?.closes || '00:00',
    isClosed:
      regular?.isClosed ||
      (regular?.opens === '00:00' && regular?.closes === '00:00'),
  };
}

export function backfillExceptionalVenueDays(
  venue: Venue,
  allVenueExceptionalPeriods?: ExceptionalPeriod[]
): ExceptionalOpeningHoursDay[][] {
  const groupedExceptionalDays = groupExceptionalVenueDays(
    getExceptionalVenueDays(venue)
  );
  return (allVenueExceptionalPeriods ?? []).map(period => {
    const sortedDates = period.dates.sort((a, b) => london(a).diff(b, 'days'));
    const type = period.type || 'other';
    const days = sortedDates
      .map(date => {
        const matchingVenueGroup = groupedExceptionalDays.find(group =>
          group.find(
            day => day.overrideDate && isSameDay(day.overrideDate, date)
          )
        );
        const matchingDay = matchingVenueGroup?.find(
          day => day.overrideDate && isSameDay(day.overrideDate, date)
        );
        const backfillDay = exceptionalFromRegular(venue, date, type);
        if (type === 'other') {
          // We don't backfill if its type is other - see https://github.com/wellcomecollection/wellcomecollection.org/pull/4437
          return matchingDay;
        } else {
          return matchingDay || backfillDay;
        }
      })
      .filter(isNotUndefined);
    return days;
  });
}

export function groupConsecutiveExceptionalDays(
  dates: ExceptionalOpeningHoursDay[]
): ExceptionalOpeningHoursDay[][] {
  return dates
    .sort((a, b) => (a.overrideDate > b.overrideDate ? 1 : -1))
    .reduce((acc, date) => {
      const group = acc[acc.length - 1];
      const lastDayOfGroup = group && group[group.length - 1]?.overrideDate;

      if (
        lastDayOfGroup &&
        isSameDay(dayBefore(date.overrideDate), lastDayOfGroup)
      ) {
        group.push(date);
      } else {
        acc.push([date]);
      }

      return acc;
    }, [] as ExceptionalOpeningHoursDay[][]);
}

export function getUpcomingExceptionalPeriods(
  exceptionalPeriods: ExceptionalOpeningHoursDay[][]
): ExceptionalOpeningHoursDay[][] {
  const startOfToday = startOfDay(today());
  const upcomingUntil = endOfDay(addDays(today(), 28));

  const nextUpcomingPeriods = exceptionalPeriods.filter(period => {
    const upcomingPeriod = period.find(
      d => startOfToday <= d.overrideDate && d.overrideDate <= upcomingUntil
    );
    return upcomingPeriod || false;
  });
  return nextUpcomingPeriods;
}

export function getVenueById(venues: Venue[], id: string): Venue | undefined {
  const venue = venues.find(venue => venue.id === id);
  return venue;
}

export function getTodaysVenueHours(
  venue: Venue
): ExceptionalOpeningHoursDay | OpeningHoursDay | undefined {
  const todaysDate = today();
  const todayString = formatDay(todaysDate);
  const exceptionalOpeningHours =
    venue.openingHours.exceptional &&
    venue.openingHours.exceptional.find(i =>
      isSameDay(todaysDate, i.overrideDate)
    );
  const regularOpeningHours =
    venue.openingHours.regular &&
    venue.openingHours.regular.find(i => i.dayOfWeek === todayString);
  return exceptionalOpeningHours || regularOpeningHours;
}
