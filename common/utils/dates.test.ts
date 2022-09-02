import each from 'jest-each';
import {
  dayBefore,
  endOfWeek,
  isFuture,
  isPast,
  isSameDay,
  isSameMonth,
  startOfWeek,
} from './dates';
import { london } from './format-date';

it('identifies dates in the past', () => {
  expect(isPast(new Date(2001, 1, 1, 1, 1, 1, 999))).toEqual(true);
});

it('identifies dates in the future', () => {
  expect(isFuture(new Date(3000, 1, 1, 1, 1, 1, 1))).toEqual(true);
});

describe('isSameDay', () => {
  it('says a day is the same as itself', () => {
    const day = new Date(2001, 1, 1, 1, 1, 1);
    const result = isSameDay(day, day);

    expect(result).toEqual(true);
  });

  it('says two times on the same day are the same', () => {
    const result = isSameDay(
      new Date(2001, 1, 1, 1, 1, 1),
      new Date(2001, 1, 1, 13, 24, 37)
    );

    expect(result).toEqual(true);
  });

  each([
    // same day of the week as returned by Date.getDay()
    [new Date(2001, 2, 3, 1, 1, 1), new Date(2001, 2, 10, 1, 1, 1)],

    // same year/month, different day
    [new Date(2001, 2, 3, 1, 1, 1), new Date(2001, 2, 10, 1, 1, 1)],

    // same year/day, different month
    [new Date(2001, 2, 3, 1, 1, 1), new Date(2001, 10, 3, 1, 1, 1)],

    // same month/day, different year
    [new Date(2001, 2, 3, 1, 1, 1), new Date(2022, 2, 3, 1, 1, 1)],

    // completely different days
    [new Date(2001, 2, 3, 1, 1, 1), new Date(2022, 5, 7, 19, 11, 13)],
  ]).test('identifies %s and %s as different', (a, b) => {
    const result = isSameDay(a, b);
    expect(result).toEqual(false);
  });
});

describe('isSameMonth', () => {
  it('says a day is the same as itself', () => {
    const day = new Date(2001, 1, 1, 1, 1, 1);
    const result = isSameMonth(day, day);

    expect(result).toEqual(true);
  });

  it('says two times on the same day are the same', () => {
    const result = isSameMonth(
      new Date(2001, 1, 1, 1, 1, 1),
      new Date(2001, 1, 1, 13, 24, 37)
    );

    expect(result).toEqual(true);
  });

  it('says two days in the same month are the same', () => {
    const result = isSameMonth(
      new Date(2001, 1, 1, 1, 1, 1),
      new Date(2001, 1, 13, 4, 21, 53)
    );

    expect(result).toEqual(true);
  });

  each([
    // same year/day, different month
    [new Date(2001, 2, 1, 1, 1, 1), new Date(2001, 3, 1, 1, 1, 1)],

    // same month of year, different year
    [new Date(2001, 2, 1, 1, 1, 1), new Date(2005, 2, 1, 1, 1, 1)],

    // completely different months
    [new Date(2001, 2, 3, 1, 1, 1), new Date(2022, 5, 7, 19, 11, 13)],
  ]).test('identifies %s and %s as different', (a, b) => {
    const result = isSameMonth(a, b);
    expect(result).toEqual(false);
  });
});

describe('dayBefore', () => {
  test.each([
    { day: new Date('2022-09-02'), prevDay: new Date('2022-09-01') },
    { day: new Date('2022-09-01'), prevDay: new Date('2022-08-31') },
    { day: new Date('2022-01-01'), prevDay: new Date('2021-12-31') },
  ])('the day before $day is $prevDay', ({ day, prevDay }) => {
    expect(dayBefore(day)).toStrictEqual(prevDay);
  });
});

describe('startOfWeek', () => {
  test.each([
    { day: new Date('2022-09-02'), expectedStart: new Date('2022-08-28') },
    { day: new Date('2022-09-01'), expectedStart: new Date('2022-08-28') },
    { day: new Date('2022-08-28'), expectedStart: new Date('2022-08-28') },
  ])(
    'the start of the week containing $day is $expectedStart',
    ({ day, expectedStart }) => {
      expect(startOfWeek(day)).toStrictEqual(expectedStart);
      console.log(
        `${startOfWeek(day)}, ${london(day).startOf('week').toDate()}`
      );
      expect(
        isSameDay(startOfWeek(day), london(day).startOf('week').toDate())
      ).toBeTruthy();
    }
  );
});

describe('endOfWeek', () => {
  test.each([
    { day: new Date('2022-09-02'), expectedStart: new Date('2022-09-03') },
    { day: new Date('2022-09-01'), expectedStart: new Date('2022-09-03') },
    { day: new Date('2022-08-27'), expectedStart: new Date('2022-08-27') },
  ])(
    'the start of the week containing $day is $expectedStart',
    ({ day, expectedStart }) => {
      expect(endOfWeek(day)).toStrictEqual(expectedStart);
      expect(
        isSameDay(endOfWeek(day), london(day).endOf('week').toDate())
      ).toBeTruthy();
    }
  );
});
