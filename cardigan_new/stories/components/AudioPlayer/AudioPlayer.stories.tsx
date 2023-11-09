import AudioPlayer from '@weco/content/components/AudioPlayer/AudioPlayer';
import readme from '@weco/content/components/AudioPlayer/README.md';
import readme2 from '@weco/content/components/AudioPlayer/README2.md';
import type { Meta, StoryObj } from '@storybook/react';

export const Basic: StoryObj<typeof AudioPlayer> = {
  args: {
    audioFile:
      'https://iiif.wellcomecollection.org/av/b2248887x_0001.wav/full/max/default.mp3#identity',
    title: 'Mat Fraser: interview 1',
  },
  parameters: {
    readme,
  },
};

export const Another: StoryObj<typeof AudioPlayer> = {
  args: {
    audioFile:
      'https://iiif.wellcomecollection.org/av/b2248887x_0001.wav/full/max/default.mp3#identity',
    title: 'Mat Fraser: interview 1',
  },
  parameters: {
    readme: readme2,
  },
};

const meta: Meta<typeof AudioPlayer> = {
  component: AudioPlayer,
  title: 'Components/AudioPlayer',
  argTypes: {
    idPrefix: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
