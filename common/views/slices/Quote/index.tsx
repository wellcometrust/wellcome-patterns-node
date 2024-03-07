import { Content } from '@prismicio/client';
import { FunctionComponent } from 'react';
import { SliceComponentProps } from '@prismicio/react';
import Quote from '@weco/content/components/Quote/Quote';
import SpacingComponent from '../../components/styled/SpacingComponent';
import {
  LayoutWidth,
  SliceZoneContext,
  defaultContext,
} from '@weco/content/components/Body/Body';
import { transformQuoteSlice } from '@weco/content/services/prismic/transformers/body';

export type QuoteSliceProps = SliceComponentProps<
  Content.QuoteSlice,
  SliceZoneContext
>;

const QuoteSlice: FunctionComponent<QuoteSliceProps> = ({ slice, context }) => {
  const transformedSlice = transformQuoteSlice(slice);
  const options = { ...defaultContext, ...context };

  return (
    <SpacingComponent $sliceType={transformedSlice.type}>
      <LayoutWidth width={options.minWidth}>
        <Quote {...transformedSlice.value} />
      </LayoutWidth>
    </SpacingComponent>
  );
};

export default QuoteSlice;
