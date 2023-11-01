const multiManifest = {
  '@context': 'http://iiif.io/api/presentation/2/context.json',
  '@id': 'https://iiif.wellcomecollection.org/presentation/v2/b18031961_0001',
  '@type': 'sc:Manifest',
  label:
    'The life and letters of Charles Darwin : including an autobiographical chapter / edited by his son, Francis Darwin.',
  metadata: [
    {
      label: 'Publication/creation',
      value: 'London : John Murray, 1887.',
    },
    {
      label: 'Physical description',
      value: '3 volumes : frontispiece (portrait), illustrations ; 23 cm',
    },
    {
      label: 'Contributors',
      value: 'Darwin, Charles, 1809-1882.; Darwin, Francis, Sir, 1848-1925.',
    },
    {
      label: 'Type/technique',
      value: 'Autobiographies',
    },
    {
      label: 'Subjects',
      value:
        'Scientists; Autobiographies as Topic; Science; Biological Evolution; Darwin, Charles, 1809-1882.',
    },
    {
      label: 'Attribution',
      value: 'Wellcome Collection',
    },
    {
      label: 'Full conditions of use',
      value:
        "&lt;span&gt;This work has been identified as being free of known restrictions under copyright law, including all related and neighbouring rights and is being made available under the &lt;a target='_top' href='http://creativecommons.org/publicdomain/mark/1.0/';&gt;Creative Commons, Public Domain Mark&lt;/a&gt;.&lt;br/&gt;&lt;br/&gt;You can copy, modify, distribute and perform the work, even for commercial purposes, without asking permission.&lt;/span&gt;",
    },
  ],
  thumbnail: {
    '@id':
      'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0010.JP2/full/60,100/0/default.jpg',
    '@type': 'dctypes:Image',
    service: {
      '@context': 'http://iiif.io/api/image/2/context.json',
      '@id':
        'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0010.JP2',
      profile: 'http://iiif.io/api/image/2/level0.json',
      protocol: 'http://iiif.io/api/image',
      width: 611,
      height: 1024,
      sizes: [
        {
          width: 60,
          height: 100,
        },
        {
          width: 119,
          height: 200,
        },
        {
          width: 239,
          height: 400,
        },
        {
          width: 611,
          height: 1024,
        },
      ],
    },
  },
  license: 'http://creativecommons.org/publicdomain/mark/1.0/',
  logo: 'https://iiif.wellcomecollection.org/logos/wellcome-collection-black.png',
  related: {
    '@id': 'https://wellcomecollection.org/works/vmtjfzgw',
    format: 'text/html',
    label:
      'The life and letters of Charles Darwin : including an autobiographical chapter / edited by his son, Francis Darwin.',
  },
  seeAlso: {
    '@id': 'https://api.wellcomecollection.org/catalogue/v2/works/vmtjfzgw',
    profile: 'https://api.wellcomecollection.org/catalogue/v2/context.json',
    format: 'application/json',
    label: 'Wellcome Collection Catalogue API',
  },
  service: [
    {
      '@context': 'http://iiif.io/api/search/0/context.json',
      '@id': 'https://iiif.wellcomecollection.org/search/v0/b18031961_0001',
      profile: 'http://iiif.io/api/search/0/search',
      label: 'Search within this manifest',
      service: {
        '@id':
          'https://iiif.wellcomecollection.org/search/autocomplete/v1/b18031961_0001',
        profile: 'http://iiif.io/api/search/0/autocomplete',
        label: 'Autocomplete words in this manifest',
      },
    },
    {
      '@context': 'http://universalviewer.io/context.json',
      '@id': 'http://wellcomelibrary.org/service/trackingLabels/b18031961_0001',
      profile: 'http://universalviewer.io/tracking-extensions-profile',
      trackingLabel:
        'Format: Monograph, Institution: n/a, Identifier: b18031961, Digicode: diggenetics, Collection code: n/a',
    },
    {
      '@context': 'http://wellcomelibrary.org/ld/iiif-ext/0/context.json',
      '@id':
        'https://wellcomelibrary.org/iiif/b18031961_0001/access-control-hints-service',
      profile: 'http://wellcomelibrary.org/ld/iiif-ext/access-control-hints',
      accessHint: 'open',
    },
  ],
  sequences: [
    {
      '@id':
        'https://iiif.wellcomecollection.org/presentation/v2/b18031961_0001/sequences/s0',
      '@type': 'sc:Sequence',
      label: 'Sequence s0',
      rendering: [
        {
          '@id': 'https://iiif.wellcomecollection.org/pdf/b18031961_0001',
          label: 'View as PDF',
          format: 'application/pdf',
        },
        {
          '@id': 'https://api.wellcomecollection.org/text/v1/b18031961_0001',
          label: 'View raw text',
          format: 'text/plain',
        },
      ],
      viewingHint: 'paged',
      canvases: [
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0001.JP2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0001.JP2/full/67,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0001.JP2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 683,
              height: 1024,
              sizes: [
                {
                  width: 67,
                  height: 100,
                },
                {
                  width: 133,
                  height: 200,
                },
                {
                  width: 267,
                  height: 400,
                },
                {
                  width: 683,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b18031961_0001/b18031961_vol_1_0001.JP2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 5616,
          width: 3744,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0001.JP2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0001.JP2/full/683,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 683,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0001.JP2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 3744,
                  height: 5616,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0001.JP2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b18031961_0001/b18031961_vol_1_0001.JP2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0003.JP2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0003.JP2/full/60,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0003.JP2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 611,
              height: 1024,
              sizes: [
                {
                  width: 60,
                  height: 100,
                },
                {
                  width: 119,
                  height: 200,
                },
                {
                  width: 239,
                  height: 400,
                },
                {
                  width: 611,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b18031961_0001/b18031961_vol_1_0003.JP2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 2888,
          width: 1724,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0003.JP2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0003.JP2/full/611,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 611,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0003.JP2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1724,
                  height: 2888,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0003.JP2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b18031961_0001/b18031961_vol_1_0003.JP2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0004.JP2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0004.JP2/full/60,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0004.JP2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 611,
              height: 1024,
              sizes: [
                {
                  width: 60,
                  height: 100,
                },
                {
                  width: 119,
                  height: 200,
                },
                {
                  width: 239,
                  height: 400,
                },
                {
                  width: 611,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b18031961_0001/b18031961_vol_1_0004.JP2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 2888,
          width: 1724,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0004.JP2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0004.JP2/full/611,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 611,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0004.JP2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1724,
                  height: 2888,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0004.JP2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b18031961_0001/b18031961_vol_1_0004.JP2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0005.JP2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0005.JP2/full/60,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0005.JP2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 611,
              height: 1024,
              sizes: [
                {
                  width: 60,
                  height: 100,
                },
                {
                  width: 119,
                  height: 200,
                },
                {
                  width: 239,
                  height: 400,
                },
                {
                  width: 611,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b18031961_0001/b18031961_vol_1_0005.JP2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 2888,
          width: 1724,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0005.JP2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0005.JP2/full/611,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 611,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0005.JP2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1724,
                  height: 2888,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0005.JP2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b18031961_0001/b18031961_vol_1_0005.JP2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0006.JP2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0006.JP2/full/60,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0006.JP2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 611,
              height: 1024,
              sizes: [
                {
                  width: 60,
                  height: 100,
                },
                {
                  width: 119,
                  height: 200,
                },
                {
                  width: 239,
                  height: 400,
                },
                {
                  width: 611,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b18031961_0001/b18031961_vol_1_0006.JP2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 2888,
          width: 1724,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0006.JP2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0006.JP2/full/611,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 611,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0006.JP2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1724,
                  height: 2888,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0006.JP2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b18031961_0001/b18031961_vol_1_0006.JP2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0007.JP2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0007.JP2/full/60,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0007.JP2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 611,
              height: 1024,
              sizes: [
                {
                  width: 60,
                  height: 100,
                },
                {
                  width: 119,
                  height: 200,
                },
                {
                  width: 239,
                  height: 400,
                },
                {
                  width: 611,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b18031961_0001/b18031961_vol_1_0007.JP2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 2888,
          width: 1724,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0007.JP2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0007.JP2/full/611,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 611,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0007.JP2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1724,
                  height: 2888,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0007.JP2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b18031961_0001/b18031961_vol_1_0007.JP2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0008.JP2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0008.JP2/full/60,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0008.JP2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 611,
              height: 1024,
              sizes: [
                {
                  width: 60,
                  height: 100,
                },
                {
                  width: 119,
                  height: 200,
                },
                {
                  width: 239,
                  height: 400,
                },
                {
                  width: 611,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b18031961_0001/b18031961_vol_1_0008.JP2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 2888,
          width: 1724,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0008.JP2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0008.JP2/full/611,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 611,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0008.JP2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1724,
                  height: 2888,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0008.JP2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b18031961_0001/b18031961_vol_1_0008.JP2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0009.JP2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0009.JP2/full/60,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0009.JP2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 611,
              height: 1024,
              sizes: [
                {
                  width: 60,
                  height: 100,
                },
                {
                  width: 119,
                  height: 200,
                },
                {
                  width: 239,
                  height: 400,
                },
                {
                  width: 611,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b18031961_0001/b18031961_vol_1_0009.JP2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 2888,
          width: 1724,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0009.JP2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0009.JP2/full/611,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 611,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0009.JP2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1724,
                  height: 2888,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0009.JP2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b18031961_0001/b18031961_vol_1_0009.JP2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0010.JP2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0010.JP2/full/60,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0010.JP2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 611,
              height: 1024,
              sizes: [
                {
                  width: 60,
                  height: 100,
                },
                {
                  width: 119,
                  height: 200,
                },
                {
                  width: 239,
                  height: 400,
                },
                {
                  width: 611,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b18031961_0001/b18031961_vol_1_0010.JP2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 2888,
          width: 1724,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0010.JP2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0010.JP2/full/611,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 611,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0010.JP2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1724,
                  height: 2888,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0010.JP2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b18031961_0001/b18031961_vol_1_0010.JP2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0011.JP2',
          '@type': 'sc:Canvas',
          label: '-',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0011.JP2/full/60,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0011.JP2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 611,
              height: 1024,
              sizes: [
                {
                  width: 60,
                  height: 100,
                },
                {
                  width: 119,
                  height: 200,
                },
                {
                  width: 239,
                  height: 400,
                },
                {
                  width: 611,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b18031961_0001/b18031961_vol_1_0011.JP2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 2888,
          width: 1724,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0011.JP2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0011.JP2/full/611,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 611,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0011.JP2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1724,
                  height: 2888,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0011.JP2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b18031961_0001/b18031961_vol_1_0011.JP2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page  -',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0012.JP2',
          '@type': 'sc:Canvas',
          label: 'III',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0012.JP2/full/60,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0012.JP2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 611,
              height: 1024,
              sizes: [
                {
                  width: 60,
                  height: 100,
                },
                {
                  width: 119,
                  height: 200,
                },
                {
                  width: 239,
                  height: 400,
                },
                {
                  width: 611,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b18031961_0001/b18031961_vol_1_0012.JP2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 2888,
          width: 1724,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0012.JP2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0012.JP2/full/611,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 611,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0012.JP2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1724,
                  height: 2888,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0012.JP2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b18031961_0001/b18031961_vol_1_0012.JP2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page III',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0013.JP2',
          '@type': 'sc:Canvas',
          label: 'IV',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0013.JP2/full/60,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0013.JP2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 611,
              height: 1024,
              sizes: [
                {
                  width: 60,
                  height: 100,
                },
                {
                  width: 119,
                  height: 200,
                },
                {
                  width: 239,
                  height: 400,
                },
                {
                  width: 611,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b18031961_0001/b18031961_vol_1_0013.JP2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 2888,
          width: 1724,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0013.JP2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0013.JP2/full/611,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 611,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0013.JP2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1724,
                  height: 2888,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0013.JP2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b18031961_0001/b18031961_vol_1_0013.JP2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page IV',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0014.JP2',
          '@type': 'sc:Canvas',
          label: 'V',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0014.JP2/full/60,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0014.JP2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 611,
              height: 1024,
              sizes: [
                {
                  width: 60,
                  height: 100,
                },
                {
                  width: 119,
                  height: 200,
                },
                {
                  width: 239,
                  height: 400,
                },
                {
                  width: 611,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b18031961_0001/b18031961_vol_1_0014.JP2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 2888,
          width: 1724,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0014.JP2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0014.JP2/full/611,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 611,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0014.JP2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1724,
                  height: 2888,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0014.JP2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b18031961_0001/b18031961_vol_1_0014.JP2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page V',
            },
          ],
          within: '',
        },
        {
          '@id':
            'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0015.JP2',
          '@type': 'sc:Canvas',
          label: 'VI',
          thumbnail: {
            '@id':
              'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0015.JP2/full/60,100/0/default.jpg',
            '@type': 'dctypes:Image',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id':
                'https://iiif.wellcomecollection.org/thumbs/b18031961_vol_1_0015.JP2',
              profile: 'http://iiif.io/api/image/2/level0.json',
              protocol: 'http://iiif.io/api/image',
              width: 611,
              height: 1024,
              sizes: [
                {
                  width: 60,
                  height: 100,
                },
                {
                  width: 119,
                  height: 200,
                },
                {
                  width: 239,
                  height: 400,
                },
                {
                  width: 611,
                  height: 1024,
                },
              ],
            },
          },
          seeAlso: {
            '@id':
              'https://api.wellcomecollection.org/text/alto/b18031961_0001/b18031961_vol_1_0015.JP2',
            profile: 'http://www.loc.gov/standards/alto/v3/alto.xsd',
            format: 'text/xml',
            label: 'METS-ALTO XML',
          },
          height: 2888,
          width: 1724,
          images: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0015.JP2/painting/anno',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0015.JP2/full/611,1024/0/default.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1024,
                width: 611,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://iiif.wellcomecollection.org/image/b18031961_vol_1_0015.JP2',
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 1724,
                  height: 2888,
                },
              },
              on: 'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0015.JP2',
            },
          ],
          otherContent: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/annotations/v2/b18031961_0001/b18031961_vol_1_0015.JP2/line',
              '@type': 'sc:AnnotationList',
              label: 'Text of page VI',
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
        'https://iiif.wellcomecollection.org/presentation/b18031961_0001/ranges/LOG_0004',
      '@type': 'sc:Range',
      label: 'Front Cover',
      canvases: [
        'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0001.JP2',
      ],
      within: '',
    },
    {
      '@id':
        'https://iiif.wellcomecollection.org/presentation/b18031961_0001/ranges/LOG_0006',
      '@type': 'sc:Range',
      label: 'Title Page',
      canvases: [
        'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0010.JP2',
      ],
      within: '',
    },
    {
      '@id':
        'https://iiif.wellcomecollection.org/presentation/b18031961_0001/ranges/LOG_0007',
      '@type': 'sc:Range',
      label: 'Table of Contents',
      canvases: [
        'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0016.JP2',
        'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0017.JP2',
        'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0018.JP2',
      ],
      within: '',
    },
    {
      '@id':
        'https://iiif.wellcomecollection.org/presentation/b18031961_0001/ranges/LOG_0005',
      '@type': 'sc:Range',
      label: 'Back Cover',
      canvases: [
        'https://iiif.wellcomecollection.org/presentation/b18031961_0001/canvases/b18031961_vol_1_0002.JP2',
      ],
      within: '',
    },
  ],
  otherContent: [
    {
      '@id':
        'https://iiif.wellcomecollection.org/annotations/v2/b18031961_0001/images',
      '@type': 'sc:AnnotationList',
      label: 'OCR-identified images and figures for b18031961_0001',
    },
  ],
  within: 'https://iiif.wellcomecollection.org/presentation/v2/b18031961',
};

export default multiManifest;
