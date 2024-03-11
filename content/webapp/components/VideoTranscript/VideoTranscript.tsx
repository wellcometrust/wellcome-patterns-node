import { FunctionComponent } from 'react';
import Space from '@weco/common/views/components/styled/Space';
import DownloadLink from '@weco/content/components/DownloadLink/DownloadLink';
import { getFormatString } from '@weco/content/utils/iiif/v3';
import {
  ChoiceBody,
  ContentResource,
  EmbeddedResource,
  ExternalWebResource,
} from '@iiif/presentation-3';

type Props = {
  supplementing: (ContentResource | ChoiceBody)[];
};

const VideoTranscript: FunctionComponent<Props> = ({
  supplementing,
}: Props) => {
  return (
    <>
      {supplementing.map(item => {
        const displayItem = (item.type === 'Choice' ? item.items[0] : item) as
          | EmbeddedResource
          | ExternalWebResource;
        if (typeof displayItem !== 'string' && displayItem.id) {
          return (
            <Space key={item.id} $v={{ size: 's', properties: ['margin-top'] }}>
              <DownloadLink
                href={displayItem.id}
                linkText="Transcript of video"
                format={getFormatString(displayItem.format || '')}
                mimeType={displayItem.format || ''}
                trackingTags={['annotation']}
              />
            </Space>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

export default VideoTranscript;
