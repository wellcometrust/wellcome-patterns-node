import { forwardRef, useState } from 'react';
import styled from 'styled-components';

import { convertIiifImageUri } from '@weco/common/utils/convert-image-uri';
import LL from '@weco/common/views/components/styled/LL';
import { convertRequestUriToInfoUri } from '@weco/content/utils/iiif/convert-iiif-uri';
async function getImageMax(url: string): Promise<number> {
  try {
    const infoUrl = convertRequestUriToInfoUri(url);
    const resp = await fetch(infoUrl);
    const info = await resp.json();
    // N.B property is called maxWidth, but it is actually the max allowed for the longest side, see https://wellcome.slack.com/archives/CBT40CMKQ/p1702897884100559
    const max = info.profile?.find(item => item.maxWidth)?.maxWidth || 1000;
    return max || 1001;
  } catch {
    return 1000;
  }
}

const Image = styled.img<{ $highlightImage?: boolean; $zoomOnClick?: boolean }>`
  ${props =>
    props.$highlightImage
      ? `filter: grayscale(100%) brightness(70%) sepia(40%) hue-rotate(-120deg) saturate(400%) contrast(1);`
      : ''}; /* the filter is used for highlighting thumbnails that contain search terms */
  cursor: ${props => (props.$zoomOnClick ? 'zoom-in' : undefined)};
`;

type Props = {
  index?: number;
  width: number;
  height?: number;
  src: string | undefined;
  srcSet: string | undefined;
  sizes: string | undefined;
  alt: string;
  lang?: string;
  clickHandler?: () => void | Promise<void>;
  loadHandler?: () => void | Promise<void>;
  errorHandler?: () => void | Promise<void>;
  tabIndex?: number;
  highlightImage?: boolean;
  zoomOnClick?: boolean;
};

const IIIFViewerImage = (
  {
    index,
    width,
    height,
    src,
    srcSet,
    sizes,
    alt,
    lang,
    clickHandler,
    loadHandler,
    errorHandler,
    tabIndex,
    highlightImage,
    zoomOnClick,
  }: Props,
  ref
) => {
  const [tryLoadingSmallerImg, setTryLoadingSmallerImg] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  return (
    <>
      {!hasLoaded && <LL $lighten={true} />}
      <Image
        data-testid={index !== undefined ? `image-${index}` : null}
        ref={ref}
        tabIndex={tabIndex}
        lang={lang}
        width={width}
        height={height}
        className="image"
        $zoomOnClick={zoomOnClick}
        $highlightImage={highlightImage}
        onLoad={() => {
          loadHandler && loadHandler();
          setHasLoaded(true);
        }}
        onClick={clickHandler}
        onKeyDown={({ key, keyCode }) => {
          if (key === 'Enter' || keyCode === 13) {
            clickHandler && clickHandler();
          }
        }}
        onError={async ({ currentTarget }) => {
          // Hack/workaround
          // If the image fails to load it may be because of a size limit,
          // see: https://wellcome.slack.com/archives/CBT40CMKQ/p1691050149722109,
          // so first off we try a smaller image
          if (tryLoadingSmallerImg) {
            setTryLoadingSmallerImg(false); // prevent looping if image fails to load again
            // we need to know the max size of the longest side first
            const imageMax = await getImageMax(currentTarget.src);
            const isPortrait = Boolean(height && height > width);
            const newSrc = isPortrait
              ? convertIiifImageUri(currentTarget.src, imageMax, true)
              : convertIiifImageUri(currentTarget.src, imageMax);
            currentTarget.src = newSrc;
            currentTarget.removeAttribute('srcset');
            currentTarget.removeAttribute('sizes');
          } else {
            // If the image still fails to load, we check to see if it's because the authorisation cookie is missing/no longer valid
            errorHandler && errorHandler();
          }
        }}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
      />
    </>
  );
};

export default forwardRef(IIIFViewerImage);
