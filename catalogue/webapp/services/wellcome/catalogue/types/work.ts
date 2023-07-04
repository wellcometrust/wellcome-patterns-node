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
  description?: string;
  thumbnail?: DigitalLocation;
  referenceNumber?: string;
  productionDates: string[];
  archiveLabels?: ArchiveLabels;
  cardLabels: Label[];
  primaryContributorLabel?: string;
  languageId?: string;
};

export function toWorkBasic(work: Work): WorkBasic {
  const { id, title, description, thumbnail, referenceNumber } = work;

  // We only send a lang if it's unambiguous -- better to send
  // no language than the wrong one.
  const languageId =
    work.languages && work.languages.length === 1
      ? work.languages[0].id
      : undefined;

  return {
    id,
    title,
    description,
    thumbnail,
    referenceNumber,
    productionDates: getProductionDates(work),
    archiveLabels: getArchiveLabels(work),
    cardLabels: getCardLabels(work),
    primaryContributorLabel: work.contributors.find(
      contributor => contributor.primary
    )?.agent.label,
    languageId,
  };
}
