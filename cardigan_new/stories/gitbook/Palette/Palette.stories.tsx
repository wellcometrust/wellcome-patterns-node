import { Meta, StoryObj } from '@storybook/react';
import Table from '@weco/content/components/Table/Table';
import { themeValues } from '@weco/common/views/themes/config';

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

export const Basic: StoryObj<typeof GitbookPalette> = {
  name: 'Palette',
};

const meta: Meta<typeof GitbookPalette> = {
  component: GitbookPalette,
  title: 'Gitbook/Palette',
};

export default meta;
