import { StandfirstSlice } from '../../../prismicio-types';
import { FunctionComponent } from 'react';
import { SliceComponentProps } from '@prismicio/react';
import { transformStandfirstSlice } from '@weco/content/services/prismic/transformers/body';
import PageHeaderStandfirst from '@weco/common/views/components/PageHeaderStandfirst/PageHeaderStandfirst';
export type StandfirstProps = SliceComponentProps<StandfirstSlice>;

const Standfirst: FunctionComponent<StandfirstProps> = ({ slice }) => {
  const transformedSlice = transformStandfirstSlice(slice);
  return <PageHeaderStandfirst html={transformedSlice.value} />;
  // TODO fix type
};

export default Standfirst;
