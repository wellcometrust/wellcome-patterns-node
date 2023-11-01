import PopupDialog from '@weco/common/views/components/PopupDialog/PopupDialog';
import Readme from '@weco/common/views/components/PopupDialog/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';

const Template = args => (
  <ReadmeDecorator WrappedComponent={PopupDialog} args={args} Readme={Readme} />
);
export const basic = Template.bind({});
basic.args = {
  document: {
    data: {
      openButtonText: 'Got five minutes?',
      linkText: 'Take the survey',
      link: {
        link_type: 'Web',
        url: 'https://wellcomecollection.org/user-panel',
      },
      title: 'Help us improve our website',
      dialogText:
        'We’d like to know more about how you use Wellcome Collection’s website.',
    },
  },
};
basic.storyName = 'PopupDialog';
