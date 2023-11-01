const videoManifest = {
  '@context': [
    'http://wellcomelibrary.org/ld/ixif/0/context.json',
    'http://iiif.io/api/presentation/2/context.json',
  ],
  '@id': 'https://iiif.wellcomecollection.org/presentation/v2/b16676166',
  '@type': 'sc:Manifest',
  label: 'Cruel kindness.',
  metadata: [
    {
      label: 'Description',
      value:
        "&lt;p&gt;This extremely enjoyable film, which contains excellent footage of late 1960's home life, attitudes to food and meal times, addresses obesity in children. A female GP narrates the story of three children who are overweight for their age stressing that although there may be some inherited causes of their obesity, it is mostly due to over-feeding on the part of the parents, what the GP calls a cruel kindness. &lt;/p&gt;",
    },
    {
      label: 'Publication/creation',
      value: 'England, 1968.',
    },
    {
      label: 'Physical description',
      value: '1 encoded moving image (13 min.) : sound, color',
    },
    {
      label: 'Copyright note',
      value: 'British Medical Association',
    },
    {
      label: 'Creator/production credits',
      value:
        'An Oswalk Skilbeck production for the Film Producers Guild, made in association with Film Centre International Ltd. Written and directed by Winifred Holmes and produced by  the British Life Assurance Trust for Health Education with the British Medical Association.',
    },
    {
      label: 'Subjects',
      value: 'Obesity; Pediatrics; England',
    },
    {
      label: 'Attribution',
      value: 'Wellcome Collection',
    },
    {
      label: 'Full conditions of use',
      value:
        "&lt;span&gt;You have permission to make copies of this work under a &lt;a target='_top' href='http://creativecommons.org/licenses/by-nc/4.0/';&gt;Creative Commons, Attribution, Non-commercial license&lt;/a&gt;.&lt;br/&gt;&lt;br/&gt;Non-commercial use includes private study, academic research, teaching, and other activities that are not primarily intended for, or directed towards, commercial advantage or private monetary compensation. See the &lt;a target='_top' href='http://creativecommons.org/licenses/by-nc/4.0/legalcode';&gt;Legal Code&lt;/a&gt; for further information.&lt;br/&gt;&lt;br/&gt;Image source should be attributed as specified in the full catalogue record. If no source is given the image should be attributed to Wellcome Collection.&lt;/span&gt;",
    },
  ],
  description:
    "&lt;p&gt;This extremely enjoyable film, which contains excellent footage of late 1960's home life, attitudes to food and meal times, addresses obesity in children. A female GP narrates the story of three children who are overweight for their age stressing that although there may be some inherited causes of their obesity, it is mostly due to over-feeding on the part of the parents, what the GP calls a cruel kindness. &lt;/p&gt;",
  license: 'http://creativecommons.org/licenses/by-nc/4.0/',
  logo: 'https://iiif.wellcomecollection.org/logos/wellcome-collection-black.png',
  related: {
    '@id': 'https://wellcomecollection.org/works/sx4p4b75',
    format: 'text/html',
    label: 'Cruel kindness.',
  },
  seeAlso: {
    '@id': 'https://api.wellcomecollection.org/catalogue/v2/works/sx4p4b75',
    profile: 'https://api.wellcomecollection.org/catalogue/v2/context.json',
    format: 'application/json',
    label: 'Wellcome Collection Catalogue API',
  },
  service: [
    {
      '@context': 'http://universalviewer.io/context.json',
      '@id': 'http://wellcomelibrary.org/service/trackingLabels/b16676166',
      profile: 'http://universalviewer.io/tracking-extensions-profile',
      trackingLabel:
        'Format: Video, Institution: n/a, Identifier: b16676166, Digicode: digfilm, Collection code: n/a',
    },
    {
      '@context': 'http://wellcomelibrary.org/ld/iiif-ext/0/context.json',
      '@id':
        'https://wellcomelibrary.org/iiif/b16676166/access-control-hints-service',
      profile: 'http://wellcomelibrary.org/ld/iiif-ext/access-control-hints',
      accessHint: 'open',
    },
  ],
  mediaSequences: [
    {
      '@id': 'https://iiif.wellcomecollection.org/iiif/b16676166/xsequence/s0',
      '@type': 'ixif:MediaSequence',
      label: 'XSequence 0',
      elements: [
        {
          '@id':
            'https://iiif.wellcomecollection.org/av/b16676166_0055-0000-4078-0000-0-0000-0000-0.mpg/full/full/max/max/0/default.mp4#identity',
          '@type': 'dctypes:MovingImage',
          format: 'video/mp4',
          label: 'Cruel kindness.',
          metadata: [
            {
              label: 'length',
              value: '784 s',
            },
          ],
          thumbnail: 'https://iiif.wellcomecollection.org/thumb/b16676166',
          rendering: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/av/b16676166_0055-0000-4078-0000-0-0000-0000-0.mpg/full/full/max/max/0/default.mp4',
              format: 'video/mp4',
            },
            {
              '@id':
                'https://iiif.wellcomecollection.org/av/b16676166_0055-0000-4078-0000-0-0000-0000-0.mpg/full/full/max/max/0/default.webm',
              format: 'video/webm',
            },
          ],
          resources: [
            {
              '@id':
                'https://iiif.wellcomecollection.org/presentation/b16676166/canvases/b16676166_0002_0001.pdf/supplementing',
              '@type': 'oa:Annotation',
              motivation: 'oad:transcribing',
              resource: {
                '@id':
                  'https://iiif.wellcomecollection.org/file/b16676166_0002_0001.pdf',
                '@type': 'foaf:Document',
                format: 'application/pdf',
                label: 'Cruel kindness.',
                metadata: [
                  {
                    label: 'pages',
                    value: '4',
                  },
                ],
                thumbnail:
                  'https://iiif.wellcomecollection.org/thumb/b16676166',
              },
              on: 'https://iiif.wellcomecollection.org/av/b16676166_0055-0000-4078-0000-0-0000-0000-0.mpg/full/full/max/max/0/default.mp4#identity',
            },
          ],
          width: 720,
          height: 720,
        },
      ],
    },
  ],
  sequences: [
    {
      '@id': 'https://wellcomecollection.org/iiif/ixif-message/sequence/seq',
      '@type': 'sc:Sequence',
      label:
        'Unsupported extension. This manifest is being used as a wrapper for non-IIIF content (e.g., audio, video) and is unfortunately incompatible with IIIF viewers.',
      compatibilityHint: 'displayIfContentUnsupported',
      canvases: [
        {
          '@id': 'https://wellcomelibrary.org/iiif/ixif-message/canvas/c1',
          '@type': 'sc:Canvas',
          label: 'Placeholder image',
          thumbnail: 'https://wellcomecollection.org/placeholder.jpg',
          height: 600,
          width: 600,
          images: [
            {
              '@id':
                'https://wellcomecollection.org/iiif/ixif-message/imageanno/placeholder',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://wellcomecollection.org/iiif/ixif-message-0/res/placeholder',
                '@type': 'dctypes:Image',
                height: 600,
                width: 600,
              },
              on: 'https://wellcomecollection.org/iiif/ixif-message/canvas/c1',
            },
          ],
        },
      ],
    },
  ],
  within:
    'https://iiif.wellcomecollection.org/presentation/v2/collections/subjects/t48sekb2',
};

export default videoManifest;
