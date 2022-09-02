import { ExhibitionBasic } from '../../types/exhibitions';
import { EventBasic } from '../../types/events';
import { Link } from '../../types/link';
import CardGrid from '../CardGrid/CardGrid';
import { FunctionComponent } from 'react';

type Props = {
  exhibitions: ExhibitionBasic[];
  events: EventBasic[];
  extras?: (ExhibitionBasic | EventBasic)[];
  links?: Link[];
};

const ExhibitionsAndEvents: FunctionComponent<Props> = ({
  exhibitions,
  events,
  extras = [],
  links,
}: Props) => {
  const permanentExhibitions = exhibitions.filter(
    exhibition => exhibition.isPermanent
  );

  const otherExhibitions = exhibitions.filter(
    exhibition => !exhibition.isPermanent
  );

  const items = [
    ...otherExhibitions,
    ...events,
    ...permanentExhibitions,
    ...extras,
  ];

  return <CardGrid items={items} itemsPerRow={3} links={links} />;
};

export default ExhibitionsAndEvents;
