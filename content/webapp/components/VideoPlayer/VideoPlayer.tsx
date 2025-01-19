import { ChoiceBody, ContentResource } from '@iiif/presentation-3';
import { FunctionComponent } from 'react';

import { useAVTracking } from '@weco/content/hooks/useAVTracking';
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
    >
      <source src={video.id} type={video.format} />
      {`Sorry, your browser doesn't support embedded video.`}
    </video>
  );
};

export default VideoPlayer;
