import styled from 'styled-components';
import PageHeader from '@weco/common/views/components/PageHeader/PageHeader';
import PageHeaderStandfirst from '@weco/common/views/components/PageHeaderStandfirst/PageHeaderStandfirst';
import { font } from '@weco/common/utils/classnames';
import Picture from '@weco/common/views/components/Picture/Picture';
import Space from '@weco/common/views/components/styled/Space';
import TextWithDot from '@weco/content/components/TextWithDot';
import PrismicImage from '@weco/common/views/components/PrismicImage/PrismicImage';
import HeaderBackground from '@weco/common/views/components/HeaderBackground/HeaderBackground';
import { headerBackgroundLs } from '@weco/common/utils/backgrounds';
import BookImage from '@weco/content/components/BookImage/BookImage';
import PageHeaderReadme from '@weco/common/views/components/PageHeader/README.md';
import ShortFilmPageHeaderReadme from '@weco/common/views/components/PageHeader/ShortFilm_README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';
import { LicenseType } from '@weco/common/model/license';
import Body from '@weco/content/components/Body/Body';
import ContentPage from '@weco/content/components/ContentPage/ContentPage';
import { videoEmbed } from '@weco/cardigan/stories/content';
import Layout, { gridSize8 } from '@weco/common/views/components/Layout';

const Date = styled.span.attrs({ className: font('intr', 6) })`
  color: ${props => props.theme.color('neutral.600')};
`;

const breadcrumbItems = [
  {
    text: 'Stories',
    url: '#',
  },
];

const ContentTypeWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

const ContentTypeInfo = (
  <>
    <PageHeaderStandfirst
      html={[
        {
          type: 'paragraph',
          text: 'Colluding with an audience that wants to believe, the magician’s assistant has her own armoury of tricks to help maintain the illusion. Performer Naomi Paxton takes us inside the ingenious world of onstage magic.',
          spans: [],
        },
      ]}
    />
    <ContentTypeWrapper>
      <Space
        className={font('intr', 6)}
        $h={{ size: 's', properties: ['margin-right'] }}
        $v={{ size: 's', properties: ['margin-top'] }}
      >
        <p style={{ marginBottom: 0 }}>
          <span>By </span>
          <span className={font('intb', 6)}>Naomi Paxton</span>{' '}
          <Date>17 April 2019</Date>
        </p>
      </Space>
    </ContentTypeWrapper>
  </>
);

const articlePictureImages = [
  {
    contentUrl:
      'https://images.prismic.io/wellcomecollection/58311b341bbcab74990e2ad0917b51162452b58f_tf_190405_3790149.jpg?auto=compress,format',
    width: 3200,
    height: 1800,
    alt: '',
    tasl: {
      title: "Naomi Paxton as the magician's assistant",
      author: 'Thomas SG Farnetti',
      sourceName: 'Wellcome Collection',
      sourceLink: null,
      license: 'CC-BY-NC' as LicenseType,
      copyrightHolder: null,
      copyrightLink: null,
    },
    crops: {},
    minWidth: '600px',
  },
  {
    contentUrl:
      'https://images.prismic.io/wellcomecollection/17c12bebf53c50311e288f2fe8654d8400a0129a_tf_190405_3790149.jpg?auto=compress,format',
    width: 3200,
    height: 3200,
    alt: '',
    tasl: {
      title: "Naomi Paxton as the magician's assistant",
      author: 'Thomas SG Farnetti',
      sourceName: 'Wellcome Collection',
      sourceLink: null,
      license: 'CC-BY-NC' as LicenseType,
      copyrightHolder: null,
      copyrightLink: null,
    },
    crops: {},
    minWidth: null,
  },
];

