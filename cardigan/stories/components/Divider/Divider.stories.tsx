import styled from 'styled-components';
import Divider from '@weco/common/views/components/Divider/Divider';
import Readme from '@weco/common/views/components/Divider/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';

const Container = styled.div<{ $backgroundColor: 'white' | 'black' }>`
  padding: 2rem 0;
  ${props =>
    props.$backgroundColor &&
    `background-color: ${props.theme.color(props.$backgroundColor)}`};
`;

const Wrapper = styled.div`
  margin: 0 2rem;
`;

const Template = args => {
  const { backgroundColor, ...rest } = args;
  return (
    <Container $backgroundColor={backgroundColor}>
      <Wrapper>
        <ReadmeDecorator
          WrappedComponent={Divider}
          args={rest}
          Readme={Readme}
        />
      </Wrapper>
    </Container>
  );
};

export const basic = Template.bind({});
basic.args = {
  backgroundColor: 'white',
};

export const stub = Template.bind({});
stub.args = {
  lineColor: 'black',
  isStub: true,
  backgroundColor: 'white',
};

basic.argTypes = {
  backgroundColor: {
    control: { type: 'select' },
    options: ['black', 'white'],
  },
};
