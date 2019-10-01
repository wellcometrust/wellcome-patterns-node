// @flow
import { forwardRef, type ComponentType } from 'react';
import styled from 'styled-components';
import Space, { type SpaceComponentProps } from '../styled/Space';
import { classNames } from '../../../utils/classnames';

const StyledInput: ComponentType<SpaceComponentProps> = styled(Space).attrs({
  className: classNames({}),
})`
  outline: none;
  border: 1px solid ${props => props.theme.colors.pumice};
  padding: 12px;

  &:focus {
    border: 2px solid ${props => props.theme.colors.yellow};
    padding: 11px;
  }
`;

type Props = {
  label: string,
  // We can also pass inputProps here
};

// $FlowFixMe (forwardRef)
const NumberInput = forwardRef((
  { label, ...inputProps }: Props,
  ref // eslint-disable-line
) => (
  <label>
    <Space as="span" h={{ size: 'm', properties: ['margin-right'] }}>
      {label}
    </Space>
    <StyledInput as="input" ref={ref} type="number" {...inputProps} />
  </label>
));

export default NumberInput;
