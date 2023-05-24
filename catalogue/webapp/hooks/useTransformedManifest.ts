import { useEffect, useState } from 'react';
import { Work } from '@weco/catalogue/services/wellcome/catalogue/types';
import { Manifest } from '@iiif/presentation-3';
import { transformManifest } from '../services/iiif/transformers/manifest';
import { fetchIIIFPresentationManifest } from '../services/iiif/fetch/manifest';
import { TransformedManifest } from '../types/manifest';
import { getDigitalLocationOfType } from '../utils/works';
import { Toggles } from '@weco/toggles';

const manifestPromises: Map<string, Promise<Manifest | undefined>> = new Map();
const cachedTransformedManifest: Map<string, TransformedManifest> = new Map();
const useTransformedManifest = (
  work: Work,
  toggles: Toggles
): TransformedManifest | undefined => {
  const [transformedManifest, setTransformedManifest] = useState<
    TransformedManifest | undefined
  >(undefined);

  function transformAndUpdate(manifest: Manifest, id: string) {
    const transformedManifest = transformManifest(manifest);
    cachedTransformedManifest.set(id, transformedManifest);
    setTransformedManifest(transformedManifest);
  }

  async function updateManifest(work: Work) {
    const cachedManifest = cachedTransformedManifest.get(work.id);
    if (cachedManifest) {
      setTransformedManifest(cachedManifest);
    } else {
      // If we've started fetching a manifest, we can just wait for that to resolve
      const existingPromise = manifestPromises.get(work.id);
      if (existingPromise) {
        const iiifManifest = await existingPromise;
        iiifManifest && transformAndUpdate(iiifManifest, work.id);
      } else {
        const iiifPresentationLocation = getDigitalLocationOfType(
          work,
          'iiif-presentation'
        );
        if (!iiifPresentationLocation) return;
        manifestPromises.set(
          work.id,
          fetchIIIFPresentationManifest(iiifPresentationLocation.url, toggles)
        );
        const iiifManifest = await manifestPromises.get(work.id);
        iiifManifest && transformAndUpdate(iiifManifest, work.id);
      }
    }
  }

  useEffect(() => {
    updateManifest(work);
  }, [work.id]);

  return transformedManifest;
};

export default useTransformedManifest;
