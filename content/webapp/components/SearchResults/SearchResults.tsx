import { Fragment, FunctionComponent } from 'react';
import styled from 'styled-components';
import { MultiContent } from '../../types/multi-content';
import { grid } from '@weco/common/utils/classnames';
import { formatDate } from '@weco/common/utils/format-date';
import Image from '@weco/common/views/components/Image/Image';
import CompactCard from '../CompactCard/CompactCard';
import EventCard from '../EventCard/EventCard';
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';
import Space from '@weco/common/views/components/styled/Space';
import ArticleCard from '../ArticleCard/ArticleCard';
import { ArticleScheduleItem } from '../../types/article-schedule-items';

const Result = styled.div`
  border-top: 1px solid ${props => props.theme.color('pumice')};
`;

type Props = {
  title?: string;
  summary?: string;
  items: readonly (MultiContent | ArticleScheduleItem)[];
  showPosition?: boolean;
};

const SearchResults: FunctionComponent<Props> = ({
  items,
  title,
  summary,
  showPosition = false,
}) => (
  <Fragment>
    {title && (
      <Space
        v={!summary ? { size: 'l', properties: ['margin-bottom'] } : undefined}
      >
        <div className="grid">
          <div className={grid({ s: 12 })}>
            <h2 className="h2">{title}</h2>
          </div>
        </div>
      </Space>
    )}
    {summary && (
      <Space v={{ size: 'l', properties: ['margin-bottom'] }}>{summary}</Space>
    )}

    {items.map((item, index) => (
      <Result key={item.id}>
        {item.type === 'pages' && (
          <CompactCard
            url={`/pages/${item.id}`}
            title={item.title || ''}
            partNumber={undefined}
            color={undefined}
            primaryLabels={[]}
            secondaryLabels={[]}
            description={item.promo && item.promo.caption}
            urlOverride={item.promo && item.promo.link}
            Image={
              item.image &&
              item.image.crops &&
              item.image.crops.square && (
                // We intentionally omit the alt text on promos, so screen reader
                // users don't have to listen to the alt text before hearing the
                // title of the item in the list.
                //
                // See https://github.com/wellcomecollection/wellcomecollection.org/issues/6007
                <Image {...item.image.crops.square} alt="" />
              )
            }
            xOfY={{ x: index + 1, y: items.length }}
          />
        )}
        {item.type === 'event-series' && (
          <CompactCard
            url={`/event-series/${item.id}`}
            title={item.title || ''}
            partNumber={undefined}
            color={undefined}
            primaryLabels={item.labels}
            secondaryLabels={[]}
            description={item.promo && item.promo.caption}
            urlOverride={item.promo && item.promo.link}
            Image={
              item.image &&
              item.image.crops &&
              item.image.crops.square && (
                // We intentionally omit the alt text on promos, so screen reader
                // users don't have to listen to the alt text before hearing the
                // title of the item in the list.
                //
                // See https://github.com/wellcomecollection/wellcomecollection.org/issues/6007
                <Image {...item.image.crops.square} alt="" />
              )
            }
            xOfY={{ x: index + 1, y: items.length }}
          />
        )}
        {item.type === 'books' && (
          <CompactCard
            url={`/books/${item.id}`}
            title={item.title || ''}
            primaryLabels={item.labels}
            secondaryLabels={[]}
            partNumber={undefined}
            color={undefined}
            description={item.promo && item.promo.caption}
            urlOverride={item.promo && item.promo.link}
            Image={
              item.cover &&
              item.cover.crops &&
              item.cover.crops.square && (
                // We intentionally omit the alt text on promos, so screen reader
                // users don't have to listen to the alt text before hearing the
                // title of the item in the list.
                //
                // See https://github.com/wellcomecollection/wellcomecollection.org/issues/6007
                <Image {...item.cover.crops.square} alt="" />
              )
            }
            xOfY={{ x: index + 1, y: items.length }}
          />
        )}
        {item.type === 'articles' && (
          <ArticleCard
            article={item}
            showPosition={showPosition}
            xOfY={{ x: index + 1, y: items.length }}
          />
        )}
        {item.type === 'article-schedule-items' && (
          <CompactCard
            title={item.title || ''}
            partNumber={item.partNumber}
            color={item.color}
            primaryLabels={
              /* We don't show a label on items that haven't been published yet, because
               * we don't know whether they're a story, comic, etc.
               * See https://github.com/wellcomecollection/wellcomecollection.org/pull/7568 */
              []
            }
            secondaryLabels={[]}
            description={`Available ${formatDate(item.publishDate)}`}
            Image={<ImagePlaceholder color={item.color} />}
            xOfY={{ x: index + 1, y: items.length }}
          />
        )}
        {item.type === 'events' && (
          <EventCard event={item} xOfY={{ x: index + 1, y: items.length }} />
        )}
        {item.type === 'exhibitions' && (
          <CompactCard
            url={`/exhibitions/${item.id}`}
            title={item.title}
            partNumber={undefined}
            color={undefined}
            primaryLabels={item.labels}
            secondaryLabels={[]}
            description={item.promoText}
            Image={
              item.image &&
              item.image.crops &&
              item.image.crops.square && (
                // We intentionally omit the alt text on promos, so screen reader
                // users don't have to listen to the alt text before hearing the
                // title of the item in the list.
                //
                // See https://github.com/wellcomecollection/wellcomecollection.org/issues/6007
                <Image {...item.image.crops.square} alt="" />
              )
            }
            xOfY={{ x: index + 1, y: items.length }}
          />
        )}
      </Result>
    ))}
  </Fragment>
);

export default SearchResults;
