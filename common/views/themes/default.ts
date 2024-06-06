import { css, createGlobalStyle } from 'styled-components';
import { SpaceOverrides } from '../components/styled/Space';
import {
  typography,
  makeFontSizeClasses,
  makeFontSizeOverrideClasses,
} from './typography';
import { utilityClasses } from './utility-classes';
import { normalize } from './base/normalize';
import { wellcomeNormalize } from './base/wellcome-normalize';
import { layout } from './base/layout';
import { row } from './base/row';
import { inlineFonts } from './base/inline-fonts';
import { fonts } from './base/fonts';
import { themeValues, spacingUnits, Size } from './config';
import { grid } from './grid';
import { Toggles } from '@weco/toggles';

type SpaceSize = 'xs' | 's' | 'm' | 'l' | 'xl';
type SpaceProperty =
  | 'margin-bottom'
  | 'margin-top'
  | 'padding-bottom'
  | 'padding-top'
  | 'top'
  | 'bottom'
  | 'margin-left'
  | 'margin-right'
  | 'padding-left'
  | 'padding-right'
  | 'left'
  | 'right'
  | 'row-gap'
  | 'column-gap';

const breakpointNames = ['small', 'medium', 'large'];

function makeSpacePropertyValues(
  size: SpaceSize,
  properties: SpaceProperty[],
  negative?: boolean,
  overrides?: SpaceOverrides
): string {
  return breakpointNames
    .map(bp => {
      return `@media (min-width: ${themeValues.sizes[bp]}px) {
      ${properties
        .map(
          p =>
            `${p}: ${negative ? '-' : ''}${
              overrides && overrides[bp]
                ? spacingUnits[overrides[bp]]
                : themeValues.spaceAtBreakpoints[bp][size]
            }px;`
        )
        .join('')}
    }`;
    })
    .join('');
}

const theme = {
  ...themeValues,
  makeSpacePropertyValues,
};

type Classes = typeof classes;
const classes = {
  displayNone: 'display-none',
  displayBlock: 'display-block',
};
type SizedClasses = {
  small: Classes;
  medium: Classes;
  large: Classes;
  xlarge: Classes;
};

const sizesClasses = Object.keys(themeValues.sizes).reduce((acc, size) => {
  const o = Object.entries(classes).reduce((acc, [key, val]) => {
    return {
      ...acc,
      [key]: `${size}-${val}`,
    };
  }, {});

  return {
    ...acc,
    [size]: o,
  };
}, {});

// We know these types to be true but typescript and `.keys` and `.reduce` doesn't play all that nice
// TODO: Remove type coercion
// see: https://fettblog.eu/typescript-better-object-keys/
const cls = {
  ...classes,
  ...sizesClasses,
  /* eslint-disable @typescript-eslint/no-explicit-any */
} as any as Classes & SizedClasses;
/* eslint-enable @typescript-eslint/no-explicit-any */

export type GlobalStyleProps = {
  toggles?: Toggles;
  isFontsLoaded?: boolean;
};

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  ${css`
    .${cls.displayBlock} {
      display: block;
    }
    .${cls.displayNone} {
      display: none;
    }
  `}
  ${css`
    ${Object.keys(themeValues.sizes).map(
      size => css`
        .${cls[size as Size].displayNone} {
          ${props => props.theme.media(size as Size)`
          display: none;
        `}
        }
        .${cls[size as Size].displayBlock} {
          ${props => props.theme.media(size as Size)`
          display: block;
        `}
        }
      `
    )}
  `}
  ${utilityClasses}
  ${normalize}
  ${wellcomeNormalize}
  ${layout}
  ${row}
  ${inlineFonts}
  ${fonts}
  ${makeFontSizeClasses()}
  ${makeFontSizeOverrideClasses()}
  ${typography}
  ${grid}
`;

export default theme;
export { GlobalStyle, cls };
