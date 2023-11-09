import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TextInput, {
  Props,
} from '@weco/common/views/components/TextInput/TextInput';
import readme from '@weco/common/views/components/TextInput/README.md';
import useValidation from '@weco/common/hooks/useValidation';

const TextInputStory: FunctionComponent<Props> = args => {
  const [value, setValue] = useState('');

  return (
    <div>
      <TextInput
        {...args}
        {...useValidation()}
        value={value}
        setValue={setValue}
      />
    </div>
  );
};

export const Basic: StoryObj<typeof TextInputStory> = {
  name: 'TextInput',
};

const meta: Meta<typeof TextInput> = {
  component: TextInputStory,
  args: {
    required: true,
    id: 'test-id',
    type: 'email',
    name: 'email',
    label: 'Your email address',
    errorMessage:
      'Enter an email address in the correct format, like name@example.com',
  },
  parameters: {
    readme,
  },
};

export default meta;
