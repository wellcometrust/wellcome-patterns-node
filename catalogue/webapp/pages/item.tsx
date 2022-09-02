import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { DigitalLocation, Work } from '@weco/common/model/catalogue';
import { IIIFCanvas, IIIFManifest, AuthService, AudioV3 } from '../model/iiif';
import { getDigitalLocationOfType } from '../utils/works';
import { fetchJson } from '@weco/common/utils/http';
import { removeIdiomaticTextTags } from '@weco/common/utils/string';
import { Manifest } from '@iiif/presentation-3';
import {
  getDownloadOptionsFromManifest,
  getVideo,
  getAudioV3,
  getServiceId,
  getUiExtensions,
  isUiEnabled,
  getAuthService,
  getTokenService,
  getIIIFManifest,
  getIsAnyImageOpen,
  restrictedAuthServiceUrl,
} from '../utils/iiif';
import { getWork, getCanvasOcr } from '../services/catalogue/works';
import CataloguePageLayout from '../components/CataloguePageLayout/CataloguePageLayout';
import Layout12 from '@weco/common/views/components/Layout12/Layout12';
import IIIFViewer from '../components/IIIFViewer/IIIFViewer';
import BetaMessage from '@weco/common/views/components/BetaMessage/BetaMessage';
import styled from 'styled-components';
import Space, {
  SpaceComponentProps,
} from '@weco/common/views/components/styled/Space';
import Modal from '@weco/common/views/components/Modal/Modal';
import ButtonSolid from '@weco/common/views/components/ButtonSolid/ButtonSolid';
import { font } from '@weco/common/utils/classnames';
import { trackEvent } from '@weco/common/utils/ga';
import {
  appError,
  AppErrorProps,
  WithPageview,
} from '@weco/common/views/pages/_app';
import {
  toLink as itemLink,
  fromQuery,
} from '@weco/common/views/components/ItemLink/ItemLink';
import WorkLink from '@weco/common/views/components/WorkLink/WorkLink';
import { getServerData } from '@weco/common/server-data';
import AudioList from '../components/AudioList/AudioList';
import { isNotUndefined } from '@weco/common/utils/array';
import { unavailableImageMessage } from '@weco/common/data/microcopy';
import { looksLikeCanonicalId } from 'services/catalogue';
const IframeAuthMessage = styled.iframe`
  display: none;
`;

const IframePdfViewer = styled(Space).attrs({
  className: 'h-center',
})<SpaceComponentProps>`
  width: 90vw;
  height: 90vh;
  display: block;
  border: 0;
  margin-top: 98px;
`;

const iframeId = 'authMessage';
function reloadAuthIframe(document, id: string) {
  const authMessageIframe: HTMLIFrameElement = document.getElementById(id);
  // assigning the iframe src to itself reloads the iframe and refires the window.message event
  // eslint-disable-next-line no-self-assign
  if (authMessageIframe) authMessageIframe.src = authMessageIframe.src;
}

type Video = {
  '@id': string;
  format: string;
};

type Props = {
  manifest?: IIIFManifest;
  manifestIndex?: number;
  work: Work;
  pageSize: number;
  pageIndex: number;
  canvasIndex: number;
  canvasOcr?: string;
  canvases: IIIFCanvas[];
  currentCanvas?: IIIFCanvas;
  video?: Video;
  audio?: AudioV3;
  iiifImageLocation?: DigitalLocation;
} & WithPageview;

