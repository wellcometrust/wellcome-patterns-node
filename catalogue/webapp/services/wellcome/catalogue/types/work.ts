import {
  ArchiveLabels,
  getArchiveLabels,
  getCardLabels,
  getProductionDates,
} from '@weco/catalogue/utils/works';
import { Work } from '.';
import { Label } from '@weco/common/model/labels';
import { DigitalLocation } from '@weco/common/model/catalogue';

export type WorkBasic = {
  id: string;
  title: string;
  thumbnail?: DigitalLocation;
  referenceNumber?: string;
  productionDates: string[];
  archiveLabels?: ArchiveLabels;
  cardLabels: Label[];
  primaryContributorLabel?: string;
  languageIds: string[];
};

export function toWorkBasic(work: Work): WorkBasic {
  const { id, title, thumbnail, referenceNumber } = work;

  return {
    id,
    title,
    thumbnail,
    referenceNumber,
    productionDates: getProductionDates(work),
    archiveLabels: getArchiveLabels(work),
    cardLabels: getCardLabels(work),
    primaryContributorLabel: work.contributors.find(
      contributor => contributor.primary
    )?.agent.label,
    languageIds: work.languages.map(lang => lang.id),
  };
}
