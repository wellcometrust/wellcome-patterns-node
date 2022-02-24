import * as prismicH from 'prismic-helpers-beta';
import CompactCard from '@weco/common/views/components/CompactCard/CompactCard';
import { FunctionComponent } from 'react';
import { ArticleFormatIds } from '@weco/common/model/content-format-id';
import HTMLDate from '@weco/common/views/components/HTMLDate/HTMLDate';
import Space from '@weco/common/views/components/styled/Space';
import WatchLabel from '@weco/common/views/components/WatchLabel/WatchLabel';
import { ArticlePrismicDocument } from '../../services/prismic/types/articles';
import {
  transformFormat,
  transformMeta,
  transformSeries,
} from '../../services/prismic/transformers';
import { isNotUndefined } from '@weco/common/utils/array';
import PrismicImage from '../PrismicImage/PrismicImage';

type Props = {
  article: ArticlePrismicDocument;
  showPosition: boolean;
  xOfY: {
    x: number;
    y: number;
  };
};

const ArticleCard: FunctionComponent<Props> = ({
  article,
  showPosition,
  xOfY,
}: Props) => {
  const meta = transformMeta(article);
  const series = transformSeries(article);
  const format = transformFormat(article);

  const seriesWithSchedule = series.find(
    series => (series.data.schedule ?? []).length > 0
  );

  const indexInSeriesSchedule = seriesWithSchedule?.data.schedule
    ?.map(scheduleItem => prismicH.asText(scheduleItem.title))
    .indexOf(meta.title);

  const seriesColor = seriesWithSchedule?.data.color ?? undefined;

  const positionInSeriesSchedule =
    isNotUndefined(indexInSeriesSchedule) && indexInSeriesSchedule !== -1
      ? indexInSeriesSchedule + 1
      : undefined;

  const isSerial = Boolean(seriesWithSchedule);
  const isPodcast = format?.id === ArticleFormatIds.Podcast;

  const labels = [
    format?.title,
    isSerial ? 'Serial' : undefined,
  ]
    .filter(isNotUndefined)
    .map(text => ({ text }));

  const publicationDate =
    article.data.publishDate ?? article.first_publication_date;

  return (
    <CompactCard
      url={meta.url}
      title={meta.title}
      partNumber={showPosition ? positionInSeriesSchedule : undefined}
      partDescription={isPodcast ? 'Episode' : 'Part'}
      color={seriesColor}
      primaryLabels={!isPodcast ? labels : []}
      secondaryLabels={[]}
      description={!isPodcast ? meta.promoText ?? undefined : undefined}
      Image={
        (meta.image?.['square'] && (
          <PrismicImage
            image={meta.image['square']}
            sizes={{
              xlarge: 1 / 3,
              large: 1 / 3,
              medium: 1 / 2,
              small: 1,
            }}
          />
        )) ||
        undefined
      }
      xOfY={xOfY}
      postTitleChildren={
        isPodcast ? (
          <Space v={{ size: 's', properties: ['margin-top'] }}>
            <WatchLabel text={<HTMLDate date={new Date(publicationDate)} />} />
          </Space>
        ) : undefined
      }
    />
  );
};
export default ArticleCard;
