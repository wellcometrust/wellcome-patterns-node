import { ReactElement } from 'react';
import styled from 'styled-components';
import { font } from '@weco/common/utils/classnames';
import Space from '@weco/common/views/components/styled/Space';
import { NavLink, links } from '@weco/common/views/components/Header/Header';
import { prismicPageIds } from '@weco/common/data/hardcoded-ids';
import Buttons from '../Buttons';
import { useToggles } from '@weco/common/server-data/Context';

const NavList = styled.ul<{ $isInline?: boolean }>`
  list-style-type: none;
  display: inline-block;
  padding: 0;
  margin: 0;

  li:first-child a {
    padding-top: 0;
  }

  ${props =>
    props.$isInline &&
    `
      display: flex;
      flex-direction: column;

      ${props.theme.media('large')(`
        flex-direction: row;

        li:first-child a {
          padding-top: 8px;
        }
      `)}

      li {
        margin-right: 2rem;

        &:last-child {
          margin-right: 0;
        }
      }
  `}
`;

const NavLinkElement = styled(Space).attrs({
  className: font('intr', 5),
  $v: {
    size: 's',
    properties: ['padding-top', 'padding-bottom'],
  },
})`
  display: block;
  transition: color 200ms ease;

  &:hover {
    text-decoration: none;
  }
`;

const InternalNavigation: NavLink[] = [
  ...links,
  {
    href: `/pages/${prismicPageIds.contactUs}`,
    title: 'Contact us',
  },
];

const PoliciesNavigation: NavLink[] = [
  { href: 'https://wellcome.org/jobs', title: 'Jobs' },
  { href: '/press', title: 'Media office' },
  {
    href: 'https://developers.wellcomecollection.org',
    title: 'Developers',
  },
  {
    href: 'https://wellcome.org/who-we-are/privacy-and-terms',
    title: 'Privacy and terms',
  },
  {
    href: 'https://wellcome.org/who-we-are/modern-slavery-statement',
    title: 'Modern slavery statement',
  },
];

const FooterNav = ({
  type,
  ariaLabel,
  isInline,
}: {
  type: 'InternalNavigation' | 'PoliciesNavigation';
  ariaLabel: string;
  isInline?: boolean;
}): ReactElement => {
  const { cookiesWork } = useToggles();

  const itemsList =
    type === 'PoliciesNavigation' ? PoliciesNavigation : InternalNavigation;

  return (
    <nav aria-label={ariaLabel}>
      <NavList aria-label="Footer navigation" $isInline={isInline}>
        {itemsList.map((link, i) => {
          // ID for Javascript-less users who tried to click on the Burger menu and will get redirected here
          const isBurgerMenuLink = type === 'InternalNavigation' && i === 0;

          return (
            <li key={link.title}>
              <NavLinkElement
                as="a"
                href={link.href}
                data-gtm-trigger="footer_nav_link"
                {...(isBurgerMenuLink && { id: 'footer-nav-1' })}
              >
                {link.title}
              </NavLinkElement>
            </li>
          );
        })}
        {/* TODO style this/change the preference centre link to something else, this is a very temporary idea/solution */}
        {cookiesWork && type === 'InternalNavigation' && (
          <li>
            <Buttons
              variant="ButtonSolid"
              dataGtmTrigger="consent_test_btn"
              text="Cookie preference centre"
              clickHandler={() => {
                window.CookieControl.open();
              }}
            />
          </li>
        )}
      </NavList>
    </nav>
  );
};

export default FooterNav;
