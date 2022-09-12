import { getMonthsInDateRange, groupEventsByMonth } from './group-event-utils';

describe('getMonthsInDateRange', () => {
  it('finds a single month', () => {
    const result = getMonthsInDateRange({
      start: new Date('2001-01-01'),
      end: new Date('2001-01-05'),
    });
    expect(result).toEqual([{ year: 2001, month: 'January' }]);
  });

  it('finds multiple months', () => {
    const result = getMonthsInDateRange({
      start: new Date('2001-01-01'),
      end: new Date('2001-03-06'),
    });
    expect(result).toEqual([
      { year: 2001, month: 'January' },
      { year: 2001, month: 'February' },
      { year: 2001, month: 'March' },
    ]);
  });

  it('finds months across a year boundary', () => {
    const result = getMonthsInDateRange({
      start: new Date('2001-12-01'),
      end: new Date('2002-02-07'),
    });
    expect(result).toEqual([
      { year: 2001, month: 'December' },
      { year: 2002, month: 'January' },
      { year: 2002, month: 'February' },
    ]);
  });
});

describe('groupEventsByMonth', () => {
  it('works', () => {
    // This is based on the state of the "What's on" page on 8 September 2022
    const evShockingTreatment = {
      times: [
        {
          range: {
            startDateTime: new Date('2022-10-08T16:30:00.000Z'),
            endDateTime: new Date('2022-10-08T17:30:00.000Z'),
          },
        },
      ],
      title: 'Shocking Treatment',
    };

    const evLifeWithoutAir = {
      times: [
        {
          range: {
            startDateTime: new Date('2022-10-06T18:00:00.000Z'),
            endDateTime: new Date('2022-10-06T19:00:00.000Z'),
          },
        },
      ],
      title: 'Life Without Air with Daisy Lafarge',
    };

    const evHivAndAids = {
      times: [
        {
          range: {
            startDateTime: new Date('2022-10-18T09:30:00.000Z'),
            endDateTime: new Date('2022-10-18T14:30:00.000Z'),
          },
        },
        {
          range: {
            startDateTime: new Date('2022-11-08T10:30:00.000Z'),
            endDateTime: new Date('2022-11-08T15:30:00.000Z'),
          },
        },
        {
          range: {
            startDateTime: new Date('2022-11-30T10:30:00.000Z'),
            endDateTime: new Date('2022-11-30T15:30:00.000Z'),
          },
        },
      ],
      title: 'HIV and AIDS',
    };

    const evLegacy = {
      times: [
        {
          range: {
            startDateTime: new Date('2022-10-06T18:00:00.000Z'),
            endDateTime: new Date('2022-10-06T18:30:00.000Z'),
          },
        },
      ],
      title: 'Legacy',
    };

    const evCovid19 = {
      times: [
        {
          range: {
            startDateTime: new Date('2022-09-28T18:00:00.000Z'),
            endDateTime: new Date('2022-09-28T19:30:00.000Z'),
          },
        },
      ],
      title: 'The Covid-19 Legacy',
    };

    const evThatStinks = {
      times: [
        {
          range: {
            startDateTime: new Date('2022-09-29T17:00:00.000Z'),
            endDateTime: new Date('2022-09-29T18:00:00.000Z'),
          },
        },
      ],
      title: 'That Stinks',
    };

    const evWanderingWomb = {
      times: [
        {
          range: {
            startDateTime: new Date('2022-09-17T10:00:00.000Z'),
            endDateTime: new Date('2022-09-17T11:00:00.000Z'),
          },
        },
        {
          range: {
            startDateTime: new Date('2022-09-17T12:00:00.000Z'),
            endDateTime: new Date('2022-09-17T13:00:00.000Z'),
          },
        },
      ],
      title: 'Wandering Womb',
    };

    const events = [
      evShockingTreatment,
      evLifeWithoutAir,
      evHivAndAids,
      evLegacy,
      evCovid19,
      evThatStinks,
      evWanderingWomb,
    ];

    const groupedEvents = groupEventsByMonth(events);

    expect(groupedEvents).toStrictEqual([
      {
        month: { month: 'September', year: 2022 },
        events: [evWanderingWomb, evCovid19, evThatStinks],
      },
      {
        month: { month: 'October', year: 2022 },
        events: [evLegacy, evLifeWithoutAir, evShockingTreatment, evHivAndAids],
      },
      {
        month: { month: 'November', year: 2022 },
        events: [evHivAndAids],
      },
    ]);
  });
});
