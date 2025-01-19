import { Manifest } from '@iiif/presentation-3';
import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  DigitalLocation,
  isDigitalLocation,
} from '@weco/common/model/catalogue';
import { getServerData } from '@weco/common/server-data';
import { useToggles } from '@weco/common/server-data/Context';
import { appError, AppErrorProps } from '@weco/common/services/app';
import { Pageview } from '@weco/common/services/conversion/track';
import { font } from '@weco/common/utils/classnames';
import { serialiseProps } from '@weco/common/utils/json';
import { isNotUndefined } from '@weco/common/utils/type-guards';
import {
  ApiToolbarLink,
  setTzitzitParams,
} from '@weco/common/views/components/ApiToolbar';
import Button from '@weco/common/views/components/Buttons';
import {
  ContaineredLayout,
  gridSize12,
} from '@weco/common/views/components/Layout';
import Modal from '@weco/common/views/components/Modal/Modal';
import Space from '@weco/common/views/components/styled/Space';
import { useUser } from '@weco/common/views/components/UserProvider/UserProvider';
import CataloguePageLayout from '@weco/content/components/CataloguePageLayout/CataloguePageLayout';
import IIIFItemList from '@weco/content/components/IIIFItemList/IIIFItemList';
import IIIFViewer, {
  queryParamToArrayIndex,
} from '@weco/content/components/IIIFViewer';
import { fromQuery } from '@weco/content/components/ItemLink';
import { ParentManifest } from '@weco/content/components/ItemViewerContext/ItemViewerContext';
import WorkLink from '@weco/content/components/WorkLink';
import useHotjar from '@weco/content/hooks/useHotjar';
import { fetchCanvasOcr } from '@weco/content/services/iiif/fetch/canvasOcr';
import { fetchIIIFPresentationManifest } from '@weco/content/services/iiif/fetch/manifest';
import { transformCanvasOcr } from '@weco/content/services/iiif/transformers/canvasOcr';
import { transformManifest } from '@weco/content/services/iiif/transformers/manifest';
import { SearchResults } from '@weco/content/services/iiif/types/search/v3';
import { looksLikeCanonicalId } from '@weco/content/services/wellcome/catalogue';
import {
  toWorkBasic,
  Work,
  WorkBasic,
} from '@weco/content/services/wellcome/catalogue/types';
import { getWork } from '@weco/content/services/wellcome/catalogue/works';
import {
  CompressedTransformedManifest,
  fromCompressedManifest,
  toCompressedTransformedManifest,
} from '@weco/content/types/compressed-manifest';
import { Auth, TransformedManifest } from '@weco/content/types/manifest';
import { fetchJson } from '@weco/content/utils/http';
import {
  checkModalRequired,
  getAuthServices,
  getCollectionManifests,
  getIframeTokenSrc,
  hasItemType,
  hasOriginalPdf,
} from '@weco/content/utils/iiif/v3';
import { setCacheControl } from '@weco/content/utils/setCacheControl';
import { removeIdiomaticTextTags } from '@weco/content/utils/string';
import { getDigitalLocationOfType } from '@weco/content/utils/works';

