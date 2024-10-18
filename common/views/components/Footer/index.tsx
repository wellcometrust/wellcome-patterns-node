import { FunctionComponent, useRef } from 'react';
import styled from 'styled-components';

import { prismicPageIds } from '@weco/common/data/hardcoded-ids';
import { Venue } from '@weco/common/model/opening-hours';
import { font } from '@weco/common/utils/classnames';
import Divider from '@weco/common/views/components/Divider/Divider';
import FindUs from '@weco/common/views/components/FindUs/FindUs';
import OpeningTimes from '@weco/common/views/components/OpeningTimes/OpeningTimes';
import { Container } from '@weco/common/views/components/styled/Container';
import Space from '@weco/common/views/components/styled/Space';

import FooterNav from './Footer.Nav';
import FooterSocial from './Footer.Social';
import FooterWellcomeLogo from './Footer.WellcomeLogo';

type Props = {
  venues: Venue[];
};

// Styles
const Wrapper = styled(Space).attrs({
  as: 'footer',
  className: `${font('intr', 5)} is-hidden-print`,
  $v: { size: 'xl', properties: ['padding-top'] },
})`
  position: relative;
  background-color: ${props => props.theme.color('black')};
  color: ${props => props.theme.color('white')};
`;

const FooterBasicSection = styled(Space).attrs({
  $v: { size: 'l', properties: ['padding-bottom'] },
})``;

/** ************************ */
// START OF FOOTER BODY STYLES
/** ************************ */

const FooterNavigationContainer = styled(FooterBasicSection)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FindUsContainer = styled(Space).attrs({
  $v: { size: 'l', properties: ['padding-bottom'] },
})`
  flex: 1 1 100%;

  ${props => props.theme.media('medium')`
      flex: 1 1 50%;
      `}

  ${props => props.theme.media('large')`
      flex: 1 1 20%;
      margin-right: 2rem;
    `}
`;

const OpeningTimesContainer = styled(FooterBasicSection)`
  flex: 1 1 100%;

  ${props => props.theme.media('medium')`
    flex: 1 1 50%;
    `}

  ${props => props.theme.media('large')`
    flex: 1 1 30%;
    margin-right: 2rem;
  `}
`;

const InternalNavigationContainer = styled(FooterBasicSection)`
  flex: 1 1 50%;

  ${props => props.theme.media('medium')`
    flex: 1 1 30%;
`}
`;

const FullWidthDivider = styled(Space).attrs({
  className: 'is-hidden-s is-hidden-m',
})`
  flex: 1 1 100%;
`;

const PoliciesContainer = styled(Space)`
  flex: 1 1 50%;

  ${props => props.theme.media('medium')`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex: 1 1 30%;
  `}

  ${props => props.theme.media('large')`
    margin-top: 1rem;
    `}
`;

const SocialsContainer = styled(Space)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-self: flex-start;
  flex: 1 1 100%;
  margin: 1rem 0;

  ${props => props.theme.media('medium')`
    flex: 0 1 auto;
    margin: 0;
    `}

  ${props => props.theme.media('large')`
    flex: 0 1 100%;
    justify-content: flex-end;
    margin-top: 1rem;
    `}

  ${props => props.theme.media('xlarge')`
    flex: 0 1 auto;
    justify-content: space-between;
    `}
`;
/** ********************** */
// END OF FOOTER BODY STYLES
/** ********************** */

const FooterBottom = styled(Space).attrs({
  $v: { size: 'xl', properties: ['padding-bottom'] },
})`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FooterLicense = styled.p.attrs({ className: font('intr', 6) })`
  display: inline;
  margin: 0 1rem 1rem 0;
`;

const BackToTopButton = styled.button.attrs({
  className: 'is-hidden-s',
})`
  text-decoration: underline;
  color: ${props => props.theme.color('white')};
  padding: 0;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    text-decoration: none;
  }
`;

// Component
const Footer: FunctionComponent<Props> = ({ venues }: Props) => {
  const footer = useRef<HTMLDivElement>(null);

  const hasVenuesInfo = Array.isArray(venues) && venues.length > 0;

  return (
    <Wrapper ref={footer}>
      <Container>
        <FooterBasicSection as="h3">
          <FooterWellcomeLogo />
        </FooterBasicSection>

        <FooterNavigationContainer>
          <FindUsContainer>
            <FindUs />
          </FindUsContainer>

          <OpeningTimesContainer>
            {/* Error pages do not receive serverData so should only display
            openingtimes link */}
            {hasVenuesInfo && (
              <>
                <h4 className={font('intb', 5)}>Today&rsquo;s opening times</h4>
                <OpeningTimes venues={venues} />
              </>
            )}
            <Space
              as="p"
              $v={{
                size: 'm',
                properties: [hasVenuesInfo ? 'margin-top' : 'margin-bottom'],
              }}
            >
              <a href={`/${prismicPageIds.openingTimes}`}>Opening times</a>
            </Space>
          </OpeningTimesContainer>

          <InternalNavigationContainer>
            <FooterNav
              type="InternalNavigation"
              ariaLabel="Useful internal links"
            />
          </InternalNavigationContainer>

          <FullWidthDivider>
            <Divider lineColor="neutral.700" />
          </FullWidthDivider>

          <PoliciesContainer>
            <FooterNav
              isInline
              type="PoliciesNavigation"
              ariaLabel="Policies navigation"
            />
          </PoliciesContainer>

          <SocialsContainer>
            <FooterSocial />
          </SocialsContainer>
        </FooterNavigationContainer>

        <FooterBottom>
          <FooterLicense>
            Except where otherwise noted, content on this site is licensed under
            a{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/">
              Creative Commons Attribution 4.0 International Licence
            </a>
          </FooterLicense>

          <BackToTopButton
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          >
            Back to top
          </BackToTopButton>
        </FooterBottom>
      </Container>
    </Wrapper>
  );
};

export default Footer;
