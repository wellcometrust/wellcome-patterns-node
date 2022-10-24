import { font } from '../../../utils/classnames';
import Space from '../styled/Space';
import styled from 'styled-components';
import { FunctionComponent } from 'react';

const Wrapper = styled(Space).attrs({
  v: {
    size: 'm',
    properties: ['padding-top', 'padding-bottom'],
  },
  h: { size: 'm', properties: ['padding-left', 'padding-right'] },
  className: font('intb', 5),
})`
  display: inline-block;
  border-left: 5px solid ${props => props.theme.color('yellow')};
`;

type Props = {
  text: string;
};

const Message: FunctionComponent<Props> = ({ text }) => (
  <Wrapper>{text}</Wrapper>
);
export default Message;
