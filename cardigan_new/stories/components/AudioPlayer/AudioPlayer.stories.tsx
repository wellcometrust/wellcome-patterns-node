import AudioPlayer from '@weco/content/components/AudioPlayer/AudioPlayer';
import type { Meta, StoryObj } from '@storybook/react';


export const Basic: StoryObj<typeof AudioPlayer> = {
  args: {
    audioFile:
    'https://iiif.wellcomecollection.org/av/b2248887x_0001.wav/full/max/default.mp3#identity',
  title: 'Mat Fraser: interview 1',
  }
};


const meta: Meta<typeof AudioPlayer> = {
  component: AudioPlayer,
  title: 'Components/AudioPlayer',
  argTypes: {
    idPrefix: {
      table: {
        disable: true,
      }
    }
  }
}

export default meta;
