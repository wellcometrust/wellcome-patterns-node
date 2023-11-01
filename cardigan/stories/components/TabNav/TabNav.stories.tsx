import { useState } from 'react';
import styled from 'styled-components';
import TabNav from '@weco/content/components/TabNav/TabNav';
import Space from '@weco/common/views/components/styled/Space';
import Readme from '@weco/content/components/TabNav/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';
import { Container } from '@weco/common/views/components/styled/Container';

type WrapperProps = { $backgroundColor: 'white' | 'black' };
const Wrapper = styled(Space).attrs({
  $v: { size: 'l', properties: ['margin-bottom'] },
})<WrapperProps>`
  ${props =>
    props.$backgroundColor &&
    `background-color: ${props.theme.color(props.$backgroundColor)}`};
`;

const Template = ({ items, variant, ...rest }) => {
  const [selectedTab, setSelectedTab] = useState(items[0].id); //eslint-disable-line

  const itemsSelector = items.map(item => ({
    ...item,
    selected: selectedTab === item.id,
  }));

  return (
    <Container>
      <Wrapper $backgroundColor={variant === 'white' ? 'black' : 'white'}>
        <ReadmeDecorator
          WrappedComponent={TabNav}
          args={{
            id: 'story-tabs',
            items: itemsSelector,
            selectedTab: 'all',
            variant,
            setSelectedTab,
            ...rest,
          }}
          Readme={Readme}
          order="readmeFirst"
        />
      </Wrapper>
      <>
        {selectedTab === 'all' && (
          <div role="tabpanel" id="tabpanel-all" aria-labelledby="tab-all">
            All content
          </div>
        )}
        {selectedTab === 'slightly-longer' && (
          <div
            role="tabpanel"
            id="tabpanel-slightly-longer"
            aria-labelledby="tab-slightly-longer"
          >
            Slightly longer content
          </div>
        )}
        {selectedTab === 'pictures' && (
          <div
            role="tabpanel"
            id="tabpanel-pictures"
            aria-labelledby="tab-pictures"
          >
            Pictures content
          </div>
        )}
      </>
    </Container>
  );
};

export const basic = Template.bind({});
basic.args = {
  hasDivider: true,
  items: [
    {
      id: 'all',
      text: 'All',
    },
    {
      id: 'slightly-longer',
      text: 'Slightly longer title to test with',
    },
    {
      id: 'pictures',
      text: 'Pictures',
    },
  ],
};

basic.argTypes = {
  setSelectedTab: {
    table: { disable: true },
  },
  variant: {
    control: { type: 'inline-radio' },
    options: ['default', 'yellow', 'white'],
  },
};

basic.storyName = 'TabNav';
