import Map from '@weco/content/components/Map/Map';

const Template = args => <Map {...args} />;
export const basic = Template.bind({});
basic.args = {
  title: 'Getting here',
  latitude: 51.526053,
  longitude: -0.1333271,
};
basic.storyName = 'Map';
basic.parameters = {
  chromatic: {
    // I tried to delay the snapshot for 15s (the max) and it still gives an error.
    // This still allows the Canvas view, it just won't snapshot/compare it.
    disableSnapshot: true,
  },
};
