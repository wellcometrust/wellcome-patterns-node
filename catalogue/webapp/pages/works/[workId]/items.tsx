import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import {
  DigitalLocation,
  isDigitalLocation,
} from '@weco/common/model/catalogue';
import {
  Work,
  toWorkBasic,
} from '@weco/catalogue/services/wellcome/catalogue/types';
import { getDigitalLocationOfType } from '@weco/catalogue/utils/works';
import { removeIdiomaticTextTags } from '@weco/common/utils/string';
import { getWork } from '@weco/catalogue/services/wellcome/catalogue/works';
import CataloguePageLayout from '@weco/catalogue/components/CataloguePageLayout/CataloguePageLayout';
import Layout12 from '@weco/common/views/components/Layout12/Layout12';
import IIIFViewer, {
  queryParamToArrayIndex,
} from '@weco/catalogue/components/IIIFViewer';
import VideoPlayer from '@weco/catalogue/components/VideoPlayer/VideoPlayer';
import BetaMessage from '@weco/common/views/components/BetaMessage/BetaMessage';
import styled from 'styled-components';
import Space from '@weco/common/views/components/styled/Space';
import Modal from '@weco/common/views/components/Modal/Modal';
import ButtonSolid from '@weco/common/views/components/ButtonSolid/ButtonSolid';
import { font } from '@weco/common/utils/classnames';
import { trackGaEvent } from '@weco/common/utils/ga';
import { serialiseProps } from '@weco/common/utils/json';
import { appError, AppErrorProps } from '@weco/common/services/app';
import { Pageview } from '@weco/common/services/conversion/track';
import { fromQuery } from '@weco/catalogue/components/ItemLink';
import WorkLink from '@weco/catalogue/components/WorkLink';
import { getServerData } from '@weco/common/server-data';
import AudioList from '@weco/catalogue/components/AudioList/AudioList';
import { isNotUndefined } from '@weco/common/utils/type-guards';
import { unavailableImageMessage } from '@weco/common/data/microcopy';
import { looksLikeCanonicalId } from '@weco/catalogue/services/wellcome/catalogue';
import { fetchIIIFPresentationManifest } from '@weco/catalogue/services/iiif/fetch/manifest';
import { transformManifest } from '@weco/catalogue/services/iiif/transformers/manifest';
import { fetchCanvasOcr } from '@weco/catalogue/services/iiif/fetch/canvasOcr';
import { transformCanvasOcr } from '@weco/catalogue/services/iiif/transformers/canvasOcr';
import { TransformedManifest } from '@weco/catalogue/types/manifest';
import WorkHeader from '@weco/catalogue/components/WorkHeader/WorkHeader';
import WorkTabbedNav from '@weco/catalogue/components/WorkTabbedNav/WorkTabbedNav';
import { Container, Grid } from '@weco/catalogue/components/Work/Work';
import { useToggles } from '@weco/common/server-data/Context';
import {
  ApiToolbarLink,
  setTzitzitParams,
} from '@weco/common/views/components/ApiToolbar';
import { setCacheControl } from '@weco/common/utils/setCacheControl';
import {
  CompressedTransformedManifest,
  fromCompressedManifest,
  toCompressedTransformedManifest,
} from '@weco/catalogue/types/compressed-manifest';
import { SearchResults } from '@weco/catalogue/services/iiif/types/search/v3';

const IframeAuthMessage = styled.iframe`
  display: none;
`;

const IframePdfViewer = styled(Space)`
  width: 90vw;
  height: 90vh;
  display: block;
  border: 0;
  margin-top: 98px;
  margin-left: auto;
  margin-right: auto;
`;

const iframeId = 'authMessage';
function reloadAuthIframe(document: Document, id: string) {
  const authMessageIframe = document.getElementById(id) as HTMLIFrameElement;
  // assigning the iframe src to itself reloads the iframe and refires the window.message event
  // eslint-disable-next-line no-self-assign
  if (authMessageIframe) authMessageIframe.src = authMessageIframe.src;
}

