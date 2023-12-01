import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import {
  DigitalLocation,
  isDigitalLocation,
} from '@weco/common/model/catalogue';
import {
  Work,
  WorkBasic,
  toWorkBasic,
} from '@weco/content/services/wellcome/catalogue/types';
import { Manifest } from '@iiif/presentation-3';
import { getDigitalLocationOfType } from '@weco/content/utils/works';
import { removeIdiomaticTextTags } from '@weco/content/utils/string';
import { getWork } from '@weco/content/services/wellcome/catalogue/works';
import CataloguePageLayout from '@weco/content/components/CataloguePageLayout/CataloguePageLayout';
import Layout, { gridSize12 } from '@weco/common/views/components/Layout';
import IIIFViewer, {
  queryParamToArrayIndex,
} from '@weco/content/components/IIIFViewer';
import VideoPlayer from '@weco/content/components/VideoPlayer/VideoPlayer';
import BetaMessage from '@weco/content/components/BetaMessage/BetaMessage';
import styled from 'styled-components';
import Space from '@weco/common/views/components/styled/Space';
import Modal from '@weco/common/views/components/Modal/Modal';
import ButtonSolid from '@weco/common/views/components/ButtonSolid/ButtonSolid';
import { font } from '@weco/common/utils/classnames';
import { serialiseProps } from '@weco/common/utils/json';
import { appError, AppErrorProps } from '@weco/common/services/app';
import { Pageview } from '@weco/common/services/conversion/track';
import { fromQuery } from '@weco/content/components/ItemLink';
import WorkLink from '@weco/content/components/WorkLink';
import { getServerData } from '@weco/common/server-data';
import AudioList from '@weco/content/components/AudioList/AudioList';
import { isNotUndefined } from '@weco/common/utils/type-guards';
import { unavailableContentMessage } from '@weco/common/data/microcopy';
import { looksLikeCanonicalId } from '@weco/content/services/wellcome/catalogue';
import { fetchIIIFPresentationManifest } from '@weco/content/services/iiif/fetch/manifest';
import { transformManifest } from '@weco/content/services/iiif/transformers/manifest';
import { fetchCanvasOcr } from '@weco/content/services/iiif/fetch/canvasOcr';
import { transformCanvasOcr } from '@weco/content/services/iiif/transformers/canvasOcr';
import { TransformedManifest } from '@weco/content/types/manifest';
import WorkHeader from '@weco/content/components/WorkHeader/WorkHeader';
import WorkTabbedNav from '@weco/content/components/WorkTabbedNav/WorkTabbedNav';
import { Container } from '@weco/common/views/components/styled/Container';
import { Grid } from '@weco/content/components/Work/Work';
import { useToggles } from '@weco/common/server-data/Context';
import {
  ApiToolbarLink,
  setTzitzitParams,
} from '@weco/common/views/components/ApiToolbar';
import { setCacheControl } from '@weco/content/utils/setCacheControl';
import {
  CompressedTransformedManifest,
  fromCompressedManifest,
  toCompressedTransformedManifest,
} from '@weco/content/types/compressed-manifest';
import { SearchResults } from '@weco/content/services/iiif/types/search/v3';
import { fetchJson } from '@weco/content/utils/http';
import { ParentManifest } from '@weco/content/components/ItemViewerContext/ItemViewerContext';
import { getCollectionManifests } from '@weco/content/utils/iiif/v3';

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
  work: WorkBasic;
  canvas: number;
  canvasOcr?: string;
  iiifImageLocation?: DigitalLocation;
  iiifPresentationLocation?: DigitalLocation;
  apiToolbarLinks: ApiToolbarLink[];
  pageview: Pageview;
  serverSearchResults: SearchResults | null;
  parentManifest?: ParentManifest;
};