const exhibitionPictureImages = [
  {
    contentUrl:
      'https://images.prismic.io/wellcomecollection/b40da45c5b49cc5dd946dffeddbf8ce114ac0003_ep_000832_058.jpg?auto=compress,format',
    width: 3200,
    height: 1800,
    alt: 'Photograph of an exhibition gallery space, with a blue stained wood wall in the background, in front of which a young man looks at a life-size artwork of a figure resembling an astronaut. In the foreground a young woman sits on a wooden bench holding an audio speaker to her ear.',
    tasl: {
      title: 'Being Human gallery',
      author: 'Steven Pocock',
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
      'https://images.prismic.io/wellcomecollection/2e7bcd148d629cd8fe670d42bac997051f4112ea_ep_000832_058.jpg?auto=compress,format',
    width: 3200,
    height: 3200,
    alt: 'Photograph of an exhibition gallery space, with a blue stained wood wall in the background, in front of which a young man looks at a life-size artwork of a figure resembling an astronaut. In the foreground a young woman sits on a wooden bench holding an audio speaker to her ear.',
    tasl: {
      title: 'Being Human gallery',
      author: 'Steven Pocock',
      sourceName: 'Wellcome Collection',
      sourceLink: null,
      license: 'CC-BY-NC' as LicenseType,
      copyrightHolder: null,
      copyrightLink: null,
    },
  },
];

const EventContentTypeInfo = () => (
  <>
    <Space
      $v={{
        size: 's',
        properties: ['margin-bottom'],
      }}
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      Saturday 8 February 2020, 13:00 – 16:00
    </Space>
    <div style={{ display: 'flex' }}>
      <TextWithDot
        className={font('intb', 5)}
        dotColor="neutral.500"
        text="Past"
      />
    </div>
  </>
);

const ExhibitionContentTypeInfo = () => (
  <div style={{ display: 'flex' }}>
    <TextWithDot
      className={font('intb', 5)}
      dotColor="neutral.500"
      text="Closed"
    />
  </div>
);

const BookContentTypeInfo = () => (
  <p className={font('intb', 3)} style={{ marginBottom: 0 }}>
    Loneliness, Health & What Happens When We Find Connection
  </p>
);

const eventImage = {
  contentUrl:
    'https://images.prismic.io/wellcomecollection/3f15b8e9-bad2-4018-97ec-e50121a11d56_BTG191122154226.jpg?auto=compress,format&rect=0,0,4000,2250&w=3200&h=1800',
  width: 3200,
  height: 1800,
  alt: null,
  tasl: {
    title: 'Ezra Miles',
    author: 'Benjamin Gilbert',
    sourceName: 'Wellcome Collection',
    sourceLink: null,
    license: 'CC-BY-NC' as LicenseType,
    copyrightHolder: null,
    copyrightLink: null,
  },
  crops: {},
};

const bookImage = {
  contentUrl:
    'https://images.prismic.io/wellcomecollection/db52c5b0-d4bf-4def-b83e-14a2d7e9b42d_Together+book+cover.jpg?auto=compress,format',
  width: 1080,
  height: 1659,
  alt: 'Book cover featuring the word ‘Together’, multicoloured and in joined-up text',
  tasl: {
    title: null,
    author: null,
    sourceName: null,
    sourceLink: null,
    license: null,
    copyrightHolder: null,
    copyrightLink: null,
  },
  crops: {},
  sizesQueries: '',
};
const EventFeaturedMedia = () => (
  <PrismicImage image={eventImage} quality="low" />
);

const Template = args => (
  <ReadmeDecorator
    WrappedComponent={PageHeader}
    args={args}
    Readme={PageHeaderReadme}
  />
);

export const article = Template.bind({});
article.args = {
  title: 'How the magician’s assistant creates the illusion',
  breadcrumbs: { items: breadcrumbItems },
  labels: { labels: [{ text: 'Article' }] },
  HeroPicture: <Picture images={articlePictureImages} isFull={true} />,
  ContentTypeInfo,
  isContentTypeInfoBeforeMedia: true,
};
article.parameters = {
  chromatic: { diffThreshold: 0.2 },
};

const ContentPageTemplate = args => (
  <ReadmeDecorator
    WrappedComponent={ContentPage}
    args={args}
    Readme={ShortFilmPageHeaderReadme}
  />
);
export const shortFilm = ContentPageTemplate.bind({});
shortFilm.args = {
  isCreamy: true,
  Header: (
    <PageHeader
      isContentTypeInfoBeforeMedia={true}
      ContentTypeInfo={ContentTypeInfo}
      labels={{ labels: [{ text: 'Short film' }] }}
      title="Audrey's archivist"
      breadcrumbs={{
        items: [{ text: 'Stories', url: '#' }],
      }}
    />
  ),
  Body: (
    <Body
      contentType="short-film"
      body={[
        {
          type: 'videoEmbed',
          value: videoEmbed,
        },
      ]}
      pageId="test"
    />
  ),
};
shortFilm.parameters = {
  chromatic: { diffThreshold: 0.2 },
};

export const event = Template.bind({});
event.args = {
  title: 'DNA, Diversity and Difference',
  breadcrumbs: { items: [{ text: 'Events', url: '#' }] },
  FeaturedMedia: <EventFeaturedMedia />,
  ContentTypeInfo: <EventContentTypeInfo />,
  isContentTypeInfoBeforeMedia: true,
  Background: (
    <HeaderBackground
      hasWobblyEdge={true}
      backgroundTexture={headerBackgroundLs}
    />
  ),
};

export const exhibition = Template.bind({});
exhibition.args = {
  title: 'Being Human',
  breadcrumbs: { items: [{ text: 'Exhibitions', url: '#' }] },
  labels: { labels: [{ text: 'Permanent exhibition' }] },
  HeroPicture: <Picture images={exhibitionPictureImages} isFull={true} />,
  ContentTypeInfo: <ExhibitionContentTypeInfo />,
  isContentTypeInfoBeforeMedia: true,
};

export const list = Template.bind({});
list.args = {
  title: 'Books',
  backgroundTexture: headerBackgroundLs,
  breadcrumbs: { items: [] },
  highlightHeading: true,
  ContentTypeInfo:
    'We publish adventurous and unusual books that explore health, medicine and the complexities of the human condition.',
};

export const page = Template.bind({});
page.args = {
  title: 'Venue hire terms and conditions',
  backgroundTexture: headerBackgroundLs,
  highlightHeading: true,
  breadcrumbs: { items: [{ text: 'Get involved', url: '#' }] },
};

export const book = Template.bind({});
book.args = {
  title: 'Together',
  ContentTypeInfo: <BookContentTypeInfo />,
  isContentTypeInfoBeforeMedia: true,
  breadcrumbs: { items: [{ text: 'Books', url: '#' }] },
  FeaturedMedia: (
    <Space $v={{ size: 'xl', properties: ['margin-top', 'padding-top'] }}>
      <Layout gridSizes={gridSize8()}>
        <BookImage
          image={bookImage}
          sizes={{ xlarge: 1 / 3, large: 1 / 3, medium: 1 / 3, small: 1 }}
          quality="low"
        />
      </Layout>
    </Space>
  ),
};
book.parameters = {
  chromatic: { diffThreshold: 0.2 },
};
