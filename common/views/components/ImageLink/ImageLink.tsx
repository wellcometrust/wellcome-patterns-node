import NextLink, { LinkProps } from 'next/link';
import { FunctionComponent, PropsWithChildren } from 'react';

type ImageLinkSource = 'images_search_result';

export type ImageQueryParams = {
  id: string;
  workId: string;
  langCode?: string;
  source: ImageLinkSource;
};

// We remove `href` and `as` because we contruct those ourselves
// in the component.
type Props = ImageQueryParams & Omit<LinkProps, 'as' | 'href'>;

export function imageLink({
  workId,
  source,
  ...params
}: ImageQueryParams): LinkProps {
  return {
    href: {
      pathname: `/item`,
      query: {
        workId,
        source,
        ...params,
      },
    },
    as: {
      pathname: `/works/${workId}/images`,
      query: { ...params },
    },
  };
}

const ImageLink: FunctionComponent<PropsWithChildren<Props>> = ({
  id,
  workId,
  langCode,
  source,
  children,
  ...linkProps
}: PropsWithChildren<Props>) => {
  return (
    <NextLink
      {...imageLink({
        id,
        workId,
        langCode,
        source,
      })}
      {...linkProps}
    >
      {children}
    </NextLink>
  );
};

export default ImageLink;