const ItemPage: NextPage<Props> = ({
  compressedTransformedManifest,
  work,
  canvasOcr,
  iiifImageLocation,
  iiifPresentationLocation,
  apiToolbarLinks,
  canvas,
  serverSearchResults,
  parentManifest,
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
      apiToolbarLinks={apiToolbarLinks}
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
        <Space $v={{ size: 'l', properties: ['margin-top'] }}>
          <Container>
            <Grid>
              <WorkHeader
                work={work}
                collectionManifestsCount={collectionManifestsCount}
              />
            </Grid>
            <WorkTabbedNav work={work} selected="imageViewer" />
          </Container>
        </Space>
      )}

      {isNotUndefined(audio) && audio?.sounds?.length > 0 && (
        <Space $v={{ size: 'l', properties: ['margin-top', 'margin-bottom'] }}>
          <Layout gridSizes={gridSize12()}>
            <AudioList
              items={audio.sounds || []}
              thumbnail={audio.thumbnail}
              transcript={audio.transcript}
              workTitle={work.title}
            />
          </Layout>
        </Space>
      )}
      {video && (
        <Layout gridSizes={gridSize12()}>
          <Space
            $v={{ size: 'l', properties: ['margin-top', 'margin-bottom'] }}
          >
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
        </Layout>
      )}
      {/* TODO remove this or update unavailable message to something more appropriate */}
      {!(isNotUndefined(audio) && audio?.sounds.length > 0) &&
        !video &&
        !pdf &&
        !mainImageService &&
        !iiifImageLocation && (
          <Layout gridSizes={gridSize12()}>
            <Space $v={{ size: 'l', properties: ['margin-bottom'] }}>
              <div style={{ marginTop: '98px' }}>
                <BetaMessage message={unavailableContentMessage} />
              </div>
            </Space>
          </Layout>
        )}
      {pdf && !mainImageService && (
        <IframePdfViewer
          $v={{
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
              $h={{ size: 'm', properties: ['margin-right'] }}
              $v={{ size: 'm', properties: ['margin-top'] }}
            >
              <ButtonSolid
                dataGtmTrigger="show_the_content"
                text="Show the content"
                clickHandler={() => {
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
            <a>Take me back to the item page</a>
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
            parentManifest={parentManifest}
          />
        )}
    </CataloguePageLayout>
  );
};

async function getParentManifest(
  parentManifestUrl: string | undefined
): Promise<Manifest | undefined> {
  try {
    return parentManifestUrl && (await fetchJson(parentManifestUrl));
  } catch (error) {
    return undefined;
  }
}

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
    include: ['items', 'languages', 'contributors', 'production', 'notes'],
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

  const apiToolbarLinks = [createTzitzitWorkLink(work)].filter(isNotUndefined);

  if (transformedManifest) {
    const displayManifest = await getDisplayManifest(
      transformedManifest,
      queryParamToArrayIndex(manifest)
    );

    const { canvases, parentManifestUrl } = displayManifest;

    const parentManifest = await getParentManifest(parentManifestUrl);

    const currentCanvas = canvases[queryParamToArrayIndex(canvas)];
    const canvasOcrText = await fetchCanvasOcr(currentCanvas);
    const canvasOcr = transformCanvasOcr(canvasOcrText);

    const getSearchResults = async () => {
      if (displayManifest.searchService && context.query?.query?.length) {
        try {
          return await (
            await fetch(
              `${displayManifest.searchService['@id']}?q=${context.query.query}`
            )
          ).json();
        } catch (error) {
          return undefined;
        }
      } else {
        return undefined;
      }
    };

    const serverSearchResults = await getSearchResults();

    return {
      props: serialiseProps({
        compressedTransformedManifest:
          toCompressedTransformedManifest(displayManifest),
        canvasOcr,
        canvas,
        iiifImageLocation,
        iiifPresentationLocation,
        apiToolbarLinks,
        pageview,
        serverData,
        serverSearchResults,
        // Note: the `description` field on works can be large, which is why we omit it
        // from the standard WorkBasic model.  We include it here because we use it for
        // alt text in the IIIFViewer component, but we don't want it in other places
        // where we use WorkBasic.
        work: {
          ...toWorkBasic(work),
          description: work.description,
        },
        // Note: the parentManifest data can be enormous; for /works/cf4mdjzg/items it's
        // over 12MB in size (!).
        //
        // We only use it to render the MultipleManifestList component in ViewerSidebar, and
        // that component isn't always displayed.  Replicating the `behaviour === 'multi-part'`
        // check here is an attempt to reduce the amount of unnecessary data we send on the
        // page, which we believe is hurting app performance in these pathological cases.
        parentManifest:
          parentManifest && parentManifest.behavior?.[0] === 'multi-part'
            ? {
                behavior: parentManifest.behavior,
                canvases: getCollectionManifests(parentManifest).map(
                  canvas => ({
                    id: canvas.id,
                    label: canvas.label,
                  })
                ),
              }
            : undefined,
      }),
    };
  }

  if (iiifImageLocation) {
    return {
      props: serialiseProps({
        compressedTransformedManifest: undefined,
        work: toWorkBasic(work),
        canvas,
        canvases: [],
        iiifImageLocation,
        iiifPresentationLocation,
        apiToolbarLinks,
        pageview,
        serverData,
        serverSearchResults: null,
      }),
    };
  }

  return {
    notFound: true,
  };
};

export default ItemPage;
