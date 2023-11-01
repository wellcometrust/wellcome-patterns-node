import { LicenseType } from '@weco/common/model/license';
import { Article } from '@weco/content/types/articles';
import { Event } from '@weco/content/types/events';
import { faker } from '@faker-js/faker';
import { RichTextField as PrismicRichTextField } from '@prismicio/client';
import { Season } from '@weco/content/types/seasons';

export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * max) + min;
}

faker.seed(123);

export const id = randomNumber(1000, 2000);

export const interpretations = [
  {
    interpretationType: {
      id: 'id',
      title: 'British sign language interpreted',
      description: '',
      primaryDescription: '',
    },
    isPrimary: false,
  },
  {
    interpretationType: {
      id: 'id',
      title: 'Audio described',
      description: '',
      primaryDescription: '',
    },
    isPrimary: false,
  },
  {
    interpretationType: {
      id: 'id',
      title: 'Speech-to-Text',
      description: '',
      primaryDescription: '',
    },
    isPrimary: true,
  },
  {
    interpretationType: {
      id: 'id',
      title: 'Hearing loop',
      description: '',
      primaryDescription: '',
    },
    isPrimary: false,
  },
];

export const url = faker.internet.url();

export const bannerCardItem: Season = {
  type: 'seasons',
  id: 'bannerCardItem',
  body: [],
  labels: [],
  title: 'What does it mean to be human, now?',
  start: new Date('2021-01-05T00:00:00.000Z'),
  end: new Date('2021-01-26T00:00:00.000Z'),
  promo: {
    caption:
      'Our new season explores the intertwined connections between the individual, societal and global health.',
    image: {
      contentUrl:
        'https://images.prismic.io/wellcomecollection%2F92a873e4-b774-4c46-b9b3-75fda00a0ace_b0011048_artistic+interpretation+of+alzheimers_florence+winterflood.jpg?auto=compress,format&rect=0,0,1600,900&w=3200&h=1800',
      width: 3200,
      height: 1800,
      alt: 'An artwork featuring a large painted human hand, surrounded by fragments of maps.',
      tasl: {
        title: "Alzheimer's disease",
        author: 'Florence Winterflood',
        sourceName: 'Wellcome Collection',
        sourceLink: 'CC-BY-NC',
        license: undefined,
        copyrightHolder: undefined,
        copyrightLink: undefined,
      },
    },
    link: null,
  },
  image: {
    contentUrl:
      'https://images.prismic.io/wellcomecollection%2F92a873e4-b774-4c46-b9b3-75fda00a0ace_b0011048_artistic+interpretation+of+alzheimers_florence+winterflood.jpg?auto=compress,format',
    width: 1600,
    height: 900,
    alt: 'An artwork featuring a large painted human hand, surrounded by fragments of maps.',
    tasl: {
      title: "Alzheimer's disease",
      author: 'Florence Winterflood',
      sourceName: 'Wellcome Collection',
      sourceLink: 'CC-BY-NC',
      license: undefined,
      copyrightHolder: undefined,
      copyrightLink: undefined,
    },
    simpleCrops: {
      '32:15': {
        contentUrl:
          'https://images.prismic.io/wellcomecollection%2F92a873e4-b774-4c46-b9b3-75fda00a0ace_b0011048_artistic+interpretation+of+alzheimers_florence+winterflood.jpg?auto=compress,format&rect=0,75,1600,750&w=3200&h=1500',
        width: 3200,
        height: 1500,
      },
      '16:9': {
        contentUrl:
          'https://images.prismic.io/wellcomecollection%2F92a873e4-b774-4c46-b9b3-75fda00a0ace_b0011048_artistic+interpretation+of+alzheimers_florence+winterflood.jpg?auto=compress,format&rect=0,0,1600,900&w=3200&h=1800',
        width: 3200,
        height: 1800,
      },
      square: {
        contentUrl:
          'https://images.prismic.io/wellcomecollection%2F92a873e4-b774-4c46-b9b3-75fda00a0ace_b0011048_artistic+interpretation+of+alzheimers_florence+winterflood.jpg?auto=compress,format&rect=350,0,900,900&w=3200&h=3200',
        width: 3200,
        height: 3200,
      },
    },
  },
};

