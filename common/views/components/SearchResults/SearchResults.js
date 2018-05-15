// @flow
import {spacing} from '../../../utils/classnames';
import BasicPromo from '../BasicPromo/BasicPromo';
import type {MultiContent} from '../../../model/multi-content';

type Props = {|
  items: MultiContent[]
|}

const SearchResults = ({ items }: Props) => (
  <div className={`
      ${spacing({s: 11}, {margin: ['top']})}
    `}>
    {items.map(item => (
      item.type === 'pages' &&
      <div className={
        spacing({s: 5}, {padding: ['bottom', 'top']}) +
        ` border-top-width-1 border-color-pumice`
      } key={item.id}>
        <BasicPromo
          promoType='PagePromo'
          url={`/pages/${item.id}`}
          title={item.title}
          description={item.promo && item.promo.caption}
          imageProps={item.promo && item.promo.image}
        />
      </div>
    ))}
  </div>
);

export default SearchResults;
