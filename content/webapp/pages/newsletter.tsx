import { FC } from 'react';
import NewsletterSignup from '../components/NewsletterSignup/NewsletterSignup';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import PageHeader from '@weco/common/views/components/PageHeader/PageHeader';
import { grid } from '@weco/common/utils/classnames';
import Space from '@weco/common/views/components/styled/Space';
import { GetServerSideProps } from 'next';
import { AppErrorProps } from '@weco/common/views/pages/_app';
import { getServerData } from '@weco/common/server-data';
import { newsletterDescription } from '@weco/common/data/microcopy';
import { landingHeaderBackgroundLs } from '@weco/common/utils/backgrounds';

type Props = {
  result?: string;
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);
    const { result } = context.query;

    return {
      props: {
        result: result ? result.toString() : undefined,
        serverData,
      },
    };
  };

const Newsletter: FC<Props> = ({ result }) => {
  return (
    <PageLayout
      title={'Sign up to our newsletter'}
      description={newsletterDescription}
      hideNewsletterPromo={true}
      url={{ pathname: `/newsletter` }}
      jsonLd={{ '@type': 'WebPage' }}
      openGraphType={'website'}
      siteSection={'what-we-do'}
      image={{
        contentUrl:
          'https://iiif.wellcomecollection.org/image/V0019283.jpg/full/800,/0/default.jpg',
        width: 800,
        height: 662,
        alt: '',
      }}
    >
      <PageHeader
        breadcrumbs={{ items: [] }}
        labels={undefined}
        title={'Newsletters'}
        ContentTypeInfo={undefined}
        Background={undefined}
        backgroundTexture={landingHeaderBackgroundLs}
        FeaturedMedia={undefined}
        HeroPicture={undefined}
        highlightHeading={true}
      />

      <Space v={{ size: 'xl', properties: ['margin-top'] }}>
        <Space
          v={{
            size: 'xl',
            properties: ['padding-bottom'],
          }}
          className={`row`}
        >
          <div className="container">
            <div className="grid">
              <div
                className={grid({
                  s: 12,
                  m: 10,
                  shiftM: 1,
                  l: 8,
                  shiftL: 2,
                  xl: 8,
                  shiftXL: 2,
                })}
              >
                <NewsletterSignup
                  isSuccess={result === 'success'}
                  isError={result === 'error'}
                  isConfirmed={result === 'confirmed'}
                />
              </div>
            </div>
          </div>
        </Space>
      </Space>
    </PageLayout>
  );
};

export default Newsletter;
