import { CloudFrontRequest } from 'aws-lambda';

export type ToggleTypes = 'permanent' | 'experimental' | 'test' | 'stage';

type ToggleBase = {
  id: string;
  title: string;
  description: string;
  type: ToggleTypes;
};

export type ToggleDefinition = ToggleBase & {
  initialValue: boolean;
};

export type PublishedToggle = ToggleBase & {
  defaultValue: boolean;
};

export type ABTest = {
  id: string;
  title: string;
  range: [number, number];
  when: (request: CloudFrontRequest) => boolean;
  type: 'test';
};

const toggles = {
  // This should probably be called `features` as we have feature toggles, and a/b testing toggles.
  // Toggles of type 'stage' will only be applied on stage
  toggles: [
    {
      id: 'disableRequesting',
      title: 'Disables requesting functionality',
      description:
        'Replaces the "sign into your library account to request items" message, with "requesting is currently unavailable". Adds a note to say when requesting will be available again.' +
        'See documentation link (tbc).',
      initialValue: false,
      type: 'permanent',
    },
    {
      id: 'stagingApi',
      title: 'Staging API',
      initialValue: false,
      description: 'Use the staging Wellcome APIs',
      type: 'permanent',
    },
    {
      id: 'apiToolbar',
      title: 'API toolbar',
      initialValue: false,
      description: 'A toolbar to help us navigate the secret depths of the API',
      type: 'permanent',
    },
    {
      id: 'aggregationsInSearch',
      title: 'Aggregations in search',
      initialValue: true,
      description:
        'Whether to enable aggregations in search. Aggregations are an expensive part of the query, and they can be temporarily disabled if the API is having performance issues.',
      type: 'permanent',
    },
    {
      id: 'issuesBanner',
      title: 'Banner for issues across the website',
      initialValue: false,
      description:
        "Banner to display publicly when we're experiencing issues across the website that will take longer to fix or are out of our control.",
      type: 'permanent',
    },
    {
      id: 'eventsSearch',
      title: 'Add Events to Search pages',
      initialValue: false,
      description:
        'Adds an Events section to the Search hub and a new Events tab for more specific searches',
      type: 'experimental',
    },
    {
      id: 'showBornDigital',
      title: 'Display born digital files',
      initialValue: false,
      description:
        'If there are born digital items in the iiif-manifest, then links to all the files in the manifest are shown on the works page.',
      type: 'experimental',
    },
    {
      id: 'cookiesWork',
      title: 'Various consent/cookies work allowances',
      initialValue: false,
      description:
        'This will allow various pieces of work around consent, tracking and cookies to happen; e.g. testing in production.',
      type: 'experimental',
    },
    {
      id: 'sliceMachine',
      title: 'Prismic Slice Machine',
      initialValue: false,
      description:
        'This will render content using Prismic Slice Machine slices instead of legacy slices',
      type: 'experimental',
    },
  ] as const,
  tests: [] as ABTest[],
};

export default toggles;
