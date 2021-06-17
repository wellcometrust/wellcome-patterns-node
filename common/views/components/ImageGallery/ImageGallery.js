// @flow
// TODO: use styled components
import { Fragment, Component, createRef } from 'react';
import { font, classNames } from '../../../utils/classnames';
import { CaptionedImage } from '../Images/Images';
// $FlowFixMe (tsx)
import WobblyEdge from '../WobblyEdge/WobblyEdge';
// $FlowFixMe (tsx)
import ButtonSolid from '../ButtonSolid/ButtonSolid';
// $FlowFixMe (tsx)
import Control from '../Buttons/Control/Control';
// $FlowFixMe (tsx)
import Icon from '../Icon/Icon';
// $FlowFixMe (tsx)
import Layout12 from '../Layout12/Layout12';
import type { CaptionedImage as CaptionedImageProps } from '../../../model/captioned-image';
// $FlowFixMe (tsx)
import { PageBackgroundContext } from '../ContentPage/ContentPage';
// $FlowFixMe (ts)
import { repeatingLsBlack } from '../../../utils/backgrounds';
// $FlowFixMe (ts)
import { breakpoints } from '../../../utils/breakpoints';
import { trackEvent } from '../../../utils/ga';
// $FlowFixMe (tsx)
import Space from '../styled/Space';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: ${props => (props.isHidden ? 'none' : 'block')};
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
  z-index: 2;
