import NextLink, { LinkProps } from 'next/link';
import { FunctionComponent, PropsWithChildren } from 'react';
import { WorkLinkSource } from '@weco/common/data/segment-values';
import { usePathname } from 'next/navigation';

// We remove `href` and `as` because we contruct those ourselves
// in the component.
type Props = PropsWithChildren<{
  id: string;
  source: WorkLinkSource;
  resultPosition?: number;
}> &
  Omit<LinkProps, 'as' | 'href'>;

const WorkLink: FunctionComponent<Props> = ({
  id,
  source,
  resultPosition,
  children,
  ...linkProps
}) => {
  const pathname = usePathname();
  return (
    <NextLink
      href={{
        pathname: '/works/[workId]',
        query: {
          workId: id,
          source: `${source}_${pathname}`,
          resultPosition,
        },
      }}
      as={{
        pathname: `/works/${id}`,
      }}
      {...linkProps}
      legacyBehavior
    >
      {children}
    </NextLink>
  );
};

export default WorkLink;
