import styled from 'styled-components';
import Space from '@weco/common/views/components/styled/Space';
import { classNames, font } from '@weco/common/utils/classnames';

export const Wrapper = styled.div`
  ${props =>
    `
      margin: 0 -${props.theme.containerPadding.small}px;
      transition: margin ${props => props.theme.transitionProperties};

    ${props.theme.media('medium')(`
        margin: 0 calc(-${props.theme.containerPadding.medium}px + 1rem);
    `)}

    ${props.theme.media('large')(`
        margin: 0 calc(-${props.theme.containerPadding.large}px + 1rem);
    `)}

    ${props.theme.media('xlarge')(`
        margin-right: 0;
    `)}
  `}
`;

export const TabsContainer = styled.div`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-x: auto;
  padding-left: ${props => props.theme.containerPadding.small}px;

  ${props => `
    ${props.theme.media('medium')(`
      padding-left: calc(${props.theme.containerPadding.medium}px - 1rem);
  `)}

  ${props.theme.media('large')(`
    padding-left: calc(${props.theme.containerPadding.large}px - 1rem);
  `)}
  `}
`;

type NavItemProps = {
  $selected: boolean;
  $isWhite?: boolean;
  $hideBorder?: boolean;
};

export const Tab = styled.div.attrs({
  className: font('intb', 5),
})<NavItemProps>`
  padding: 0;
  margin: 0;
  flex-shrink: 0;
  border-bottom: ${props =>
    props.$selected
      ? `3px solid ${props.theme.color('yellow')}`
      : `1px solid ${props.theme.color(
          props.$hideBorder
            ? 'transparent'
            : props.$isWhite
            ? 'neutral.600'
            : 'neutral.300'
        )}`};

  a {
    text-decoration: none;

    /* For Tab.Anchor */
    &:focus-visible,
    &:focus {
      display: block;
      box-shadow:
        0 0 0 3px ${props => props.theme.color('focus.yellow')} inset,
        0 0 0 6px ${props => props.theme.color('black')} inset;
      outline: 0;
    }
  }
`;

export const TabButton = styled.div.attrs({
  className: font('intb', 5),
})<NavItemProps>`
  /* For Tab.Tab */
  &:focus-visible,
  &:focus {
    box-shadow:
      0 0 0 3px ${props => props.theme.color('focus.yellow')} inset,
      0 0 0 6px ${props => props.theme.color('black')} inset;
    outline: 0;
  }
`;

export const NavItemInner = styled(Space).attrs<{ $selected: boolean }>(
  props => {
    return {
      as: 'span',
      className: classNames({ selected: props.$selected }),
      $h: { size: 'l', properties: ['padding-left', 'padding-right'] },
      $v: { size: 'm', properties: ['padding-top', 'padding-bottom'] },
    };
  }
)<{ $isWhite?: boolean }>`
  display: block;
  position: relative;
  z-index: 1;
  cursor: pointer;
  color: ${props => props.theme.color(props.$isWhite ? 'white' : 'black')};
  transition: all ${props => props.theme.transitionProperties};

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    height: 3px;
    left: 0;
    width: 0;
    transition: width 200ms ease;
  }

  /* TODO: check if we still want hover transition behaviour */

  &:hover,
  &:focus {
    &::after {
      width: 100%;
      background-color: ${props =>
        props.theme.color(props.$selected ? 'yellow' : 'neutral.300')};

      /* Prevent iOS double-tap link issue
       https://css-tricks.com/annoying-mobile-double-tap-link-issue/ */
      @media (pointer: coarse) {
        width: 0;
      }
    }
  }

  &.selected::after {
    width: 100%;
    background-color: transparent;
  }
`;
