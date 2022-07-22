import { ExhibitionGuide } from '../../../types/exhibition-guides';
import { ExhibitionGuidePrismicDocument } from '../types/exhibition-guides';
import groupBy from 'lodash.groupby';

// TODO It's likely that we will need to construct a hierarchy of stops within a guide.
// For example, to facilitate collapsing sections in the UI.
// With the addition of a partOf field to the model, as has previously been discussed,
// this function will generate the necessary structure.
export function constructHierarchy(components) {
  // TODO type function
  // TODO what happens if partOf left off other stuff? - could we use order to determine with guide or should be part of Guide
  // if first item it is Guide, subsequent items are part of guide
  const groupedSections = groupBy(components, component => {
    const partOf = component.partOf;
    if (!partOf) {
      return 'Guide';
    }
    return partOf;
  });
  const levels = Object.keys(groupedSections).length;
  for (let level = 0; level < levels; level++) {
    for (const [key, value] of Object.entries(groupedSections)) {
      const itemsWithParts = value.map(item => {
        const { partOf, ...restOfItem } = item;
        const parts = groupedSections[item.title];
        if (parts) {
          return {
            ...restOfItem,
            parts: groupedSections[item.title],
          };
        } else {
          return restOfItem;
        }
      });
      groupedSections[key] = itemsWithParts;
    }
  }

  return groupedSections?.['Guide'];
}

export function transformGuide(
  document: ExhibitionGuidePrismicDocument
): ExhibitionGuide {
  const { data } = document;
  // TODO transform all the bits
  return {
    type: 'exhibition-guides',
  };
}
