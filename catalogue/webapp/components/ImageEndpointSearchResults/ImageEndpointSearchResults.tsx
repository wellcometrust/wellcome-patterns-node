import { FunctionComponent, useState } from 'react';
import ExpandedImage from '../ExpandedImage/ExpandedImage';
import ImageCard from '../ImageCard/ImageCard';
import { Image } from '@weco/common/model/catalogue';
import { CatalogueResultsList } from '../../model/catalogue';
import Modal from '@weco/common/views/components/Modal/Modal';

type Props = {
  images: CatalogueResultsList<Image>;
};

const ImageEndpointSearchResults: FunctionComponent<Props> = ({
  images,
}: Props) => {
  const [expandedImage, setExpandedImage] = useState<Image | undefined>();
  // In the case that the modal changes the expanded image to
  // be one that isn't on this results page, this index will be -1
  const expandedImagePosition = images.results.findIndex(
    img => expandedImage && img.id === expandedImage.id
  );
  const [isActive, setIsActive] = useState(false);

  return (
    <ul className="flex flex--wrap plain-list no-padding no-margin" role="list">
      {images.results.map((result: Image) => (
        <li key={result.id} role="listitem">
          <ImageCard
            id={result.id}
            workId={result.source.id}
            image={{
              contentUrl: result.locations[0]?.url,
              width: 300,
              height: 300,
              alt: '',
            }}
            onClick={event => {
              event.preventDefault();
              setExpandedImage(result);
              setIsActive(true);
            }}
          />
        </li>
      ))}
      <Modal
        id={'expanded-image-dialog'}
        isActive={isActive}
        setIsActive={setIsActive}
        width={'80vw'}
      >
        <ExpandedImage
          resultPosition={expandedImagePosition}
          image={expandedImage}
          setExpandedImage={setExpandedImage}
        />
      </Modal>
    </ul>
  );
};

export default ImageEndpointSearchResults;
