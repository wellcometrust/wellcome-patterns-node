export const physicalDescriptionMetadataItem = {
  label: {
    en: ['Physical description'],
  },
  value: {
    en: ['6 encoded audio files 2.4 MB (2542803 bytes) 6 WAV files'],
  },
};

export const services = [
  {
    id: 'https://iiif.wellcomecollection.org/presentation/b29214397#tracking',
    type: 'Text',
    profile: 'http://universalviewer.io/tracking-extensions-profile',
    label: {
      en: [
        'Format: Video, Institution: n/a, Identifier: b29214397, Digicode: digfilm, Collection code: n/a',
      ],
    },
  },
  {
    id: 'https://iiif.wellcomecollection.org/presentation/b29214397#timestamp',
    type: 'Text',
    profile:
      'https://github.com/wellcomecollection/iiif-builder/build-timestamp',
    label: {
      none: ['2022-06-21T11:18:19.6201561Z'],
    },
  },
  {
    id: 'https://iiif.wellcomecollection.org/presentation/b29214397#accesscontrolhints',
    type: 'Text',
    profile: 'http://wellcomelibrary.org/ld/iiif-ext/access-control-hints',
    label: {
      en: ['clickthrough'],
    },
  },
];

export const manifestWithTranscript = {
  '@context': 'http://iiif.io/api/presentation/3/context.json',
  id: 'https://iiif.wellcomecollection.org/presentation/b2248887x',
  type: 'Manifest',
  label: {
    en: ['Mat Fraser: interview 1'],
  },
  summary: {
    en: [
      'Ruth Blue interviewing Mat Fraser on the 12th of November at his home in London for Thalidomide: An Oral History.',
    ],
  },
  homepage: [
    {
      id: 'https://wellcomecollection.org/works/b4tj49m4',
      type: 'Text',
      label: {
        en: ['Mat Fraser: interview 1'],
      },
      format: 'text/html',
      language: ['en'],
    },
  ],
  metadata: [
    {
      label: {
        en: ['Description'],
      },
      value: {
        en: [
          'Ruth Blue interviewing Mat Fraser on the 12th of November at his home in London for Thalidomide: An Oral History.',
        ],
      },
    },
    {
      label: {
        en: ['Reference'],
      },
      value: {
        none: ['OH1/E/1'],
      },
    },
    {
      label: {
        en: ['Publication/creation'],
      },
      value: {
        none: ['12 November 2012'],
      },
    },
    {
      label: {
        en: ['Physical description'],
      },
      value: {
        en: ['6 encoded audio files 2.4 MB (2542803 bytes) 6 WAV files'],
      },
    },
    {
      label: {
        en: ['Copyright note'],
      },
      value: {
        en: [
          'This recording has been licensed by the Wellcome Trust for public use under Creative Commons Attribution-non commercial-Share Alike 3.00 UK. This means that anyone based in the UK can share and remix the material, as long as it is for non-commercial purposes. Credits, where given, should be to Wellcome Library, London. (c) Wellcome Trust.',
        ],
      },
    },
    {
      label: {
        en: ['Attribution and usage'],
      },
      value: {
        en: [
          'Wellcome Collection',
          '<span>You have permission to make copies of this work under a <a target="_top" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons, Attribution, Non-commercial license</a>.<br/><br/>Non-commercial use includes private study, academic research, teaching, and other activities that are not primarily intended for, or directed towards, commercial advantage or private monetary compensation. See the <a target="_top" href="http://creativecommons.org/licenses/by-nc/4.0/legalcode">Legal Code</a> for further information.<br/><br/>Image source should be attributed as specified in the full catalogue record. If no source is given the image should be attributed to Wellcome Collection.</span>',
        ],
      },
    },
  ].concat(physicalDescriptionMetadataItem),
  rights: 'http://creativecommons.org/licenses/by-nc/4.0/',
  provider: [
    {
      id: 'https://wellcomecollection.org',
      type: 'Agent',
      label: {
        en: [
          'Wellcome Collection',
          '183 Euston Road',
          'London NW1 2BE UK',
          'T +44 (0)20 7611 8722',
          'E library@wellcomecollection.org',
          'https://wellcomecollection.org',
        ],
      },
      homepage: [
        {
          id: 'https://wellcomecollection.org/works',
          type: 'Text',
          label: {
            en: ['Explore our collections'],
          },
          format: 'text/html',
        },
      ],
      logo: [
        {
          id: 'https://iiif.wellcomecollection.org/logos/wellcome-collection-black.png',
          type: 'Image',
          format: 'image/png',
        },
      ],
    },
  ],
  rendering: [
    {
      id: 'https://iiif.wellcomecollection.org/file/b2248887x_0001.pdf',
      type: 'Text',
      label: {
        en: ['PDF Transcript'],
      },
      format: 'application/pdf',
    },
  ],
  seeAlso: [
    {
      id: 'https://api.wellcomecollection.org/catalogue/v2/works/b4tj49m4',
      type: 'Dataset',
      profile: 'https://api.wellcomecollection.org/catalogue/v2/context.json',
      label: {
        en: ['Wellcome Collection Catalogue API'],
      },
      format: 'application/json',
    },
  ],
  services: [
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b2248887x#tracking',
      type: 'Text',
      profile: 'http://universalviewer.io/tracking-extensions-profile',
      label: {
        en: [
          'Format: Audio, Institution: n/a, Identifier: b2248887x, Digicode: n/a, Collection code: OH1/E/1',
        ],
      },
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b2248887x#timestamp',
      type: 'Text',
      profile:
        'https://github.com/wellcomecollection/iiif-builder/build-timestamp',
      label: {
        none: ['2021-10-07T12:05:16.5432526Z'],
      },
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b2248887x#accesscontrolhints',
      type: 'Text',
      profile: 'http://wellcomelibrary.org/ld/iiif-ext/access-control-hints',
      label: {
        en: ['open'],
      },
    },
  ],
  placeholderCanvas: {
    id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/poster-b2248887x_0006.wav',
    type: 'Canvas',
    label: {
      en: ['Poster Image Canvas'],
    },
    width: 600,
    height: 400,
    items: [
      {
        id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/poster-b2248887x_0006.wav/painting',
        type: 'AnnotationPage',
        items: [
          {
            id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/poster-b2248887x_0006.wav/painting/anno',
            type: 'Annotation',
            motivation: 'painting',
            body: {
              id: 'https://iiif.wellcomecollection.org/thumb/b2248887x',
              type: 'Image',
              label: {
                en: ['Poster Image'],
              },
              format: 'image/jpeg',
            },
            target:
              'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/poster-b2248887x_0006.wav/painting',
          },
        ],
      },
    ],
  },
  items: [
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0001.wav',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      duration: 1800.006836,
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0001.wav/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0001.wav/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                duration: 1800.006836,
                id: 'https://iiif.wellcomecollection.org/av/b2248887x_0001.wav/full/max/default.mp3',
                type: 'Sound',
                label: {
                  en: ['MP3'],
                },
                format: 'audio/mp3',
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0001.wav',
            },
          ],
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0002.wav',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      duration: 1800.006836,
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0002.wav/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0002.wav/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                duration: 1800.006836,
                id: 'https://iiif.wellcomecollection.org/av/b2248887x_0002.wav/full/max/default.mp3',
                type: 'Sound',
                label: {
                  en: ['MP3'],
                },
                format: 'audio/mp3',
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0002.wav',
            },
          ],
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0003.wav',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      duration: 1044.223389,
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0003.wav/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0003.wav/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                duration: 1044.223389,
                id: 'https://iiif.wellcomecollection.org/av/b2248887x_0003.wav/full/max/default.mp3',
                type: 'Sound',
                label: {
                  en: ['MP3'],
                },
                format: 'audio/mp3',
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0003.wav',
            },
          ],
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0004.wav',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      duration: 1800.006836,
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0004.wav/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0004.wav/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                duration: 1800.006836,
                id: 'https://iiif.wellcomecollection.org/av/b2248887x_0004.wav/full/max/default.mp3',
                type: 'Sound',
                label: {
                  en: ['MP3'],
                },
                format: 'audio/mp3',
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0004.wav',
            },
          ],
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0005.wav',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      duration: 1800.006836,
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0005.wav/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0005.wav/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                duration: 1800.006836,
                id: 'https://iiif.wellcomecollection.org/av/b2248887x_0005.wav/full/max/default.mp3',
                type: 'Sound',
                label: {
                  en: ['MP3'],
                },
                format: 'audio/mp3',
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0005.wav',
            },
          ],
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0006.wav',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      duration: 797.890076,
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0006.wav/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0006.wav/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                duration: 797.890076,
                id: 'https://iiif.wellcomecollection.org/av/b2248887x_0006.wav/full/max/default.mp3',
                type: 'Sound',
                label: {
                  en: ['MP3'],
                },
                format: 'audio/mp3',
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b2248887x/canvases/b2248887x_0006.wav',
            },
          ],
        },
      ],
    },
  ],
  partOf: [
    {
      id: 'https://iiif.wellcomecollection.org/presentation/collections/archives/OH1/E',
      type: 'Collection',
      label: {
        en: ['Mat Fraser'],
      },
      partOf: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/collections/archives/OH1',
          type: 'Collection',
          label: {
            en: ['Thalidomide: An Oral History'],
          },
        },
      ],
    },
  ],
};

