import { Work } from '@weco/common/model/catalogue';
import { classNames, font } from '@weco/common/utils/classnames';
import {
  getDownloadOptionsFromImageUrl,
  getDigitalLocationOfType,
} from '../utils/works';
import { getCatalogueLicenseData } from '@weco/common/utils/licenses';
import {
  getDownloadOptionsFromManifest,
  getIIIFPresentationCredit,
  getUiExtensions,
  isUiEnabled,
} from '../utils/iiif';
import { IIIFManifest } from '../model/iiif';
import { getWork } from '../services/catalogue/works';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import Layout8 from '@weco/common/views/components/Layout8/Layout8';
import Download, {
  getCreditString,
} from '@weco/catalogue/components/Download/Download';
import SpacingComponent from '@weco/common/views/components/SpacingComponent/SpacingComponent';
import SpacingSection from '@weco/common/views/components/SpacingSection/SpacingSection';
import Space from '@weco/common/views/components/styled/Space';
import WorkDetailsText from '../components/WorkDetailsText/WorkDetailsText';
import { GetServerSideProps, NextPage } from 'next';
import { appError, AppErrorProps } from '@weco/common/views/pages/_app';
import { getServerData } from '@weco/common/server-data';
import { looksLikeCanonicalId } from 'services/catalogue';
import { looksLikeSierraId } from '@weco/common/services/catalogue/sierra';

type Props = {
  workId: string;
  sierraId: string;
  manifest?: IIIFManifest;
  work?: Work;
};

const DownloadPage: NextPage<Props> = ({
  workId,
  sierraId,
  manifest,
  work,
}) => {
  const title = (manifest && manifest.label) || (work && work.title) || '';
  const iiifImageLocation = work
    ? getDigitalLocationOfType(work, 'iiif-image')
    : null;
  const iiifPresentationLocation = work
    ? getDigitalLocationOfType(work, 'iiif-presentation')
    : null;
  const digitalLocation = iiifImageLocation || iiifPresentationLocation;
  const license =
    digitalLocation?.license &&
    getCatalogueLicenseData(digitalLocation.license);

  const iiifImageLocationUrl =
    iiifImageLocation &&
    iiifImageLocation.type === 'DigitalLocation' &&
    iiifImageLocation.url;
  const iiifImageDownloadOptions = iiifImageLocationUrl
    ? getDownloadOptionsFromImageUrl({
        url: iiifImageLocationUrl,
        width: undefined,
        height: undefined,
      })
    : [];
  const iiifPresentationDownloadOptions = manifest
    ? getDownloadOptionsFromManifest(manifest)
    : [];

  const downloadOptions = [
    ...iiifImageDownloadOptions,
    ...iiifPresentationDownloadOptions,
  ];

  const credit =
    (iiifImageLocation && iiifImageLocation.credit) ||
    (manifest && getIIIFPresentationCredit(manifest));

  const showDownloadOptions = manifest
    ? isUiEnabled(getUiExtensions(manifest), 'mediaDownload')
    : true;

  return (
    <PageLayout
      title={title}
      description={''}
      url={{ pathname: `/works/${workId}/download`, query: { sierraId } }}
      openGraphType={'website'}
      jsonLd={{ '@type': 'WebPage' }}
      siteSection={'collections'}
      hideNewsletterPromo={true}
    >
      <Layout8>
        <SpacingSection>
          <SpacingComponent>
            <Space
              v={{
                size: 'l',
                properties: ['margin-top'],
              }}
              as="h1"
              id="work-info"
              className={classNames({
                [font('intb', 1)]: true,
              })}
            >
              {title}
            </Space>
          </SpacingComponent>
          {work && work.id && (
            <SpacingComponent>
              {showDownloadOptions ? (
                <Download
                  ariaControlsId="itemDownloads"
                  workId={work.id}
                  downloadOptions={downloadOptions}
                />
              ) : (
                <p>There are no downloads available.</p>
              )}
            </SpacingComponent>
          )}
          {license && (
            <SpacingComponent key={license.url}>
              <div>
                {license.humanReadableText.length > 0 && (
                  <WorkDetailsText
                    title="License information"
                    text={license.humanReadableText}
                    allowRawHtml={true}
                  />
                )}
                <WorkDetailsText
                  title="Credit"
                  text={getCreditString(workId, title, credit, license)}
                  allowRawHtml={true}
                />
              </div>
            </SpacingComponent>
          )}
        </SpacingSection>
      </Layout8>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);
    const { workId, sierraId } = context.query;

    if (!looksLikeCanonicalId(workId) || !looksLikeSierraId(sierraId)) {
      return {
        notFound: true,
      };
    }

    const manifestUrl =
      sierraId &&
      `https://iiif.wellcomecollection.org/presentation/v2/${sierraId}`;

    const iiifResponse = manifestUrl && (await fetch(manifestUrl));

    // A user should never end up on a /download page that points to a non-existent
    // IIIF manifest, but we do see a persistent trickle of such requests.
    // Possibly URLs that used to resolve, but have since been removed?
    //
    // In these cases, DLCS returns a 404 and the response text like
    //
    //      No IIIF resource found for v2/b18037343
    //
    // If we don't catch the 404 here, this bubbles up as an internal server error
    // when we try to parse the JSON, with the error
    //
    //      FetchError: invalid json response body at https://iiif.wellcomecollection.org/presentation/v2/b18037343
    //      reason: Unexpected token N in JSON at position 0
    //
    if (iiifResponse && iiifResponse.status === 404) {
      return appError(
        context,
        404,
        `There is no IIIF manifest for ${sierraId}`
      );
    }

    // I don't know what status codes DLCS should return apart from 200 and 404 --
    // this warning is to make debugging easier if we see other issues here.
    if (iiifResponse && iiifResponse.status !== 200) {
      console.warn(
        `Unexpected status when fetching IIIF manifest: ${iiifResponse.status}`
      );
    }

    const manifest = iiifResponse && (await iiifResponse.json());

    const work = await getWork({
      id: workId,
      toggles: serverData.toggles,
    });

    if (work.type === 'Error') {
      return appError(context, work.httpStatus, work.description);
    } else if (work.type === 'Redirect') {
      return {
        redirect: {
          destination: `/works/${work.redirectToId}/download`,
          permanent: work.status === 301,
        },
      };
    }

    return {
      props: {
        workId,
        sierraId,
        manifest,
        work,
      },
    };
  };

export default DownloadPage;