const ItemPage: NextPage<Props> = ({
  manifest,
  manifestIndex,
  work,
  pageSize,
  pageIndex,
  canvasIndex,
  canvasOcr,
  canvases,
  currentCanvas,
  video,
  audio,
  iiifImageLocation,
}) => {
  const workId = work.id;
  const [origin, setOrigin] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const title =
    (manifest && manifest.label) ||
    (work && removeIdiomaticTextTags(work.title)) ||
    '';
  const serviceId = getServiceId(currentCanvas);
  const mainImageService = serviceId && {
    '@id': serviceId,
  };
  const showDownloadOptions = manifest
    ? isUiEnabled(getUiExtensions(manifest), 'mediaDownload')
    : true;

  const downloadOptions =
    showDownloadOptions && manifest && getDownloadOptionsFromManifest(manifest);

  const pdfRendering =
    (downloadOptions &&
      downloadOptions.find(option => option.label === 'Download PDF')) ||
    null;

  const authService = getAuthService(manifest);
  const tokenService = authService && getTokenService(authService);
  const isAnyImageOpen = manifest && getIsAnyImageOpen(manifest);
  const isTotallyRestricted =
    authService?.['@id'] === restrictedAuthServiceUrl && !isAnyImageOpen;

  function getNeedsModal(authService: AuthService | undefined) {
    switch (authService?.['@id']) {
      case undefined:
        return false;
      case restrictedAuthServiceUrl:
        return !isAnyImageOpen;
      default:
        return true;
    }
  }

  const sharedPaginatorProps = {
    totalResults: canvases ? canvases.length : 1,
    link: itemLink(
      {
        workId,
        page: pageIndex + 1,
        canvas: canvasIndex + 1,
        manifest: manifestIndex ? manifestIndex + 1 : undefined,
      },
      'viewer/paginator'
    ),
  };

  const mainPaginatorProps = {
    currentPage: canvasIndex + 1,
    pageSize: 1,
    linkKey: 'canvas',
    ...sharedPaginatorProps,
  };

  const thumbsPaginatorProps = {
    currentPage: pageIndex + 1,
    pageSize: pageSize,
    linkKey: 'page',
    ...sharedPaginatorProps,
  };

  useEffect(() => {
    setOrigin(`${window.location.protocol}//${window.location.hostname}`);
  }, []);

  useEffect(() => {
    function receiveMessage(event) {
      const data = event.data;
      const serviceOrigin = tokenService && new URL(tokenService['@id']);
      if (
        serviceOrigin &&
        `${serviceOrigin.protocol}//${serviceOrigin.hostname}` === event.origin
      ) {
        if (data.hasOwnProperty('accessToken')) {
          setShowModal(isTotallyRestricted);
          setShowViewer(!isTotallyRestricted);
        } else {
          setShowModal(true);
          setShowViewer(false);
        }
      }
    }

    if (getNeedsModal(authService)) {
      window.addEventListener('message', receiveMessage);

      return () => window.removeEventListener('message', receiveMessage);
    } else {
      setShowModal(false);
      setShowViewer(true);
    }
  }, []);

  // We only send a langCode if it's unambiguous -- better to send no language
  // than the wrong one.
  const lang = (work.languages.length === 1 && work?.languages[0]?.id) || '';
  return (
    <CataloguePageLayout
      title={title}
      description={''}
      url={{ pathname: `/works/${workId}/items` }}
      openGraphType={'website'}
      jsonLd={{ '@type': 'WebPage' }}
      siteSection={'collections'}
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
      {isNotUndefined(audio) && audio?.sounds?.length > 0 && (
        <Space v={{ size: 'l', properties: ['margin-top', 'margin-bottom'] }}>
          <Layout12>
            <AudioList
              items={audio.sounds}
              thumbnail={audio.thumbnail}
              transcript={audio.transcript}
              workTitle={work.title}
            />
          </Layout12>
        </Space>
      )}
      {video && (
        <Layout12>
          <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
            <video
              controls
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                display: 'block',
                margin: '98px auto auto',
              }}
              controlsList={!showDownloadOptions ? 'nodownload' : undefined}
            >
              <source src={video['@id']} type={video.format} />
              {`Sorry, your browser doesn't support embedded video.`}
            </video>
          </Space>
        </Layout12>
      )}
      {!(isNotUndefined(audio) && audio?.sounds.length > 0) &&
        !video &&
        !pdfRendering &&
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
      {pdfRendering && !mainImageService && (
        <IframePdfViewer
          v={{
            size: 'l',
            properties: ['margin-bottom'],
          }}
          as="iframe"
          title={`PDF: ${title}`}
          src={pdfRendering['@id']}
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
              className={'flex flex-inline'}
              h={{ size: 'm', properties: ['margin-right'] }}
              v={{ size: 'm', properties: ['margin-top'] }}
            >
              <ButtonSolid
                text="Show the content"
                clickHandler={() => {
                  trackEvent({
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
                trackEvent({
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
            title={title}
            mainPaginatorProps={mainPaginatorProps}
            thumbsPaginatorProps={thumbsPaginatorProps}
            currentCanvas={currentCanvas}
            lang={lang}
            canvasOcr={canvasOcr}
            canvases={canvases}
            workId={workId}
            pageIndex={pageIndex}
            pageSize={pageSize}
            canvasIndex={canvasIndex}
            manifestIndex={manifestIndex}
            iiifImageLocation={iiifImageLocation}
            work={work}
            manifest={manifest}
            handleImageError={() => {
              // If the image fails to load, we check to see if it's because the cookie is missing/no longer valid
              reloadAuthIframe(document, iframeId);
            }}
          />
        )}
    </CataloguePageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);
    const {
      workId,
      page = 1,
      pageSize = 4,
      canvas = 1,
      manifest: manifestParam = 1,
    } = fromQuery(context.query);

    if (!looksLikeCanonicalId(workId)) {
      return { notFound: true };
    }

    const pageview = {
      name: 'item',
      properties: {},
    };

    const pageIndex = page - 1;
    // Canvas and manifest params should be 0 indexed as they reference elements in an array
    // We've chosen not to do this for some reason lost to time, but felt it better to stick
    // to the same buggy implementation than have 2 implementations

    // I imagine a fix for this could be having new parameters `m&c`
    // and then redirecting to those once we have em fixed.
    const canvasIndex = canvas - 1;
    const manifestIndex = manifestParam - 1;

    const work = await getWork({
      id: workId,
      toggles: serverData.toggles,
    });

    if (work.type === 'Error') {
      return appError(context, work.httpStatus, work.description);
    } else if (work.type === 'Redirect') {
      return {
        redirect: {
          destination: work.redirectToId,
          permanent: work.status === 301,
        },
      };
    }

    // TODO: there is a fair amount of overlap between what we're doing here and
    // what's happening in useIIIFManifestData. We should refactor this to avoid
    // duplication.

    const iiifPresentationUrl = getDigitalLocationOfType(
      work,
      'iiif-presentation'
    )?.url;
    const iiifImageLocation = getDigitalLocationOfType(work, 'iiif-image');

    const manifestOrCollectionPromise =
      iiifPresentationUrl && getIIIFManifest(iiifPresentationUrl);
    const manifestV3Promise =
      iiifPresentationUrl &&
      getIIIFManifest(iiifPresentationUrl.replace('/v2/', '/v3/'));

    const [manifestOrCollection, manifestV3] = await Promise.all([
      manifestOrCollectionPromise as Promise<IIIFManifest>,
      manifestV3Promise as Promise<Manifest>,
    ]).catch(() => []);

    if (manifestOrCollection) {
      // This happens when the main manifest is actually a Collection (manifest of manifest).
      // see: https://wellcomelibrary.org/iiif/collection/b21293302
      // from: https://wellcomecollection.org/works/f6qp7m32/items
      const isCollectionManifest =
        manifestOrCollection['@type'] === 'sc:Collection';

      const manifest = isCollectionManifest
        ? await fetchJson(
            manifestOrCollection.manifests[manifestIndex || 0]['@id']
          )
        : manifestOrCollection;

      const video = getVideo(manifest);
      const audio = manifestV3 && getAudioV3(manifestV3);

      const canvases =
        manifest.sequences && manifest.sequences[0].canvases
          ? manifest.sequences[0].canvases
          : [];

      const currentCanvas = canvases?.[canvasIndex];
      const canvasOcr = currentCanvas
        ? await getCanvasOcr(currentCanvas)
        : undefined;

      return {
        props: {
          manifest,
          manifestIndex,
          pageSize,
          pageIndex,
          canvasIndex,
          canvasOcr,
          work,
          canvases,
          currentCanvas,
          video,
          audio,
          iiifImageLocation,
          pageview,
          serverData,
        },
      };
    }

    if (iiifImageLocation) {
      return {
        props: {
          pageSize,
          pageIndex,
          canvasIndex,
          work,
          canvases: [],
          iiifImageLocation,
          pageview,
          serverData,
        },
      };
    }

    return {
      notFound: true,
    };
  };

export default ItemPage;