export const manifestWithAudioTitles = {
  '@context': 'http://iiif.io/api/presentation/3/context.json',
  id: 'https://iiif.wellcomecollection.org/presentation/b3250200x',
  type: 'Manifest',
  label: {
    en: ['Audio recording'],
  },
  summary: {
    en: [
      'Digitised audio recording of SA/PHY/T/1/9/1 (4 MP3 files). See SA/PHY/T/1/9/2 & 3 for transcript and other materials.',
    ],
  },
  homepage: [
    {
      id: 'https://wellcomecollection.org/works/ja8kpws9',
      type: 'Text',
      label: {
        en: ['Audio recording'],
      },
      format: 'text/html',
      language: ['en'],
    },
  ],
  metadata: [
    {
      label: {
        en: ['Description'],
      },
      value: {
        en: [
          'Digitised audio recording of SA/PHY/T/1/9/1 (4 MP3 files). See SA/PHY/T/1/9/2 & 3 for transcript and other materials.',
        ],
      },
    },
    {
      label: {
        en: ['Reference'],
      },
      value: {
        none: ['SA/PHY/T/1/9/1a'],
      },
    },
    {
      label: {
        en: ['Publication/creation'],
      },
      value: {
        none: ['28 August 1997'],
      },
    },
    {
      label: {
        en: ['Physical description'],
      },
      value: {
        en: ['4 encoded audio files'],
      },
    },
    {
      label: {
        en: ['Attribution and usage'],
      },
      value: {
        en: [
          'Wellcome Collection',
          '<span>Conditions of use: it is possible this item is protected by copyright and/or related rights. You are free to use this item in any way that is permitted by the copyright and related rights legislation that applies to your use. For other uses you need to obtain permission from the rights-holder(s).</span>',
        ],
      },
    },
  ],
  provider: [
    {
      id: 'https://wellcomecollection.org',
      type: 'Agent',
      label: {
        en: [
          'Wellcome Collection',
          '183 Euston Road',
          'London NW1 2BE UK',
          'T +44 (0)20 7611 8722',
          'E library@wellcomecollection.org',
          'https://wellcomecollection.org',
        ],
      },
      homepage: [
        {
          id: 'https://wellcomecollection.org/works',
          type: 'Text',
          label: {
            en: ['Explore our collections'],
          },
          format: 'text/html',
        },
      ],
      logo: [
        {
          id: 'https://iiif.wellcomecollection.org/logos/wellcome-collection-black.png',
          type: 'Image',
          format: 'image/png',
        },
      ],
    },
  ],
  seeAlso: [
    {
      id: 'https://api.wellcomecollection.org/catalogue/v2/works/ja8kpws9',
      type: 'Dataset',
      profile: 'https://api.wellcomecollection.org/catalogue/v2/context.json',
      label: {
        en: ['Wellcome Collection Catalogue API'],
      },
      format: 'application/json',
    },
  ],
  services: [
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b3250200x#tracking',
      type: 'Text',
      profile: 'http://universalviewer.io/tracking-extensions-profile',
      label: {
        en: [
          'Format: Audio, Institution: n/a, Identifier: b3250200x, Digicode: n/a, Collection code: SA/PHY/T/1/9/1a',
        ],
      },
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b3250200x#timestamp',
      type: 'Text',
      profile:
        'https://github.com/wellcomecollection/iiif-builder/build-timestamp',
      label: {
        none: ['2022-02-23T11:17:33.4917260Z'],
      },
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b3250200x#accesscontrolhints',
      type: 'Text',
      profile: 'http://wellcomelibrary.org/ld/iiif-ext/access-control-hints',
      label: {
        en: ['open'],
      },
    },
  ],
  placeholderCanvas: {
    id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/poster-b3250200x_0004.wav',
    type: 'Canvas',
    label: {
      en: ['Poster Image Canvas'],
    },
    width: 600,
    height: 400,
    items: [
      {
        id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/poster-b3250200x_0004.wav/painting',
        type: 'AnnotationPage',
        items: [
          {
            id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/poster-b3250200x_0004.wav/painting/anno',
            type: 'Annotation',
            motivation: 'painting',
            body: {
              id: 'https://iiif.wellcomecollection.org/thumb/b3250200x',
              type: 'Image',
              label: {
                en: ['Poster Image'],
              },
              format: 'image/jpeg',
            },
            target:
              'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/poster-b3250200x_0004.wav/painting',
          },
        ],
      },
    ],
  },
  items: [
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0001.wav',
      type: 'Canvas',
      label: {
        en: ['Tape 1, Side 1'],
      },
      duration: 2936.543213,
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0001.wav/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0001.wav/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                duration: 2936.543213,
                id: 'https://iiif.wellcomecollection.org/av/b3250200x_0001.wav/full/max/default.mp3',
                type: 'Sound',
                label: {
                  en: ['MP3'],
                },
                format: 'audio/mp3',
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0001.wav',
            },
          ],
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0002.wav',
      type: 'Canvas',
      label: {
        en: ['Tape 1, Side 2'],
      },
      duration: 2922.277832,
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0002.wav/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0002.wav/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                duration: 2922.277832,
                id: 'https://iiif.wellcomecollection.org/av/b3250200x_0002.wav/full/max/default.mp3',
                type: 'Sound',
                label: {
                  en: ['MP3'],
                },
                format: 'audio/mp3',
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0002.wav',
            },
          ],
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0003.wav',
      type: 'Canvas',
      label: {
        en: ['Tape 2, Side 1'],
      },
      duration: 2914.011475,
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0003.wav/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0003.wav/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                duration: 2914.011475,
                id: 'https://iiif.wellcomecollection.org/av/b3250200x_0003.wav/full/max/default.mp3',
                type: 'Sound',
                label: {
                  en: ['MP3'],
                },
                format: 'audio/mp3',
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0003.wav',
            },
          ],
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0004.wav',
      type: 'Canvas',
      label: {
        en: ['Tape 2, Side 2'],
      },
      duration: 1234.256836,
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0004.wav/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0004.wav/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                duration: 1234.256836,
                id: 'https://iiif.wellcomecollection.org/av/b3250200x_0004.wav/full/max/default.mp3',
                type: 'Sound',
                label: {
                  en: ['MP3'],
                },
                format: 'audio/mp3',
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0004.wav',
            },
          ],
        },
      ],
    },
  ],
  structures: [
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/ranges/LOG_0001',
      type: 'Range',
      label: {
        none: ['Tape 1'],
      },
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0001.wav',
          type: 'Canvas',
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/ranges/LOG_0002',
      type: 'Range',
      label: {
        none: ['Tape 1'],
      },
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0002.wav',
          type: 'Canvas',
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/ranges/LOG_0003',
      type: 'Range',
      label: {
        none: ['Tape 2'],
      },
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0003.wav',
          type: 'Canvas',
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/ranges/LOG_0004',
      type: 'Range',
      label: {
        none: ['Tape 2'],
      },
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b3250200x/canvases/b3250200x_0004.wav',
          type: 'Canvas',
        },
      ],
    },
  ],
  partOf: [
    {
      id: 'https://iiif.wellcomecollection.org/presentation/collections/archives/SA/PHY/T/1/9',
      type: 'Collection',
      label: {
        en: ['John Gray'],
      },
      partOf: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/collections/archives/SA/PHY/T/1',
          type: 'Collection',
          label: {
            en: ['Oral history project'],
          },
          partOf: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/collections/archives/SA/PHY/T',
              type: 'Collection',
              label: {
                en: ["The Physiological Society's Audio Visual Collection"],
              },
              partOf: [
                {
                  id: 'https://iiif.wellcomecollection.org/presentation/collections/archives/SA/PHY',
                  type: 'Collection',
                  label: {
                    en: ['The Physiological Society'],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const manifest = {
  '@context': [
    'http://iiif.io/api/search/1/context.json',
    'http://iiif.io/api/presentation/3/context.json',
  ],
  id: 'https://iiif.wellcomecollection.org/presentation/b21538906',
  type: 'Manifest',
  label: {
    en: [
      'Egg cookery : how to cook eggs in 150 ways, English and foreign / by Mrs. Hugh Coleman Davidson.',
    ],
  },
  thumbnail: [
    {
      id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0007.jp2/full/63,100/0/default.jpg',
      type: 'Image',
      width: 63,
      height: 100,
      service: [
        {
          '@id':
            'https://iiif.wellcomecollection.org/thumbs/b21538906_0007.jp2',
          '@type': 'ImageService2',
          profile: 'http://iiif.io/api/image/2/level0.json',
          width: 649,
          height: 1024,
          sizes: [
            {
              width: 63,
              height: 100,
            },
            {
              width: 127,
              height: 200,
            },
            {
              width: 253,
              height: 400,
            },
            {
              width: 649,
              height: 1024,
            },
          ],
        },
      ],
    },
  ],
  homepage: [
    {
      id: 'https://wellcomecollection.org/works/pxv98cnk',
      type: 'Text',
      label: {
        en: [
          'Egg cookery : how to cook eggs in 150 ways, English and foreign / by Mrs. Hugh Coleman Davidson.',
        ],
      },
      format: 'text/html',
      language: ['en'],
    },
  ],
  metadata: [
    {
      label: {
        en: ['Publication/creation'],
      },
      value: {
        none: ['[London] : L. Upcott Gill, 1899.'],
      },
    },
    {
      label: {
        en: ['Physical description'],
      },
      value: {
        en: ['86 pages ; 19 cm'],
      },
    },
    {
      label: {
        en: ['Contributors'],
      },
      value: {
        none: ['Davidson, J. E.', 'University of Leeds. Library'],
      },
    },
    {
      label: {
        en: ['Type/technique'],
      },
      value: {
        en: ['Electronic books'],
      },
    },
    {
      label: {
        en: ['Attribution and usage'],
      },
      value: {
        en: [
          'This material has been provided by This material has been provided by The University of Leeds Library. The original may be consulted at The University of Leeds Library. where the originals may be consulted.',
          '<span>This work has been identified as being free of known restrictions under copyright law, including all related and neighbouring rights and is being made available under the <a target="_top" href="http://creativecommons.org/publicdomain/mark/1.0/">Creative Commons, Public Domain Mark</a>.<br/><br/>You can copy, modify, distribute and perform the work, even for commercial purposes, without asking permission.</span>',
        ],
      },
    },
  ],
  rights: 'http://creativecommons.org/publicdomain/mark/1.0/',
  provider: [
    {
      id: 'https://wellcomecollection.org',
      type: 'Agent',
      label: {
        en: [
          'Wellcome Collection',
          '183 Euston Road',
          'London NW1 2BE UK',
          'T +44 (0)20 7611 8722',
          'E library@wellcomecollection.org',
          'https://wellcomecollection.org',
        ],
      },
      homepage: [
        {
          id: 'https://wellcomecollection.org/works',
          type: 'Text',
          label: {
            en: ['Explore our collections'],
          },
          format: 'text/html',
        },
      ],
      logo: [
        {
          id: 'https://iiif.wellcomecollection.org/logos/wellcome-collection-black.png',
          type: 'Image',
          format: 'image/png',
        },
      ],
    },
    {
      id: 'https://library.leeds.ac.uk/special-collections/collection/715#',
      type: 'Agent',
      label: {
        en: ['Leeds University Archive'],
      },
      homepage: [
        {
          id: 'https://library.leeds.ac.uk/special-collections/collection/715',
          type: 'Text',
          label: {
            en: ['Leeds University Archive'],
          },
          format: 'text/html',
        },
      ],
      logo: [
        {
          id: 'https://iiif.wellcomecollection.org/partners/leeds-logo.jpg',
          type: 'Image',
          format: 'image/jpg',
        },
      ],
    },
  ],
  rendering: [
    {
      id: 'https://iiif.wellcomecollection.org/pdf/b21538906',
      type: 'Text',
      label: {
        en: ['View as PDF'],
      },
      format: 'application/pdf',
    },
    {
      id: 'https://api.wellcomecollection.org/text/v1/b21538906',
      type: 'Text',
      label: {
        en: ['View raw text'],
      },
      format: 'text/plain',
    },
  ],
  seeAlso: [
    {
      id: 'https://api.wellcomecollection.org/catalogue/v2/works/pxv98cnk',
      type: 'Dataset',
      profile: 'https://api.wellcomecollection.org/catalogue/v2/context.json',
      label: {
        en: ['Wellcome Collection Catalogue API'],
      },
      format: 'application/json',
    },
  ],
  service: [
    {
      '@id': 'https://iiif.wellcomecollection.org/search/v1/b21538906',
      '@type': 'SearchService1',
      profile: 'http://iiif.io/api/search/1/search',
      label: 'Search within this manifest',
      service: {
        '@id':
          'https://iiif.wellcomecollection.org/search/autocomplete/v1/b21538906',
        '@type': 'AutoCompleteService1',
        profile: 'http://iiif.io/api/search/1/autocomplete',
        label: 'Autocomplete words in this manifest',
      },
    },
  ],
  behavior: ['paged'],
  services: [
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906#tracking',
      type: 'Text',
      profile: 'http://universalviewer.io/tracking-extensions-profile',
      label: {
        en: [
          'Format: Monograph, Institution: Leeds University Archive, Identifier: b21538906, Digicode: digleeds, Collection code: n/a',
        ],
      },
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906#timestamp',
      type: 'Text',
      profile:
        'https://github.com/wellcomecollection/iiif-builder/build-timestamp',
      label: {
        none: ['2021-04-30T18:29:53.0412139Z'],
      },
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906#accesscontrolhints',
      type: 'Text',
      profile: 'http://wellcomelibrary.org/ld/iiif-ext/access-control-hints',
      label: {
        en: ['open'],
      },
    },
  ],
  items: [
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0001.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2244,
      height: 3506,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0001.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0001.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0001.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0001.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0001.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0001.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0001.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2244,
                    height: 3506,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0001.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0001.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0002.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2212,
      height: 3441,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0002.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0002.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 658,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 129,
                  height: 200,
                },
                {
                  width: 257,
                  height: 400,
                },
                {
                  width: 658,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0002.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0002.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0002.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0002.jp2/full/658,1024/0/default.jpg',
                type: 'Image',
                width: 658,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0002.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2212,
                    height: 3441,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0002.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0002.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0003.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2212,
      height: 3441,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0003.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0003.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 658,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 129,
                  height: 200,
                },
                {
                  width: 257,
                  height: 400,
                },
                {
                  width: 658,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0003.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0003.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0003.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0003.jp2/full/658,1024/0/default.jpg',
                type: 'Image',
                width: 658,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0003.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2212,
                    height: 3441,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0003.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0003.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0004.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2126,
      height: 3355,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0004.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0004.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 649,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 127,
                  height: 200,
                },
                {
                  width: 253,
                  height: 400,
                },
                {
                  width: 649,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0004.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0004.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0004.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0004.jp2/full/649,1024/0/default.jpg',
                type: 'Image',
                width: 649,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0004.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2126,
                    height: 3355,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0004.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0004.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0005.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2126,
      height: 3355,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0005.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0005.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 649,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 127,
                  height: 200,
                },
                {
                  width: 253,
                  height: 400,
                },
                {
                  width: 649,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0005.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0005.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0005.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0005.jp2/full/649,1024/0/default.jpg',
                type: 'Image',
                width: 649,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0005.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2126,
                    height: 3355,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0005.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0005.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0006.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2126,
      height: 3355,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0006.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0006.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 649,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 127,
                  height: 200,
                },
                {
                  width: 253,
                  height: 400,
                },
                {
                  width: 649,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0006.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0006.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0006.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0006.jp2/full/649,1024/0/default.jpg',
                type: 'Image',
                width: 649,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0006.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2126,
                    height: 3355,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0006.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0006.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0007.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2126,
      height: 3355,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0007.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0007.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 649,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 127,
                  height: 200,
                },
                {
                  width: 253,
                  height: 400,
                },
                {
                  width: 649,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0007.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0007.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0007.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0007.jp2/full/649,1024/0/default.jpg',
                type: 'Image',
                width: 649,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0007.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2126,
                    height: 3355,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0007.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0007.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0008.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2126,
      height: 3355,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0008.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0008.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 649,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 127,
                  height: 200,
                },
                {
                  width: 253,
                  height: 400,
                },
                {
                  width: 649,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0008.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0008.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0008.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0008.jp2/full/649,1024/0/default.jpg',
                type: 'Image',
                width: 649,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0008.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2126,
                    height: 3355,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0008.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0008.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0009.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2126,
      height: 3355,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0009.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0009.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 649,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 127,
                  height: 200,
                },
                {
                  width: 253,
                  height: 400,
                },
                {
                  width: 649,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0009.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0009.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0009.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0009.jp2/full/649,1024/0/default.jpg',
                type: 'Image',
                width: 649,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0009.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2126,
                    height: 3355,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0009.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0009.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0010.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2126,
      height: 3355,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0010.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0010.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 649,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 127,
                  height: 200,
                },
                {
                  width: 253,
                  height: 400,
                },
                {
                  width: 649,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0010.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0010.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0010.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0010.jp2/full/649,1024/0/default.jpg',
                type: 'Image',
                width: 649,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0010.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2126,
                    height: 3355,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0010.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0010.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0011.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2126,
      height: 3355,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0011.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0011.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 649,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 127,
                  height: 200,
                },
                {
                  width: 253,
                  height: 400,
                },
                {
                  width: 649,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0011.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0011.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0011.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0011.jp2/full/649,1024/0/default.jpg',
                type: 'Image',
                width: 649,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0011.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2126,
                    height: 3355,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0011.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0011.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0012.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2126,
      height: 3355,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0012.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0012.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 649,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 127,
                  height: 200,
                },
                {
                  width: 253,
                  height: 400,
                },
                {
                  width: 649,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0012.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0012.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0012.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0012.jp2/full/649,1024/0/default.jpg',
                type: 'Image',
                width: 649,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0012.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2126,
                    height: 3355,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0012.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0012.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0013.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2126,
      height: 3355,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0013.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0013.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 649,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 127,
                  height: 200,
                },
                {
                  width: 253,
                  height: 400,
                },
                {
                  width: 649,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0013.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0013.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0013.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0013.jp2/full/649,1024/0/default.jpg',
                type: 'Image',
                width: 649,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0013.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2126,
                    height: 3355,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0013.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0013.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0014.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2126,
      height: 3355,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0014.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0014.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 649,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 127,
                  height: 200,
                },
                {
                  width: 253,
                  height: 400,
                },
                {
                  width: 649,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0014.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0014.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0014.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0014.jp2/full/649,1024/0/default.jpg',
                type: 'Image',
                width: 649,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0014.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2126,
                    height: 3355,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0014.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0014.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0015.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2126,
      height: 3355,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0015.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0015.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 649,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 127,
                  height: 200,
                },
                {
                  width: 253,
                  height: 400,
                },
                {
                  width: 649,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0015.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0015.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0015.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0015.jp2/full/649,1024/0/default.jpg',
                type: 'Image',
                width: 649,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0015.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2126,
                    height: 3355,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0015.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0015.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0016.jp2',
      type: 'Canvas',
      label: {
        none: ['12'],
      },
      width: 2126,
      height: 3355,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0016.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0016.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 649,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 127,
                  height: 200,
                },
                {
                  width: 253,
                  height: 400,
                },
                {
                  width: 649,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0016.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0016.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0016.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0016.jp2/full/649,1024/0/default.jpg',
                type: 'Image',
                width: 649,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0016.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2126,
                    height: 3355,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0016.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0016.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 12'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0017.jp2',
      type: 'Canvas',
      label: {
        none: ['13'],
      },
      width: 2126,
      height: 3355,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0017.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0017.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 649,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 127,
                  height: 200,
                },
                {
                  width: 253,
                  height: 400,
                },
                {
                  width: 649,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0017.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0017.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0017.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0017.jp2/full/649,1024/0/default.jpg',
                type: 'Image',
                width: 649,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0017.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2126,
                    height: 3355,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0017.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0017.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 13'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0018.jp2',
      type: 'Canvas',
      label: {
        none: ['14'],
      },
      width: 2126,
      height: 3355,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0018.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0018.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 649,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 127,
                  height: 200,
                },
                {
                  width: 253,
                  height: 400,
                },
                {
                  width: 649,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0018.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0018.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0018.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0018.jp2/full/649,1024/0/default.jpg',
                type: 'Image',
                width: 649,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0018.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2126,
                    height: 3355,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0018.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0018.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 14'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0019.jp2',
      type: 'Canvas',
      label: {
        none: ['15'],
      },
      width: 2126,
      height: 3355,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0019.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0019.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 649,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 127,
                  height: 200,
                },
                {
                  width: 253,
                  height: 400,
                },
                {
                  width: 649,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0019.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0019.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0019.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0019.jp2/full/649,1024/0/default.jpg',
                type: 'Image',
                width: 649,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0019.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2126,
                    height: 3355,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0019.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0019.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 15'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0020.jp2',
      type: 'Canvas',
      label: {
        none: ['16'],
      },
      width: 2126,
      height: 3355,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0020.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0020.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 649,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 127,
                  height: 200,
                },
                {
                  width: 253,
                  height: 400,
                },
                {
                  width: 649,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0020.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0020.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0020.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0020.jp2/full/649,1024/0/default.jpg',
                type: 'Image',
                width: 649,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0020.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2126,
                    height: 3355,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0020.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0020.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 16'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0021.jp2',
      type: 'Canvas',
      label: {
        none: ['17'],
      },
      width: 2126,
      height: 3355,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0021.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0021.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 649,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 127,
                  height: 200,
                },
                {
                  width: 253,
                  height: 400,
                },
                {
                  width: 649,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0021.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0021.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0021.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0021.jp2/full/649,1024/0/default.jpg',
                type: 'Image',
                width: 649,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0021.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2126,
                    height: 3355,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0021.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0021.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 17'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0022.jp2',
      type: 'Canvas',
      label: {
        none: ['18'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0022.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0022.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0022.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0022.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0022.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0022.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0022.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0022.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0022.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 18'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0023.jp2',
      type: 'Canvas',
      label: {
        none: ['19'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0023.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0023.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0023.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0023.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0023.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0023.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0023.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0023.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0023.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 19'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0024.jp2',
      type: 'Canvas',
      label: {
        none: ['20'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0024.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0024.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0024.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0024.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0024.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0024.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0024.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0024.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0024.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 20'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0025.jp2',
      type: 'Canvas',
      label: {
        none: ['21'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0025.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0025.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0025.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0025.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0025.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0025.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0025.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0025.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0025.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 21'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0026.jp2',
      type: 'Canvas',
      label: {
        none: ['22'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0026.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0026.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0026.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0026.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0026.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0026.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0026.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0026.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0026.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 22'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0027.jp2',
      type: 'Canvas',
      label: {
        none: ['23'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0027.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0027.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0027.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0027.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0027.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0027.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0027.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0027.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0027.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 23'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0028.jp2',
      type: 'Canvas',
      label: {
        none: ['24'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0028.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0028.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0028.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0028.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0028.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0028.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0028.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0028.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0028.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 24'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0029.jp2',
      type: 'Canvas',
      label: {
        none: ['25'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0029.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0029.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0029.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0029.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0029.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0029.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0029.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0029.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0029.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 25'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0030.jp2',
      type: 'Canvas',
      label: {
        none: ['26'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0030.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0030.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0030.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0030.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0030.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0030.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0030.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0030.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0030.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 26'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0031.jp2',
      type: 'Canvas',
      label: {
        none: ['27'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0031.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0031.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0031.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0031.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0031.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0031.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0031.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0031.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0031.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 27'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0032.jp2',
      type: 'Canvas',
      label: {
        none: ['28'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0032.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0032.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0032.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0032.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0032.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0032.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0032.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0032.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0032.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 28'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0033.jp2',
      type: 'Canvas',
      label: {
        none: ['29'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0033.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0033.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0033.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0033.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0033.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0033.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0033.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0033.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0033.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 29'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0034.jp2',
      type: 'Canvas',
      label: {
        none: ['30'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0034.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0034.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0034.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0034.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0034.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0034.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0034.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0034.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0034.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 30'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0035.jp2',
      type: 'Canvas',
      label: {
        none: ['31'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0035.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0035.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0035.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0035.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0035.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0035.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0035.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0035.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0035.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 31'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0036.jp2',
      type: 'Canvas',
      label: {
        none: ['32'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0036.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0036.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0036.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0036.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0036.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0036.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0036.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0036.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0036.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 32'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0037.jp2',
      type: 'Canvas',
      label: {
        none: ['33'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0037.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0037.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0037.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0037.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0037.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0037.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0037.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0037.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0037.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 33'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0038.jp2',
      type: 'Canvas',
      label: {
        none: ['34'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0038.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0038.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0038.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0038.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0038.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0038.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0038.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0038.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0038.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 34'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0039.jp2',
      type: 'Canvas',
      label: {
        none: ['35'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0039.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0039.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0039.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0039.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0039.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0039.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0039.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0039.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0039.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 35'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0040.jp2',
      type: 'Canvas',
      label: {
        none: ['36'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0040.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0040.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0040.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0040.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0040.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0040.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0040.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0040.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0040.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 36'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0041.jp2',
      type: 'Canvas',
      label: {
        none: ['37'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0041.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0041.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0041.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0041.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0041.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0041.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0041.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0041.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0041.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 37'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0042.jp2',
      type: 'Canvas',
      label: {
        none: ['38'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0042.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0042.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0042.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0042.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0042.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0042.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0042.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0042.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0042.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 38'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0043.jp2',
      type: 'Canvas',
      label: {
        none: ['39'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0043.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0043.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0043.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0043.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0043.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0043.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0043.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0043.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0043.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 39'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0044.jp2',
      type: 'Canvas',
      label: {
        none: ['40'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0044.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0044.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0044.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0044.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0044.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0044.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0044.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0044.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0044.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 40'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0045.jp2',
      type: 'Canvas',
      label: {
        none: ['41'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0045.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0045.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0045.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0045.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0045.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0045.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0045.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0045.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0045.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 41'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0046.jp2',
      type: 'Canvas',
      label: {
        none: ['42'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0046.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0046.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0046.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0046.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0046.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0046.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0046.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0046.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0046.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 42'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0047.jp2',
      type: 'Canvas',
      label: {
        none: ['43'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0047.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0047.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0047.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0047.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0047.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0047.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0047.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0047.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0047.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 43'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0048.jp2',
      type: 'Canvas',
      label: {
        none: ['44'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0048.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0048.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0048.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0048.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0048.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0048.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0048.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0048.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0048.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 44'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0049.jp2',
      type: 'Canvas',
      label: {
        none: ['45'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0049.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0049.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0049.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0049.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0049.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0049.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0049.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0049.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0049.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 45'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0050.jp2',
      type: 'Canvas',
      label: {
        none: ['46'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0050.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0050.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0050.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0050.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0050.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0050.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0050.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0050.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0050.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 46'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0051.jp2',
      type: 'Canvas',
      label: {
        none: ['47'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0051.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0051.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0051.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0051.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0051.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0051.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0051.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0051.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0051.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 47'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0052.jp2',
      type: 'Canvas',
      label: {
        none: ['48'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0052.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0052.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0052.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0052.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0052.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0052.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0052.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0052.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0052.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 48'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0053.jp2',
      type: 'Canvas',
      label: {
        none: ['49'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0053.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0053.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0053.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0053.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0053.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0053.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0053.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0053.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0053.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 49'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0054.jp2',
      type: 'Canvas',
      label: {
        none: ['50'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0054.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0054.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0054.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0054.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0054.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0054.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0054.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0054.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0054.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 50'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0055.jp2',
      type: 'Canvas',
      label: {
        none: ['51'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0055.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0055.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0055.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0055.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0055.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0055.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0055.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0055.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0055.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 51'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0056.jp2',
      type: 'Canvas',
      label: {
        none: ['52'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0056.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0056.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0056.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0056.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0056.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0056.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0056.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0056.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0056.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 52'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0057.jp2',
      type: 'Canvas',
      label: {
        none: ['53'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0057.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0057.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0057.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0057.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0057.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0057.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0057.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0057.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0057.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 53'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0058.jp2',
      type: 'Canvas',
      label: {
        none: ['54'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0058.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0058.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0058.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0058.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0058.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0058.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0058.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0058.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0058.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 54'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0059.jp2',
      type: 'Canvas',
      label: {
        none: ['55'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0059.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0059.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0059.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0059.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0059.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0059.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0059.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0059.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0059.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 55'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0060.jp2',
      type: 'Canvas',
      label: {
        none: ['56'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0060.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0060.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0060.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0060.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0060.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0060.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0060.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0060.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0060.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 56'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0061.jp2',
      type: 'Canvas',
      label: {
        none: ['57'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0061.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0061.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0061.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0061.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0061.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0061.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0061.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0061.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0061.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 57'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0062.jp2',
      type: 'Canvas',
      label: {
        none: ['58'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0062.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0062.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0062.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0062.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0062.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0062.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0062.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0062.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0062.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 58'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0063.jp2',
      type: 'Canvas',
      label: {
        none: ['59'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0063.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0063.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0063.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0063.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0063.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0063.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0063.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0063.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0063.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 59'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0064.jp2',
      type: 'Canvas',
      label: {
        none: ['60'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0064.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0064.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0064.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0064.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0064.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0064.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0064.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0064.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0064.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 60'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0065.jp2',
      type: 'Canvas',
      label: {
        none: ['61'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0065.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0065.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0065.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0065.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0065.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0065.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0065.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0065.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0065.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 61'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0066.jp2',
      type: 'Canvas',
      label: {
        none: ['62'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0066.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0066.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0066.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0066.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0066.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0066.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0066.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0066.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0066.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 62'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0067.jp2',
      type: 'Canvas',
      label: {
        none: ['63'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0067.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0067.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0067.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0067.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0067.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0067.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0067.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0067.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0067.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 63'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0068.jp2',
      type: 'Canvas',
      label: {
        none: ['64'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0068.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0068.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0068.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0068.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0068.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0068.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0068.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0068.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0068.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 64'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0069.jp2',
      type: 'Canvas',
      label: {
        none: ['65'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0069.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0069.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0069.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0069.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0069.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0069.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0069.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0069.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0069.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 65'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0070.jp2',
      type: 'Canvas',
      label: {
        none: ['66'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0070.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0070.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0070.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0070.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0070.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0070.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0070.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0070.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0070.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 66'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0071.jp2',
      type: 'Canvas',
      label: {
        none: ['67'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0071.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0071.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0071.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0071.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0071.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0071.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0071.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0071.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0071.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 67'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0072.jp2',
      type: 'Canvas',
      label: {
        none: ['68'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0072.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0072.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0072.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0072.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0072.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0072.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0072.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0072.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0072.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 68'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0073.jp2',
      type: 'Canvas',
      label: {
        none: ['69'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0073.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0073.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0073.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0073.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0073.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0073.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0073.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0073.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0073.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 69'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0074.jp2',
      type: 'Canvas',
      label: {
        none: ['70'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0074.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0074.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0074.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0074.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0074.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0074.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0074.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0074.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0074.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 70'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0075.jp2',
      type: 'Canvas',
      label: {
        none: ['71'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0075.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0075.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0075.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0075.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0075.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0075.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0075.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0075.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0075.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 71'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0076.jp2',
      type: 'Canvas',
      label: {
        none: ['72'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0076.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0076.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0076.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0076.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0076.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0076.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0076.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0076.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0076.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 72'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0077.jp2',
      type: 'Canvas',
      label: {
        none: ['73'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0077.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0077.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0077.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0077.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0077.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0077.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0077.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0077.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0077.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 73'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0078.jp2',
      type: 'Canvas',
      label: {
        none: ['74'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0078.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0078.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0078.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0078.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0078.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0078.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0078.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0078.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0078.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 74'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0079.jp2',
      type: 'Canvas',
      label: {
        none: ['75'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0079.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0079.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0079.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0079.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0079.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0079.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0079.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0079.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0079.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 75'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0080.jp2',
      type: 'Canvas',
      label: {
        none: ['76'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0080.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0080.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0080.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0080.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0080.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0080.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0080.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0080.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0080.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 76'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0081.jp2',
      type: 'Canvas',
      label: {
        none: ['77'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0081.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0081.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0081.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0081.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0081.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0081.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0081.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0081.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0081.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 77'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0082.jp2',
      type: 'Canvas',
      label: {
        none: ['78'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0082.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0082.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0082.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0082.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0082.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0082.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0082.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0082.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0082.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 78'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0083.jp2',
      type: 'Canvas',
      label: {
        none: ['79'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0083.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0083.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0083.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0083.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0083.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0083.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0083.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0083.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0083.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 79'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0084.jp2',
      type: 'Canvas',
      label: {
        none: ['80'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0084.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0084.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0084.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0084.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0084.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0084.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0084.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0084.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0084.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 80'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0085.jp2',
      type: 'Canvas',
      label: {
        none: ['81'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0085.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0085.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0085.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0085.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0085.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0085.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0085.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0085.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0085.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 81'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0086.jp2',
      type: 'Canvas',
      label: {
        none: ['82'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0086.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0086.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0086.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0086.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0086.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0086.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0086.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0086.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0086.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 82'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0087.jp2',
      type: 'Canvas',
      label: {
        none: ['83'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0087.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0087.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0087.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0087.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0087.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0087.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0087.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0087.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0087.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 83'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0088.jp2',
      type: 'Canvas',
      label: {
        none: ['84'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0088.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0088.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0088.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0088.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0088.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0088.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0088.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0088.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0088.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 84'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0089.jp2',
      type: 'Canvas',
      label: {
        none: ['85'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0089.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0089.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0089.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0089.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0089.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0089.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0089.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0089.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0089.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 85'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0090.jp2',
      type: 'Canvas',
      label: {
        none: ['86'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0090.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0090.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0090.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0090.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0090.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0090.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0090.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0090.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0090.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page 86'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0091.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0091.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0091.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0091.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0091.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0091.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0091.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0091.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0091.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0091.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0092.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0092.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0092.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0092.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0092.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0092.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0092.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0092.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0092.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0092.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0093.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0093.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0093.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0093.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0093.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0093.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0093.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0093.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0093.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0093.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0094.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0094.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0094.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0094.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0094.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0094.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0094.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0094.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0094.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0094.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0095.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2105,
      height: 3290,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0095.jp2/full/64,100/0/default.jpg',
          type: 'Image',
          width: 64,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0095.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 655,
              height: 1024,
              sizes: [
                {
                  width: 64,
                  height: 100,
                },
                {
                  width: 128,
                  height: 200,
                },
                {
                  width: 256,
                  height: 400,
                },
                {
                  width: 655,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0095.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0095.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0095.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0095.jp2/full/655,1024/0/default.jpg',
                type: 'Image',
                width: 655,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0095.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2105,
                    height: 3290,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0095.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0095.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0096.jp2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2245,
      height: 3561,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b21538906_0096.jp2/full/63,100/0/default.jpg',
          type: 'Image',
          width: 63,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b21538906_0096.jp2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 646,
              height: 1024,
              sizes: [
                {
                  width: 63,
                  height: 100,
                },
                {
                  width: 126,
                  height: 200,
                },
                {
                  width: 252,
                  height: 400,
                },
                {
                  width: 646,
                  height: 1024,
                },
              ],
            },
          ],
        },
      ],
      seeAlso: [
        {
          id: 'https://api.wellcomecollection.org/text/alto/b21538906/b21538906_0096.jp2',
          type: 'Dataset',
          profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
          label: {
            none: ['METS-ALTO XML'],
          },
          format: 'text/xml',
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0096.jp2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0096.jp2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b21538906_0096.jp2/full/646,1024/0/default.jpg',
                type: 'Image',
                width: 646,
                height: 1024,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b21538906_0096.jp2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2245,
                    height: 3561,
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0096.jp2',
            },
          ],
        },
      ],
      annotations: [
        {
          id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/b21538906_0096.jp2/line',
          type: 'AnnotationPage',
          label: {
            en: ['Text of page  -'],
          },
        },
      ],
    },
  ],
  structures: [
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/ranges/LOG_0001',
      type: 'Range',
      label: {
        none: ['Cover'],
      },
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0001.jp2',
          type: 'Canvas',
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/ranges/LOG_0002',
      type: 'Range',
      label: {
        none: ['Title Page'],
      },
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0007.jp2',
          type: 'Canvas',
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b21538906/ranges/LOG_0003',
      type: 'Range',
      label: {
        none: ['Cover'],
      },
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b21538906/canvases/b21538906_0096.jp2',
          type: 'Canvas',
        },
      ],
    },
  ],
  annotations: [
    {
      id: 'https://iiif.wellcomecollection.org/annotations/v3/b21538906/images',
      type: 'AnnotationPage',
      label: {
        en: ['OCR-identified images and figures for b21538906'],
      },
    },
  ],
  partOf: [
    {
      id: 'https://iiif.wellcomecollection.org/presentation/collections/contributors/xmk3e978',
      type: 'Collection',
      label: {
        en: ['Contributor: Davidson, J. E.'],
      },
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/collections/contributors/qu7wk6cj',
      type: 'Collection',
      label: {
        en: ['Contributor: University of Leeds. Library'],
      },
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/collections/genres/Electronic_books',
      type: 'Collection',
      label: {
        en: ['Genre: Electronic books'],
      },
    },
  ],
};

export const clickThroughService = {
  '@id': 'https://iiif.wellcomecollection.org/auth/clickthrough',
  '@type': 'AuthCookieService1',
  profile: 'http://iiif.io/api/auth/1/clickthrough',
  label: 'Content advisory',
  description:
    '<p>This digitised material is free to access, but contains information or visuals that may:</p><ul><li>include personal details of living individuals</li><li>be upsetting or distressing</li><li>be explicit or graphic</li><li>include objects and images of objects decontextualised in a way that is offensive to the originating culture.</li></ul>By viewing this material, we ask that you use the content lawfully, ethically and responsibly under the conditions set out in our <a href="https://wellcomecollection.cdn.prismic.io/wellcomecollection/d4817da5-c71a-4151-81c4-83e39ad4f5b3_Wellcome+Collection_Access+Policy_Aug+2020.pdf">Access Policy</a>.',
  service: [
    {
      '@id': 'https://iiif.wellcomecollection.org/auth/token',
      '@type': 'AuthTokenService1',
      profile: 'http://iiif.io/api/auth/1/token',
    },
    {
      '@id': 'https://iiif.wellcomecollection.org/auth/clickthrough/logout',
      '@type': 'AuthLogoutService1',
      profile: 'http://iiif.io/api/auth/1/logout',
      label: 'Log out of Wellcome Collection',
    },
  ],
  confirmLabel: 'Accept Terms and Open',
  header: 'Content advisory',
  failureHeader: 'Terms not accepted',
  failureDescription: 'You must accept the terms to view the content.',
};

export const manifestWithClickThroughService = {
  '@context': 'http://iiif.io/api/presentation/3/context.json',
  id: 'https://iiif.wellcomecollection.org/presentation/b19928634',
  type: 'Manifest',
  label: {
    en: ['Channel, Betty'],
  },
  summary: {
    en: ['Correspondence regarding cats.'],
  },
  thumbnail: [
    {
      id: 'https://iiif.wellcomecollection.org/thumbs/b19928634_haldane_5_1_2_5_31_0001.JP2/full/82,100/0/default.jpg',
      type: 'Image',
      width: 82,
      height: 100,
      service: [
        {
          '@id':
            'https://iiif.wellcomecollection.org/thumbs/b19928634_haldane_5_1_2_5_31_0001.JP2',
          '@type': 'ImageService2',
          profile: 'http://iiif.io/api/image/2/level0.json',
          width: 165,
          height: 200,
          sizes: [
            {
              width: 82,
              height: 100,
            },
            {
              width: 165,
              height: 200,
            },
          ],
        },
      ],
    },
  ],
  homepage: [
    {
      id: 'https://wellcomecollection.org/works/fa7pymra',
      type: 'Text',
      label: {
        en: ['Channel, Betty'],
      },
      format: 'text/html',
      language: ['en'],
    },
  ],
  metadata: [
    {
      label: {
        en: ['Description'],
      },
      value: {
        en: ['Correspondence regarding cats.'],
      },
    },
    {
      label: {
        en: ['Reference'],
      },
      value: {
        none: ['HALDANE/5/1/2/5/31'],
      },
    },
    {
      label: {
        en: ['Publication/creation'],
      },
      value: {
        none: ['24 Oct 1949'],
      },
    },
    {
      label: {
        en: ['Physical description'],
      },
      value: {
        en: ['1 letter 2 sides'],
      },
    },
    {
      label: {
        en: ['Attribution and usage'],
      },
      value: {
        en: [
          'Wellcome Collection',
          '<span>You have permission to make copies of this work under a <a target="_top" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons, Attribution, Non-commercial license</a>.<br/><br/>Non-commercial use includes private study, academic research, teaching, and other activities that are not primarily intended for, or directed towards, commercial advantage or private monetary compensation. See the <a target="_top" href="http://creativecommons.org/licenses/by-nc/4.0/legalcode">Legal Code</a> for further information.<br/><br/>Image source should be attributed as specified in the full catalogue record. If no source is given the image should be attributed to Wellcome Collection.</span>',
        ],
      },
    },
  ],
  rights: 'http://creativecommons.org/licenses/by-nc/4.0/',
  provider: [
    {
      id: 'https://wellcomecollection.org',
      type: 'Agent',
      label: {
        en: [
          'Wellcome Collection',
          '183 Euston Road',
          'London NW1 2BE UK',
          'T +44 (0)20 7611 8722',
          'E library@wellcomecollection.org',
          'https://wellcomecollection.org',
        ],
      },
      homepage: [
        {
          id: 'https://wellcomecollection.org/works',
          type: 'Text',
          label: {
            en: ['Explore our collections'],
          },
          format: 'text/html',
        },
      ],
      logo: [
        {
          id: 'https://iiif.wellcomecollection.org/logos/wellcome-collection-black.png',
          type: 'Image',
          format: 'image/png',
        },
      ],
    },
  ],
  rendering: [
    {
      id: 'https://iiif.wellcomecollection.org/pdf/b19928634',
      type: 'Text',
      label: {
        en: ['View as PDF'],
      },
      format: 'application/pdf',
    },
  ],
  seeAlso: [
    {
      id: 'https://api.wellcomecollection.org/catalogue/v2/works/fa7pymra',
      type: 'Dataset',
      profile: 'https://api.wellcomecollection.org/catalogue/v2/context.json',
      label: {
        en: ['Wellcome Collection Catalogue API'],
      },
      format: 'application/json',
    },
  ],
  services: [
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b19928634#tracking',
      type: 'Text',
      profile: 'http://universalviewer.io/tracking-extensions-profile',
      label: {
        en: [
          'Format: Archive, Institution: n/a, Identifier: b19928634, Digicode: diggenetics, Collection code: HALDANE/5/1/2/5/31',
        ],
      },
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b19928634#timestamp',
      type: 'Text',
      profile:
        'https://github.com/wellcomecollection/iiif-builder/build-timestamp',
      label: {
        none: ['2022-03-09T14:42:23.2209649Z'],
      },
    },
    {
      '@id': 'https://iiif.wellcomecollection.org/auth/clickthrough',
      '@type': 'AuthCookieService1',
      profile: 'http://iiif.io/api/auth/1/clickthrough',
      label: 'Content advisory',
      description:
        '<p>This digitised material is free to access, but contains information or visuals that may:</p><ul><li>include personal details of living individuals</li><li>be upsetting or distressing</li><li>be explicit or graphic</li><li>include objects and images of objects decontextualised in a way that is offensive to the originating culture.</li></ul>By viewing this material, we ask that you use the content lawfully, ethically and responsibly under the conditions set out in our <a href="https://wellcomecollection.cdn.prismic.io/wellcomecollection/d4817da5-c71a-4151-81c4-83e39ad4f5b3_Wellcome+Collection_Access+Policy_Aug+2020.pdf">Access Policy</a>.',
      service: [
        {
          '@id': 'https://iiif.wellcomecollection.org/auth/token',
          '@type': 'AuthTokenService1',
          profile: 'http://iiif.io/api/auth/1/token',
        },
        {
          '@id': 'https://iiif.wellcomecollection.org/auth/clickthrough/logout',
          '@type': 'AuthLogoutService1',
          profile: 'http://iiif.io/api/auth/1/logout',
          label: 'Log out of Wellcome Collection',
        },
      ],
      confirmLabel: 'Accept Terms and Open',
      header: 'Content advisory',
      failureHeader: 'Terms not accepted',
      failureDescription: 'You must accept the terms to view the content.',
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b19928634#accesscontrolhints',
      type: 'Text',
      profile: 'http://wellcomelibrary.org/ld/iiif-ext/access-control-hints',
      label: {
        en: ['clickthrough'],
      },
    },
  ],
  items: [
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b19928634/canvases/b19928634_haldane_5_1_2_5_31_0001.JP2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2669,
      height: 3242,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b19928634_haldane_5_1_2_5_31_0001.JP2/full/82,100/0/default.jpg',
          type: 'Image',
          width: 82,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b19928634_haldane_5_1_2_5_31_0001.JP2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 165,
              height: 200,
              sizes: [
                {
                  width: 82,
                  height: 100,
                },
                {
                  width: 165,
                  height: 200,
                },
              ],
            },
          ],
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b19928634/canvases/b19928634_haldane_5_1_2_5_31_0001.JP2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b19928634/canvases/b19928634_haldane_5_1_2_5_31_0001.JP2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b19928634_haldane_5_1_2_5_31_0001.JP2/full/165,200/0/default.jpg',
                type: 'Image',
                width: 165,
                height: 200,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b19928634_haldane_5_1_2_5_31_0001.JP2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2669,
                    height: 3242,
                    service: {
                      '@id':
                        'https://iiif.wellcomecollection.org/auth/clickthrough',
                      '@type': 'AuthCookieService1',
                    },
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b19928634/canvases/b19928634_haldane_5_1_2_5_31_0001.JP2',
            },
          ],
        },
      ],
    },
    {
      id: 'https://iiif.wellcomecollection.org/presentation/b19928634/canvases/b19928634_haldane_5_1_2_5_31_0002.JP2',
      type: 'Canvas',
      label: {
        none: ['-'],
      },
      width: 2672,
      height: 3243,
      thumbnail: [
        {
          id: 'https://iiif.wellcomecollection.org/thumbs/b19928634_haldane_5_1_2_5_31_0002.JP2/full/82,100/0/default.jpg',
          type: 'Image',
          width: 82,
          height: 100,
          service: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b19928634_haldane_5_1_2_5_31_0002.JP2',
              '@type': 'ImageService2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              width: 165,
              height: 200,
              sizes: [
                {
                  width: 82,
                  height: 100,
                },
                {
                  width: 165,
                  height: 200,
                },
              ],
            },
          ],
        },
      ],
      items: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/b19928634/canvases/b19928634_haldane_5_1_2_5_31_0002.JP2/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/b19928634/canvases/b19928634_haldane_5_1_2_5_31_0002.JP2/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif.wellcomecollection.org/image/b19928634_haldane_5_1_2_5_31_0002.JP2/full/165,200/0/default.jpg',
                type: 'Image',
                width: 165,
                height: 200,
                format: 'image/jpeg',
                service: [
                  {
                    '@id':
                      'https://iiif.wellcomecollection.org/image/b19928634_haldane_5_1_2_5_31_0002.JP2',
                    '@type': 'ImageService2',
                    profile: 'http://iiif.io/api/image/2/level1.json',
                    width: 2672,
                    height: 3243,
                    service: {
                      '@id':
                        'https://iiif.wellcomecollection.org/auth/clickthrough',
                      '@type': 'AuthCookieService1',
                    },
                  },
                ],
              },
              target:
                'https://iiif.wellcomecollection.org/presentation/b19928634/canvases/b19928634_haldane_5_1_2_5_31_0002.JP2',
            },
          ],
        },
      ],
    },
  ],
  partOf: [
    {
      id: 'https://iiif.wellcomecollection.org/presentation/collections/archives/HALDANE/5/1/2/5',
      type: 'Collection',
      label: {
        en: ['Cats'],
      },
      partOf: [
        {
          id: 'https://iiif.wellcomecollection.org/presentation/collections/archives/HALDANE/5/1/2',
          type: 'Collection',
          label: {
            en: ['General Correspondence Subjects A-Z 1938-1950'],
          },
          partOf: [
            {
              id: 'https://iiif.wellcomecollection.org/presentation/collections/archives/HALDANE/5/1',
              type: 'Collection',
              label: {
                en: ['General Correspondence'],
              },
              partOf: [
                {
                  id: 'https://iiif.wellcomecollection.org/presentation/collections/archives/HALDANE/5',
                  type: 'Collection',
                  label: {
                    en: ['Correspondence'],
                  },
                  partOf: [
                    {
                      id: 'https://iiif.wellcomecollection.org/presentation/collections/archives/HALDANE',
                      type: 'Collection',
                      label: {
                        en: ['Haldane Papers'],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const manifestAllBornDigital = {
  items: [
    {
      id: 'https://iiif-test.wellcomecollection.org/presentation/ARTCOO/B/10/canvases/ARTCOO_B_10---1_English_Ver.pdf',
      type: 'Canvas',
      label: {
        none: ['1_English_Ver.pdf'],
      },
      width: 5000,
      height: 5000,
      thumbnail: [
        {
          id: 'https://iiif-test.wellcomecollection.org/extensions/born-digital/placeholder-thumb/fmt/17/application/pdf',
          type: 'Image',
          width: 500,
          height: 500,
          format: 'image/png',
        },
      ],
      metadata: [
        {
          label: {
            en: ['File format'],
          },
          value: {
            none: ['Acrobat PDF 1.3 - Portable Document Format'],
          },
        },
        {
          label: {
            en: ['File size'],
          },
          value: {
            none: ['1.9 MB'],
          },
        },
        {
          label: {
            en: ['Pronom key'],
          },
          value: {
            none: ['fmt/17'],
          },
        },
        {
          label: {
            en: ['Full path'],
          },
          value: {
            none: ['1_English_Ver.pdf'],
          },
        },
      ],
      rendering: [
        {
          id: 'https://iiif-test.wellcomecollection.org/file/ARTCOO_B_10---1_English_Ver.pdf',
          type: 'Text',
          label: {
            none: ['1_English_Ver.pdf'],
          },
          format: 'application/pdf',
          behavior: ['original'],
        },
      ],
      behavior: ['placeholder'],
      navDate: '2022-03-25T00:00:00.0000000',
      items: [
        {
          id: 'https://iiif-test.wellcomecollection.org/presentation/ARTCOO/B/10/canvases/ARTCOO_B_10---1_English_Ver.pdf/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif-test.wellcomecollection.org/presentation/ARTCOO/B/10/canvases/ARTCOO_B_10---1_English_Ver.pdf/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif-test.wellcomecollection.org/extensions/born-digital/placeholder-canvas/fmt/17/application/pdf',
                type: 'Image',
                width: 5000,
                height: 5000,
                format: 'image/png',
              },
              target:
                'https://iiif-test.wellcomecollection.org/presentation/ARTCOO/B/10/canvases/ARTCOO_B_10---1_English_Ver.pdf',
            },
          ],
        },
      ],
    },
    {
      id: 'https://iiif-test.wellcomecollection.org/presentation/ARTCOO/B/10/canvases/ARTCOO_B_10---2_Japanese_Ver.pdf',
      type: 'Canvas',
      label: {
        none: ['2_Japanese_Ver.pdf'],
      },
      width: 5000,
      height: 5000,
      thumbnail: [
        {
          id: 'https://iiif-test.wellcomecollection.org/extensions/born-digital/placeholder-thumb/fmt/17/application/pdf',
          type: 'Image',
          width: 500,
          height: 500,
          format: 'image/png',
        },
      ],
      metadata: [
        {
          label: {
            en: ['File format'],
          },
          value: {
            none: ['Acrobat PDF 1.3 - Portable Document Format'],
          },
        },
        {
          label: {
            en: ['File size'],
          },
          value: {
            none: ['1.9 MB'],
          },
        },
        {
          label: {
            en: ['Pronom key'],
          },
          value: {
            none: ['fmt/17'],
          },
        },
        {
          label: {
            en: ['Full path'],
          },
          value: {
            none: ['2_Japanese_Ver.pdf'],
          },
        },
      ],
      rendering: [
        {
          id: 'https://iiif-test.wellcomecollection.org/file/ARTCOO_B_10---2_Japanese_Ver.pdf',
          type: 'Text',
          label: {
            none: ['2_Japanese_Ver.pdf'],
          },
          format: 'application/pdf',
          behavior: ['original'],
        },
      ],
      behavior: ['placeholder'],
      navDate: '2022-03-25T00:00:00.0000000',
      items: [
        {
          id: 'https://iiif-test.wellcomecollection.org/presentation/ARTCOO/B/10/canvases/ARTCOO_B_10---2_Japanese_Ver.pdf/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif-test.wellcomecollection.org/presentation/ARTCOO/B/10/canvases/ARTCOO_B_10---2_Japanese_Ver.pdf/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif-test.wellcomecollection.org/extensions/born-digital/placeholder-canvas/fmt/17/application/pdf',
                type: 'Image',
                width: 5000,
                height: 5000,
                format: 'image/png',
              },
              target:
                'https://iiif-test.wellcomecollection.org/presentation/ARTCOO/B/10/canvases/ARTCOO_B_10---2_Japanese_Ver.pdf',
            },
          ],
        },
      ],
    },
  ],
};

export const manifestMixedBornDigital = {
  items: [
    {
      id: 'https://iiif-stage.wellcomecollection.org/presentation/SAWFO/J/4/canvases/SAWFO_J_4---Disc_2---WFOT_ms.pps',
      type: 'Canvas',
      label: {
        none: ['WFOT_ms.pps'],
      },
      width: 1000,
      height: 800,
      thumbnail: [
        {
          id: 'https://iiif-stage.wellcomecollection.org/extensions/born-digital/placeholder-thumb/fmt/126/application/vnd.ms-powerpoint',
          type: 'Image',
          width: 101,
          height: 151,
          format: 'image/png',
        },
      ],
      metadata: [
        {
          label: {
            en: ['File format'],
          },
          value: {
            none: ['Microsoft Powerpoint'],
          },
        },
        {
          label: {
            en: ['File size'],
          },
          value: {
            none: ['1.6 MB'],
          },
        },
        {
          label: {
            en: ['Pronom key'],
          },
          value: {
            none: ['fmt/126'],
          },
        },
        {
          label: {
            en: ['Full path'],
          },
          value: {
            none: ['Disc_2/WFOT_ms.pps'],
          },
        },
      ],
      rendering: [
        {
          id: 'https://iiif-stage.wellcomecollection.org/file/SAWFO_J_4---Disc_2---WFOT_ms.pps',
          type: 'Text',
          label: {
            none: ['WFOT_ms.pps'],
          },
          format: 'application/vnd.ms-powerpoint',
          behavior: ['original'],
        },
      ],
      behavior: ['placeholder'],
      navDate: '2023-04-12T09:34:48.0000000+00:00',
      items: [
        {
          id: 'https://iiif-stage.wellcomecollection.org/presentation/SAWFO/J/4/canvases/SAWFO_J_4---Disc_2---WFOT_ms.pps/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif-stage.wellcomecollection.org/presentation/SAWFO/J/4/canvases/SAWFO_J_4---Disc_2---WFOT_ms.pps/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://iiif-stage.wellcomecollection.org/extensions/born-digital/placeholder-canvas/fmt/126/application/vnd.ms-powerpoint',
                type: 'Image',
                width: 1000,
                height: 800,
                format: 'image/png',
              },
              target:
                'https://iiif-stage.wellcomecollection.org/presentation/SAWFO/J/4/canvases/SAWFO_J_4---Disc_2---WFOT_ms.pps',
            },
          ],
        },
      ],
    },
    {
      id: 'https://iiif-stage.wellcomecollection.org/presentation/SAWFO/J/4/canvases/SAWFO_J_4---Disc_2---slide13.wav',
      type: 'Canvas',
      label: {
        none: ['slide13.wav'],
      },
      duration: 52.519,
      metadata: [
        {
          label: {
            en: ['Full path'],
          },
          value: {
            none: ['Disc_2/slide13.wav'],
          },
        },
      ],
      rendering: [
        {
          duration: 52.519,
          id: 'https://iiif-stage.wellcomecollection.org/av/SAWFO_J_4---Disc_2---slide13.wav/full/max/default.mp3',
          type: 'Sound',
          label: {
            en: ['Audio file, 52.519 s'],
          },
          format: 'audio/mp3',
        },
      ],
      navDate: '2023-04-12T09:34:41.0000000+00:00',
      items: [
        {
          id: 'https://iiif-stage.wellcomecollection.org/presentation/SAWFO/J/4/canvases/SAWFO_J_4---Disc_2---slide13.wav/painting',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://iiif-stage.wellcomecollection.org/presentation/SAWFO/J/4/canvases/SAWFO_J_4---Disc_2---slide13.wav/painting/anno',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                duration: 52.519,
                id: 'https://iiif-stage.wellcomecollection.org/av/SAWFO_J_4---Disc_2---slide13.wav/full/max/default.mp3',
                type: 'Sound',
                label: {
                  en: ['Audio file, 52.519 s'],
                },
                format: 'audio/mp3',
              },
              target:
                'https://iiif-stage.wellcomecollection.org/presentation/SAWFO/J/4/canvases/SAWFO_J_4---Disc_2---slide13.wav',
            },
          ],
        },
      ],
    },
  ],
};
