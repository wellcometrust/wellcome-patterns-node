import { GetServerSideProps, NextPage } from 'next';
import { PageWrapper } from '../src/frontend/components/PageWrapper';
import { SolidButton } from '@weco/common/views/components/ButtonSolid/ButtonSolid';
import CustomError from '../src/frontend/components/CustomError';
import { Container, Wrapper } from '../src/frontend/components/Layout.style';
import Layout10 from '@weco/common/views/components/Layout10/Layout10';
import Space from '@weco/common/views/components/styled/Space';
import { getServerData } from '@weco/common/server-data';
import { AppErrorProps } from '@weco/common/views/pages/_app';
import { SimplifiedServerData } from '@weco/common/server-data/types';
import { themeValues } from '@weco/common/views/themes/config';

const ErrorPage: NextPage<Props> = ({ errorDescription }) => {
  return (
    <PageWrapper title={`Error`}>
      <Layout10>
        <Space v={{ size: 'xl', properties: ['margin-top'] }}>
          <Container>
            <Wrapper>
              <CustomError errorDescription={errorDescription}>
                <SolidButton
                  colors={themeValues.buttonColors.greenTransparentGreen}
                >
                  <a
                    href="mailto:library@wellcomecollection.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact us
                  </a>
                </SolidButton>
              </CustomError>
            </Wrapper>
          </Container>
        </Space>
      </Layout10>
    </PageWrapper>
  );
};

type Props = {
  serverData: SimplifiedServerData;
  errorDescription: string;
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);
    const { query } = context;
    const errorDescription = Array.isArray(query.error_description)
      ? query.error_description[0]
      : query.error_description;

    return {
      props: {
        serverData,
        errorDescription,
      },
    };
  };
export default ErrorPage;
