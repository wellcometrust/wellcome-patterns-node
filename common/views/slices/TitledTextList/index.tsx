import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import {
  SliceZoneContext,
  defaultContext,
  LayoutWidth,
} from '@weco/content/components/Body/Body';
import { transformTitledTextListSlice } from '@weco/content/services/prismic/transformers/body';
import { FunctionComponent } from 'react';
import SpacingComponent from '@weco/common/views/components/styled/SpacingComponent';
import TitledTextList from '@weco/content/components/TitledTextList/TitledTextList';

export type TitledTextListProps = SliceComponentProps<
  Content.TitledTextListSlice,
  SliceZoneContext
>;

const TitledTextListSlice: FunctionComponent<TitledTextListProps> = ({
  slice,
  context,
}) => {
  const options = { ...defaultContext, ...context };
  const transformedSlice = transformTitledTextListSlice(slice);
  return (
    <SpacingComponent $sliceType={transformedSlice.type}>
      <LayoutWidth width={options.minWidth}>
        <TitledTextList {...transformedSlice.value} />
      </LayoutWidth>
    </SpacingComponent>
  );
};

export default TitledTextListSlice;