`;

type Props = {|
  id: string,
  title: ?string,
  items: CaptionedImageProps[],
  isStandalone: boolean,
|};

type State = {|
  isActive: boolean,
  titleStyle: ?{| transform: string, maxWidth: string, opacity: number |},
|};

class ImageGallery extends Component<Props, State> {
  state = {
    isActive: true,
    titleStyle: null,
  };

  openButtonRef: {
    current: HTMLButtonElement | HTMLAnchorElement | null,
  } = createRef();

  closeButtonRef: {
    current: HTMLAnchorElement | HTMLButtonElement | null,
  } = createRef();

  headingRef: {
    current: HTMLHeadingElement | null,
  } = createRef();

  handleOpenClicked() {
    if (this.closeButtonRef.current) {
      this.closeButtonRef.current.tabIndex = 0;
      this.closeButtonRef.current.focus();
      this.showAllImages(true);
    }

    if (this.openButtonRef.current) {
      this.openButtonRef.current.tabIndex = -1;
    }
  }

  handleCloseClicked() {
    if (this.openButtonRef.current) {
      this.openButtonRef.current.tabIndex = 0;
      this.setState({ isActive: false });

      if (this.headingRef.current) {
        this.headingRef.current.scrollIntoView();
      }

      trackEvent({
        category: `Control`,
        action: 'close ImageGallery',
        label: this.props.id,
      });
    }

    if (this.closeButtonRef.current) {
      this.closeButtonRef.current.tabIndex = -1;
    }
  }

  showAllImages = (isButton?: boolean) => {
    trackEvent({
      category: `${isButton ? 'Button' : 'CaptionedImage'}`,
      action: 'open ImageGallery',
      label: this.props.id,
    });
    this.setState({
      isActive: true,
    });
  };

  itemsToShow = () => {
    return this.state.isActive ? this.props.items : [this.props.items[0]];
  };

  componentDidMount() {
    !this.props.isStandalone &&
      this.setState({
        isActive: false,
      });
  }

  // We want the image gallery title to be aligned with the first image
  // So we adjust the translateX and width accordingly
  setTitleStyle = (value: number) => {
    this.setState({
      titleStyle: {
        transform: `translateX(calc((100vw - ${value}px) / 2))`,
        maxWidth: `${value}px`,
        opacity: 1,
      },
    });
  };

  render() {
    const { title, items, isStandalone, id } = this.props;
    const { isActive, titleStyle } = this.state;

    return (
      <PageBackgroundContext.Consumer>
        {theme => (
          <Fragment>
            {!isStandalone && (
              <Space
                v={{ size: 'm', properties: ['margin-bottom'] }}
                as="span"
                style={titleStyle}
                className={classNames({
                  'flex flex--v-top image-gallery-v2-title': true,
                })}
              >
                <Space
                  as="span"
                  h={{ size: 's', properties: ['margin-right'] }}
                >
                  <Icon name="gallery" />
                </Space>
                <h2
                  id={`gallery-${id}`}
                  className="h2 no-margin"
                  ref={this.headingRef}
                >
                  {title || 'In pictures'}
                </h2>
              </Space>
            )}
            <div
              id={`image-gallery-${id}`}
              className={classNames({
                'image-gallery-v2--standalone': isStandalone,
                'image-gallery-v2 row relative': true,
                'is-active': isActive,
              })}
            >
              <div
                className={classNames({
                  'absolute image-gallery-v2__background': true,
                })}
                style={{
                  bottom: 0,
                  width: `100%`,
                  background: `url(${repeatingLsBlack}) no-repeat top center`,
                }}
              />
              <Layout12>
                <Space
                  v={
                    isStandalone
                      ? {
                          size: 'xl',
                          properties: ['padding-top'],
                        }
                      : undefined
                  }
                  className={classNames({
                    relative: true,
                  })}
                >
                  {isStandalone && (
                    <div className="absolute image-gallery-v2__standalone-wobbly-edge">
                      <WobblyEdge
                        extraClasses="wobbly-edge--rotated"
                        background={'white'}
                      />
                    </div>
                  )}
                  {!isActive && (
                    <Fragment>
                      <div className="image-gallery-v2__wobbly-edge absolute">
                        <WobblyEdge background={theme} />
                      </div>
                    </Fragment>
                  )}

                  {!isStandalone && (
                    <Space
                      v={{
                        size: 'm',
                        properties: ['padding-top'],
                      }}
                      className={classNames({
                        'image-gallery-v2__close-wrapper absolute': true,
                      })}
                    >
                      <Space
                        v={{
                          size: 'm',
                          properties: ['padding-bottom'],
                        }}
                        h={{ size: 'm', properties: ['padding-right'] }}
                        className={classNames({
                          'flex flex-end': true,
                          'image-gallery-v2__close': true,
                          'is-hidden': !isActive,
                        })}
                      >
                        <Control
                          tabIndex={`-1`}
                          ariaControls={`image-gallery-${id}`}
                          ariaExpanded={isActive}
                          ref={this.closeButtonRef}
                          replace={true}
                          colorScheme={`light`}
                          text={`close`}
                          icon={`cross`}
                          clickHandler={() => {
                            this.handleCloseClicked();
                          }}
                        />
                      </Space>
                    </Space>
                  )}
                  {this.itemsToShow().map((captionedImage, i) => (
                    <Space
                      v={
                        isActive
                          ? {
                              size: 'xl',
                              properties: ['margin-bottom'],
                            }
                          : undefined
                      }
                      onClick={() => {
                        if (!isActive) {
                          this.handleOpenClicked();
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
                        setTitleStyle={i === 0 ? this.setTitleStyle : undefined}
                        sizesQueries={`
                          (min-width: ${breakpoints.xlarge}) calc(${breakpoints.xlarge} - 120px),
                          calc(100vw - 84px)
                        `}
                        preCaptionNode={
                          items.length > 1 ? (
                            <Space
                              v={{
                                size: 'm',
                                properties: ['margin-bottom'],
                              }}
                              className={classNames({
                                [font('hnb', 5)]: true,
                              })}
                            >
                              {i + 1} of {items.length}
                            </Space>
                          ) : null
                        }
                      />
                    </Space>
                  ))}

                  {titleStyle && (
                    <ButtonContainer isHidden={isActive}>
                      <ButtonSolid
                        ref={this.openButtonRef}
                        ariaControls={`image-gallery-${id}`}
                        ariaExpanded={isActive}
                        icon="gallery"
                        clickHandler={() => {
                          this.handleOpenClicked();
                        }}
                        text={`${items.length} images`}
                      />
                    </ButtonContainer>
                  )}
                </Space>
              </Layout12>
            </div>
          </Fragment>
        )}
      </PageBackgroundContext.Consumer>
    );
  }
}

export default ImageGallery;
