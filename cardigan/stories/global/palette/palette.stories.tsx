import { FunctionComponent } from 'react';
import { themeValues } from '@weco/common/views/themes/config';
import styled from 'styled-components';
import { font } from '@weco/common/utils/classnames';
import Divider from '@weco/common/views/components/Divider/Divider';
import Table from '@weco/content/components/Table/Table';
import {
  RGB,
  HSL,
  hexToRgb,
  rgbToHsl,
} from '@weco/content/utils/convert-colors';

type PaletteColors = {
  [id: string]: Category;
};

type Category = {
  label: string;
  description: string;
  colors?: Record<string, ColorObject>;
};

type ColorObject = {
  hex: string;
  rgb: RGB;
  hsl: HSL;
};

const PaletteSection = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SectionWrapper = styled.div`
  margin: 1rem 0;
`;

const SectionTitle = styled.h2.attrs({ className: font('wb', 3) })`
  padding: 2rem 0 0;
`;

const SectionDescription = styled.p.attrs({ className: font('intr', 6) })``;

const PaletteBlock = styled.div`
  flex-basis: 25%;
  margin-bottom: 15px;
`;

const PaletteName = styled.h3.attrs({
  className: font('lr', 6),
})``;

const PaletteColor = styled.div<{ $hasBorder: boolean }>`
  position: relative;
  min-width: 200px;
  margin-right: 15px;

  /* stylelint-disable value-keyword-case */
  border: ${props =>
    `1px solid ${
      props.$hasBorder ? props.theme.color('neutral.500') : 'transparent'
    }`};
  /* stylelint-enable value-keyword-case */

  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

const PaletteHex = styled.div.attrs({
  className: font('lr', 6),
})``;

const PaletteCode = styled.code.attrs({
  className: font('lr', 6),
})``;

let paletteColors: PaletteColors = {
  core: {
    label: 'Core',
    description:
      'The core colour theme is defined as black, white and yellow. This is a constant theme which persists across the product. As a result, any additional colours should be complimentary to these.',
  },
  accent: {
    label: 'Accents',
    description:
      'Chosen to match the core yellow, accent colours are interspersed where appropriate for uses such as: defining a theme or differentiating types of content.',
  },
  neutral: {
    label: 'Neutrals',
    description:
      'The neutral theme is used for structural page elements such as dividers and UI components. Their variable names follow Material design and font-weight inspired naming, where the "thicker" the font, the darker the grey. Some of them have equivalents in warmNeutrals, twinned through their name. They are considered equivalents because of their luminosity levels.',
  },
  warmNeutral: {
    label: 'Warm Neutrals',
    description:
      'Warmer versions of Neutrals, they all match their equivalent in name, but with a warmer tone reminiscent of the core yellow. They are considered equivalents because of their luminosity levels.',
  },
  validation: {
    label: 'Validation',
    description:
      'These colours should be used solely for validation purposes. We encourage the use of different shades if for other purposes.',
  },
};

Object.entries(themeValues.colors)
  .map(([key, value]) => {
    const rgb = hexToRgb(value);
    const newColor: ColorObject = {
      hex: value,
      rgb,
      hsl: rgbToHsl(rgb),
    };

    if (!key.includes('.')) {
      paletteColors.core.colors = {
        ...paletteColors.core.colors,
        [key]: newColor,
      };
      return null;
    } else {
      const [category, colorName] = key.split('.');

      paletteColors = {
        ...paletteColors,
        [category]: {
          ...paletteColors[category],
          colors: {
            ...paletteColors[category].colors,
            [colorName]: newColor,
          },
        },
      };
      return null;
    }
  })
  .filter(Boolean);

const Swatch = ({ hex }) => {
  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: hex,
        border: hex === '#ffffff' ? '1px solid #ddd' : undefined,
      }}
    />
  );
};

const GitbookPalette = () => {
  function getNameAndType(key: string): [string, string] {
    if (!key.includes('.')) return [key, 'core'];

    return [key.slice(key.indexOf('.') + 1), key.slice(0, key.indexOf('.'))];
  }

  const headings = ['Name', 'Type', 'Hex', 'Swatch'];

  const gitbookColorRows = Object.keys(themeValues.colors).map(key => {
    const hex = themeValues.colors[key];
    const nameAndType = getNameAndType(key);
    return [
      nameAndType[0],
      nameAndType[1],
      hex,
      <Swatch key={key} hex={hex} />,
    ];
  });

  return <Table rows={[headings, ...gitbookColorRows]} />;
};

const GitbookPaletteTemplate = () => <GitbookPalette />;
export const gitbookPalette = GitbookPaletteTemplate.bind({});

export const Palette: FunctionComponent = () => (
  <>
    {Object.keys(paletteColors).map((category, i) => (
      <SectionWrapper key={category}>
        {i !== 0 && <Divider lineColor="black" />}
        <SectionTitle>{paletteColors[category].label}</SectionTitle>
        <SectionDescription>
          {paletteColors[category].description}
        </SectionDescription>
        <PaletteSection>
          {Object.entries(paletteColors[category].colors).map(
            ([colorName, colorValues]) => (
              <PaletteBlock key={colorName}>
                <PaletteName>{colorName}</PaletteName>
                <PaletteColor
                  hasBorder={colorName === 'white'}
                  style={{ background: colorValues.hex }}
                />
                <PaletteHex>
                  Hex: <PaletteCode>{colorValues.hex}</PaletteCode>
                </PaletteHex>
                <PaletteHex>
                  RGB:{' '}
                  <PaletteCode>
                    {colorValues.rgb.r}, {colorValues.rgb.g},{' '}
                    {colorValues.rgb.b}
                  </PaletteCode>
                </PaletteHex>
                <PaletteHex>
                  HSL:{' '}
                  <PaletteCode>
                    {colorValues.hsl.h}, {colorValues.hsl.s},{' '}
                    {colorValues.hsl.l}%
                  </PaletteCode>
                </PaletteHex>
              </PaletteBlock>
            )
          )}
        </PaletteSection>
      </SectionWrapper>
    ))}
  </>
);
