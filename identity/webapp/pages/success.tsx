import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

import { getServerData } from '@weco/common/server-data';
import { SimplifiedServerData } from '@weco/common/server-data/types';
import { AppErrorProps } from '@weco/common/services/app';
import { serialiseProps } from '@weco/common/utils/json';
import {
  ContaineredLayout,
  gridSize10,
  gridSize8,
} from '@weco/common/views/components/Layout';
import Space from '@weco/common/views/components/styled/Space';
import { ApplicationReceived } from '@weco/identity/copy';
import {
  Container,
  Wrapper,
} from '@weco/identity/src/frontend/components/Layout.style';
import { PageWrapper } from '@weco/identity/src/frontend/components/PageWrapper';
import { usePageTitle } from '@weco/identity/src/frontend/hooks/usePageTitle';

type Props = {
  serverData: SimplifiedServerData;
  email: string;
};

export const getServerSideProps: GetServerSideProps<
  Props | AppErrorProps
> = async (context: GetServerSidePropsContext) => {
  const serverData = await getServerData(context);

  const { email } = context.query;

  return {
    props: serialiseProps({
      serverData,
      email: email as string,
    }),
  };
};

const SuccessPage: NextPage<Props> = ({ email }) => {
  usePageTitle('Application received');

  return (
    <PageWrapper title="Registration">
      <ContaineredLayout gridSizes={gridSize10()}>
        <Space $v={{ size: 'xl', properties: ['margin-top'] }}>
          <Container>
            <Wrapper>
              <ContaineredLayout gridSizes={gridSize8()}>
                <Space $v={{ size: 'xl', properties: ['padding-top'] }}>
                  <ApplicationReceived email={email} />
                </Space>
              </ContaineredLayout>
            </Wrapper>
          </Container>
        </Space>
      </ContaineredLayout>
    </PageWrapper>
  );
};

export default SuccessPage;
