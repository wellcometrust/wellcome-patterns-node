import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { PageWrapper } from '../src/frontend/components/PageWrapper';
import { Container, Wrapper } from '../src/frontend/components/Layout.style';
import { usePageTitle } from '../src/frontend/hooks/usePageTitle';
import Layout8 from '@weco/common/views/components/Layout8/Layout8';
import Layout10 from '@weco/common/views/components/Layout10/Layout10';
import Space from '@weco/common/views/components/styled/Space';
import { getServerData } from '@weco/common/server-data';
import { AppErrorProps } from '@weco/common/views/pages/_app';
import { SimplifiedServerData } from '@weco/common/server-data/types';
import { ApplicationReceived } from '../copy';

type Props = {
  serverData: SimplifiedServerData;
  email: string;
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async (context: GetServerSidePropsContext) => {
    const serverData = await getServerData(context);

    const { email } = context.query;

    return {
      props: {
        serverData,
        email: email as string,
      },
    };
  };

const SuccessPage: NextPage<Props> = ({ email }) => {
  usePageTitle('Application received');

  return (
    <PageWrapper title={`Registration`}>
      <Layout10>
        <Space v={{ size: 'xl', properties: ['margin-top'] }}>
          <Container>
            <Wrapper>
              <Layout8>
                <Space v={{ size: 'xl', properties: ['padding-top'] }}>
                  <ApplicationReceived email={email} />
                </Space>
              </Layout8>
            </Wrapper>
          </Container>
        </Space>
      </Layout10>
    </PageWrapper>
  );
};

export default SuccessPage;