export const image = (
  contentUrl = 'https://images.prismic.io/wellcomecollection/5b28b809814fc6d1d716b0082725b24e0a0ad6a9_ep_000012_089.jpg?auto=compress,format',
  width = 640,
  height = 360
) => {
  return {
    contentUrl,
    width,
    height,
    alt: 'an image with some alt text',
    tasl: {
      contentUrl,
      title: 'The title of the image',
      author: 'The author',
      sourceName: 'Wellcome Collection',
      sourceLink: 'https://wellcomecollection.org/works',
      license: 'CC-BY-NC' as LicenseType,
    },
  };
};

export const squareImage = (
  contentUrl = 'https://images.prismic.io/wellcomecollection/e0d9c99ab840cbb76e1981ed453c57f4b5d02a65_reading-room-clock.jpg?auto=compress,format',
  width = 300,
  height = 300
) => {
  return {
    contentUrl,
    width,
    height,
    alt: '',
    tasl: {
      contentUrl,
      title: 'The title of the image',
      author: 'The author',
      sourceName: 'Wellcome Collection',
      sourceLink: 'https://wellcomecollection.org/works',
      license: 'CC-BY-NC' as LicenseType,
    },
  };
};

export const pictureImages = [
  {
    contentUrl:
      'https://images.prismic.io/wellcomecollection/fb5b20a53897d484fde6afc612fb9563e987fd5f_tf_180516_2060224.jpg?auto=compress,format',
    width: 3200,
    height: 1500,
    alt: 'Photograph of a man and a woman looking at an exhibit in the Teeth exhibition at Wellcome Collection.',
    tasl: {
      title: 'Teeth exhibition',
      author: 'Thomas SG Farnetti',
      sourceName: 'Wellcome Collection',
      sourceLink: null,
      license: 'CC-BY-NC' as LicenseType,
      copyrightHolder: null,
      copyrightLink: null,
    },
    minWidth: '600px',
  },
  {
    contentUrl:
      'https://images.prismic.io/wellcomecollection/3ab79986b581a18eabd68602d0f27e989535e0dc_tf_180516_2060224.jpg?auto=compress,format',
    width: 3200,
    height: 3200,
    alt: 'Photograph of a man and a woman looking at an exhibit in the Teeth exhibition at Wellcome Collection.',
    tasl: {
      title: 'Teeth exhibition',
      author: 'Thomas SG Farnetti',
      sourceName: 'Wellcome Collection',
      sourceLink: null,
      license: 'CC-BY-NC' as LicenseType,
      copyrightHolder: null,
      copyrightLink: null,
    },
    minWidth: null,
  },
];

export const editorialSeries = [
  {
    name: 'Searching for Genius',
    description: [
      {
        type: 'paragraph',
        text: 'This five-part series is great. ',
        spans: [],
      },
    ],
    color: 'accent.blue',
    schedule: [
      {
        title: [{ type: 'heading1', text: 'First heading', spans: [] }],
        publishDate: '2018-04-18T23: 00: 00+0000',
      },
      {
        title: [{ type: 'heading1', text: 'Second heading', spans: [] }],
        publishDate: '2018-04-25T23: 00: 00+0000',
      },
      {
        title: [{ type: 'heading1', text: 'Third heading', spans: [] }],
        publishDate: '2018-05-02T23: 00: 00+0000',
      },
      {
        title: [{ type: 'heading1', text: 'Fourth heading', spans: [] }],
        publishDate: '2018-05-09T23: 00: 00+0000',
      },
      {
        title: [{ type: 'heading1', text: 'Fifth heading', spans: [] }],
        publishDate: '2018-05-16T23: 00: 00+0000',
      },
    ],
    promo: [],
  },
];

export const eventSeries = [
  {
    id: 'Wn28GCoAACkAIYol',
    title: 'The Evidence:  Civilisations and Health',
    description: [
      {
        type: 'paragraph',
        text: 'The BBC World Service is joining forces with Wellcome Collection for this series of events and radio programmes exploring health in the context of society and civilisation. ',
        spans: [],
      },
    ],
  },
];

export const eventSchedule = [
  {
    event: {
      id: 'Wo1c-CoAACoAZG2p',
      type: 'events',
      tags: ['delist'],
      slug: 'creative-activities',
      lang: 'en-gb',
      link_type: 'Document',
      isBroken: false,
    },
    hideLink: null,
  },
  {
    event: {
      id: 'Wo1ZxioAAMLuZF_Q',
      type: 'events',
      tags: ['delist'],
      slug: 'shakti-and-seva-gender-and-health-in-south-asia',
      lang: 'en-gb',
      link_type: 'Document',
      isBroken: false,
    },
    hideLink: null,
  },
  {
    event: {
      id: 'Wo1bOSoAAHW6ZGYC',
      type: 'events',
      tags: ['delist'],
      slug: 'music-from-club-kali',
      lang: 'en-gb',
      link_type: 'Document',
      isBroken: false,
    },
    hideLink: null,
  },
];

