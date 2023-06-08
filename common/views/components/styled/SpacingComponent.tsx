import styled from 'styled-components';

const SpacingComponent = styled.div.attrs({
  className: 'spacing-component',
})`
  &:empty,
  & + .spacing-component {
    margin-top: ${props => props.theme.spaceAtBreakpoints.small.l}px;

    ${props =>
      props.theme.media('medium')(`
        margin-top: ${props.theme.spaceAtBreakpoints.medium.l}px;
      `)}

    ${props =>
      props.theme.media('large')(`
        margin-top: ${props.theme.spaceAtBreakpoints.large.l}px;
      `)}
  }

  @supports selector(:has(a)) {
    /* The SpacingComponent spaces adjacent components vertically by an amount
    of pixels. Elements within a single block of .spaced-text are spaced
    vertically by an amount of ems. In Prismic, it is possible to create a new
    component for each paragraph of text (instead of keeping it all in the same
    block). This means that text elements could have slightly different amounts
    of vertical spacing depending on how the content has been added. To account
    for this, we check if the two adjacent SpacingComponents contain
    .spaced-text, and if so, override the SpacingComponent spacing in favour of
    the .spaced-text spacing. Firefox currently (June 2023) doesn't support
    :has(). Hopefully this will change soon
    (https://connect.mozilla.org/t5/ideas/when-is-has-css-selector-going-to-be-fully-implemented-in/idi-p/23794/page/2#comments)
    */

    /* .body-text was added to ensure this only happened in Body slices */
    &:has(.spaced-text.body-text) + &:has(.spaced-text.body-text) {
      margin-top: 0;

      .spaced-text.body-text > *:first-child {
        margin-top: ${props => props.theme.spacedTextTopMargin};
      }
    }
  }
`;

export default SpacingComponent;
