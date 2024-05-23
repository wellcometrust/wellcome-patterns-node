import { FunctionComponent } from 'react';
import { useAVTracking } from '@weco/content/hooks/useAVTracking';
import { ChoiceBody, ContentResource } from '@iiif/presentation-3';
import { CustomContentResource } from '@weco/content/types/manifest';

type Props = {
  video: (
    | (Omit<ContentResource, 'type'> & {
        type: ContentResource['type'] | 'Audio';
      })
    | CustomContentResource
    | ChoiceBody
  ) & {
    format?: string;
  };
  placeholderId: string | undefined;
  showDownloadOptions: boolean;
};

const VideoPlayer: FunctionComponent<Props> = ({
  video,
  placeholderId,
  showDownloadOptions,
}: Props) => {
  const { trackPlay, trackEnded, trackTimeUpdate } = useAVTracking('video');
  console.log('placeholder', placeholderId);
  return (
    <video
      onPlay={event => {
        trackPlay(event);
      }}
      onEnded={trackEnded}
      onTimeUpdate={trackTimeUpdate}
      controlsList={!showDownloadOptions ? 'nodownload' : undefined}
      controls
      preload="none"
      poster={placeholderId}
      // TODO remove this style
      // TODO need to check on /works and on ExhibitionGuideStops
      // style={{
      //   maxWidth: '100%',
      //   maxHeight: '260px',
      //   display: 'inline-block',
      // }}
    >
      <source src={video.id} type={video.format} />
      {`Sorry, your browser doesn't support embedded video.`}
    </video>
  );
};

export default VideoPlayer;
