const audioManifest = {
  '@context': [
    'http://wellcomelibrary.org/ld/ixif/0/context.json',
    'http://iiif.io/api/presentation/2/context.json',
  ],
  '@id': 'https://iiif.wellcomecollection.org/presentation/v2/b17307922',
  '@type': 'sc:Manifest',
  label:
    'Florence Nightingale : greetings to the dear old comrades of Balaclava. Rendition 1/2.',
  metadata: [
    {
      label: 'Description',
      value:
        "&lt;p&gt;This short recording was made on 30th July 1890 to raise money for the impoverished veterans of the Charge of the Light Brigade. The full transcript of the recording says: 'When I am no longer even a memory, just a name, I hope my voice may perpetuate the great work of my life. God bless my  dear old comrades of Balaclava and bring them safe to shore. Florence Nightingale.' In fact, there are two recitations; the second has slightly altered wording to the first, which was presumably a practice session.&lt;/p&gt;",
    },
    {
      label: 'Publication/creation',
      value: '[Place of publication not identified], 1890.',
    },
    {
      label: 'Physical description',
      value: '1 encoded audio file (01.14 min.) : 44.1kHz + 1 PDF transcript',
    },
    {
      label: 'Notes',
      value:
        'This sound recording is a copy made from the original brown wax cylinder on behalf of Wellcome  Library by the British Library (18th March, 2004) featuring the voice of Florence Nightingale recorded on 30 July 1890. The wax cylinder recording had been donated to Sir Henry Wellcome in the 1930s but was forgotten in the collection for decades.',
    },
    {
      label: 'Subjects',
      value: 'History of Medicine; England; Nightingale, Florence, 1820-1910.',
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
  description:
    "&lt;p&gt;This short recording was made on 30th July 1890 to raise money for the impoverished veterans of the Charge of the Light Brigade. The full transcript of the recording says: 'When I am no longer even a memory, just a name, I hope my voice may perpetuate the great work of my life. God bless my  dear old comrades of Balaclava and bring them safe to shore. Florence Nightingale.' In fact, there are two recitations; the second has slightly altered wording to the first, which was presumably a practice session.&lt;/p&gt;",
  license: 'http://creativecommons.org/publicdomain/mark/1.0/',
  logo: 'https://iiif.wellcomecollection.org/logos/wellcome-collection-black.png',
  related: {
    '@id': 'https://wellcomecollection.org/works/tp9njewm',
    format: 'text/html',
    label:
      'Florence Nightingale : greetings to the dear old comrades of Balaclava. Rendition 1/2.',
  },
  seeAlso: {
    '@id': 'https://api.wellcomecollection.org/catalogue/v2/works/tp9njewm',
    profile: 'https://api.wellcomecollection.org/catalogue/v2/context.json',
    format: 'application/json',
    label: 'Wellcome Collection Catalogue API',
  },
  service: [
    {
      '@context': 'http://universalviewer.io/context.json',
      '@id': 'http://wellcomelibrary.org/service/trackingLabels/b17307922',
      profile: 'http://universalviewer.io/tracking-extensions-profile',
      trackingLabel:
        'Format: Audio, Institution: n/a, Identifier: b17307922, Digicode: digaudio, Collection code: n/a',
    },
    {
      '@context': 'http://wellcomelibrary.org/ld/iiif-ext/0/context.json',
      '@id':
        'https://wellcomelibrary.org/iiif/b17307922/access-control-hints-service',
      profile: 'http://wellcomelibrary.org/ld/iiif-ext/access-control-hints',
      accessHint: 'open',
    },
  ],
  mediaSequences: [
    {
      '@id': 'https://iiif.wellcomecollection.org/iiif/b17307922/xsequence/s0',
      '@type': 'ixif:MediaSequence',
      label: 'XSequence 0',
      elements: [
        {
          '@id':
            'https://iiif.wellcomecollection.org/av/b17307922_0056-0000-4402-0102-0-0000-0000-0.mp3/full/max/default.mp3#identity',
          '@type': 'dctypes:Sound',
          format: 'audio/mp3',
          label:
            'Florence Nightingale : greetings to the dear old comrades of Balaclava. Rendition 1/2.',
          metadata: [
            {
              label: 'length',
              value: '74.057144 s',
            },
          ],
          thumbnail: 'https://iiif.wellcomecollection.org/thumb/b17307922',
          rendering: {
            '@id':
              'https://iiif.wellcomecollection.org/av/b17307922_0056-0000-4402-0102-0-0000-0000-0.mp3/full/max/default.mp3',
            format: 'audio/mp3',
          },
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
    'https://iiif.wellcomecollection.org/presentation/v2/collections/subjects/cfg7w8cr',
};

export default audioManifest;
