import { FunctionComponent } from 'react';
import styled from 'styled-components';
import Table from '@weco/content/components/Table/Table';
import SpacingSection from '@weco/common/views/components/styled/SpacingSection';
import SpacingComponent from '@weco/common/views/components/styled/SpacingComponent';
import { PaletteColor, themeValues } from '@weco/common/views/themes/config';

const { spaceAtBreakpoints } = themeValues;

const SpacingScale = () => {
  const transpose = matrix => {
    const [row] = matrix;
    return row.map((_, column) => matrix.map(row => row[column])).reverse();
  };

  const cols = Object.entries(spaceAtBreakpoints)
    .map(entry => {
      const value = entry[1];
      return Object.entries(value).map((e, index) => {
        const v = e[1];

        return <span key={index}>{v}</span>;
      });
    })
    .reverse();

  const rows = transpose(cols);
  const rowsWithScaleColumn = rows.map((row, index) => {
    return [
      <span key={index}>
        {
          {
            0: 'XL',
            1: 'L',
            2: 'M',
            3: 'S',
            4: 'XS',
          }[index]
        }
      </span>,
      ...row,
    ];
  });
  const firstRow = [['Size', 'BP Large', 'BP Medium', 'BP Small']];
  const rowsWithHeadings = firstRow.concat(rowsWithScaleColumn);

  return <Table caption={null} hasRowHeaders={false} rows={rowsWithHeadings} />;
};

const ScaleTemplate = () => <SpacingScale />;
export const scale = ScaleTemplate.bind({});

const ColorSection = styled.div<{ $bgColor: PaletteColor }>`
  background-color: ${props => props.theme.color(props.$bgColor)};
  color: ${props => props.theme.color('white')};
`;

export const Spacing: FunctionComponent = () => {
  return (
    <ColorSection $bgColor="warmNeutral.300">
      <SpacingSection>
        <ColorSection $bgColor="accent.green" style={{ minHeight: '200px' }}>
          Section
        </ColorSection>
      </SpacingSection>
      <SpacingSection>
        <ColorSection $bgColor="accent.green" style={{ minHeight: '200px' }}>
          Section
          <SpacingComponent>
            <ColorSection $bgColor="accent.blue" style={{ minHeight: '100px' }}>
              Component
            </ColorSection>
          </SpacingComponent>
          <SpacingComponent>
            <ColorSection $bgColor="accent.blue" style={{ minHeight: '100px' }}>
              Component
            </ColorSection>
          </SpacingComponent>
          <SpacingComponent>
            <ColorSection $bgColor="accent.blue" style={{ minHeight: '100px' }}>
              Component
            </ColorSection>
          </SpacingComponent>
        </ColorSection>
      </SpacingSection>
      <SpacingSection>
        <ColorSection $bgColor="accent.green" style={{ minHeight: '200px' }}>
          Section
        </ColorSection>
      </SpacingSection>
    </ColorSection>
  );
};
