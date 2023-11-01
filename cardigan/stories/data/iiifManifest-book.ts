const bookManifest = {
  '@context': 'http://iiif.io/api/presentation/2/context.json',
  '@id': 'https://iiif.wellcomecollection.org/presentation/v2/b28043534',
  '@type': 'sc:Manifest',
  label:
    'Principles of scientific botany, or, Botany as an inductive science  / by J.M. Schleiden ; translated by Edwin Lankester.',
  metadata: [
    {
      label: 'Publication/creation',
      value: 'London : Longman, Brown, Green, and Longmans, 1849.',
    },
    {
      label: 'Physical description',
      value: 'viii, 616 pages, 6 leaves of plates : illustrations',
    },
    {
      label: 'Contributors',
      value:
        'Lankester, E. Ray Sir, 1847-1929.; Schleiden, M. J. 1804-1881.; Royal College of Physicians of Edinburgh',
    },
    {
      label: 'Notes',
      value: 'Titl: Translation of: Grundaige der Wissenschaftlien Botanic',
    },
    {
      label: 'Type/technique',
      value: 'Electronic books',
    },
    {
      label: 'Subjects',
      value: 'Botany',
    },
    {
      label: 'Attribution',
      value: 'Royal College of Physicians Edinburgh',
    },
    {
      label: 'Full conditions of use',
      value:
        "&lt;span&gt;This work has been identified as being free of known restrictions under copyright law, including all related and neighbouring rights and is being made available under the &lt;a target='_top' href='http://creativecommons.org/publicdomain/mark/1.0/';&gt;Creative Commons, Public Domain Mark&lt;/a&gt;.&lt;br/&gt;&lt;br/&gt;You can copy, modify, distribute and perform the work, even for commercial purposes, without asking permission.&lt;/span&gt;",
    },
    {
      label: 'Repository',
      value:
        '&lt;img src="https://iiif.wellcomecollection.org/partners/rcpe-logo.jpg&apos; alt="Royal College of Physicians Edinburgh" /&gt;&lt;br/&gt;&lt;br/&gt;This material has been provided by This material has been provided by the Royal College of Physicians of Edinburgh. The original may be consulted at the Royal College of Physicians of Edinburgh. where the originals may be consulted.',
    },
  ],
  thumbnail: {
    '@id':
      'https://iiif.wellcomecollection.org/thumbs/b28043534_0007.jp2/full/57,100/0/default.jpg',
    '@type': 'dctypes:Image',
    service: {
      '@context': 'http://iiif.io/api/image/2/context.json',
      '@id': 'https://iiif.wellcomecollection.org/thumbs/b28043534_0007.jp2',
      profile: 'http://iiif.io/api/image/2/level0.json',
      protocol: 'http://iiif.io/api/image',
      width: 586,
      height: 1024,
      sizes: [
        {
          width: 57,
          height: 100,
        },
        {
          width: 114,
          height: 200,
        },
        {
          width: 229,
          height: 400,
        },
        {
          width: 586,
          height: 1024,
        },
      ],
    },
  },
  license: 'http://creativecommons.org/publicdomain/mark/1.0/',
  logo: 'https://iiif.wellcomecollection.org/logos/wellcome-collection-black.png',
  related: {
    '@id': 'https://wellcomecollection.org/works/a6ht5s6g',
    format: 'text/html',
    label:
      'Principles of scientific botany, or, Botany as an inductive science  / by J.M. Schleiden ; translated by Edwin Lankester.',
  },
  seeAlso: {
    '@id': 'https://api.wellcomecollection.org/catalogue/v2/works/a6ht5s6g',
    profile: 'https://api.wellcomecollection.org/catalogue/v2/context.json',
    format: 'application/json',
    label: 'Wellcome Collection Catalogue API',
  },
  service: [
    {
      '@context': 'http://iiif.io/api/search/0/context.json',
      '@id': 'https://iiif.wellcomecollection.org/search/v0/b28043534',
      profile: 'http://iiif.io/api/search/0/search',
      label: 'Search within this manifest',
      service: {
        '@id':
          'https://iiif.wellcomecollection.org/search/autocomplete/v1/b28043534',
        profile: 'http://iiif.io/api/search/0/autocomplete',
        label: 'Autocomplete words in this manifest',
      },
    },
    {
      '@context': 'http://universalviewer.io/context.json',
      '@id': 'http://wellcomelibrary.org/service/trackingLabels/b28043534',
      profile: 'http://universalviewer.io/tracking-extensions-profile',
      trackingLabel:
        'Format: Monograph, Institution: Royal College of Physicians Edinburgh, Identifier: b28043534, Digicode: digukmhl, Collection code: n/a',
    },
    {
      '@context': 'http://wellcomelibrary.org/ld/iiif-ext/0/context.json',
      '@id':
        'https://wellcomelibrary.org/iiif/b28043534/access-control-hints-service',
      profile: 'http://wellcomelibrary.org/ld/iiif-ext/access-control-hints',
      accessHint: 'open',
    },
  ],
  sequences: [
    {
      '@id':
        'https://iiif.wellcomecollection.org/presentation/v2/b28043534/sequences/s0',
      '@type': 'sc:Sequence',
      label: 'Sequence s0',
      rendering: [
        {
          '@id': 'https://iiif.wellcomecollection.org/pdf/b28043534',
          label: 'View as PDF',
          format: 'application/pdf',
        },
        {
          '@id': 'https://api.wellcomecollection.org/text/v1/b28043534',
          label: 'View raw text',
          format: 'text/plain',
        },
      ],
      viewingHint: 'paged',
      canvases: [
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0001.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0001.jp2/full/61,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0001.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 626,
              height: 1024,
              sizes: [
                {
                  width: 61,
                  height: 100,
                },
                {
                  width: 122,
                  height: 200,
                },
                {
                  width: 244,
                  height: 400,
                },
                {
                  width: 626,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0001.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3473,
          width: 2122,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0001.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0001.jp2/full/626,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 626,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0001.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 2122,
                  height: 3473,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0001.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0001.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0002.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0002.jp2/full/57,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0002.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 586,
              height: 1024,
              sizes: [
                {
                  width: 57,
                  height: 100,
                },
                {
                  width: 114,
                  height: 200,
                },
                {
                  width: 229,
                  height: 400,
                },
                {
                  width: 586,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0002.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3379,
          width: 1933,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0002.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0002.jp2/full/586,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 586,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0002.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1933,
                  height: 3379,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0002.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0002.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0003.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0003.jp2/full/57,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0003.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 586,
              height: 1024,
              sizes: [
                {
                  width: 57,
                  height: 100,
                },
                {
                  width: 114,
                  height: 200,
                },
                {
                  width: 229,
                  height: 400,
                },
                {
                  width: 586,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0003.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3379,
          width: 1933,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0003.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0003.jp2/full/586,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 586,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0003.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1933,
                  height: 3379,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0003.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0003.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0004.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0004.jp2/full/57,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0004.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 586,
              height: 1024,
              sizes: [
                {
                  width: 57,
                  height: 100,
                },
                {
                  width: 114,
                  height: 200,
                },
                {
                  width: 229,
                  height: 400,
                },
                {
                  width: 586,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0004.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3379,
          width: 1933,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0004.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0004.jp2/full/586,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 586,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0004.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1933,
                  height: 3379,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0004.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0004.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0005.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0005.jp2/full/57,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0005.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 586,
              height: 1024,
              sizes: [
                {
                  width: 57,
                  height: 100,
                },
                {
                  width: 114,
                  height: 200,
                },
                {
                  width: 229,
                  height: 400,
                },
                {
                  width: 586,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0005.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3379,
          width: 1933,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0005.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0005.jp2/full/586,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 586,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0005.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1933,
                  height: 3379,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0005.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0005.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0006.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0006.jp2/full/57,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0006.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 586,
              height: 1024,
              sizes: [
                {
                  width: 57,
                  height: 100,
                },
                {
                  width: 114,
                  height: 200,
                },
                {
                  width: 229,
                  height: 400,
                },
                {
                  width: 586,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0006.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3379,
          width: 1933,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0006.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0006.jp2/full/586,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 586,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0006.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1933,
                  height: 3379,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0006.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0006.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0007.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0007.jp2/full/57,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0007.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 586,
              height: 1024,
              sizes: [
                {
                  width: 57,
                  height: 100,
                },
                {
                  width: 114,
                  height: 200,
                },
                {
                  width: 229,
                  height: 400,
                },
                {
                  width: 586,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0007.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3379,
          width: 1933,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0007.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0007.jp2/full/586,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 586,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0007.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1933,
                  height: 3379,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0007.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0007.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0008.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0008.jp2/full/57,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0008.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 586,
              height: 1024,
              sizes: [
                {
                  width: 57,
                  height: 100,
                },
                {
                  width: 114,
                  height: 200,
                },
                {
                  width: 229,
                  height: 400,
                },
                {
                  width: 586,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0008.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3379,
          width: 1933,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0008.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0008.jp2/full/586,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 586,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0008.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1933,
                  height: 3379,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0008.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0008.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0009.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0009.jp2/full/57,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0009.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 586,
              height: 1024,
              sizes: [
                {
                  width: 57,
                  height: 100,
                },
                {
                  width: 114,
                  height: 200,
                },
                {
                  width: 229,
                  height: 400,
                },
                {
                  width: 586,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0009.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3379,
          width: 1933,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0009.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0009.jp2/full/586,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 586,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0009.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1933,
                  height: 3379,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0009.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0009.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0010.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0010.jp2/full/57,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0010.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 586,
              height: 1024,
              sizes: [
                {
                  width: 57,
                  height: 100,
                },
                {
                  width: 114,
                  height: 200,
                },
                {
                  width: 229,
                  height: 400,
                },
                {
                  width: 586,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0010.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3379,
          width: 1933,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0010.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0010.jp2/full/586,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 586,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0010.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1933,
                  height: 3379,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0010.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0010.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0011.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0011.jp2/full/57,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0011.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 586,
              height: 1024,
              sizes: [
                {
                  width: 57,
                  height: 100,
                },
                {
                  width: 114,
                  height: 200,
                },
                {
                  width: 229,
                  height: 400,
                },
                {
                  width: 586,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0011.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3379,
          width: 1933,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0011.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0011.jp2/full/586,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 586,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0011.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1933,
                  height: 3379,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0011.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0011.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0012.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0012.jp2/full/57,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0012.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 586,
              height: 1024,
              sizes: [
                {
                  width: 57,
                  height: 100,
                },
                {
                  width: 114,
                  height: 200,
                },
                {
                  width: 229,
                  height: 400,
                },
                {
                  width: 586,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0012.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3379,
          width: 1933,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0012.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0012.jp2/full/586,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 586,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0012.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1933,
                  height: 3379,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0012.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0012.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0013.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0013.jp2/full/57,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0013.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 586,
              height: 1024,
              sizes: [
                {
                  width: 57,
                  height: 100,
                },
                {
                  width: 114,
                  height: 200,
                },
                {
                  width: 229,
                  height: 400,
                },
                {
                  width: 586,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0013.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3379,
          width: 1933,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0013.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0013.jp2/full/586,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 586,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0013.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1933,
                  height: 3379,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0013.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0013.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0014.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0014.jp2/full/57,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0014.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 586,
              height: 1024,
              sizes: [
                {
                  width: 57,
                  height: 100,
                },
                {
                  width: 114,
                  height: 200,
                },
                {
                  width: 229,
                  height: 400,
                },
                {
                  width: 586,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0014.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3379,
          width: 1933,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0014.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0014.jp2/full/586,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 586,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0014.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1933,
                  height: 3379,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0014.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0014.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0015.jp2',
          '@type': 'sc:Canvas',
          label: '1',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0015.jp2/full/57,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0015.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 586,
              height: 1024,
              sizes: [
                {
                  width: 57,
                  height: 100,
                },
                {
                  width: 114,
                  height: 200,
                },
                {
                  width: 229,
                  height: 400,
                },
                {
                  width: 586,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0015.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3379,
          width: 1933,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0015.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0015.jp2/full/586,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 586,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0015.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1933,
                  height: 3379,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0015.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0015.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page 1',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0016.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0016.jp2/full/57,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0016.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 586,
              height: 1024,
              sizes: [
                {
                  width: 57,
                  height: 100,
                },
                {
                  width: 114,
                  height: 200,
                },
                {
                  width: 229,
                  height: 400,
                },
                {
                  width: 586,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0016.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3379,
          width: 1933,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0016.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0016.jp2/full/586,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 586,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0016.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1933,
                  height: 3379,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0016.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0016.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0017.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0017.jp2/full/57,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0017.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 586,
              height: 1024,
              sizes: [
                {
                  width: 57,
                  height: 100,
                },
                {
                  width: 114,
                  height: 200,
                },
                {
                  width: 229,
                  height: 400,
                },
                {
                  width: 586,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0017.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3379,
          width: 1933,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0017.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0017.jp2/full/586,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 586,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0017.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1933,
                  height: 3379,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0017.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0017.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0018.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0018.jp2/full/56,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0018.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 578,
              height: 1024,
              sizes: [
                {
                  width: 56,
                  height: 100,
                },
                {
                  width: 113,
                  height: 200,
                },
                {
                  width: 226,
                  height: 400,
                },
                {
                  width: 578,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0018.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3466,
          width: 1955,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0018.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0018.jp2/full/578,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 578,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0018.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1955,
                  height: 3466,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0018.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0018.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0019.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0019.jp2/full/58,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0019.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 589,
              height: 1024,
              sizes: [
                {
                  width: 58,
                  height: 100,
                },
                {
                  width: 115,
                  height: 200,
                },
                {
                  width: 230,
                  height: 400,
                },
                {
                  width: 589,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0019.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3437,
          width: 1977,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0019.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0019.jp2/full/589,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 589,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0019.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1977,
                  height: 3437,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0019.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0019.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0020.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0020.jp2/full/56,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0020.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 578,
              height: 1024,
              sizes: [
                {
                  width: 56,
                  height: 100,
                },
                {
                  width: 113,
                  height: 200,
                },
                {
                  width: 226,
                  height: 400,
                },
                {
                  width: 578,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0020.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3466,
          width: 1955,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0020.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0020.jp2/full/578,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 578,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0020.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1955,
                  height: 3466,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0020.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0020.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0021.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0021.jp2/full/58,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0021.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 589,
              height: 1024,
              sizes: [
                {
                  width: 58,
                  height: 100,
                },
                {
                  width: 115,
                  height: 200,
                },
                {
                  width: 230,
                  height: 400,
                },
                {
                  width: 589,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0021.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3437,
          width: 1977,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0021.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0021.jp2/full/589,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 589,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0021.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1977,
                  height: 3437,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0021.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0021.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0022.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0022.jp2/full/56,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0022.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 578,
              height: 1024,
              sizes: [
                {
                  width: 56,
                  height: 100,
                },
                {
                  width: 113,
                  height: 200,
                },
                {
                  width: 226,
                  height: 400,
                },
                {
                  width: 578,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0022.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3466,
          width: 1955,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0022.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0022.jp2/full/578,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 578,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0022.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1955,
                  height: 3466,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0022.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0022.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0023.jp2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b28043534_0023.jp2/full/58,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b28043534_0023.jp2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 589,
              height: 1024,
              sizes: [
                {
                  width: 58,
                  height: 100,
                },
                {
                  width: 115,
                  height: 200,
                },
                {
                  width: 230,
                  height: 400,
                },
                {
                  width: 589,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b28043534/b28043534_0023.jp2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 3437,
          width: 1977,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0023.jp2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b28043534_0023.jp2/full/589,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 589,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b28043534_0023.jp2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1977,
                  height: 3437,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0023.jp2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b28043534/b28043534_0023.jp2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
      ],
    },
  ],
  structures: [
    {
      '@id':
        'https://iiif.wellcomecollection.org/presentation/b28043534/ranges/LOG_0001',
      '@type': 'sc:Range',
      label: 'Cover',
      canvases: [
        'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0001.jp2',
      ],
      within: '',
    },
    {
      '@id':
        'https://iiif.wellcomecollection.org/presentation/b28043534/ranges/LOG_0002',
      '@type': 'sc:Range',
      label: 'Title Page',
      canvases: [
        'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0007.jp2',
      ],
      within: '',
    },
    {
      '@id':
        'https://iiif.wellcomecollection.org/presentation/b28043534/ranges/LOG_0003',
      '@type': 'sc:Range',
      label: 'Table of Contents',
      canvases: [
        'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0011.jp2',
      ],
      within: '',
    },
    {
      '@id':
        'https://iiif.wellcomecollection.org/presentation/b28043534/ranges/LOG_0004',
      '@type': 'sc:Range',
      label: 'Cover',
      canvases: [
        'https://iiif.wellcomecollection.org/presentation/b28043534/canvases/b28043534_0646.jp2',
      ],
      within: '',
    },
  ],
  otherContent: [
    {
      '@id':
        'https://iiif.wellcomecollection.org/annotations/v2/b28043534/images',
      '@type': 'sc:AnnotationList',
      label: 'OCR-identified images and figures for b28043534',
    },
  ],
  within:
    'https://iiif.wellcomecollection.org/presentation/v2/collections/contributors/p4f2x563',
};

export default bookManifest;
