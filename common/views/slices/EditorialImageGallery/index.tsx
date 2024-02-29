import { Content } from '@prismicio/client';
import { FunctionComponent } from 'react';
import ImageGallery from '@weco/content/components/ImageGallery';
import { SliceComponentProps } from '@prismicio/react';
import SpacingComponent from '../../components/styled/SpacingComponent';
import { transformEditorialImageGallerySlice } from '@weco/content/services/prismic/transformers/body';
import { defaultContext } from '@weco/content/components/Body/Body';

export type EditorialImageGalleryProps =
  SliceComponentProps<Content.EditorialImageGallerySlice>;

const EditorialImageGallerySlice: FunctionComponent<
  EditorialImageGalleryProps
> = ({ slice, slices, context }) => {
  const transformedSlice = transformEditorialImageGallerySlice(slice);
  const options = { ...defaultContext, ...context };
  const allImageGallerySlices = slices.filter(
    slice => slice.slice_type === 'editorialImageGallery'
  );
  const index = allImageGallerySlices.findIndex(s => s.id === slice.id);

  return (
    <SpacingComponent $sliceType={transformedSlice.type}>
      <ImageGallery
        {...transformedSlice.value}
        id={index + 1}
        comicPreviousNext={options.comicPreviousNext}
      />
    </SpacingComponent>
  );
};

export default EditorialImageGallerySlice;
