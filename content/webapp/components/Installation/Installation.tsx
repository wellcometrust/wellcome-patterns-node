import { FunctionComponent, useEffect, useState } from 'react';
import DateAndStatusIndicator from '../DateAndStatusIndicator/DateAndStatusIndicator';
import StatusIndicator from '../../components/StatusIndicator/StatusIndicator';
import HeaderBackground from '@weco/common/views/components/HeaderBackground/HeaderBackground';
import PageHeader from '@weco/common/views/components/PageHeader/PageHeader';
import { getFeaturedMedia } from '../../utils/page-header';
import { Exhibition as InstallationType } from '../../types/exhibitions';
import Body from '../Body/Body';
import ContentPage from '../ContentPage/ContentPage';
import { isNotUndefined } from '@weco/common/utils/array';
import { fetchExhibitExhibition } from '../../services/prismic/fetch/exhibitions';
import { ExhibitionInfoBox } from 'components/Exhibition/ExhibitionInfoBox';

type Props = {
  installation: InstallationType;
};

const Installation: FunctionComponent<Props> = ({ installation }) => {
  const [partOf, setPartOf] = useState<InstallationType>();
  useEffect(() => {
    fetchExhibitExhibition(installation.id).then(exhibition => {
      if (isNotUndefined(exhibition)) {
        setPartOf(exhibition);
      }
    });
  }, []);

  const FeaturedMedia = getFeaturedMedia(installation);

  const breadcrumbs = {
    items: [
      {
        text: 'Installations',
      },
      partOf
        ? {
            url: `/exhibitions/${partOf.id}`,
            text: partOf.shortTitle || partOf.title,
            prefix: 'Part of',
          }
        : undefined,
      {
        url: `/exhibitions/${installation.id}`,
        text: installation.title,
        isHidden: true,
      },
    ].filter(isNotUndefined),
  };

  const Header = (
    <PageHeader
      breadcrumbs={breadcrumbs}
      labels={{ labels: installation.labels }}
      title={installation.title}
      FeaturedMedia={FeaturedMedia}
      Background={<HeaderBackground hasWobblyEdge={true} />}
      ContentTypeInfo={
        <>
          {installation.start && !installation.statusOverride && (
            <DateAndStatusIndicator
              start={installation.start}
              end={installation.end}
            />
          )}
          {installation.statusOverride && (
            <StatusIndicator
              start={installation.start}
              end={installation.end || new Date()}
              statusOverride={installation.statusOverride}
            />
          )}
        </>
      }
      isContentTypeInfoBeforeMedia={true}
    />
  );
  return (
    <ContentPage
      id={installation.id}
      Header={Header}
      Body={<Body body={installation.body} pageId={installation.id} />}
      seasons={installation.seasons}
      contributors={installation.contributors}
    >
      <ExhibitionInfoBox exhibition={installation} />
    </ContentPage>
  );
};

export default Installation;
