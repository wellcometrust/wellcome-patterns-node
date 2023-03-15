import { Fragment, useState, useEffect, FunctionComponent } from 'react';
import PageHeader from '@weco/common/views/components/PageHeader/PageHeader';
import { getFeaturedMedia, getHeroPicture } from '../../utils/page-header';
import DateRange from '@weco/common/views/components/DateRange/DateRange';
import HTMLDate from '@weco/common/views/components/HTMLDate/HTMLDate';
import StatusIndicator from '../../components/StatusIndicator/StatusIndicator';
import { Page as PageType } from '../../types/pages';
import Space from '@weco/common/views/components/styled/Space';
import Body from '../Body/Body';
import SearchResults from '../SearchResults/SearchResults';
import ContentPage from '../ContentPage/ContentPage';
import Contributors from '../Contributors/Contributors';
import { isNotUndefined } from '@weco/common/utils/array';
import { fetchExhibitionRelatedContentClientSide } from '../../services/prismic/fetch/exhibitions';
import {
  Exhibition as ExhibitionType,
  ExhibitionAbout,
} from '../../types/exhibitions';
import { EventBasic } from '../../types/events';
import { ExhibitionInfoBox } from './ExhibitionInfoBox';

type Props = {
  exhibition: ExhibitionType;
  pages: PageType[];
};

const Exhibition: FunctionComponent<Props> = ({ exhibition, pages }) => {
  type ExhibitionOf = (ExhibitionType | EventBasic)[];

  const [exhibitionOfs, setExhibitionOfs] = useState<ExhibitionOf>([]);
  const [exhibitionAbouts, setExhibitionAbouts] = useState<ExhibitionAbout[]>(
    []
  );

  useEffect(() => {
    const ids = exhibition.relatedIds;

    fetchExhibitionRelatedContentClientSide(ids).then(relatedContent => {
      if (isNotUndefined(relatedContent)) {
        setExhibitionOfs(relatedContent.exhibitionOfs);
        setExhibitionAbouts(relatedContent.exhibitionAbouts);
      }
    });
  }, []);

  const breadcrumbs = {
    items: [
      {
        url: '/exhibitions',
        text: 'Exhibitions',
      },
      {
        url: `/exhibitions/${exhibition.id}`,
        text: exhibition.title,
        isHidden: true,
      },
    ],
  };

  const DateInfo = exhibition.end ? (
    <DateRange start={exhibition.start} end={exhibition.end} />
  ) : (
    <HTMLDate date={exhibition.start} />
  );

  // This is for content that we don't have the crops for in Prismic
  const maybeHeroPicture = getHeroPicture(exhibition);
  const maybeFeaturedMedia = !maybeHeroPicture
    ? getFeaturedMedia(exhibition)
    : undefined;

  const Header = (
    <PageHeader
      breadcrumbs={breadcrumbs}
      labels={{ labels: exhibition.labels }}
      title={exhibition.title}
      ContentTypeInfo={
        <Fragment>
          {!exhibition.isPermanent && (
            <Space v={{ size: 'xs', properties: ['margin-bottom'] }}>
              {DateInfo}
            </Space>
          )}
          <StatusIndicator
            start={exhibition.start}
            end={exhibition.end || new Date()}
            statusOverride={exhibition.statusOverride}
          />
        </Fragment>
      }
      FeaturedMedia={maybeFeaturedMedia}
      HeroPicture={maybeHeroPicture}
      isFree={true}
      isContentTypeInfoBeforeMedia={true}
    />
  );

  return (
    <ContentPage
      id={exhibition.id}
      Header={Header}
      Body={<Body body={exhibition.body} pageId={exhibition.id} />}
      seasons={exhibition.seasons}
      // We hide contributors as we show them further up the page
      hideContributors={true}
    >
      {exhibition.contributors.length > 0 && (
        <Contributors contributors={exhibition.contributors} />
      )}

      {/* TODO: This probably isn't going to be the final resting place for related `pages`, but it's
        a reasonable starting place. Update this once the UX has shaken out. */}
      {(exhibitionOfs.length > 0 || pages.length > 0) && (
        <SearchResults
          items={[...exhibitionOfs, ...pages]}
          title="In this exhibition"
        />
      )}

      <ExhibitionInfoBox exhibition={exhibition} />

      {exhibitionAbouts.length > 0 && (
        <SearchResults items={exhibitionAbouts} title="About this exhibition" />
      )}
    </ContentPage>
  );
};
export default Exhibition;
