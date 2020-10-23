import { ComponentProps, ReactElement, ReactNode } from 'react';
import {
  grid,
  font,
  conditionalClassNames,
  classNames,
} from '../../../utils/classnames';
import { trackEvent } from '../../../utils/ga';
import DateRange from '../DateRange/DateRange';
import EventDateRange from '../EventDateRange/EventDateRange';
import StatusIndicator from '../StatusIndicator/StatusIndicator';
import LabelsList from '../LabelsList/LabelsList';
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';
import PartNumberIndicator from '../PartNumberIndicator/PartNumberIndicator';
import ImageType from '../Image/Image';
import { ColorSelection } from '../../../model/color-selections';
import Space from '../styled/Space';
import styled from 'styled-components';

type Props = {
  url: string | null,
  title: string,
  labels: ComponentProps<typeof LabelsList>,
  description: string | ReactElement |null,
  urlOverride: string | null,
  extraClasses?: string,
  partNumber: number | null,
  color: ColorSelection | null,
  Image: ReactElement<typeof ImageType | typeof ImagePlaceholder> | null,
  DateInfo: ReactElement<typeof DateRange> | ReactElement<typeof EventDateRange> | null,
  StatusIndicator: ReactElement<typeof StatusIndicator> | null,
  ExtraInfo?: ReactNode | null,
  xOfY: { x: number, y: number },
  type?: string
};

export const imageWrapper = styled.div.attrs({
  className: classNames(grid({ s: 3, m: 3, l: 3, xl: 3 })),
})``;

export const textWrapper = styled.div.attrs({
  className: classNames(grid({ s: 9, m: 9, l: 9, xl: 9 })),
})``;
const CompactCard = ({
  url,
  title,
  labels,
  description,
  urlOverride,
  extraClasses,
  partNumber,
  color,
  Image,
  DateInfo,
  StatusIndicator,
  ExtraInfo,
  xOfY,
  type,
}: Props) => {
  const { x, y } = xOfY;
  const isTypeMediaObject = type === 'media_object';

  const textGridSizes = () => {
    if (Image && isTypeMediaObject) {
      return { s: 10, m: 10, l: 10, xl: 10 };
    } else if (Image) {
      return { s: 9, m: 9, l: 9, xl: 9 };
    }
    return { s: 12, m: 12, l: 12, xl: 12 };
  };

  const imageGridSizes =
    Image && isTypeMediaObject
      ? grid({ s: 2, m: 2, l: 2, xl: 2 })
      : grid({ s: 3, m: 3, l: 3, xl: 3 });
  return (
    <Space
      v={{
        size: 'l',
        properties: [
          'padding-top',
          x === y ? undefined : 'padding-bottom',
        ].filter(Boolean),
      }}
      as={url ? 'a' : 'div'}
      href={urlOverride || url}
      className={conditionalClassNames({
        grid: true,
        'card-link': Boolean(url),
        [extraClasses || '']: Boolean(extraClasses),
      })}
      onClick={() => {
        trackEvent({
          category: 'CompactCard',
          action: 'follow link',
          label: title,
        });
      }}
    >
      {Image && <div className={imageGridSizes}>{Image}</div>}
      <div className={grid(textGridSizes())}>

        {labels.labels.length > 0 && (
          <Space
            v={{ size: 's', properties: ['margin-bottom'] }}
            className="flex"
          >
            <LabelsList {...labels} />
          </Space>
        )}
        {partNumber && (
          <PartNumberIndicator number={partNumber} color={color} />
        )}
        <div
          className={classNames({
            'card-link__title': true,
            [isTypeMediaObject ? font('wb', 4) : font('wb', 5)]: true,
          })}
        >
          {title}
        </div>
        {DateInfo}
        {StatusIndicator}
        {ExtraInfo}
        {description && isTypeMediaObject ? (
          <div className={`spaced-text ${font('hnl', 5)}`}>{description}</div>
        ) : (
          <div className="spaced-text">
            <p className={font('hnl', 5)}>{description}</p>
          </div>
        )}
      </div>
    </Space>
  );
};

export default CompactCard;