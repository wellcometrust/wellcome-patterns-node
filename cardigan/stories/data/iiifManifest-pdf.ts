const pdfManifest = {
  '@context': [
    'http://wellcomelibrary.org/ld/ixif/0/context.json',
    'http://iiif.io/api/presentation/2/context.json',
  ],
  '@id': 'https://iiif.wellcomecollection.org/presentation/v2/b2982347x',
  '@type': 'sc:Manifest',
  label: 'Global Health Strategy 2014 to 2019 / Public Health England.',
  metadata: [
    {
      label: 'Description',
      value:
        "&lt;p&gt;This document sets out PHE's approach to global health for the next 5 years, and provides a framework for its international engagement.&lt;/p&gt;",
    },
    {
      label: 'Publication/creation',
      value: 'London : Public Health England, 2014.',
    },
    {
      label: 'Physical description',
      value: '1 online resource.',
    },
    {
      label: 'Contributors',
      value: 'Public Health England.',
    },
    {
      label: 'Type/technique',
      value: 'Electronic books',
    },
    {
      label: 'Subjects',
      value: 'Public Health; Great Britain',
    },
    {
      label: 'Attribution',
      value: 'Wellcome Collection&lt;br/&gt;License: OGL',
    },
    {
      label: 'Full conditions of use',
      value:
        "&lt;span&gt;You have permission to make copies of this work under an &lt;a target='_top' href='http://www.nationalarchives.gov.uk/doc/open-government-licence/version/2/';&gt;Open Government license&lt;/a&gt;.&lt;br/&gt;&lt;br/&gt;This licence permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited. &lt;br/&gt;&lt;br/&gt;Image source should be attributed as specified in the full catalogue record. If no source is given the image should be attributed to Wellcome Collection.&lt;/span&gt;",
    },
  ],
  description:
    "&lt;p&gt;This document sets out PHE's approach to global health for the next 5 years, and provides a framework for its international engagement.&lt;/p&gt;",
  thumbnail: {
    '@id': 'https://iiif.wellcomecollection.org/thumb/b2982347x',
    '@type': 'dctypes:Image',
  },
  license:
    'http://www.nationalarchives.gov.uk/doc/open-government-licence/version/2/',
  logo: 'https://iiif.wellcomecollection.org/logos/wellcome-collection-black.png',
  related: {
    '@id': 'https://wellcomecollection.org/works/cmngx5mz',
    format: 'text/html',
    label: 'Global Health Strategy 2014 to 2019 / Public Health England.',
  },
  seeAlso: {
    '@id': 'https://api.wellcomecollection.org/catalogue/v2/works/cmngx5mz',
    profile: 'https://api.wellcomecollection.org/catalogue/v2/context.json',
    format: 'application/json',
    label: 'Wellcome Collection Catalogue API',
  },
  service: [
    {
      '@context': 'http://universalviewer.io/context.json',
      '@id': 'http://wellcomelibrary.org/service/trackingLabels/b2982347x',
      profile: 'http://universalviewer.io/tracking-extensions-profile',
      trackingLabel:
        'Format: Monograph, Institution: n/a, Identifier: b2982347x, Digicode: digpbd, Collection code: n/a',
    },
    {
      '@context': 'http://wellcomelibrary.org/ld/iiif-ext/0/context.json',
      '@id':
        'https://wellcomelibrary.org/iiif/b2982347x/access-control-hints-service',
      profile: 'http://wellcomelibrary.org/ld/iiif-ext/access-control-hints',
      accessHint: 'open',
    },
  ],
  mediaSequences: [
    {
      '@id': 'https://iiif.wellcomecollection.org/iiif/b2982347x/xsequence/s0',
      '@type': 'ixif:MediaSequence',
      label: 'XSequence 0',
      elements: [
        {
          '@id':
            'https://iiif.wellcomecollection.org/file/b2982347x_Global_Health_Strategy_final_version_for_publication_12_09_14.pdf',
          '@type': 'foaf:Document',
          format: 'application/pdf',
          label: 'Global Health Strategy 2014 to 2019 / Public Health England.',
          thumbnail: 'https://iiif.wellcomecollection.org/thumb/b2982347x',
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
    'https://iiif.wellcomecollection.org/presentation/v2/collections/contributors/u4wbyua8',
};

export default pdfManifest;
