import { FunctionComponent } from 'react';
import { TextAndImageSlice as RawTextAndImageSlice } from '@weco/common/prismicio-types';
import { SliceComponentProps } from '@prismicio/react';
import SpacingComponent from '@weco/common/views/components/styled/SpacingComponent';
import Layout, { gridSize8 } from '@weco/common/views/components/Layout';
import TextAndImageOrIcons from '@weco/content/components/TextAndImageOrIcons';
import { transformTextAndImage } from '@weco/content/services/prismic/transformers/body';

export type TextAndImageProps = SliceComponentProps<RawTextAndImageSlice>;

const TextAndImageSlice: FunctionComponent<TextAndImageProps> = ({ slice }) => {
  const transformedSlice = transformTextAndImage(slice);
  return (
    <SpacingComponent $sliceType={transformedSlice.type}>
      <Layout gridSizes={gridSize8()}>
        <TextAndImageOrIcons item={transformedSlice.value} />
      </Layout>
    </SpacingComponent>
  );
};

export default TextAndImageSlice;
