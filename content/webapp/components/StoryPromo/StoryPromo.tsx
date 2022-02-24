import { FunctionComponent } from 'react';
import * as prismicH from 'prismic-helpers-beta';
import { font, classNames } from '@weco/common/utils/classnames';
import { trackEvent } from '@weco/common/utils/ga';
import { isNotUndefined } from '@weco/common/utils/array';
import LabelsList from '@weco/common/views/components/LabelsList/LabelsList';
import PartNumberIndicator from '@weco/common/views/components/PartNumberIndicator/PartNumberIndicator';
import Space from '@weco/common/views/components/styled/Space';
import {
  CardOuter,
  CardBody,
  CardPostBody,
} from '@weco/common/views/components/Card/Card';
import { ArticlePrismicDocument } from '../../services/prismic/types/articles';
import {
  transformFormat,
  transformMeta,
  transformSeries,
} from '../../services/prismic/transformers';
import PrismicImage from '../PrismicImage/PrismicImage';

type Props = {
  article: ArticlePrismicDocument;
  position: number;
  hidePromoText?: boolean;
  hasTransparentBackground?: boolean;
  sizesQueries?: string;
};

const StoryPromo: FunctionComponent<Props> = ({
  article,
  position,
  hidePromoText = false,
  hasTransparentBackground = false,
}: Props) => {
  const meta = transformMeta(article);
  const series = transformSeries(article);
  const format = transformFormat(article);

  // This is a bit of nastiness as we can't access the articles within a series i.e.
  // `thisArticle.series.schedule.articles.map(article => article.id === thisArticle.id)`
  // So this only works on series that have a schedule, and a schedule where the titles
  // match exactly with the schedule items. This wouldn't work with any series.
  const seriesWithSchedule = series.find(series =>
    (series.data.schedule ?? []).find(schedule => schedule.publishDate)
  );

  const seriesColor = seriesWithSchedule?.data.color ?? undefined;

  const indexInSeriesSchedule = seriesWithSchedule?.data.schedule
    ?.map(scheduleItem => prismicH.asText(scheduleItem.title))
    .indexOf(meta.title);

  const positionInSeriesSchedule =
    isNotUndefined(indexInSeriesSchedule) && indexInSeriesSchedule !== -1
      ? indexInSeriesSchedule + 1
      : undefined;

  const isSerial = Boolean(seriesWithSchedule);

  const labels = [
    format?.title,
    isSerial ? 'Serial' : undefined,
  ]
    .filter(isNotUndefined)
    .map(text => ({ text }));

  return (
    <CardOuter
      onClick={() => {
        trackEvent({
          category: 'StoryPromo',
          action: 'follow link',
          label: `${article.id} | position: ${position}`,
        });
      }}
      href={meta.url}
      className={classNames({
        'bg-cream': !hasTransparentBackground,
      })}
    >
      <div className="relative">
        {meta.image?.['16:9'] && (
          <PrismicImage
            image={meta.image['16:9']}
            sizes={{
              xlarge: 1 / 3,
              large: 1 / 3,
              medium: 1 / 2,
              small: 1,
            }}
          />
        )}

        {labels.length > 0 && (
          <div style={{ position: 'absolute', bottom: 0 }}>
            <LabelsList labels={labels} />
          </div>
        )}
      </div>

      <CardBody>
        <div>
          {positionInSeriesSchedule && (
            <PartNumberIndicator
              number={positionInSeriesSchedule}
              color={seriesColor}
            />
          )}
          <Space
            v={{
              size: 's',
              properties: ['margin-bottom'],
            }}
            as="h2"
            className={`
            promo-link__title
            ${font('wb', 3)}
          `}
          >
            {meta.title}
          </Space>
          {!hidePromoText && meta.promoText && (
            <p
              className={classNames({
                'inline-block no-margin': true,
                [font('hnr', 5)]: true,
              })}
            >
              {meta.promoText}
            </p>
          )}
        </div>
      </CardBody>
      {series.length > 0 && (
        <CardPostBody>
          {series.map(series => (
            <p key={series.id} className={`${font('hnb', 6)} no-margin`}>
              <span className={font('hnr', 6)}>Part of</span>{' '}
              {prismicH.asText(series.data.title)}
            </p>
          ))}
        </CardPostBody>
      )}
    </CardOuter>
  );
};

export default StoryPromo;
