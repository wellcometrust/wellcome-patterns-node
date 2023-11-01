import Header, {
  exhibitionGuidesLinks,
} from '@weco/common/views/components/Header/Header';

const Template = args => <Header {...args} />;
export const basic = Template.bind({});
basic.args = {
  siteSection: 'stories',
  isActive: true,
};
basic.storyName = 'Header';

export const exhibitionGuides = Template.bind({});
exhibitionGuides.args = {
  customNavLinks: exhibitionGuidesLinks,
  isMinimalHeader: true,
};
exhibitionGuides.storyName = 'Exhibition guides';
