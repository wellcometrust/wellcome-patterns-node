import title from './parts/title';
import promo from './parts/promo';
import timestamp from './parts/timestamp';
import link from './parts/link';
import list from './parts/list';
import structuredText from './parts/structured-text';
import embed from './parts/embed';
import booleanDeprecated from './parts/boolean-deprecated';
import text from './parts/text';
import contributorsWithTitle from './parts/contributorsWithTitle';
import body from './parts/body';
import boolean from './parts/boolean';
import number from './parts/number';
import { CustomType } from './types/CustomType';

function reservationBlock(prefix?: string) {
  return {
    [prefix ? `${prefix}TicketSalesStart` : 'ticketSalesStart']:
      timestamp('Ticket sales start'),
    [prefix ? `${prefix}BookingEnquiryTeam` : 'bookingEnquiryTeam']: link(
      'Booking enquiry team',
      'document',
      ['teams']
    ),
    [prefix ? `${prefix}EventbriteEvent` : 'eventbriteEvent']:
      embed('Eventbrite event'),
    // This is what it was labelled on the UI,
    // so that's what we're calling it here
    [prefix ? `${prefix}ThirdPartyBookingName` : 'thirdPartyBookingName']: text(
      'Third party booking name'
    ),
    [prefix ? `${prefix}ThirdPartyBookingUrl` : 'thirdPartyBookingUrl']: link(
      'Third party booking url',
      'web'
    ),
    [prefix ? `${prefix}BookingInformation` : 'bookingInformation']:
      structuredText({ label: 'Extra information' }),
    [prefix ? `${prefix}Policies` : 'policies']: list('Policies', {
      policy: link('Policy', 'document', ['event-policies']),
    }),
    [prefix ? `${prefix}HasEarlyRegistration` : 'hasEarlyRegistration']:
      booleanDeprecated('Early registration'),
    [prefix ? `${prefix}Cost` : 'cost']: text('Cost'),
  };
}

const events: CustomType = {
  id: 'events',
  label: 'Event',
  repeatable: true,
  status: true,
  json: {
    Event: {
      title,
      format: link('Format', 'document', ['event-formats']),
      locations: list('Locations', {
        location: link('Location', 'document', ['places']),
      }),
      isOnline: boolean('Happens Online?', false),
      availableOnline: boolean('Available Online?', false),
      times: list('Times', {
        startDateTime: timestamp('Start'),
        endDateTime: timestamp('End'),
        isFullyBooked: booleanDeprecated('In-venue fully booked'),
        onlineIsFullyBooked: booleanDeprecated('Online fully booked'),
      }),
      body,
    },
    Access: {
      isRelaxedPerformance: booleanDeprecated('Relaxed'),
      interpretations: list('Interpretations', {
        interpretationType: link('Interpretation', 'document', [
          'interpretation-types',
        ]),
        isPrimary: booleanDeprecated('Primary interprtation'),
        extraInformation: structuredText({ label: 'Extra information' }),
      }),
      audiences: list('Audiences', {
        audience: link('Audience', 'document', ['audiences']),
      }),
    },
    Reservation: reservationBlock(),
    'Online reservation': reservationBlock('online'),
    Schedule: {
      schedule: list('Events', {
        event: link('Event', 'document', ['events']),
        isNotLinked: booleanDeprecated('Suppress link to event'),
      }),
      backgroundTexture: link('Background texture', 'document', [
        'background-textures',
      ]),
    },
    Contributors: contributorsWithTitle(),
    Promo: {
      promo,
    },
    Metadata: {
      metadataDescription: structuredText({
        label: 'Metadata description',
        singleOrMulti: 'single',
      }),
    },
    'Content relationships': {
      series: list('Event series', {
        series: link('Series', 'document', ['event-series']),
      }),
      seasons: list('Seasons', {
        season: link('Season', 'document', ['seasons'], 'Select a Season'),
      }),
      parents: list('Parents', {
        order: number('Order'),
        parent: link('Parent', 'document', ['exhibitions'], 'Select a parent'),
      }),
    },
  },
};

export default events;
