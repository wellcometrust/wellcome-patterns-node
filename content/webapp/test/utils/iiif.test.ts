import { Manifest, Range } from '@iiif/presentation-3';
import {
  getIIIFMetadata,
  getIIIFPresentationCredit,
  getClickThroughService,
  getTransformedCanvases,
  getMultiVolumeLabel,
  getBornDigitalStatus,
  groupRanges,
} from '../../utils/iiif/v3';
import {
  manifest,
  manifestWithTranscript,
  manifestWithClickThroughService,
  physicalDescriptionMetadataItem,
  clickThroughService,
  manifestAllBornDigital,
  manifestMixedBornDigital,
} from '@weco/content/__mocks__/iiif-manifest-v3';

const canvases = getTransformedCanvases(manifest as Manifest);
const structures = [
  {
    id: 'https://iiif.wellcomecollection.org/presentation/b21538906/ranges/LOG_0001',
    type: 'Range',
    label: {
      en: ['First'],
    },
    items: [
      {
        id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0001.jp2',
      },
      {
        id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0002.jp2',
      },
    ],
  },
  {
    id: 'https://iiif.wellcomecollection.org/presentation/b21538906/ranges/LOG_0002',
    type: 'Range',
    label: {
      en: ['First'],
    },
    items: [
      {
        id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0003.jp2',
      },
    ],
  },
  {
    id: 'https://iiif.wellcomecollection.org/presentation/b21538906/ranges/LOG_0003',
    type: 'Range',
    label: {
      en: ['First'],
    },
    items: [
      {
        id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0006.jp2',
      },
    ],
  },
  {
    id: 'https://iiif.wellcomecollection.org/presentation/b21538906/ranges/LOG_0004',
    type: 'Range',
    label: {
      en: ['Second'],
    },
    items: [
      {
        id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0007.jp2',
      },
    ],
  },
  {
    id: 'https://iiif.wellcomecollection.org/presentation/b21538906/ranges/LOG_0005',
    type: 'Range',
    label: {
      en: ['Third'],
    },
    items: [
      {
        id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0009.jp2',
      },
    ],
  },
  {
    id: 'https://iiif.wellcomecollection.org/presentation/b21538906/ranges/LOG_0006',
    type: 'Range',
    label: {
      en: ['Third'],
    },
    items: [
      {
        id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0010.jp2',
      },
    ],
  },
];

const correctResult = [
  {
    id: 'https://iiif.wellcomecollection.org/presentation/b21538906/ranges/LOG_0001',
    type: 'Range',
    label: {
      en: ['First'],
    },
    items: [
      {
        id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0001.jp2',
      },
      {
        id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0002.jp2',
      },
      {
        id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0003.jp2',
      },
    ],
  },
  {
    id: 'https://iiif.wellcomecollection.org/presentation/b21538906/ranges/LOG_0003',
    type: 'Range',
    label: {
      en: ['First'],
    },
    items: [
      {
        id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0006.jp2',
      },
    ],
  },
  {
    id: 'https://iiif.wellcomecollection.org/presentation/b21538906/ranges/LOG_0004',
    type: 'Range',
    label: {
      en: ['Second'],
    },
    items: [
      {
        id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0007.jp2',
      },
    ],
  },
  {
    id: 'https://iiif.wellcomecollection.org/presentation/b21538906/ranges/LOG_0005',
    type: 'Range',
    label: {
      en: ['Third'],
    },
    items: [
      {
        id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0009.jp2',
      },
      {
        id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0010.jp2',
      },
    ],
  },
];

describe('Group repetitive iiif ranges', () => {
  it('groups iiif ranges with consecutive canvases and the same label', () => {
    const groupedStructures = groupRanges(
      canvases,
      structures as unknown as Range[]
    );

    expect(groupedStructures).toEqual(correctResult);
  });
});

describe('getClickThroughService', () => {
  it('returns an clickThroughService from a Manifest', () => {
    const clickThroughServiceFromManifest = getClickThroughService(
      manifestWithClickThroughService as Manifest
    );

    expect(clickThroughServiceFromManifest).toEqual(clickThroughService);
  });
});

describe('getMultiVolumeLabel', () => {
  it('returns the appropriate label from an array', () => {
    const label1 = getMultiVolumeLabel(
      { en: ['Practica seu Lilium medicinae', 'Copy 1'] },
      'Practica seu Lilium medicinae'
    );
    const label2 = getMultiVolumeLabel(
      { en: ['Volume 1', 'The diary of Samuel Pepys'] },
      'The diary of Samuel Pepys'
    );

    expect(label1).toEqual('Copy 1');
    expect(label2).toEqual('Volume 1');
  });
});

describe('getIIIFMetadata', () => {
  it('returns the correct MetadataItem from a manifest', () => {
    const metadataItem = getIIIFMetadata(
      manifestWithTranscript as Manifest,
      'Physical description'
    );
    expect(physicalDescriptionMetadataItem).toEqual(metadataItem);
  });
});

describe('getIIIFPresentationCredit', () => {
  it('returns the relevant attribution and usage information', () => {
    const credit = getIIIFPresentationCredit(
      manifestWithTranscript as Manifest
    );
    expect(credit).toEqual('Wellcome Collection');
  });
});

describe('Determines if a iiif-manifest includes born digital items', () => {
  it('returns a status of "noBornDigital" for manifests with no born digital items', () => {
    const bornDigitalStatus = getBornDigitalStatus(manifest as Manifest);
    expect(bornDigitalStatus).toEqual('noBornDigital');
  });
  it('returns a status of "mixedBornDigital" for manifests with a mix of born digital and non born digital items', () => {
    const bornDigitalStatus = getBornDigitalStatus(
      manifestMixedBornDigital as unknown as Manifest
    );
    expect(bornDigitalStatus).toEqual('mixedBornDigital');
  });
  it('returns a status of "allBornDigital" for manifests with only born digital items', () => {
    const bornDigitalStatus = getBornDigitalStatus(
      manifestAllBornDigital as unknown as Manifest
    );
    expect(bornDigitalStatus).toEqual('allBornDigital');
  });
});
