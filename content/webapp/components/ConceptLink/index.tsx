import NextLink from 'next/link';
import { FunctionComponent } from 'react';
import { LinkFrom } from '@weco/common/utils/routes';
import { LinkProps } from '@weco/common/model/link-props';
import { ConceptLinkSource } from '@weco/common/data/segment-values';

type ConceptLinkProps = { conceptId: string };

function toLink(props: ConceptLinkProps, source: ConceptLinkSource): LinkProps {
  return {
    href: {
      pathname: '/concepts/[conceptId]',
      query: {
        conceptId: props.conceptId,
        source,
      },
    },
    as: {
      pathname: `/concepts/${props.conceptId}`,
    },
  };
}

type Props = LinkFrom<ConceptLinkProps> & {
  source: ConceptLinkSource;
};

const ConceptLink: FunctionComponent<Props> = ({
  children,
  source,
  ...props
}) => {
  return (
    <NextLink {...toLink(props, source)} legacyBehavior>
      {children}
    </NextLink>
  );
};

export default ConceptLink;
export { toLink };
