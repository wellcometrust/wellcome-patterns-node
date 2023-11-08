import {
  forwardRef,
  RefObject,
  ForwardRefRenderFunction,
  ChangeEvent,
  FocusEvent,
} from 'react';
import styled from 'styled-components';
import Icon from '@weco/common/views/components/Icon/Icon';
import { check } from '@weco/common/icons';
import { font } from '@weco/common/utils/classnames';

type TextInputWrapProps = {
  $big?: boolean;
  $hasErrorBorder: boolean;
  $darkBg?: boolean;
};
export const TextInputWrap = styled.div.attrs<TextInputWrapProps>(props => ({
  className: props.$big ? font('intr', 4) : font('intr', 5),
}))<TextInputWrapProps>`
  display: flex;
  position: relative;
  border: ${props =>
    props.$hasErrorBorder
      ? `3px solid ${props.theme.color('validation.red')}`
      : `2px solid ${props.theme.color(
          props.$darkBg ? 'white' : 'neutral.600'
        )}`};

  &:focus-within {
    box-shadow: ${props => props.theme.focusBoxShadow};
  }

  overflow: hidden;
`;

type TextInputLabelProps = {
  $isEnhanced: boolean;
  $hasValue: boolean;
};
export const TextInputLabel = styled.label<TextInputLabelProps>`
  position: absolute;
  left: 15px;

  /* Styles for browsers that don't support :focus-within (<=IE11) */
  font-size: 14px;
  transform: translateY(0%);
  top: 4px;

  /* IE doesn't support :focus-within, but you can't test for :focus-within
  using @supports. Fortunately, IE doesn't support @supports, so this only
  targets browsers that support @supports (> IE11) */
  @supports (display: block) {
    font-size: inherit;
    transform: translateY(-50%);
    top: 50%;
  }

  color: ${props => props.theme.color('neutral.600')};
  white-space: nowrap;
  transition:
    top ${props => props.theme.transitionProperties},
    font-size ${props => props.theme.transitionProperties},
    transform ${props => props.theme.transitionProperties};
  pointer-events: none;

  ${props =>
    (!props.$isEnhanced || props.$hasValue) &&
    `
    @supports (display: block) {
      top: 4px;
      transform: translateY(0);
      font-size: 14px;
    }
  `}
`;

type TextInputInputProps = {
  $hasErrorBorder: boolean;
};
export const TextInputInput = styled.input.attrs<{ $type?: string }>(props => ({
  type: props.$type || 'text',
}))<TextInputInputProps>`
  padding: 17px 35px 17px 15px;
  appearance: none;
  border: 0;
  height: 100%;
  font-size: inherit;
  width: 100%;

  &::-ms-clear {
    display: none;
  }
`;

const TextInputCheckmark = styled.span.attrs<{
  'data-testid'?: 'TextInputCheckmark';
}>({
  'data-testid': 'TextInputCheckmark',
})`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  line-height: 0;
`;

export const TextInputErrorMessage = styled.span.attrs({
  role: 'alert',
  'data-testid': 'TextInputErrorMessage',
  className: 'font-intb',
})`
  display: block;
  font-size: 14px;
  margin-top: 10px;
  padding-left: 15px;
  color: ${props => props.theme.color('validation.red')};
`;

type Props = {
  label: string;
  value: string;
  setValue: (value: string) => void;
  id: string;
  name?: string;
  type?: string;
  pattern?: string;
  required?: boolean;
  placeholder?: string;
  errorMessage?: string;
  isValid?: boolean;
  setIsValid?: (value: boolean) => void;
  showValidity?: boolean;
  setShowValidity?: (value: boolean) => void;
  autoFocus?: boolean;
  big?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  form?: string;
  darkBg?: boolean;
};

const Input: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    label,
    type,
    value,
    setValue,
    id,
    name,
    pattern,
    required,
    placeholder,
    errorMessage,
    isValid,
    setIsValid,
    showValidity,
    setShowValidity,
    autoFocus,
    ariaLabel,
    ariaDescribedBy,
    form,
    big,
    darkBg,
  }: Props,
  ref: RefObject<HTMLInputElement>
) => {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const isValueValid = event.currentTarget.validity.valid;

    setValue(event.currentTarget.value);

    if (isValid && setShowValidity) {
      setShowValidity(false);
    }

    setIsValid && setIsValid(isValueValid);

    if (isValueValid && setShowValidity) {
      setShowValidity(false);
    }
  }

  function onBlur(event: FocusEvent<HTMLInputElement>) {
    setIsValid && setIsValid(event.currentTarget.validity.valid);
    setShowValidity && setShowValidity(!!value && true);
  }

  return (
    <div>
      <TextInputWrap
        $hasErrorBorder={!!(!isValid && showValidity)}
        $big={!!big}
        $darkBg={darkBg}
      >
        <label className="visually-hidden" htmlFor={id}>
          {label}
        </label>
        <TextInputInput
          ref={ref}
          id={id}
          name={name}
          required={required}
          value={value}
          pattern={pattern}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder || label}
          autoFocus={autoFocus}
          $type={type}
          $hasErrorBorder={!!(!isValid && showValidity)}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          aria-invalid={!!(!isValid && showValidity)}
          aria-errormessage={errorMessage && `${id}-errormessage`}
          form={form}
        />
        {isValid && showValidity && (
          <TextInputCheckmark>
            <Icon icon={check} iconColor="validation.green" />
          </TextInputCheckmark>
        )}
      </TextInputWrap>
      {errorMessage && !isValid && showValidity && (
        <TextInputErrorMessage id={`${id}-errormessage`} role="alert">
          {errorMessage}
        </TextInputErrorMessage>
      )}
    </div>
  );
};

const TextInput = forwardRef<HTMLInputElement, Props>(Input);

export default TextInput;
