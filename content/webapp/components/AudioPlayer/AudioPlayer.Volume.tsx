import { FunctionComponent, SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { trackGaEvent } from '@weco/common/utils/ga';
import Icon from '@weco/common/views/components/Icon/Icon';
import { volumeMuted, volume as volumeIcon } from '@weco/common/icons';
import { formatVolume } from './AudioPlayer.formatters';
import Space from '@weco/common/views/components/styled/Space';

const VolumeWrapper = styled(Space).attrs({
  $h: {
    size: 'xs',
    properties: ['column-gap'],
    overrides: { medium: 1, large: 1 },
  },
})`
  display: flex;
  align-items: center;

  input {
    width: 60px;
  }
`;

type MuteUnmuteButtonProps = { $isMuted: boolean; ariaPressed?: boolean };
const MuteUnmuteButton = styled.button.attrs<MuteUnmuteButtonProps>(
  ({ $isMuted }) => ({
    ariaPressed: $isMuted,
  })
)`
  padding: 0;
`;

type VolumeProps = {
  audioPlayer: HTMLAudioElement;
  id: string;
  title: string;
};

const Volume: FunctionComponent<VolumeProps> = ({ audioPlayer, id, title }) => {
  const [volume, setVolume] = useState(audioPlayer.volume);
  const [isMuted, setIsMuted] = useState(audioPlayer.muted);
  const [showVolume, setShowVolume] = useState(false);

  // iOS doesn't allow for programmatic volume control changes. Rather than
  // sniffing for iOS, we can check if a volumechange event is fired and decide
  // whether to show the volume controls accordingly
  useEffect(() => {
    function handleVolumeChange() {
      if (audioPlayer.muted) return; // Muting _does_ work on iOS and also triggers a volumechange event
      setShowVolume(true);
    }

    audioPlayer.addEventListener('volumechange', handleVolumeChange, {
      once: true,
    });
    audioPlayer.volume = 0.9;
    audioPlayer.volume = 1;

    return () =>
      audioPlayer.removeEventListener('volumechange', handleVolumeChange);
  }, []);

  useEffect(() => {
    audioPlayer.volume = volume;
    audioPlayer.muted = isMuted;
  }, [volume, isMuted]);

  const onChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.currentTarget.value);

    if (newValue > 0) {
      setIsMuted(false);
    }

    setVolume(newValue);
  };

  const onVolumeButtonClick = () => {
    trackGaEvent({
      category: 'Audio',
      action: `${isMuted ? 'unmute' : 'mute'} audio`,
      label: id,
    });
    setIsMuted(!isMuted);
  };
  return (
    <VolumeWrapper>
      <MuteUnmuteButton $isMuted={isMuted} onClick={onVolumeButtonClick}>
        <span className="visually-hidden">
          {`${title} ${isMuted ? 'Unmute player' : 'Mute player'}`}
        </span>
        <Icon
          iconColor="neutral.600"
          icon={isMuted || volume === 0 ? volumeMuted : volumeIcon}
        />
      </MuteUnmuteButton>
      {showVolume && (
        <div style={{ lineHeight: 0 }}>
          <label htmlFor={`volume-${id}`}>
            <span className="visually-hidden">volume control</span>
          </label>
          <input
            aria-valuetext={`volume: ${formatVolume(volume)}`}
            id={`volume-${id}`}
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={onChange}
          />
        </div>
      )}
    </VolumeWrapper>
  );
};

export default Volume;
