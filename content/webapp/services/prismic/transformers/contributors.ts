import {
  FilledLinkToDocumentField,
  PrismicDocument,
  FilledImageFieldImage,
} from '@prismicio/types';
import * as prismicH from 'prismic-helpers-beta';
import { isFilledLinkToDocumentWithData, isFilledLinkToPersonField, WithContributors, InferDataInterface, isFilledLinkToOrganisationField, DataInterface } from '../types';
import { Contributor } from '../../../types/contributors';
import { isNotUndefined } from '@weco/common/utils/array';
import {
  transformKeyTextField,
  transformRichTextField,
  transformRichTextFieldToString,
} from '.';
import { Organisation, Person } from '../types/contributors';

const defaultContributorImage: FilledImageFieldImage = {
  dimensions: {
    width: 64,
    height: 64,
  },
  url: 'https://images.prismic.io/wellcomecollection%2F021d6105-3308-4210-8f65-d207e04c2cb2_contributor_default%402x.png?auto=compress,format',
  alt: '',
  copyright: null,
};

function transformCommonFields(agent:
  | FilledLinkToDocumentField<'people', 'en-gb', InferDataInterface<Person>> & { data: Person }
  | FilledLinkToDocumentField<'organisations', 'en-gb', InferDataInterface<Organisation>> & { data: Organisation }) {
  return {
    id: agent.id,
    description: transformRichTextField(agent.data.description),
    image: agent.data.image || defaultContributorImage,
  };
}

export function transformContributorAgent(
  agent: WithContributors['contributors'][number]['contributor']
): Contributor['contributor'] | undefined {
  if (isFilledLinkToPersonField(agent)) {
    return {
      ...transformCommonFields(agent),
      type: agent.type,
      name: transformKeyTextField(agent.data.name),
      pronouns: transformKeyTextField(agent.data.pronouns),
      sameAs: (agent.data.sameAs ?? [])
      .map(sameAs => {
        const link = transformKeyTextField(sameAs.link);
        const title = transformRichTextFieldToString(sameAs.title);
        return title && link ? { title, link } : undefined;
      })
      .filter(isNotUndefined)
    };
  } else if (isFilledLinkToOrganisationField(agent)) {
    return {
      ...transformCommonFields(agent),
      type: agent.type,
      name: transformRichTextFieldToString(agent.data.name),
      sameAs: (agent.data.sameAs ?? [])
      .map(sameAs => {
        const link = transformKeyTextField(sameAs.link);
        const title = transformKeyTextField(sameAs.title);
        return title && link ? { title, link } : undefined;
      })
      .filter(isNotUndefined)
    };
  } else {
    return undefined;
  }
}

export function transformContributors(
  document: PrismicDocument<WithContributors>
): Contributor[] {
  const { data } = document;
  const contributors = (data.contributors ?? [])
    .map(contributor => {
      const agent = transformContributorAgent(contributor.contributor);

      const roleDocument = isFilledLinkToDocumentWithData(contributor.role)
        ? contributor.role
        : undefined;

      const role = roleDocument
        ? {
            id: roleDocument.id,
            title: transformRichTextFieldToString(roleDocument.data.title),
            describedBy: transformKeyTextField(roleDocument.data.describedBy),
          }
        : undefined;

      const description = transformRichTextField(contributor.description);

      return agent
        ? {
            contributor: agent,
            role,
            description,
          }
        : undefined;
    })
    .filter(isNotUndefined);

  return contributors;
}