export const captionedImage = () => ({
  image: image(),

  caption: [
    {
      type: 'paragraph',
      text: faker.random.words(10),
      spans: [],
    },
  ],
});

export const singleLineOfText = () => faker.random.words(7);

export const prismicRichTextMultiline = [
  {
    type: 'heading2',
    text: 'In consectetur urna turpis, eu egestas elit ultricies ac. ',
    spans: [],
  },
  {
    type: 'paragraph',
    text: 'Sed feugiat diam non mattis dignissim. Morbi vel pharetra dolor. Suspendisse viverra hendrerit leo a viverra. Vestibulum pharetra, tellus eu vestibulum hendrerit, ex justo condimentum nunc, eget varius lectus ante non erat. Etiam ac erat interdum, ultricies purus ac, malesuada nisi.',
    spans: [],
  },
  {
    type: 'heading3',
    text: 'Sed feugiat diam non mattis dignissim.',
    spans: [],
  },
  {
    type: 'paragraph',
    text: 'In consectetur urna turpis, eu egestas elit ultricies ac. Curabitur a urna velit. Maecenas vel pellentesque risus. Morbi ex sem, vestibulum id accumsan luctus, vehicula quis ipsum. Fusce nec felis mauris. Duis ornare odio interdum, consectetur nisi quis, blandit urna. Vestibulum imperdiet eu neque non tincidunt. Donec facilisis semper pulvinar.',
    spans: [],
  },
  {
    type: 'paragraph',
    text: 'Sed feugiat diam non mattis dignissim. Morbi vel pharetra dolor. Suspendisse viverra hendrerit leo a viverra. Vestibulum pharetra, tellus eu vestibulum hendrerit, ex justo condimentum nunc, eget varius lectus ante non erat. Etiam ac erat interdum, ultricies purus ac, malesuada nisi.',
    spans: [],
  },
  {
    type: 'paragraph',
    text: 'Sed feugiat diam non mattis dignissim. Morbi vel pharetra dolor. Suspendisse viverra hendrerit leo a viverra. Vestibulum pharetra, tellus eu vestibulum hendrerit, ex justo condimentum nunc, eget varius lectus ante non erat. Etiam ac erat interdum, ultricies purus ac, malesuada nisi.',
    spans: [],
  },
] as PrismicRichTextField;

export const text = () =>
  Array(2).fill({
    type: 'paragraph',
    text: `${faker.random.words(30)}`,
    spans: [],
  });

export const smallText = () => [
  {
    type: 'paragraph',
    text: `${faker.random.words(20)}`,
    spans: [],
  },
];

export const videoEmbed = {
  embedUrl: 'https://www.youtube.com/embed/l0A8-DmX0Z0?feature=oembed',
};

