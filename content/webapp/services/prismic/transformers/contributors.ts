import {
  PrismicDocument,
  KeyTextField,
  FilledImageFieldImage,
} from '@prismicio/types';
import * as prismicH from 'prismic-helpers-beta';
import { isFilledLinkToDocumentWithData, WithContributors } from '../types';
import { Contributor } from '../../../types/contributors';
import { isNotUndefined, isString } from '@weco/common/utils/array';
import {
  transformKeyTextField,
  asHtmlString,
  transformRichTextFieldToString,
} from '.';

const defaultContributorImage: FilledImageFieldImage = {
  dimensions: {
    width: 64,
    height: 64,
  },
  url: 'https://images.prismic.io/wellcomecollection%2F021d6105-3308-4210-8f65-d207e04c2cb2_contributor_default%402x.png?auto=compress,format',
  alt: '',
  copyright: null,
};

type Agent = WithContributors['contributors'][number]['contributor'];

export function transformContributorAgent(
  agent: Agent
): Contributor['contributor'] | undefined {
  if (isFilledLinkToDocumentWithData(agent)) {
    const commonFields = {
      id: agent.id,
      description: asHtmlString(agent.data.description),
      image: agent.data.image || defaultContributorImage,
      sameAs: (agent.data.sameAs ?? [])
        .map(sameAs => {
          const link = transformKeyTextField(sameAs.link);
          const title = prismicH.asText(sameAs.title);
          return title && link ? { title, link } : undefined;
        })
        .filter(isNotUndefined),
    };

    // The .name field can be either RichText or Text.
    const name = isString(agent.data.name)
      ? transformKeyTextField(agent.data.name)
      : Array.isArray(agent.data.name)
      ? transformRichTextFieldToString(agent.data.name)
      : undefined;

    if (agent.type === 'organisations') {
      return {
        type: agent.type,
        name,
        ...commonFields,
      };
    } else if (agent.type === 'people') {
      return {
        type: agent.type,
        name,
        ...commonFields,
        // I'm not sure why I have to coerce this type here as it is that type?
        pronouns: transformKeyTextField(agent.data.pronouns as KeyTextField),
      };
    }
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

      const description = asHtmlString(contributor.description);

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
