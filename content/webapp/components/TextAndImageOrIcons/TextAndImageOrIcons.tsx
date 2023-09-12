import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ImageType } from '@weco/common/model/image';
import CaptionedImage from '../CaptionedImage/CaptionedImage';
import PrismicHtmlBlock from '@weco/common/views/components/PrismicHtmlBlock/PrismicHtmlBlock';
import * as prismic from '@prismicio/client';
import PrismicImage from '@weco/common/views/components/PrismicImage/PrismicImage';
import { defaultSerializer } from '../HTMLSerializers/HTMLSerializers';
import Space from '@weco/common/views/components/styled/Space';

const MediaAndTextWrap = styled(Space).attrs({
  h: { size: 'l', properties: ['column-gap'] },
  v: { size: 'l', properties: ['row-gap'] },
})`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;

  ${props => props.theme.media('medium')`
    flex-wrap: nowrap;
    flex-direction: row-reverse;
  `}
`;

const DividingLine = styled.div`
  border-top: 1px solid ${props => props.theme.color('neutral.400')};

  &:first-child {
    border: 0;
  }

  .slice-type-text-and-image + .slice-type-text-and-icons &,
  .slice-type-text-and-icons + .slice-type-text-and-image &,
  .slice-type-text-and-image + .slice-type-text-and-image &,
  .slice-type-text-and-icons + .slice-type-text-and-icons & {
    border-top: 1px solid ${props => props.theme.color('neutral.400')};
    ${props =>
      props.theme.makeSpacePropertyValues('l', ['margin-top', 'padding-top'])};
  }
`;

const ImageOrIcons = styled(Space).attrs({
  h: { size: 'm', properties: ['column-gap'] },
  v: { size: 'm', properties: ['row-gap'] },
})<{ isIcons?: boolean; isPortrait?: boolean }>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex: 0 0
    ${props => (props.isIcons || props.isPortrait ? 'max(60%, 300px)' : '100%')};

  ${props =>
    props.theme.media('medium')(`
    flex: 1;
  `)}

  > * {
    flex: ${props => (props.isIcons ? '0 0 30%' : undefined)};
    flex: ${props => (props.isPortrait ? '0 0 85%' : undefined)};
  }
`;

const Text = styled.div`
  flex-basis: 100%;

  ${props => props.theme.media('medium')`
    flex: 1;
  `}
`;

export type TextAndImageItem = {
  text: prismic.RichTextField;
  type: 'image';
  image: ImageType;
  isZoomable: boolean;
};

export type TextAndIconsItem = {
  text: prismic.RichTextField;
  type: 'icons';
  icons: ImageType[];
};

export type Props = {
  item: TextAndImageItem | TextAndIconsItem;
};

const TextAndImageOrIcons: FunctionComponent<Props> = ({ item }) => {
  return (
    <>
      <DividingLine>
        <MediaAndTextWrap>
          {item.type === 'icons' && item.icons.length > 0 && (
            <ImageOrIcons isIcons={true}>
              {/* We're enforcing a maximum of 6 icons within a slice */}
              {item.icons.slice(0, 6).map((icon, index) => {
                return (
                  <div key={index}>
                    <PrismicImage image={icon} quality="low" maxWidth={100} />
                  </div>
                );
              })}
            </ImageOrIcons>
          )}
          {item.type === 'image' && item.image && (
            <ImageOrIcons isPortrait={item.image.width < item.image.height}>
              <CaptionedImage
                image={item.image}
                caption={[]}
                hasRoundedCorners={false}
                isZoomable={item.isZoomable}
              />
            </ImageOrIcons>
          )}
          <Text>
            <PrismicHtmlBlock
              html={item.text}
              htmlSerializer={defaultSerializer}
            />
          </Text>
        </MediaAndTextWrap>
      </DividingLine>
    </>
  );
};

export default TextAndImageOrIcons;
