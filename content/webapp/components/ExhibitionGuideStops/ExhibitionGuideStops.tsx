import {
  ExhibitionGuideComponent,
  ExhibitionGuideType,
} from '../../types/exhibition-guides';
import { ReactElement, FC } from 'react';
import Space from '@weco/common/views/components/styled/Space';
import ExhibitionCaptions from '../ExhibitionCaptions/ExhibitionCaptions';
import styled from 'styled-components';
import AudioPlayer from '@weco/common/views/components/AudioPlayer/AudioPlayer';
import VideoEmbed from '@weco/common/views/components/VideoEmbed/VideoEmbed';
import GridFactory, {
  threeUpGridSizesMap,
  twoUpGridSizesMap,
} from '@weco/content/components/Body/GridFactory';
import { dasherizeShorten } from '@weco/common/utils/grammar';
import { font } from '@weco/common/utils/classnames';

const Stop = styled(Space).attrs({
  v: { size: 'm', properties: ['padding-top', 'padding-bottom'] },
  h: { size: 'm', properties: ['padding-left', 'padding-right'] },
})`
  background: ${props => props.theme.color('warmNeutral.300')};
  height: 100%;
`;

type VideoPlayerProps = {
  title: string;
  videoUrl: string;
  anchorId?: string;
};

const VideoPlayer: FC<VideoPlayerProps> = ({ title, videoUrl, anchorId }) => (
  <figure className="no-margin" id={anchorId}>
    <Space v={{ size: 'm', properties: ['margin-bottom'] }}>
      <figcaption className={font('intb', 5)}>{title}</figcaption>
    </Space>
    <VideoEmbed embedUrl={videoUrl} />
  </figure>
);

type Props = {
  stops: ExhibitionGuideComponent[];
  type: ExhibitionGuideType;
  id?: number;
};

const Stops: FC<Props> = ({ stops, type }) => {
  return (
    <GridFactory
      overrideGridSizes={
        type === 'bsl' ? twoUpGridSizesMap : threeUpGridSizesMap
      }
      items={
        stops
          .map((stop, index) => {
            const {
              number,
              audioWithDescription,
              audioWithoutDescription,
              bsl,
              title,
              standaloneTitle,
            } = stop;
            const hasContentOfDesiredType =
              (type === 'audio-with-descriptions' &&
                audioWithDescription?.url) ||
              (type === 'audio-without-descriptions' &&
                audioWithoutDescription?.url) ||
              (type === 'bsl' && bsl?.embedUrl);

            const stopTitle = `${number}. ${title || standaloneTitle}`;

            return hasContentOfDesiredType ? (
              <Stop
                key={index}
                id="apiToolbar"
                data-toolbar-anchor={dasherizeShorten(title)}
              >
                {type === 'audio-with-descriptions' &&
                  audioWithDescription?.url && (
                    <AudioPlayer
                      title={stopTitle}
                      audioFile={audioWithDescription.url}
                      anchorId={dasherizeShorten(title)}
                    />
                  )}
                {type === 'audio-without-descriptions' &&
                  audioWithoutDescription?.url && (
                    <AudioPlayer
                      title={stopTitle}
                      audioFile={audioWithoutDescription.url}
                      anchorId={dasherizeShorten(title)}
                    />
                  )}
                {type === 'bsl' && bsl.embedUrl && (
                  <VideoPlayer
                    title={stopTitle}
                    videoUrl={bsl.embedUrl}
                    anchorId={dasherizeShorten(title)}
                  />
                )}
              </Stop>
            ) : null; // We've decided to omit stops that don't have content for the selected type.
          })
          .filter(Boolean) as ReactElement[]
      }
    />
  );
};

const ExhibitionGuideStops: FC<Props> = ({ stops, type }) => {
  const numberedStops = stops.filter(c => c.number);
  switch (type) {
    case 'bsl':
    case 'audio-with-descriptions':
    case 'audio-without-descriptions':
      return <Stops stops={numberedStops} type={type} />;
    case 'captions-and-transcripts':
      return <ExhibitionCaptions stops={stops} />;
  }
};

export default ExhibitionGuideStops;
