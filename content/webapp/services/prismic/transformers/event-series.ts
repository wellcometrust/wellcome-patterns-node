import { EventSeries } from '../../../types/event-series';
import { EventSeriesPrismicDocument } from '../types/event-series';
import { transformGenericFields, transformKeyTextField } from '.';
import { BackgroundTexture } from '@weco/common/model/background-texture';
import { isFilledLinkToDocumentWithData } from '../types';
import { ImageField, KeyTextField } from '@prismicio/types';
import { isNotUndefined } from '@weco/common/utils/array';

function transformBackgroundTexture({ image, name }: {
  image: ImageField,
  name: KeyTextField
}): BackgroundTexture | undefined {
  const backgroundName = transformKeyTextField(name);

  return image.url && isNotUndefined(backgroundName)
    ? { image: image.url, name: backgroundName }
    : undefined;
}

export function transformEventSeries(
  document: EventSeriesPrismicDocument
): EventSeries {
  const genericFields = transformGenericFields(document);

  const backgroundTexture = isFilledLinkToDocumentWithData(document.data.backgroundTexture)
    ? transformBackgroundTexture(document.data.backgroundTexture.data)
    : undefined;

  const labels = [
    {
      text: 'Event series',
    },
  ];

  return {
    ...genericFields,
    type: 'event-series',
    backgroundTexture,
    labels,
    prismicDocument: document,
  };
}
