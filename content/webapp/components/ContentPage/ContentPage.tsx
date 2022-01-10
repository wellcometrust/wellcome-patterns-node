import styled from 'styled-components';
import {
  Children,
  Fragment,
  createContext,
  ReactNode,
  ReactElement,
} from 'react';
import { PrismicDocument } from '@prismicio/types';
import {
  prismicPageIds,
  sectionLevelPages,
} from '@weco/common/services/prismic/hardcoded-id';
import { classNames } from '@weco/common/utils/classnames';
import { Season } from '@weco/common/model/seasons';
import { ElementFromComponent } from '@weco/common/utils/utility-types';
import { MultiContent } from '@weco/common/model/multi-content';
import Layout8 from '@weco/common/views/components/Layout8/Layout8';
import Layout12 from '@weco/common/views/components/Layout12/Layout12';
import PageHeader, {
  headerSpaceSize,
} from '@weco/common/views/components/PageHeader/PageHeader';
import SpacingSection from '@weco/common/views/components/SpacingSection/SpacingSection';
import SpacingComponent from '@weco/common/views/components/SpacingComponent/SpacingComponent';
import CompactCard from '@weco/common/views/components/CompactCard/CompactCard';
import Image from '@weco/common/views/components/Image/Image';
import Space from '@weco/common/views/components/styled/Space';
import { WeAreGoodToGo } from '@weco/common/views/components/CovidIcons/CovidIcons';
import BannerCard from '@weco/common/views/components/BannerCard/BannerCard';
import Contributors from '../Contributors/Contributors';
import { WithContributors } from '../../services/prismic/types';
import Outro from '../Outro/Outro';

export const PageBackgroundContext = createContext<'cream' | 'white'>('white');

type Props = {
  id: string;
  isCreamy?: boolean;
  Header: ElementFromComponent<typeof PageHeader>;
  Body?: ReactElement<{ body: { type: string }[] }>;
  // This is used for content type specific components e.g. InfoBox
  children?: ReactNode;
  RelatedContent?: ReactNode[];
  outroProps?: {
    researchLinkText?: string;
    researchItem?: MultiContent;
    readLinkText?: string;
    readItem?: MultiContent;
    visitLinkText?: string;
    visitItem?: MultiContent;
  };
  seasons?: Season[];
  document: PrismicDocument<WithContributors>;
  hideContributors?: true;
};

const ShameBorder = styled(Space).attrs({
  v: { size: 'l', properties: ['margin-top'] },
})`
  border-bottom: 1px solid ${props => props.theme.color('pumice')};
`;
// FIXME: obviously we can't carry on like this!
const ShameWhatWeDoHack = () => (
  <Layout8>
    <ShameBorder />
    <CompactCard
      url="/user-panel"
      title="Join our user panel"
      primaryLabels={[]}
      secondaryLabels={[]}
      description="Get involved in shaping better website and gallery experiences for everyone. We’re looking for people to take part in online and in-person interviews, usability tests, surveys and more."
      Image={
        <Image
          contentUrl={`https://images.prismic.io/wellcomecollection/65334f9d-50d0-433f-a4ac-a780eef352e3_user_research_square.jpg?auto=compress,format`}
          width={3200}
          height={3200}
          alt={''}
        />
      }
      xOfY={{ x: 1, y: 1 }}
    />
  </Layout8>
);

const ContentPage = ({
  id,
  isCreamy = false,
  Header,
  Body,
  children,
  RelatedContent = [],
  outroProps,
  seasons = [],
  document,
  hideContributors,
}: Props): ReactElement => {
  // We don't want to add a spacing unit if there's nothing to render
  // in the body (we don't render the 'standfirst' here anymore).
  function shouldRenderBody() {
    if (!Body) return false;

    if (
      Body.props.body.length === 1 &&
      Body.props.body[0].type === 'standfirst'
    )
      return false;
    if (Body.props.body.length > 0) return true;
  }

  return (
    <PageBackgroundContext.Provider value={isCreamy ? 'cream' : 'white'}>
      <article data-wio-id={id}>
        {sectionLevelPages.includes(id) ? (
          Header
        ) : (
          // This space is coupled to the `bottom` value in PageHeader.js
          <Space v={{ size: headerSpaceSize, properties: ['padding-bottom'] }}>
            {Header}
          </Space>
        )}
        <div
          className={classNames({
            'bg-cream': isCreamy,
          })}
        >
          {shouldRenderBody() && (
            <SpacingSection>
              <div className="basic-page">
                <Fragment>{Body}</Fragment>
                {id === prismicPageIds.whatWeDo && <ShameWhatWeDoHack />}
              </div>
            </SpacingSection>
          )}

          {children && (
            <SpacingSection>
              {Children.map(children, child => (
                <Fragment>
                  {child && (
                    <SpacingComponent>
                      <Layout8>{child}</Layout8>
                    </SpacingComponent>
                  )}
                </Fragment>
              ))}
            </SpacingSection>
          )}

          {!hideContributors &&
            document.data.contributors &&
            document.data.contributors.length > 0 && (
              <SpacingSection>
                <Layout8>
                  <Contributors document={document} />
                </Layout8>
              </SpacingSection>
            )}

          {RelatedContent.length > 0 && (
            <SpacingSection>
              {Children.map(RelatedContent, child => (
                <Fragment>{child}</Fragment>
              ))}
            </SpacingSection>
          )}

          {outroProps && (
            <SpacingSection>
              <Layout8>
                <Outro {...outroProps} />
              </Layout8>
            </SpacingSection>
          )}

          {id === prismicPageIds.covidWelcomeBack && (
            <Layout8>
              <div style={{ width: '100px' }}>
                <WeAreGoodToGo />
              </div>
            </Layout8>
          )}

          {seasons.length > 0 &&
            seasons.map(season => (
              <SpacingSection key={season.id}>
                <Layout12>
                  <BannerCard item={season} />
                </Layout12>
              </SpacingSection>
            ))}
        </div>
      </article>
    </PageBackgroundContext.Provider>
  );
};

export default ContentPage;
