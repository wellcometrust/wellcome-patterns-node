import { ReactElement } from 'react';
import styled from 'styled-components';
import { font } from '@weco/common/utils/classnames';
import Space from '@weco/common/views/components/styled/Space';
import { NavLink, links } from '@weco/common/views/components/Header/Header';
import { prismicPageIds } from '@weco/common/data/hardcoded-ids';

const NavList = styled.ul<{ isInline: boolean | undefined }>`
  list-style-type: none;
  display: inline-block;
  padding: 0;
  margin: 0;

  li:first-child a {
    padding-top: 0;
  }

  ${props =>
    props.isInline &&
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
        margin-right: 2.5rem;

        &:last-child {
          margin-right: 0;
        }
      }
  `}
`;

const NavLinkElement = styled(Space).attrs({
  className: font('intr', 5),
  v: {
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
  {
    href: 'https://wellcome.org/who-we-are/privacy-and-terms',
    title: 'Privacy',
  },
  {
    href: 'https://wellcome.org/who-we-are/privacy-and-terms',
    title: 'Cookies',
  },
  { href: '/press', title: 'Media office' },
  {
    href: 'https://developers.wellcomecollection.org',
    title: 'Developers',
  },
];

const FooterNav = ({
  items,
  isInline,
}: {
  items: 'InternalNavigation' | 'PoliciesNavigation';
  isInline?: boolean;
}): ReactElement => {
  const itemsList =
    items === 'PoliciesNavigation' ? PoliciesNavigation : InternalNavigation;

  return (
    <NavList
      role="navigation"
      aria-label="Footer navigation"
      isInline={isInline}
    >
      {itemsList.map((link, i) => (
        <li key={link.title}>
          <NavLinkElement id={`footer-nav-${i}`} as="a" href={link.href}>
            {link.title}
          </NavLinkElement>
        </li>
      ))}
    </NavList>
  );
};

export default FooterNav;
