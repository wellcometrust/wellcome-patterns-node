import {
  determineNextAvailableDate,
  convertOpeningHoursDayToDayNumber,
  extendEndDate,
  findClosedDays,
} from '@weco/catalogue/utils/dates';
import {
  DayNumber,
  ExceptionalOpeningHoursDay,
} from '@weco/common/model/opening-hours';
import { usePrismicData } from '@weco/common/server-data/Context';
import { collectionVenueId } from '@weco/common/data/hardcoded-ids';
import { transformCollectionVenues } from '@weco/common/services/prismic/transformers/collection-venues';
import { getVenueById } from '@weco/common/services/prismic/opening-times';
import { addDays, today } from '@weco/common/utils/dates';

type AvailableDates = {
  nextAvailable?: Date;
  lastAvailable?: Date;
  exceptionalClosedDates: Date[];
  closedDays: DayNumber[];
};

export const useAvailableDates = (): AvailableDates => {
  // We get the regular and exceptional days on which the library is closed from Prismic data,
  // so we can make these unavailable in the calendar.
  const { collectionVenues } = usePrismicData();

  const venues = transformCollectionVenues(collectionVenues);
  const libraryVenue = getVenueById(venues, collectionVenueId.libraries.id);

  const regularLibraryOpeningTimes = libraryVenue?.openingHours.regular || [];
  const closedDays = findClosedDays(regularLibraryOpeningTimes).map(
    convertOpeningHoursDayToDayNumber
  );
  const exceptionalLibraryOpeningTimes =
    libraryVenue?.openingHours.exceptional || [];
  const exceptionalClosedDates = findClosedDays(exceptionalLibraryOpeningTimes)
    .map(day => {
      const exceptionalDay = day as ExceptionalOpeningHoursDay;
      return exceptionalDay.overrideDate;
    })
    .filter(Boolean);

  const nextAvailable = determineNextAvailableDate(
    today(),
    closedDays,
    exceptionalClosedDates
  );

  // There should be a minimum of a 2 week window in which to select a date
  const minimumLastAvailable = nextAvailable && addDays(nextAvailable, 13);
  // If the library is closed on any days during the selection window
  // we extend the lastAvailableDate to take these into account
  const lastAvailable = extendEndDate({
    startDate: nextAvailable,
    endDate: minimumLastAvailable,
    exceptionalClosedDates,
    closedDays,
  });

  return {
    nextAvailable,
    lastAvailable,
    exceptionalClosedDates,
    closedDays,
  };
};
