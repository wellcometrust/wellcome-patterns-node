import { FunctionComponent } from 'react';
import { headerBackgroundLs } from '../../../utils/backgrounds';
import { classNames } from '../../../utils/classnames';
import PageHeader, { headerSpaceSize } from '../PageHeader/PageHeader';
import PageLayout from '../PageLayout/PageLayout';
import MoreLink from '../MoreLink/MoreLink';
import SpacingSection from '../SpacingSection/SpacingSection';
import SpacingComponent from '../SpacingComponent/SpacingComponent';
import Layout8 from '../Layout8/Layout8';
import Space from '../styled/Space';

type Props = {
  statusCode?: number;
  title?: string;
};

const ErrorPage: FunctionComponent<Props> = ({
  statusCode = 500,
  title,
}: Props) => {
  return (
    <PageLayout
      title={`${statusCode}`}
      description={`${statusCode}`}
      url={{ pathname: `/` }}
      jsonLd={{ '@type': 'WebPage' }}
      openGraphType={'website'}
      siteSection={null}
      imageUrl={undefined}
      imageAltText={undefined}
    >
      <Space v={{ size: headerSpaceSize, properties: ['padding-bottom'] }}>
        <PageHeader
          breadcrumbs={{ items: [] }}
          labels={undefined}
          title={
            title ||
            'This isn’t the page you’re looking for, but how about these?'
          }
          ContentTypeInfo={null}
          Background={undefined}
          backgroundTexture={headerBackgroundLs}
          FeaturedMedia={undefined}
          HeroPicture={undefined}
          highlightHeading={true}
        />
        <div
          className={classNames({
            'bg-cream': false,
          })}
        >
          <SpacingSection>
            <SpacingComponent>
              <Layout8>
                <Space
                  className="plain-list no-padding"
                  as="ul"
                  v={{ size: 'l', properties: ['margin-bottom'] }}
                >
                  <Space
                    v={{ size: 'l', properties: ['margin-bottom'] }}
                    as="li"
                  >
                    <MoreLink
                      url="/whats-on"
                      name="Our exhibitions and events"
                    />
                  </Space>
                  <Space
                    v={{ size: 'l', properties: ['margin-bottom'] }}
                    as="li"
                  >
                    <MoreLink url="/collections" name="Our library" />
                  </Space>
                  <Space
                    v={{ size: 'l', properties: ['margin-bottom'] }}
                    as="li"
                  >
                    <MoreLink url="/stories" name="Our stories" />
                  </Space>
                  <Space
                    v={{ size: 'l', properties: ['margin-bottom'] }}
                    as="li"
                  >
                    <MoreLink url="/books" name="Our books" />
                  </Space>
                  <Space
                    v={{ size: 'l', properties: ['margin-bottom'] }}
                    as="li"
                  >
                    <MoreLink url="/images" name="Our images" />
                  </Space>
                  <Space as="li">
                    <MoreLink
                      url="/pages/Wuw2MSIAACtd3Ssg"
                      name="Our youth programme"
                    />
                  </Space>
                </Space>

                <div className="body-text">
                  <h2 className="h2">
                    Looking for something published before 2018?
                  </h2>
                  <p>
                    Our websites have been archived by the{' '}
                    <a href="https://archive.org">Internet Archive</a> in its{' '}
                    <a href="https://web.archive.org/">Wayback Machine</a>.
                  </p>
                  <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
                    <MoreLink
                      url="https://web.archive.org/web/*/wellcomecollection.org"
                      name="See the Wellcome Collection website from 2007-present"
                    />
                  </Space>
                  <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
                    <MoreLink
                      url="https://web.archive.org/web/*/blog.wellcomecollection.org"
                      name="Read blog posts from 2013-2017"
                    />
                  </Space>
                  <p>
                    If you{`'`}re looking for something specific you{`'`}d love
                    to see return to this website, email us at{' '}
                    <a href="mailto:digital@wellcomecollection.org">
                      digital@wellcomecollection.org
                    </a>
                    .
                  </p>
                </div>
              </Layout8>
            </SpacingComponent>
          </SpacingSection>
        </div>
      </Space>
    </PageLayout>
  );
};

export default ErrorPage;
