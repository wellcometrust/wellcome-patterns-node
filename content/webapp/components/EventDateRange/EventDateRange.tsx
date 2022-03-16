import { getEarliestFutureDateRange } from '@weco/common/utils/dates';
import DateRange from '@weco/common/views/components/DateRange/DateRange';
import { Event, EventBasic } from '../../types/events';
import { Moment } from 'moment';

type Props = {
  event: Event | EventBasic;
  splitTime?: boolean;
  fromDate?: Moment;
};

const EventDateRange = ({ event, splitTime, fromDate }: Props) => {
  const dateRanges = event.times.map(({ range }) => ({
    start: range.startDateTime,
    end: range.endDateTime,
  }));
  const earliestFutureDateRange = getEarliestFutureDateRange(
    dateRanges,
    fromDate
  );
  const dateRange =
    earliestFutureDateRange || (dateRanges.length > 0 ? dateRanges[0] : null);
  const DateInfo = dateRange && (
    <DateRange {...dateRange} splitTime={splitTime} />
  );

  return DateInfo;
};
export default EventDateRange;