export const event: Event = {
  type: 'events',
  id: 'x123',
  title: 'Event title',
  audiences: [],
  availableOnline: true,
  body: [],
  bookingInformation: null,
  bookingType: 'First come, first served',
  contributors: [],
  cost: null,
  eventbriteId: '',
  format: { id: 'WlYVBiQAACcAWcu9', title: 'Seminar', description: null },
  hasEarlyRegistration: false,
  image: {
    contentUrl:
      'https://images.prismic.io/wellcomecollection/a4e2a07674bb171ba0b7d7dc7dcf09f1694e13ff_sdp_20181009_0007.jpg?auto=compress,format',
    width: 4000,
    height: 2250,
    alt: 'Photograph showing a woman giving a talk in the Viewing Room at Wellcome Collection. She is stood at the front of the room looking at a wall mounted television screen. In the foreground are the backs of the heads of the audience.',
    tasl: {
      title: 'Exploring Research event',
      author: 'Steven Pocock',
      sourceName: 'Wellcome Collection',
      sourceLink: null,
      license: 'CC-BY-NC' as LicenseType,
      copyrightHolder: null,
      copyrightLink: null,
    },
    simpleCrops: {
      square: {
        contentUrl:
          'https://images.prismic.io/wellcomecollection/318dba668b46078bd957578fa5fc3b2f9b86c5a0_sdp_20181009_0007.jpg?auto=compress,format',
        width: 3200,
        height: 3200,
      },
      '32:15': {
        contentUrl:
          'https://images.prismic.io/wellcomecollection/7b01a0b1273b96cfeb8a5c37e812bd83fe96f537_sdp_20181009_0007.jpg?auto=compress,format',
        width: 3200,
        height: 1500,
      },
      '16:9': {
        contentUrl:
          'https://images.prismic.io/wellcomecollection/1689f6e5ead8d3a228d802256213e0998b15b7a2_sdp_20181009_0007.jpg?auto=compress,format',
        width: 3200,
        height: 1800,
      },
    },
  },
  interpretations: [],
  isCompletelySoldOut: false,
  isPast: false,
  isRelaxedPerformance: false,
  isOnline: true,
  labels: [],
  locations: [
    {
      id: 'WoLtUioAACkANrUM',
      title: 'Viewing Room',
      body: [],
      labels: [],
      level: 2,
      capacity: 20,
      information: [
        {
          type: 'paragraph',
          text: 'We’ll be in the Viewing Room. It’s next to the Library entrance on level 2, which you can reach by taking the lift or the stairs.',
          spans: [],
        },
      ],
    },
  ],
  onlineHasEarlyRegistration: false,
  onlinePolicies: [],
  policies: [
    {
      id: 'W3RLAikAACcAF2oO',
      title: 'Limited spaces available',
      description: [
        {
          type: 'paragraph',
          text: 'You can claim your place for this event 15 minutes before it starts. Spaces are first come, first served and may run out if we are busy.',
          spans: [],
        },
      ],
    },
  ],
  primaryLabels: [{ text: 'Seminar' }],
  promo: {
    caption:
      'Come and hear Dr Emma Spary discuss her research on the often- overlooked role of priests in the history of pharmacy.',
    image: {
      contentUrl:
        'https://images.prismic.io/wellcomecollection/1689f6e5ead8d3a228d802256213e0998b15b7a2_sdp_20181009_0007.jpg?auto=compress,format',
      width: 3200,
      height: 1800,
      alt: 'Photograph showing a woman giving a talk in the Viewing Room at Wellcome Collection. She is stood at the front of the room looking at a wall mounted television screen. In the foreground are the backs of the heads of the audience.',
      tasl: {
        title: 'Exploring Research event',
        author: 'Steven Pocock',
        sourceName: 'Wellcome Collection',
        sourceLink: null,
        license: 'CC-BY-NC' as LicenseType,
        copyrightHolder: null,
        copyrightLink: null,
      },
    },
    link: null,
  },
  ticketSalesStart: null,
  times: [
    {
      range: {
        startDateTime: new Date('2018-10-23T17:00:00.000Z'),
        endDateTime: new Date('2018-10-23T18:30:00.000Z'),
      },
      isFullyBooked: { inVenue: false, online: false },
    },
  ],
  seasons: [],
  schedule: [],
  secondaryLabels: [],
  series: [],
};

export const imageGallery = () => {
  const items = Array(4).fill(captionedImage());
  return {
    id: '123',
    title: singleLineOfText(),
    items,
  };
};

export const quote = () => ({
  text: [
    {
      type: 'paragraph',
      text: `Said Hamlet to Ophelia,\nI'll draw a sketch of thee,\nWhat kind of pencil shall I use?\n2B or not 2B?`,
      spans: [],
    },
  ],
  citation: [
    {
      type: 'paragraph',
      text: 'Spike Milligan – A Silly Poem',
      spans: [
        {
          type: 'hyperlink',
          start: 0,
          end: 29,
          data: {
            link_type: 'Web',
            url: 'https://www.poemhunter.com/poem/a-silly-poem/',
          },
        },
      ],
    },
  ],
});

const sameAs = [
  { link: 'https://twitter.com/mbannisy', title: '@mbannisy' },
  { link: 'http://things.com', title: 'things.com' },
  { link: 'https://google.com', title: 'This is it!' },
];

export function person() {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    description: smallText(),
    image: {
      contentUrl: faker.image.avatar(),
      width: 120,
      height: 120,
      alt: 'Avatar',
      tasl: {
        title: 'Avatar',
      },
    },
    sameAs,
  };
}

export function organisation() {
  return {
    id: faker.datatype.uuid(),
    name: faker.company.name(),
    description: smallText(),
    url: 'https://wellcomecollection.org',
    image: {
      contentUrl:
        'https://vignette.wikia.nocookie.net/logopedia/images/4/42/BBC_Worldwide_1995.svg/revision/latest?cb=20180114133014',
      width: 3200,
      height: 3200,
      alt: 'Weewaaz',
      tasl: {
        title: 'Weewaaz',
      },
    },
    sameAs: [],
  };
}

