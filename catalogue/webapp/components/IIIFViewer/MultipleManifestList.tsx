import styled from 'styled-components';
import { useContext, FunctionComponent } from 'react';
import NextLink from 'next/link';
import { toLink as itemLink } from '../ItemLink';
import ItemViewerContext from '../ItemViewerContext/ItemViewerContext';
import { volumesNavigationLabel } from '@weco/common/text/aria-labels';
import { getMultiVolumeLabel } from '@weco/catalogue/utils/iiif/v3';
import PlainList from '@weco/common/views/components/styled/PlainList';
import { queryParamToArrayIndex } from '@weco/catalogue/components/IIIFViewer/IIIFViewer';

const Anchor = styled.a<{ isManifestIndex: boolean }>`
  ${props => props.isManifestIndex && `color: ${props.theme.color('yellow')};`};
`;

const MultipleManifestListPrototype: FunctionComponent = () => {
  const { parentManifest, work, query, setIsMobileSidebarActive } =
    useContext(ItemViewerContext);
  return (
    <nav>
      <PlainList aria-label={volumesNavigationLabel}>
        {parentManifest?.items.map((manifest, i) => (
          <li key={manifest.id}>
            <NextLink
              {...itemLink(
                {
                  workId: work.id,
                  manifest: i + 1,
                  canvas: 1,
                },
                'manifests_navigation'
              )}
              passHref={true}
              legacyBehavior
            >
              <Anchor
                data-gtm-trigger="volumes_nav_link"
                isManifestIndex={
                  i === queryParamToArrayIndex(query.manifestParam)
                }
                aria-current={
                  i === queryParamToArrayIndex(query.manifestParam)
                    ? 'page'
                    : undefined
                }
                onClick={() => {
                  setIsMobileSidebarActive(false);
                }}
              >
                {(manifest?.label &&
                  getMultiVolumeLabel(manifest.label, work?.title || '')) ||
                  'Unknown'}
              </Anchor>
            </NextLink>
          </li>
        ))}
      </PlainList>
    </nav>
  );
};

export default MultipleManifestListPrototype;
