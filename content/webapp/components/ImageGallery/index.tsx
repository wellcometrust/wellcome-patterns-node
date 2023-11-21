import {
  FunctionComponent,
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react';
import { font } from '@weco/common/utils/classnames';
import { CaptionedImage as CaptionedImageProps } from '@weco/common/model/captioned-image';
import { repeatingLsBlack } from '@weco/common/utils/backgrounds';
import CaptionedImage from '../CaptionedImage/CaptionedImage';
import { WobblyEdge } from '@weco/common/views/components/WobblyEdge';
import ButtonSolid from '@weco/common/views/components/ButtonSolid/ButtonSolid';
import Control from '@weco/common/views/components/Buttons/Control/Control';
import Icon from '@weco/common/views/components/Icon/Icon';
import Layout, {
  gridSize10,
  gridSize12,
  gridSize8,
} from '@weco/common/views/components/Layout';
import Space from '@weco/common/views/components/styled/Space';
import { cross, gallery } from '@weco/common/icons';
import { PageBackgroundContext } from '../ContentPage/ContentPage';
import Tasl from '@weco/common/views/components/Tasl/Tasl';
import ComicPreviousNext, {
  Props as ComicPreviousNextProps,
} from '../ComicPreviousNext/ComicPreviousNext';
import PrismicImage from '@weco/common/views/components/PrismicImage/PrismicImage';
import { sizes } from '@weco/common/views/themes/config';
import {
  ButtonContainer,
  CloseWrapper,
  ControlContainer,
  FrameGrid,
  FrameGridWrap,
  FrameItem,
  Gallery,
  GalleryTitle,
  StandaloneWobblyEdge,
  WobblyEdgeWrapper,
} from './ImageGallery.styles';

function makeSizesForFrames(isThreeUp: boolean) {
  // the frames gallery takes up c. 80% of the width of the screen, so basing
  // image width calculations off 80vw and limiting to 0.8 of the overall
  // grid-width
  if (isThreeUp) {
    return `
        (min-width: ${sizes.medium}px) calc(80vw / 2),
        (min-width: ${sizes.large}px) calc(80vw / 3),
        (min-width: ${sizes.xlarge}px) calc(${sizes.xlarge * 0.8}px / 3),
        calc(100vw - 68px)
      `;
  } else {
    return `
      (min-width: ${sizes.medium}px) calc(80vw / 2),
      (min-width: ${sizes.xlarge}px) calc(${sizes.xlarge * 0.8}px / 2),
      calc(100vw - 68px)
    `;
  }
}

export type Props = {
  title?: string;
  items: CaptionedImageProps[];
  isStandalone: boolean;
  isFrames: boolean;
  comicPreviousNext?: ComicPreviousNextProps;
};

const ImageGallery: FunctionComponent<{ id: number } & Props> = ({
  id,
  title,
  items,
  isStandalone,
  isFrames,
  comicPreviousNext,
}) => {
  const [isActive, setIsActive] = useState(true);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pageBackground = useContext(PageBackgroundContext);

  useEffect(() => {
    !isStandalone && !isFrames && setIsActive(false);
  }, []);

  function handleOpenClicked() {
    if (closeButtonRef.current) {
      closeButtonRef.current.tabIndex = 0;
      closeButtonRef.current.focus();
      setIsActive(true);
    }

    if (openButtonRef.current) {
      openButtonRef.current.tabIndex = -1;
    }
  }

  function handleCloseClicked() {
    if (openButtonRef.current) {
      openButtonRef.current.tabIndex = 0;
      setIsActive(false);

      if (headingRef.current) {
        headingRef.current.scrollIntoView();
      }
    }

    if (closeButtonRef.current) {
      closeButtonRef.current.tabIndex = -1;
    }
  }

  const itemsToShow = () => (isActive ? items : [items[0]]);
  const isThreeUp = itemsToShow().length % 3 === 0;

  const getGridSize = () => {
    if (isFrames && isThreeUp) {
      // More landscape so allow more horizontal space
      return gridSize10();
    } else if (isFrames && !isThreeUp) {
      // More square/portrait so limit horizontal space
      return gridSize8();
    } else {
      // Not in frames, so image width/height constraint happens on the single image
      return gridSize12();
    }
  };

  return (
    <>
      {!isStandalone && !isFrames && (
        <Layout gridSizes={gridSize8()}>
          <GalleryTitle>
            <Space as="span" $h={{ size: 's', properties: ['margin-right'] }}>
              <Icon icon={gallery} />
            </Space>
            <h2 id={`gallery-${id}`} className={font('wb', 3)} ref={headingRef}>
              {title || 'In pictures'}
            </h2>
          </GalleryTitle>
        </Layout>
      )}
      <Gallery
        id={`image-gallery-${id}`}
        $isActive={isActive}
        $isStandalone={isStandalone || isFrames}
        $pageBackground={pageBackground}
      >
        <div
          className="background"
          style={{
            position: 'absolute',
            bottom: 0,
            width: `100%`,
            background: `url(${repeatingLsBlack}) no-repeat top center`,
          }}
        />
        <Layout gridSizes={getGridSize()}>
          {comicPreviousNext && <ComicPreviousNext {...comicPreviousNext} />}
          <Space
            $v={
              isStandalone || isFrames
                ? { size: 'xl', properties: ['padding-top'] }
                : undefined
            }
            style={{ position: 'relative' }}
          >
            {(isStandalone || isFrames) && (
              <StandaloneWobblyEdge>
                <WobblyEdge isRotated={true} backgroundColor="white" />
              </StandaloneWobblyEdge>
            )}
            {!isActive && (
              <WobblyEdgeWrapper>
                <WobblyEdge backgroundColor={pageBackground} />
              </WobblyEdgeWrapper>
            )}

            {!isStandalone && !isFrames && (
              <CloseWrapper>
                <ControlContainer $isActive={isActive}>
                  <Control
                    tabIndex={-1}
                    ariaControls={`image-gallery-${id}`}
                    ariaExpanded={isActive}
                    dataGtmTrigger={'hide_image_gallery'}
                    ref={closeButtonRef}
                    replace={true}
                    colorScheme="light"
                    text="close"
                    icon={cross}
                    clickHandler={handleCloseClicked}
                  />
                </ControlContainer>
              </CloseWrapper>
            )}
            {isFrames && (
              <FrameGridWrap>
                <FrameGrid $isThreeUp={isThreeUp}>
                  {itemsToShow().map(captionedImage => (
                    <FrameItem key={captionedImage.image.contentUrl}>
                      <PrismicImage
                        image={captionedImage.image}
                        quality="high"
                        imgSizes={makeSizesForFrames(isThreeUp)}
                      />
                    </FrameItem>
                  ))}
                </FrameGrid>
                <Tasl {...itemsToShow()[0].image.tasl} />
              </FrameGridWrap>
            )}
            {!isFrames &&
              itemsToShow().map((captionedImage, i) => (
                <Space
                  $v={
                    isActive
                      ? { size: 'xl', properties: ['margin-bottom'] }
                      : undefined
                  }
                  onClick={() => {
                    if (!isActive) {
                      handleOpenClicked();
                    }
                  }}
                  key={captionedImage.image.contentUrl}
                  style={{
                    cursor: !isActive ? 'pointer' : 'default',
                  }}
                >
                  <CaptionedImage
                    image={captionedImage.image}
                    caption={captionedImage.caption}
                    hasRoundedCorners={captionedImage.hasRoundedCorners}
                    preCaptionNode={
                      items.length > 1 ? (
                        <Space
                          $v={{ size: 'm', properties: ['margin-bottom'] }}
                          className={font('intb', 5)}
                        >
                          {i + 1} of {items.length}
                        </Space>
                      ) : null
                    }
                  />
                </Space>
              ))}

            {!isStandalone && !isFrames && (
              <ButtonContainer $isHidden={isActive}>
                <ButtonSolid
                  ref={openButtonRef}
                  ariaControls={`image-gallery-${id}`}
                  ariaExpanded={isActive}
                  dataGtmTrigger={isActive ? undefined : 'show_image_gallery'}
                  icon={gallery}
                  clickHandler={handleOpenClicked}
                  text={`${items.length} images`}
                />
              </ButtonContainer>
            )}
          </Space>
        </Layout>
      </Gallery>
    </>
  );
};

export default ImageGallery;