function createTzitzitWorkLink(work: Work): ApiToolbarLink | undefined {
  // Look at digital item locations only
  const digitalLocation: DigitalLocation | undefined = work.items
    ?.map(item => item.locations.find(isDigitalLocation))
    .find(i => i);

  return setTzitzitParams({
    title: work.title,
    sourceLink: `https://wellcomecollection.org/works/${work.id}/items`,
    licence: digitalLocation?.license,
    contributors: work.contributors,
  });
}

type Props = {
  compressedTransformedManifest?: CompressedTransformedManifest;
  work: Work;
  canvas: number;
  canvasOcr?: string;
  iiifImageLocation?: DigitalLocation;
  iiifPresentationLocation?: DigitalLocation;
  pageview: Pageview;
  serverSearchResults: SearchResults | null;
};

const ItemPage: NextPage<Props> = ({
  compressedTransformedManifest,
  work,
  canvasOcr,
  iiifImageLocation,
  iiifPresentationLocation,
  canvas,
  serverSearchResults
}) => {
  const transformedManifest =
    compressedTransformedManifest &&
    fromCompressedManifest(compressedTransformedManifest);

  const workId = work.id;
  const [origin, setOrigin] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const [showViewer, setShowViewer] = useState(true);
  const { worksTabbedNav } = useToggles();
  const {
    title,
    video,
    needsModal,
    pdf,
    isAnyImageOpen,
    audio,
    clickThroughService,
    tokenService,
    restrictedService,
    isTotallyRestricted,
    canvases,
    collectionManifestsCount,
  } = { ...transformedManifest };

  const [searchResults, setSearchResults] = useState(serverSearchResults);
  const authService = clickThroughService || restrictedService;
  const currentCanvas = canvases?.[queryParamToArrayIndex(canvas)];

  const displayTitle =
    title || (work && removeIdiomaticTextTags(work.title)) || '';
  const { imageServiceId = '' } = { ...currentCanvas };
  const mainImageService = imageServiceId && {
    '@id': imageServiceId,
  };

  // showViewer is true by default, so the noScriptViewer is available without javascript
  // if javascript is available we set it to false and then determine whether the clickthrough modal is required
  // before setting it to true
  useEffect(() => {
    setShowViewer(false);
  }, []);

  useEffect(() => {
    setOrigin(`${window.location.protocol}//${window.location.hostname}`);
  }, []);

  useEffect(() => {
    function receiveMessage(event: MessageEvent) {
      const data = event.data;
      const serviceOrigin = tokenService && new URL(tokenService['@id']);
      if (
        serviceOrigin &&
        `${serviceOrigin.protocol}//${serviceOrigin.hostname}` === event.origin
      ) {
        if (Object.prototype.hasOwnProperty.call(data, 'accessToken')) {
          setShowModal(Boolean(isTotallyRestricted));
          setShowViewer(!isTotallyRestricted);
        } else {
          setShowModal(true);
          setShowViewer(false);
        }
      }
    }

    if (needsModal) {
      window.addEventListener('message', receiveMessage);

      return () => window.removeEventListener('message', receiveMessage);
    } else {
      setShowModal(false);
      setShowViewer(true);
    }
  }, []);

  return (
    <CataloguePageLayout
      title={displayTitle}
      description=""
      url={{ pathname: `/works/${workId}/items` }}
      openGraphType="website"
      jsonLd={{ '@type': 'WebPage' }}
      siteSection="collections"
      apiToolbarLinks={[createTzitzitWorkLink(work)]}
      hideNewsletterPromo={true}
      hideFooter={true}
      hideTopContent={true}
    >
      {tokenService && origin && (
        <IframeAuthMessage
          id={iframeId}
          src={`${tokenService['@id']}?messageId=1&origin=${origin}`}
        />
      )}

      {worksTabbedNav && (
        <Space v={{ size: 'l', properties: ['margin-top'] }}>
          <Container>
            <Grid>
              <WorkHeader
                work={toWorkBasic(work)}
                collectionManifestsCount={collectionManifestsCount}
              />
            </Grid>
            <WorkTabbedNav work={toWorkBasic(work)} selected="imageViewer" />
          </Container>
        </Space>
      )}

      {isNotUndefined(audio) && audio?.sounds?.length > 0 && (
        <Space v={{ size: 'l', properties: ['margin-top', 'margin-bottom'] }}>
          <Layout12>
            <AudioList
              items={audio.sounds || []}
              thumbnail={audio.thumbnail}
              transcript={audio.transcript}
              workTitle={work.title}
            />
          </Layout12>
        </Space>
      )}
      {video && (
        <Layout12>
          <Space v={{ size: 'l', properties: ['margin-top', 'margin-bottom'] }}>
            <VideoPlayer
              video={video}
              // Note: because we can't prevent people from downloading videos if
              // they're available online, any videos where we want to prevent
              // download are restricted in Sierra.
              //
              // This means that any videos which can be viewed can also be downloaded.
              //
              // See discussion in https://wellcome.slack.com/archives/C8X9YKM5X/p1641833044030400
              showDownloadOptions={true}
            />
          </Space>
        </Layout12>
      )}
      {/* TODO remove this or update unavailable message to something more appropriate */}
      {!(isNotUndefined(audio) && audio?.sounds.length > 0) &&
        !video &&
        !pdf &&
        !mainImageService &&
        !iiifImageLocation && (
          <Layout12>
            <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
              <div style={{ marginTop: '98px' }}>
                <BetaMessage message={unavailableImageMessage} />
              </div>
            </Space>
          </Layout12>
        )}
      {pdf && !mainImageService && (
        <IframePdfViewer
          v={{
            size: 'l',
            properties: ['margin-bottom'],
          }}
          as="iframe"
          title={`PDF: ${displayTitle}`}
          src={pdf.id}
        />
      )}
      <Modal
        id="auth-modal"
        isActive={showModal}
        setIsActive={setShowModal}
        removeCloseButton={true}
        openButtonRef={{ current: null }}
      >
        <div className={font('intr', 5)}>
          {authService?.label && (
            <h2 className={font('intb', 4)}>{authService?.label}</h2>
          )}
          {authService?.description && (
            <div
              dangerouslySetInnerHTML={{
                __html: authService?.description,
              }}
            />
          )}
          {isAnyImageOpen && origin && (
            <Space
              style={{ display: 'inline-flex' }}
              h={{ size: 'm', properties: ['margin-right'] }}
              v={{ size: 'm', properties: ['margin-top'] }}
            >
              <ButtonSolid
                dataGtmTrigger="show_the_content"
                text="Show the content"
                clickHandler={() => {
                  trackGaEvent({
                    category: 'ButtonSolidLink',
                    action: 'follow link "Show the content"',
                    label: `workId: ${workId}`,
                  });
                  const authServiceWindow = window.open(
                    `${authService?.['@id'] || ''}?origin=${origin}`
                  );
                  authServiceWindow &&
                    authServiceWindow.addEventListener('unload', function () {
                      reloadAuthIframe(document, iframeId);
                    });
                }}
              />
            </Space>
          )}
          <WorkLink id={workId} source="item_auth_modal_back_to_work_link">
            <a
              onClick={() => {
                trackGaEvent({
                  category: 'ButtonSolidLink',
                  action: 'follow link to work page',
                  label: `workId: ${workId}`,
                });
              }}
            >
              Take me back to the item page
            </a>
          </WorkLink>
        </div>
      </Modal>
      {showViewer &&
        ((mainImageService && currentCanvas) || iiifImageLocation) && (
          <IIIFViewer
            work={work}
            transformedManifest={transformedManifest}
            canvasOcr={canvasOcr}
            iiifImageLocation={iiifImageLocation}
            iiifPresentationLocation={iiifPresentationLocation}
            handleImageError={() => {
              // If the image fails to load, we check to see if it's because the cookie is missing/no longer valid
              reloadAuthIframe(document, iframeId);
            }}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          />
        )}
    </CataloguePageLayout>
  );
};


