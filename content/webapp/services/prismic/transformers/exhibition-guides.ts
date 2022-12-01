import {
  ExhibitionGuide,
  ExhibitionGuideBasic,
  ExhibitionGuideComponent,
  ExhibitionGuideType,
  RelatedExhibition,
} from '../../../types/exhibition-guides';
import { asRichText, asTitle } from '.';
import {
  ExhibitionGuideComponentPrismicDocument,
  ExhibitionGuidePrismicDocument,
} from '../types/exhibition-guides';
import { isFilledLinkToDocumentWithData } from '@weco/common/services/prismic/types';
import { transformImagePromo } from './images';
import { transformImage } from '@weco/common/services/prismic/transformers/images';
import { dasherizeShorten } from '@weco/common/utils/grammar';
import { getYouTubeEmbedUrl } from './embeds';
import { isNotUndefined } from '@weco/common/utils/array';

// TODO It's likely that we will need to construct a hierarchy of components within a guide.
// For example, to facilitate collapsing sections in the UI.
// With the addition of a partOf field to the model, as has previously been discussed,
// this function will generate the necessary structure.
// It relies on there being a top level component with no partOf assigned to it.

// export function constructHierarchy(components) {
//   // TODO type function return
//   const groupedSections = groupBy(components, component => {
//     const partOf = component.partOf;
//     if (!partOf) {
//       return 'Guide';
//     }
//     return partOf;
//   });
//   const levels = Object.keys(groupedSections).length;
//   for (let level = 0; level < levels; level++) {
//     for (const [key, value] of Object.entries(groupedSections)) {
//       const itemsWithParts = value.map(item => {
//         const { partOf, ...restOfItem } = item;
//         const parts = groupedSections[item.title];
//         if (parts) {
//           return {
//             ...restOfItem,
//             parts: groupedSections[item.title],
//           };
//         } else {
//           return restOfItem;
//         }
//       });
//       groupedSections[key] = itemsWithParts;
//     }
//   }

//   return groupedSections?.['Guide'];
// }

// const componentsKeys = Object.keys(components);
//
// const filterByGuide = components.filter(value => {
//   return components[value].caption;
// });

export function transformExhibitionGuideToExhibitionGuideBasic(
  exhibitionGuide: ExhibitionGuide
): ExhibitionGuideBasic {
  // returns what is required to render ExhibitionGuideLinkPromo
  return (({
    title,
    introText,
    type,
    id,
    image,
    promo,
    relatedExhibition,
    availableTypes,
  }) => ({
    title,
    introText,
    type,
    id,
    image,
    promo,
    relatedExhibition,
    availableTypes,
  }))(exhibitionGuide);
}

function transformRelatedExhibition(exhibition): RelatedExhibition {
  const promo =
    exhibition.data.promo && transformImagePromo(exhibition.data.promo);

  return {
    id: exhibition.id,
    title: asTitle(exhibition.data.title),
    description: promo?.caption,
  };
}

export function transformExhibitionGuide(
  document: ExhibitionGuidePrismicDocument
): ExhibitionGuide {
  const { data } = document;

  const components: ExhibitionGuideComponent[] = data.components?.map(
    (component: ExhibitionGuideComponentPrismicDocument, index) => {
      const title = asTitle(component.title);
      const standaloneTitle = asTitle(component.standaloneTitle);

      const displayTitle = title || standaloneTitle;
      const anchorId = `${dasherizeShorten(displayTitle)}-${index}`;

      return {
        number: component.number || undefined,
        title,
        standaloneTitle,
        displayTitle,
        anchorId,
        image: transformImage(component.image),
        captionsOrTranscripts: {
          context: component.context
            ? asRichText(component.context)
            : undefined,
          caption: component.caption
            ? asRichText(component.caption)
            : undefined,
          transcription: component.transcript
            ? asRichText(component.transcript)
            : undefined,
          tombstone: asRichText(component.tombstone),
        },
        audioWithDescription: component['audio-with-description'], // TODO make the same as other audio transforms
        audioWithoutDescription: component['audio-without-description'], // TODO make the same as other audio transforms
        bsl:
          component['bsl-video'].provider_name === 'YouTube'
            ? { embedUrl: getYouTubeEmbedUrl(component['bsl-video']) }
            : undefined,
      };
    }
  );

  const introText = (data.introText && asRichText(data.introText)) || [];
  const promo = isFilledLinkToDocumentWithData(data['related-exhibition'])
    ? transformImagePromo(data['related-exhibition'].data.promo)
    : undefined;

  const relatedExhibition = isFilledLinkToDocumentWithData(
    data['related-exhibition']
  )
    ? transformRelatedExhibition(data['related-exhibition'])
    : undefined;

  const hasBSLVideo = components.some(({ bsl }) => isNotUndefined(bsl));
  const hasCaptionsOrTranscripts = components.some(
    ({ captionsOrTranscripts: captions }) =>
      isNotUndefined(captions?.caption) ||
      isNotUndefined(captions?.transcription)
  );
  const hasAudioWithoutDescriptions = components.some(
    component => component.audioWithoutDescription?.url
  );
  const hasAudioWithDescriptions = components.some(
    component => component.audioWithDescription?.url
  );

  return {
    title: relatedExhibition?.title || '',
    introText,
    type: 'exhibition-guides',
    promo,
    relatedExhibition,
    components,
    id: document.id,
    availableTypes: {
      BSLVideo: hasBSLVideo,
      captionsOrTranscripts: hasCaptionsOrTranscripts,
      audioWithoutDescriptions: hasAudioWithoutDescriptions,
      audioWithDescriptions: hasAudioWithDescriptions,
    },
  };
}
