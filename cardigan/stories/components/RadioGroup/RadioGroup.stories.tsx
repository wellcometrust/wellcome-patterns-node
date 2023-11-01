import RadioGroup from '@weco/content/components/RadioGroup/RadioGroup';
import { useState } from 'react';

const Template = () => {
  const [selected, setSelected] = useState(null);

  return (
    <RadioGroup
      name="example"
      selected={selected}
      onChange={setSelected}
      options={[
        {
          id: '1',
          value: 'banana',
          label: 'Banana',
        },
        {
          id: '2',
          value: 'apple',
          label: 'Apple',
        },
        {
          id: '3',
          value: 'grapefruit',
          label: 'Grapefruit',
        },
        {
          id: '4',
          value: 'strawberry',
          label: 'Strawberry',
        },
      ]}
    />
  );
};
export const basic = Template.bind({});
basic.storyName = 'RadioGroup';
