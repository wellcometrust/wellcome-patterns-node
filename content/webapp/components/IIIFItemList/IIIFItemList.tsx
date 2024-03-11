import { FunctionComponent } from 'react';
import IIIFItem from '@weco/content/components/IIIFItem/IIIFItem';
import PlainList from '@weco/common/views/components/styled/PlainList';
import Space from '@weco/common/views/components/styled/Space';
import { ContentResource, ChoiceBody } from '@iiif/presentation-3';
import { TransformedCanvas } from '@weco/content/types/manifest';

type Props = {
  canvases: TransformedCanvas[] | undefined;
  exclude: (ContentResource['type'] | ChoiceBody['type'])[]; // Allows us to exclude certain types from being rendered
  placeholderId: string | undefined;
};

const IIIFItemList: FunctionComponent<Props> = ({
  canvases,
  exclude,
  placeholderId,
}) => (
  <PlainList as="ol">
    {canvases &&
      canvases.map((canvas, i) => {
        // Ordinarly we would use the painting array to display an item to the user, see https://iiif.io/api/presentation/3.0/#values-for-motivation
        // However, if there is a PDF in the 'original' array we want to display that.
        // If neither of those things are available we fallback to the supplementing array.
        // This is because pdfs that were added to manifests before the DLCS changes, which took place in May 2023,
        // will be in the supplementing array.
        const originalPdfs = canvas.original.filter(o => {
          if ('format' in o) {
            return o.format === 'application/pdf';
          } else {
            return false;
          }
        });
        const displayItems =
          originalPdfs.length > 0
            ? originalPdfs
            : canvas.painting.length > 0
              ? canvas.painting
              : canvas.supplementing;
        return displayItems.map(item => {
          return (
            <li key={item.id}>
              <Space $v={{ size: 'l', properties: ['margin-bottom'] }}>
                <IIIFItem
                  placeholderId={placeholderId}
                  item={item}
                  canvas={canvas}
                  i={i}
                  exclude={exclude}
                />
              </Space>
            </li>
          );
        });
      })}
  </PlainList>
);

export default IIIFItemList;
