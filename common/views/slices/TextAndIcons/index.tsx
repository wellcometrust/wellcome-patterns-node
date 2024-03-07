import { FunctionComponent } from 'react';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import SpacingComponent from '@weco/common/views/components/styled/SpacingComponent';
import Layout, { gridSize8 } from '@weco/common/views/components/Layout';
import TextAndImageOrIcons from '@weco/content/components/TextAndImageOrIcons';
import { transformTextAndIcons } from '@weco/content/services/prismic/transformers/body';

export type TextAndIconsProps = SliceComponentProps<Content.TextAndIconsSlice>;

const TextAndIconsSlice: FunctionComponent<TextAndIconsProps> = ({
  slice,
}: TextAndIconsProps) => {
  const transformedSlice = transformTextAndIcons(slice);

  return (
    <SpacingComponent $sliceType={transformedSlice.type}>
      <Layout gridSizes={gridSize8()}>
        <TextAndImageOrIcons item={transformedSlice.value} />
      </Layout>
    </SpacingComponent>
  );
};

export default TextAndIconsSlice;