export const article: Article = {
  type: 'articles',
  id: 'YLoCLhAAACEAfyuO',
  title: 'A dark cloud',
  contributors: [
    {
      role: {
        id: 'XVQa_xMAACMAqbwo',
        title: 'Illustrator',
        describedBy: 'artwork',
      },
      contributor: {
        type: 'people',
        id: 'YJ5GbRAAACMA_XnW',
        name: 'Weewaaz',
        image: {
          contentUrl:
            'https://images.prismic.io/wellcomecollection/8689f8f1-b106-46bb-84d7-97e5bce33ed3_weewaaz.png?auto=compress,format&rect=0,0,538,538&w=3200&h=3200',
          width: 3200,
          height: 3200,
          alt: 'Weewaaz',
          tasl: {
            title: 'Weewaaz',
          },
        },
        description: [
          {
            type: 'paragraph',
            text: 'Nikolina Sika (aka Weewaaz) is a 26 year old non-binary artist and visual designer from Brisbane, Australia. You can find them working mostly digitally but often painting, embroidering and sculpting. Creating fun, funky and hopefully uplifting work for you.',
            spans: [],
          },
        ],
        sameAs: [
          {
            link: 'https://www.instagram.com/weewaaz/',
            title: 'Weewaaz on Instagram',
          },
        ],
      },
      description: null,
    },
  ],
  body: [
    {
      type: 'imageGallery',
      weight: 'standalone',
      value: {
        title: '',
        isStandalone: false,
        isFrames: false,
        items: [
          {
            image: {
              contentUrl:
                'https://images.prismic.io/wellcomecollection/3628f5ec-3218-4757-a76d-a7b58dd89b6c_darkcloud.png?auto=compress,format',
              width: 6000,
              height: 6000,
              alt: 'A cartoon figure has a dark cloud wrapped around them. Both have a solemn look on their face.The accompanying text reads ‘There’s a dark cloud following me’. ',
              tasl: {
                title: 'Weewaaz',
              },
              simpleCrops: {
                '32:15': {
                  contentUrl:
                    'https://images.prismic.io/wellcomecollection/3628f5ec-3218-4757-a76d-a7b58dd89b6c_darkcloud.png?auto=compress,format&rect=0,1594,6000,2813&w=3200&h=1500',
                  width: 3200,
                  height: 1500,
                },
                '16:9': {
                  contentUrl:
                    'https://images.prismic.io/wellcomecollection/3628f5ec-3218-4757-a76d-a7b58dd89b6c_darkcloud.png?auto=compress,format&rect=0,1313,6000,3375&w=3200&h=1800',
                  width: 3200,
                  height: 1800,
                },
                square: {
                  contentUrl:
                    'https://images.prismic.io/wellcomecollection/3628f5ec-3218-4757-a76d-a7b58dd89b6c_darkcloud.png?auto=compress,format&rect=0,0,6000,6000&w=3200&h=3200',
                  width: 3200,
                  height: 3200,
                },
              },
            },
            hasRoundedCorners: false,
            caption: [],
          },
        ],
      },
    },
  ],
  promo: {
    caption: 'Do you have any dark clouds following you?',
    image: {
      contentUrl:
        'https://images.prismic.io/wellcomecollection/0b1e482a-fc92-4345-afd2-01bce69424fc_darkcloud_promo.png?auto=compress,format&rect=0,0,1600,900&w=3200&h=1800',
      width: 3200,
      height: 1800,
      alt: 'A cartoon figure has a dark cloud wrapped around them. Both have a solemn look on their face.',
      tasl: {
        title: 'Weewaaz',
      },
    },
    link: null,
  },
  image: {
    contentUrl:
      'https://images.prismic.io/wellcomecollection/0b1e482a-fc92-4345-afd2-01bce69424fc_darkcloud_promo.png?auto=compress,format',
    width: 1600,
    height: 900,
    alt: 'A cartoon figure has a dark cloud wrapped around them. Both have a solemn look on their face.',
    tasl: {
      title: 'Weewaaz',
    },
    simpleCrops: {
      '32:15': {
        contentUrl:
          'https://images.prismic.io/wellcomecollection/0b1e482a-fc92-4345-afd2-01bce69424fc_darkcloud_promo.png?auto=compress,format&rect=0,75,1600,750&w=3200&h=1500',
        width: 3200,
        height: 1500,
      },
      '16:9': {
        contentUrl:
          'https://images.prismic.io/wellcomecollection/0b1e482a-fc92-4345-afd2-01bce69424fc_darkcloud_promo.png?auto=compress,format&rect=0,0,1600,900&w=3200&h=1800',
        width: 3200,
        height: 1800,
      },
      square: {
        contentUrl:
          'https://images.prismic.io/wellcomecollection/0b1e482a-fc92-4345-afd2-01bce69424fc_darkcloud_promo.png?auto=compress,format&rect=350,0,900,900&w=3200&h=3200',
        width: 3200,
        height: 3200,
      },
    },
  },
  metadataDescription: '',
  labels: [
    {
      text: 'Comic',
    },
  ],
  format: {
    id: 'W7d_ghAAALWY3Ujc',
    title: 'Comic',
  },
  datePublished: new Date(2021, 5, 3, 10, 15, 49),
  series: [
    {
      id: 'YJ5KTBAAACEA_Yrk',
      title: 'Weewaaz',
      contributors: [
        {
          role: {
            id: 'XVQa_xMAACMAqbwo',
            title: 'Illustrator',
            describedBy: 'artwork',
          },
          contributor: {
            type: 'people',
            id: 'YJ5GbRAAACMA_XnW',
            name: 'Weewaaz',
            image: {
              contentUrl:
                'https://images.prismic.io/wellcomecollection/8689f8f1-b106-46bb-84d7-97e5bce33ed3_weewaaz.png?auto=compress,format&rect=0,0,538,538&w=3200&h=3200',
              width: 3200,
              height: 3200,
              alt: 'Weewaaz',
              tasl: {
                title: 'Weewaaz',
              },
            },
            description: [
              {
                type: 'paragraph',
                text: 'Nikolina Sika (aka Weewaaz) is a 26 year old non-binary artist and visual designer from Brisbane, Australia. You can find them working mostly digitally but often painting, embroidering and sculpting. Creating fun, funky and hopefully uplifting work for you.',
                spans: [],
              },
            ],
            sameAs: [
              {
                link: 'https://www.instagram.com/weewaaz/',
                title: 'Weewaaz on Instagram',
              },
            ],
          },
          description: null,
        },
      ],
      body: [],
      standfirst: null,
      promo: {
        caption: '',
        image: {
          contentUrl:
            'https://images.prismic.io/wellcomecollection/2e78d491-8a35-45fd-8e57-497f50e6273d_promo_main.png?auto=compress,format&rect=0,0,1600,900&w=3200&h=1800',
          width: 3200,
          height: 1800,
          alt: 'Person holding a large red love heart, smiling.',
          tasl: {
            title: 'Weewaaz',
          },
        },
        link: null,
      },
      image: {
        contentUrl:
          'https://images.prismic.io/wellcomecollection/2e78d491-8a35-45fd-8e57-497f50e6273d_promo_main.png?auto=compress,format',
        width: 1600,
        height: 900,
        alt: 'Person holding a large red love heart, smiling.',
        tasl: {
          title: 'Weewaaz',
        },
        simpleCrops: {
          '32:15': {
            contentUrl:
              'https://images.prismic.io/wellcomecollection/2e78d491-8a35-45fd-8e57-497f50e6273d_promo_main.png?auto=compress,format&rect=0,75,1600,750&w=3200&h=1500',
            width: 3200,
            height: 1500,
          },
          '16:9': {
            contentUrl:
              'https://images.prismic.io/wellcomecollection/2e78d491-8a35-45fd-8e57-497f50e6273d_promo_main.png?auto=compress,format&rect=0,0,1600,900&w=3200&h=1800',
            width: 3200,
            height: 1800,
          },
          square: {
            contentUrl:
              'https://images.prismic.io/wellcomecollection/2e78d491-8a35-45fd-8e57-497f50e6273d_promo_main.png?auto=compress,format&rect=350,0,900,900&w=3200&h=3200',
            width: 3200,
            height: 3200,
          },
        },
      },
      labels: [
        {
          text: 'Series',
        },
      ],
      type: 'series',
      schedule: [],
      color: 'accent.green',
      items: [],
      seasons: [],
    },
  ],
  seasons: [],
};

export const articleBasic = {
  type: 'articles',
  id: 'article-basic',
  promo: article.promo,
  series: [],
  title: article.title,
  datePublished: article.datePublished,
  labels: [],
};
