import { FunctionComponent, SyntheticEvent, useContext } from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';

import { ImageType } from '@weco/common/model/image';

import IIIFImage from '../IIIFImage/IIIFImage';
import { AppContext } from '@weco/common/views/components/AppContext/AppContext';
import { toLink as imageLink } from '../ImageLink';

type Props = {
  id: string;
  workId: string;
  image: ImageType;
  layout: 'raw' | 'fixed';
  onClick: (event: SyntheticEvent<HTMLAnchorElement>) => void;
  background?: string;
};

const StyledLink = styled.a`
  position: relative;
  display: block;
`;

const ImageCard: FunctionComponent<Props> = ({
  id,
  workId,
  image,
  layout,
  onClick,
  background,
}: Props) => {
  const { isEnhanced } = useContext(AppContext);
  const pathname = usePathname();

  return (
    <NextLink
      {...imageLink({ id, workId }, `images_search_result_${pathname}`)}
      passHref
      legacyBehavior
    >
      <StyledLink
        style={{ width: image.width }} // this is here to prevent the generation of multiple styles
        onClick={event => {
          if (onClick) {
            onClick(event);
          }
        }}
        id={id}
        data-gtm-trigger={isEnhanced ? 'open_image_modal' : undefined}
        title={isEnhanced ? 'Open modal window' : undefined}
      >
        <IIIFImage
          image={{
            contentUrl: image.contentUrl,
            width: image.width,
            height: image.height,
            alt: image.alt,
          }}
          width={300}
          layout={layout}
          background={background}
        />
      </StyledLink>
    </NextLink>
  );
};

export default ImageCard;
