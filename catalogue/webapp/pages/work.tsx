import { GetServerSideProps, NextPage } from 'next';
import { Work as WorkType } from '@weco/common/model/catalogue';
import {
  appError,
  AppErrorProps,
  WithPageview,
} from '@weco/common/views/pages/_app';
import { getServerData } from '@weco/common/server-data';
import Work from '../components/Work/Work';
import { getWork } from '../services/catalogue/works';
import { looksLikeCanonicalId } from 'services/catalogue';

type Props = {
  workResponse: WorkType;
} & WithPageview;

export const WorkPage: NextPage<Props> = ({ workResponse }) => {
  // TODO: remove the <Work> component and move the JSX in here.
  // It was abstracted as we did error handling in the page, and it made it a little clearer.
  return <Work work={workResponse} />;
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);
    const { id } = context.query;

    if (!looksLikeCanonicalId(id)) {
      return { notFound: true };
    }

    const workResponse = await getWork({
      id,
      toggles: serverData.toggles,
    });

    if (workResponse.type === 'Redirect') {
      return {
        redirect: {
          destination: `/works/${workResponse.redirectToId}`,
          permanent: workResponse.status === 301,
        },
      };
    }

    if (workResponse.type === 'Error') {
      if (workResponse.httpStatus === 404) {
        return { notFound: true };
      }
      return appError(
        context,
        workResponse.httpStatus,
        workResponse.description
      );
    }

    return {
      props: {
        workResponse,
        serverData,
        pageview: {
          name: 'work',
          // we shouldn't overload this
          // these metrics allow us to report back on breadth of collection accessed
          properties: {
            workType: workResponse.workType.id,
            identifiers: workResponse.identifiers.map(id => id.value),
            identifierTypes: workResponse.identifiers.map(
              id => id.identifierType.id
            ),
          },
        },
      },
    };
  };

export default WorkPage;
