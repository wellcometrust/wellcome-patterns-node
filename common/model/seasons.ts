import { GenericContentFields } from './generic-content-fields';

export type Season = GenericContentFields & {
  type: 'seasons';
  start: Date | undefined;
  end: Date | undefined;
  prismicDocument: any;
};

export type SeasonWithContent = {
  season: Season;
};
