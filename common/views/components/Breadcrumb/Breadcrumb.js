// @flow
import { font, classNames, spacing } from '../../../utils/classnames';
import { breadcrumbsLd } from '../../../utils/json-ld';

export type Breadcrumbs = {|
  text: string,
  url?: string,
  prefix?: string,
  isHidden?: boolean,
|}[];

type Props = {|
  items: Breadcrumbs,
|};

const Breadcrumb = ({ items }: Props) => (
  <div
    className={classNames({
      flex: true,
    })}
  >
    {items
      .filter(({ isHidden }) => !isHidden)
      .map(({ text, url, prefix }, i) => {
        const BoldOrSpanTag = prefix ? 'b' : 'span';
        const LinkOrSpanTag = url ? 'a' : 'span';
        return (
          <BoldOrSpanTag
            key={text}
            className={classNames({
              [font('hnl', 4)]: true,
              'border-left-width-1 border-color-black': i !== 0,
              [spacing({ s: 2 }, { padding: ['right'] })]: true,
              [spacing({ s: 2 }, { padding: ['left'] })]: i !== 0,
            })}
            style={{ lineHeight: 1 }}
          >
            {prefix}{' '}
            <LinkOrSpanTag
              className={classNames({
                [font('hnm', 4)]: Boolean(prefix),
              })}
              href={url}
              style={{ lineHeight: 1 }}
            >
              {text}
            </LinkOrSpanTag>
          </BoldOrSpanTag>
        );
      })}
    {/* We do this so that the page doesn't bounce around if we don't have any breadcrumbs */}
    {items.length === 0 && (
      <span
        className={classNames({
          [font('hnl', 4)]: true,
          'empty-filler': true,
        })}
        style={{ lineHeight: 1 }}
      />
    )}
    {items.length > 0 && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbsLd({ items })),
        }}
      />
    )}
  </div>
);
export default Breadcrumb;
