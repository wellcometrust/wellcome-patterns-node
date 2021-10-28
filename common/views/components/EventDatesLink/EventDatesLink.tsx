import { FC } from 'react';
import { font, classNames } from '../../../utils/classnames';
import { trackEvent } from '../../../utils/ga';
import Icon from '../Icon/Icon';
import { arrowSmall } from '@weco/common/icons';

type Props = {
  id: string;
};

const EventDatesLink: FC<Props> = ({ id }: Props) => {
  return (
    <a
      href={`#dates`}
      onClick={() => {
        trackEvent({
          category: 'EventDatesLink',
          action: 'follow link',
          label: id,
        });
      }}
      className={classNames({
        'flex-inline': true,
        'flex-v-center': true,
        [font('hnb', 5)]: true,
      })}
    >
      <Icon icon={arrowSmall} color={'black'} rotate={90} />
      <span>{`See all dates`}</span>
    </a>
  );
};

export default EventDatesLink;
