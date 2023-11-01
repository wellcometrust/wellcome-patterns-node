import { useState } from 'react';
import ButtonSolid from '@weco/common/views/components/ButtonSolid/ButtonSolid';
import Control from '@weco/common/views/components/Buttons/Control/Control';
import ToolbarSegmentedControl from '@weco/content/components/ToolbarSegmentedControl/ToolbarSegmentedControl';
import { chevron, digitalImage, eye, gridView } from '@weco/common/icons';
import ControlReadme from '@weco/common/views/components/Buttons/Control/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';
import Download from '@weco/content/components/Download/Download';
import SearchFilters from '@weco/content/components/SearchFilters';
import { linkResolver } from '@weco/common/utils/search';

const ButtonSolidTemplate = args => <ButtonSolid {...args} />;
export const buttonSolid = ButtonSolidTemplate.bind({});
buttonSolid.args = {
  disabled: false,
  icon: eye,
  text: 'Click me',
};
buttonSolid.storyName = 'ButtonSolid';

const ControlTemplate = args => (
  <ReadmeDecorator
    WrappedComponent={Control}
    args={args}
    Readme={ControlReadme}
  />
);
export const control = ControlTemplate.bind({});
control.args = {
  text: 'something for screenreaders',
  icon: chevron,
  colorScheme: 'light',
};
control.storyName = 'Control';

const ToolbarSegmentedControlTemplate = args => {
  const [activeId, setActiveId] = useState('page');

  return (
    <div style={{ padding: '50px', background: '#333' }}>
      <ToolbarSegmentedControl
        activeId={activeId}
        hideLabels={args.hideLabels}
        items={[
          {
            id: 'page',
            icon: digitalImage,
            label: 'Page',
            clickHandler: () => setActiveId('page'),
          },
          {
            id: 'grid',
            icon: gridView,
            label: 'Grid',
            clickHandler: () => setActiveId('grid'),
          },
        ]}
      />
    </div>
  );
};
export const toolbarSegmentedControl = ToolbarSegmentedControlTemplate.bind({});
toolbarSegmentedControl.args = {
  hideLabels: true,
};
toolbarSegmentedControl.storyName = 'ToolbarSegmentedControl';

const DownloadButtonTemplate = args => {
  return <Download ariaControlsId="itemDownloads" {...args} />;
};
export const downloadButton = DownloadButtonTemplate.bind({});
downloadButton.args = {
  isInline: false,
  useDarkControl: false,
  downloadOptions: [
    { id: 'test', label: 'download small image', format: 'image/jpeg' },
    { id: 'test2', label: 'download large image', format: 'image/jpeg' },
    { id: 'test3', label: 'download video', format: 'video/mp4' },
  ],
};
downloadButton.storyName = 'DownloadButton';

const FilterDropdownTemplate = args => {
  return (
    <SearchFilters
      {...args}
      changeHandler={() => {
        // do nothing
      }}
      linkResolver={params => linkResolver({ params, pathname: '/' })}
    />
  );
};
export const filterDropdown = FilterDropdownTemplate.bind({});
filterDropdown.args = {
  filters: [
    {
      type: 'checkbox',
      id: 'contributors',
      label: 'Contributors',
      options: [
        {
          id: 'bbb',
          value: 'johndoe',
          label: 'John Doe',
          selected: false,
        },
        {
          id: 'ccc',
          value: 'janedoe',
          label: 'Jane Doe',
          selected: false,
        },
        {
          id: 'ddd',
          value: 'joebloggs',
          label: 'Joe Bloggs',
          selected: false,
        },
        {
          id: 'eee',
          value: 'johnsmith',
          label: 'John Smith',
          selected: false,
        },
        {
          id: 'fff',
          value: 'poppypoppyseed',
          label: 'Poppy von Poppyseed',
          selected: false,
        },
      ],
    },
    {
      type: 'dateRange',
      id: 'dates',
      label: 'Dates',
      from: { id: 'from' },
      to: { id: 'to' },
    },
    { type: 'color', name: 'color' },
  ],
};
filterDropdown.storyName = 'FilterDropdown';