const IframeAuthMessage = styled.iframe`
  display: none;
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

function getIsTotallyRestricted({
  auth,
  authV2,
}: {
  auth: Auth | undefined;
  authV2: boolean | undefined;
}) {
  return authV2 ? auth?.v2.isTotallyRestricted : auth?.v1.isTotallyRestricted;
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
  useHotjar(true);
  const { userIsStaffWithRestricted } = useUser();
  const { authV2, extendedViewer } = useToggles();
  const transformedManifest =
    compressedTransformedManifest &&
    fromCompressedManifest(compressedTransformedManifest);

  const workId = work.id;
  const [origin, setOrigin] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const [showViewer, setShowViewer] = useState(true);
  const { title, isAnyImageOpen, canvases, placeholderId, auth } = {
    ...transformedManifest,
  };

  const needsModal = checkModalRequired({
    userIsStaffWithRestricted,
    auth,
    isAnyImageOpen,
    authV2,
  });
  const [accessToken, setAccessToken] = useState();
  const [searchResults, setSearchResults] = useState(serverSearchResults);
  const authServices = getAuthServices({ auth, authV2 });
  const currentCanvas = canvases?.[queryParamToArrayIndex(canvas)];

  const displayTitle =
    title || (work && removeIdiomaticTextTags(work.title)) || '';
  const { imageServiceId = '' } = { ...currentCanvas };
  const mainImageService = imageServiceId && {
    '@id': imageServiceId,
  };

  const hasImage = hasItemType(canvases, 'Image');
  const hasPdf = hasOriginalPdf(canvases);
  const isTotallyRestricted = getIsTotallyRestricted({ auth, authV2 });
  const shouldUseAuthMessageIframe =
    ((authV2 && auth?.v2.tokenService) || (!authV2 && auth?.v1.tokenService)) &&
    origin;
  const tryAndGetRestrictedAuthCookie =
    userIsStaffWithRestricted &&
    authServices?.external?.id ===
      'https://iiif.wellcomecollection.org/auth/v2/access/restrictedlogin';
  // showViewer is true by default, so the noScriptViewer is available without javascript
  // if javascript is available we set it to false and then determine whether the clickthrough modal is required
  // before setting it to true
  useEffect(() => {
    setShowViewer(false);
  }, []);

  // We have iiif manifests that contain both active and external (restricted login) services
  // If this happens we want to show the active service (clickthrough) message and link rather than the external one.
  // This will enable most users to view the images with an active service (those with a restricted service won't display)
  // For staff with a role of 'StaffWithRestricted' they will be able to see both types of image.
  const modalContent = authServices?.active || authServices?.external;

  useEffect(() => {
    setOrigin(`${window.origin}`);
  }, []);

  useEffect(() => {
    if (tryAndGetRestrictedAuthCookie) {
      const authServiceWindow = window.open(
        `${authServices?.external?.id || ''}?origin=${window.origin}`
      );
      authServiceWindow &&
        authServiceWindow.addEventListener('unload', function () {
          reloadAuthIframe(document, iframeId);
        });
    }
  }, [tryAndGetRestrictedAuthCookie]);

  useEffect(() => {
    function receiveMessage(event: MessageEvent) {
      const data = event.data;
      const tokenService = getIframeTokenSrc({
        userIsStaffWithRestricted,
        workId: work.id,
        origin: window.origin,
        auth,
        authV2,
      });
      const service = (tokenService && new URL(tokenService)) as
        | URL
        | undefined;

      // We check this is the event we are interested in
      // N.B. locally react dev tools will create a lot of events
      if (service?.origin === event.origin) {
        if (Object.prototype.hasOwnProperty.call(data, 'accessToken')) {
          setAccessToken(data.accessToken);
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
  }, [needsModal]);

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
      {shouldUseAuthMessageIframe && (
        <IframeAuthMessage
          id={iframeId}
          title="Authentication"
          src={getIframeTokenSrc({
            userIsStaffWithRestricted,
            workId: work.id,
            origin,
            auth,
            authV2,
          })}
        />
      )}

      {/*
      Pdfs that have been added to the iiif manifest using the born digital pattern
      will have a hasImage value of true.
      However, we don't show the viewer for these items,
      so we check for the presence of a pdf in the original property of the canvas.
      If it has one we show the IIIFItemList, unless we are using the extended viewer.
      */}
      {(!hasImage || hasPdf) && showViewer && !extendedViewer && (
        <ContaineredLayout gridSizes={gridSize12()}>
          <Space
            className="body-text"
            $v={{ size: 'xl', properties: ['margin-top', 'margin-bottom'] }}
          >
            <IIIFItemList
              canvases={canvases}
              exclude={['Image']}
              placeholderId={placeholderId}
            />
          </Space>
        </ContaineredLayout>
      )}

      <Modal
        id="auth-modal"
        isActive={showModal}
        setIsActive={setShowModal}
        removeCloseButton={true}
        openButtonRef={{ current: null }}
      >
        <div className={font('intr', 5)}>
          {modalContent?.label && (
            <h2 className={font('intb', 4)}>{modalContent?.label}</h2>
          )}
          {modalContent?.description && (
            <div
              dangerouslySetInnerHTML={{
                __html: modalContent?.description,
              }}
            />
          )}
          {isAnyImageOpen && origin && (
            <Space
              style={{ display: 'inline-flex' }}
              $h={{ size: 'm', properties: ['margin-right'] }}
              $v={{ size: 'm', properties: ['margin-top'] }}
            >
              <Button
                variant="ButtonSolid"
                dataGtmTrigger="show_the_content"
                text="Show the content"
                clickHandler={() => {
                  const authServiceWindow = window.open(
                    `${modalContent?.id || ''}?origin=${origin}`
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
        ((mainImageService && currentCanvas) ||
          iiifImageLocation ||
          extendedViewer) && (
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
            accessToken={accessToken}
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
    (await fetchIIIFPresentationManifest({
      location: iiifPresentationLocation.url,
    }));

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
        ? await fetchIIIFPresentationManifest({
            location: selectedCollectionManifestLocation,
          })
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
