import { Content } from '@prismicio/client';
import { FunctionComponent } from 'react';
import { SliceComponentProps } from '@prismicio/react';
import SpacingComponent from '../../components/styled/SpacingComponent';
import {
  LayoutWidth,
  defaultContext,
  SliceZoneContext,
} from '@weco/content/components/Body/Body';
import CaptionedImage from '@weco/content/components/CaptionedImage/CaptionedImage';
import { transformEditorialImageSlice } from '@weco/content/services/prismic/transformers/body';

export type EditorialImageSliceProps = SliceComponentProps<
  Content.EditorialImageSlice,
  SliceZoneContext
>;

const EditorialImageSlice: FunctionComponent<EditorialImageSliceProps> = ({
  slice,
  context,
}) => {
  const transformedSlice = transformEditorialImageSlice(slice);

  const options = { ...defaultContext, context };
  return (
    <SpacingComponent $sliceType={transformedSlice.type}>
      <LayoutWidth width={options.isVisualStory ? 8 : 10}>
        <CaptionedImage {...transformedSlice.value} />
      </LayoutWidth>
    </SpacingComponent>
  );
};

export default EditorialImageSlice;
