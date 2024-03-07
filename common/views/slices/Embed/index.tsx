import { FunctionComponent } from 'react';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import SpacingComponent from '@weco/common/views/components/styled/SpacingComponent';
import { transformEmbedSlice } from '@weco/content/services/prismic/transformers/body';
import {
  LayoutWidth,
  defaultContext,
  SliceZoneContext,
} from '@weco/content/components/Body/Body';
import VideoEmbed from '@weco/common/views/components/VideoEmbed/VideoEmbed';
import SoundCloudEmbed from '@weco/content/components/SoundCloudEmbed/SoundCloudEmbed';

export type EmbedProps = SliceComponentProps<
  Content.EmbedSlice,
  SliceZoneContext
>;

const EmbedSlice: FunctionComponent<EmbedProps> = ({ slice, context }) => {
  const transformedSlice = transformEmbedSlice(slice);
  const options = { ...defaultContext, ...context };

  return transformedSlice ? (
    <>
      {transformedSlice.type === 'videoEmbed' && (
        <SpacingComponent $sliceType={transformedSlice.type}>
          <LayoutWidth width={options.isShortFilm ? 12 : options.minWidth}>
            <VideoEmbed
              {...transformedSlice.value}
              hasFullSizePoster={options.isShortFilm}
            />
          </LayoutWidth>
        </SpacingComponent>
      )}
      {transformedSlice.type === 'soundcloudEmbed' && (
        <SpacingComponent $sliceType={transformedSlice.type}>
          <LayoutWidth width={options.minWidth}>
            <SoundCloudEmbed {...transformedSlice.value} id={slice.id} />
          </LayoutWidth>
        </SpacingComponent>
      )}
    </>
  ) : null;
};

export default EmbedSlice;
