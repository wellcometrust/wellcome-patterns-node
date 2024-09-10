import { IIIFImage } from '../types/image/v2';
import { TransformedImageJSON } from '@weco/content/types/image';
export function transformImageJSON(imageJSON: IIIFImage): TransformedImageJSON {
  return {
    width: imageJSON.width,
    height: imageJSON.height,
  };
}