export const getServerSideProps: GetServerSideProps<
  Props | AppErrorProps
> = async context => {
  setCacheControl(context.res);
  const serverData = await getServerData(context);
  const { canvas = 1, manifest = 1 } = fromQuery(context.query);

  if (!looksLikeCanonicalId(context.query.workId)) {
    return { notFound: true };
  }

  const pageview: Pageview = {
    name: 'item',
    properties: {},
  };

  const work = await getWork({
    id: context.query.workId,
    toggles: serverData.toggles,
    include: ['items', 'languages', 'contributors', 'production'],
  });

  if (work.type === 'Error') {
    return appError(context, work.httpStatus, work.description);
  }

  if (work.type === 'Redirect') {
    // This ensures that any query parameters are preserved on redirect,
    // e.g. if you have a link to /works/$oldId/items?canvas=10, then
    // you'll go to /works/$newId/items?canvas=10
    const destination = isNotUndefined(context.req.url)
      ? context.req.url.replace(context.query.workId, work.redirectToId)
      : `/works/${work.redirectToId}/items`;

    return {
      redirect: {
        destination,
        permanent: work.status === 301,
      },
    };
  }

  const iiifImageLocation = getDigitalLocationOfType(work, 'iiif-image');
  const iiifPresentationLocation = getDigitalLocationOfType(
    work,
    'iiif-presentation'
  );
  const iiifManifest =
    iiifPresentationLocation &&
    (await fetchIIIFPresentationManifest(iiifPresentationLocation.url));

  const transformedManifest = iiifManifest && transformManifest(iiifManifest);

  const { isCollectionManifest, manifests } = { ...transformedManifest };
  // If the manifest is actually a Collection, .i.e. a manifest of manifests,
  // then we get the first child manifest and use the data from that
  // see: https://iiif.wellcomecollection.org/presentation/v2/b21293302
  // from: https://wellcomecollection.org/works/f6qp7m32/items
  async function getDisplayManifest(
    transformedManifest: TransformedManifest,
    manifestIndex: number
  ): Promise<TransformedManifest> {
    if (isCollectionManifest) {
      const selectedCollectionManifestLocation = manifests?.[manifestIndex]?.id;
      const selectedCollectionManifest = selectedCollectionManifestLocation
        ? await fetchIIIFPresentationManifest(
            selectedCollectionManifestLocation
          )
        : undefined;
      const firstChildTransformedManifest =
        selectedCollectionManifest &&
        transformManifest(selectedCollectionManifest);
      return firstChildTransformedManifest || transformedManifest;
    } else {
      return transformedManifest;
    }
  }

  if (transformedManifest) {
    const displayManifest = await getDisplayManifest(
      transformedManifest,
      queryParamToArrayIndex(manifest)
    );

    const { canvases } = displayManifest;
    const currentCanvas = canvases[queryParamToArrayIndex(canvas)];
    const canvasOcrText = await fetchCanvasOcr(currentCanvas);
    const canvasOcr = transformCanvasOcr(canvasOcrText);

    const getSearchResults = async () => {
      if (displayManifest.searchService && context.query?.query?.length) {
        try {
          return await (
            await fetch(`${displayManifest.searchService['@id']}?q=${context.query.query}`)
          ).json();
        } catch (error) {
          return undefined;
        }
      } else {
        return undefined;
      }
    }

    const serverSearchResults = await getSearchResults();

    return {
      props: serialiseProps({
        compressedTransformedManifest:
          toCompressedTransformedManifest(displayManifest),
        canvasOcr,
        work,
        canvas,
        iiifImageLocation,
        iiifPresentationLocation,
        pageview,
        serverData,
        serverSearchResults,
      }),
    };
  }

  if (iiifImageLocation) {
    return {
      props: serialiseProps({
        compressedTransformedManifest: undefined,
        work,
        canvas,
        canvases: [],
        iiifImageLocation,
        iiifPresentationLocation,
        pageview,
        serverData,
        serverSearchResults: null
      }),
    };
  }

  return {
    notFound: true,
  };
};

export default ItemPage;
