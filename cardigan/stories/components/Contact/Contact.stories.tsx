import Contact from '@weco/content/components/Contact/Contact';
import Readme from '@weco/content/components/Contact/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';

const args = {
  title: 'Joe Bloggs',
  subtitle: 'Head of Examples',
  phone: '+44 (0)20 7444 4444',
  email: 'j.bloggs@wellcome.ac.uk',
};

const ContactTemplate = args => (
  <ReadmeDecorator WrappedComponent={Contact} args={args} Readme={Readme} />
);
export const basic = ContactTemplate.bind({});
basic.args = args;
basic.storyName = 'Contact';
