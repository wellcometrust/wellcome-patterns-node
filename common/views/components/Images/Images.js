// @flow
import {Fragment, Component} from 'react';
import {convertImageUri} from '../../../utils/convert-image-uri';
import {classNames} from '../../../utils/classnames';
import {imageSizes} from '../../../utils/image-sizes';
import Tasl from '../Tasl/Tasl';
import type {Node} from 'react';
import type {ImageType} from '../../../model/image';
import type {CaptionedImage as CaptionedImageProps} from '../../../model/captioned-image';
import Caption from '../Caption/Caption';
import debounce from 'lodash.debounce';

export type UiImageProps = {|
  ...ImageType,
  sizesQueries: string,
  extraClasses?: string,
  isFull?: boolean,
  showTasl?: boolean,
  setComputedImageWidth?: (value: number) => void,
  setLazyLoaded?: () => void
|}

type UiImageState = {|
  isEnhanced: boolean,
  isWidthAuto: boolean,
  imgRef: any // FIXME: better Flow
|}

export class UiImage extends Component<UiImageProps, UiImageState> {
  state = {
    isEnhanced: false, // Flag for JS availability (show everything by default)
    isWidthAuto: true, // Start with `width: auto` on the image to allow aspect ratio to be calculated from width/height attributes
    imgRef: null
  }

  setImgRef = (el: any) => { // FIXME: better Flow
    this.setState({
      imgRef: el
    });

    el.addEventListener('lazyloaded', this.handleLazyLoaded);
  }

  getImageSize = () => {
    this.state.imgRef &&
      this.props.setComputedImageWidth &&
      this.props.setComputedImageWidth(this.state.imgRef.width);
  }

  debouncedGetImageSize = debounce(this.getImageSize, 200);

  handleLazyLoaded = () => {
    this.props.setLazyLoaded && this.props.setLazyLoaded(); // Inform parent
    this.setState({
      isWidthAuto: true // Fix aspect ratio
    });
    this.getImageSize(); // Update centre based on new aspect ratio
  }

  componentDidMount() {
    // In order for the image to take up 100% of the available horizontal
    // space, we remove `width: auto`. This is necessary for as long as the
    // parent container is not `display: inline-block`, and this is goverened
    // by whether the 'lazyloaded' event has fired on the img element, which
    // determines that the correct image is available at the the desired size.
    // At that point, setting `display: inline-block` on the parent container
    // ensures the TASL information button is correctly contained within the
    // image.
    this.setState({
      isEnhanced: true, // JS available
      isWidthAuto: false
    });

    window.addEventListener('resize', this.debouncedGetImageSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedGetImageSize);
  }

  render() {
    const {
      contentUrl,
      width,
      height,
      alt,
      tasl,
      sizesQueries,
      extraClasses = '',
      isFull = false,
      showTasl = true
    } = this.props;
    return (
      <Fragment>
        <noscript dangerouslySetInnerHTML={{__html: `
          <img width=${width}
            height=${height || ''}
            class='image image--noscript'
            style="width: auto;"
            src=${convertImageUri(contentUrl, 640, false)}
            alt=${alt} />`}} />

        {this.state.isEnhanced &&
          <img width={width}
            height={height}
            onLoad={this.getImageSize}
            ref={this.setImgRef}
            style={{
              width: this.state.isWidthAuto && 'auto'
            }}
            className={classNames({
              'lazy-image': true,
              'lazyload': true,
              'image': true,
              [extraClasses || '']: true
            })}
            src={convertImageUri(contentUrl, 30, false)}
            data-srcset={imageSizes(width).map(size => {
              return `${convertImageUri(contentUrl, size, false)} ${size}w`;
            })}
            sizes={sizesQueries}
            alt={alt} />
        }

        {showTasl && <Tasl {...tasl} isFull={isFull} />}
      </Fragment>
    );
  }
}

export type UiCaptionedImageProps = {|
  ...CaptionedImageProps,
  sizesQueries: string,
  extraClasses?: string,
  preCaptionNode?: Node,
  setTitleStyle?: (value: number) => void
|}

type UiCaptionedImageState = {|
  isActive: boolean,
  computedImageWidth: ?number,
  isWidthAuto: boolean
|}

export class CaptionedImage extends Component<UiCaptionedImageProps, UiCaptionedImageState> {
  state = {
    isActive: false,
    computedImageWidth: null,
    isWidthAuto: false
  }

  setComputedImageWidth = (width: number) => {
    this.props.setTitleStyle && this.props.setTitleStyle(width);
    this.setState({
      computedImageWidth: width,
      isActive: true
    });
  }

  setLazyLoaded = () => {
    this.setState({
      isWidthAuto: true
    });
  }

  render() {
    const { caption, preCaptionNode, extraClasses, image, sizesQueries } = this.props;
    const { isActive, computedImageWidth, isWidthAuto } = this.state;
    const uiImageProps = {...image, sizesQueries};

    return (
      <figure
        style={{
          marginLeft: isActive && isWidthAuto && '50%',
          transform: isActive && isWidthAuto && computedImageWidth && `translateX(${computedImageWidth / -2}px)`
        }}
        className={`captioned-image ${extraClasses || ''}`}>
        <div
          style={{
            display: isWidthAuto && 'inline-block'
          }}
          className='captioned-image__image-container relative'>
          {/* https://github.com/facebook/flow/issues/2405 */}
          {/* $FlowFixMe */}
          <UiImage
            {...uiImageProps}
            setComputedImageWidth={this.setComputedImageWidth}
            setLazyLoaded={this.setLazyLoaded} />
        </div>
        <Caption
          width={computedImageWidth}
          caption={caption}
          preCaptionNode={preCaptionNode} />
      </figure>
    );
  }
}
