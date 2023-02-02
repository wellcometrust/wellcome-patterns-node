import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { PaletteColor } from '@weco/common/views/themes/config';
import Space from '../styled/Space';
import Dot from './Dot';

const Wrapper = styled.span`
  display: flex;
  align-items: center;
`;

const DotWrapper = styled(Space).attrs({
  as: 'span',
  h: { size: 'xs', properties: ['margin-right'] },
})`
  display: flex;
  align-items: center;
`;

type Props = { dotColor: PaletteColor; text: string; className?: string };

const TextWithDot: FunctionComponent<Props> = ({
  dotColor,
  text,
  className,
}) => (
  <Wrapper className={className}>
    <DotWrapper>
      <Dot dotColor={dotColor} />
    </DotWrapper>
    {text}
  </Wrapper>
);

export default TextWithDot;
