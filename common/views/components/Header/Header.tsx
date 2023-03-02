import { FunctionComponent, useEffect, useRef, useState } from 'react';
import FocusTrap from 'focus-trap-react';
import NextLink from 'next/link';

import { font } from '@weco/common/utils/classnames';
import WellcomeCollectionBlack from '@weco/common/icons/wellcome_collection_black';
import { search, cross } from '@weco/common/icons';
import Icon from '@weco/common/views/components/Icon/Icon';
import {
  Wrapper,
  GridCell,
  Container,
  Burger,
  BurgerTrigger,
  HeaderBrand,
  HeaderItem,
  HeaderList,
  HeaderLink,
  HeaderActions,
  SearchButton,
  HeaderNav,
  NavLoginWrapper,
} from './Header.styles';
import DesktopSignIn from './DesktopSignIn';
import MobileSignIn from './MobileSignIn';
import HeaderSearch from './HeaderSearch';
import { useToggles } from '@weco/common/server-data/Context';

export type NavLink = {
  href: string;
  title: string;
  siteSection?: string;
};

type Props = {
  siteSection: string | null;
  customNavLinks?: NavLink[];
  isMinimalHeader?: boolean;
};

export const links: NavLink[] = [
  {
    href: '/visit-us',
    title: 'Visit us',
    siteSection: 'visit-us',
  },
  {
    href: '/whats-on',
    title: 'What’s on',
    siteSection: 'whats-on',
  },
  {
    href: '/stories',
    title: 'Stories',
    siteSection: 'stories',
  },
  {
    href: '/collections',
    title: 'Collections',
    siteSection: 'collections',
  },
  {
    href: '/get-involved',
    title: 'Get involved',
    siteSection: 'get-involved',
  },
  {
    href: '/about-us',
    title: 'About us',
    siteSection: 'about-us',
  },
];

export const exhibitionGuidesLinks: NavLink[] = [
  {
    href: '/guides/exhibitions',
    title: 'Exhibition guides',
    siteSection: 'exhibition-guides',
  },
];

const Header: FunctionComponent<Props> = ({
  siteSection,
  customNavLinks,
  // We don't display login and search on certain pages, e.g. exhibition guides
  isMinimalHeader = false,
}) => {
  const [burgerMenuIsActive, setBurgerMenuIsActive] = useState(false);
  const [searchDropdownIsActive, setSearchDropdownIsActive] = useState(false);
  const { globalSearchHeader } = useToggles();
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (document && document.documentElement) {
      if (searchDropdownIsActive || burgerMenuIsActive) {
        document.documentElement.classList.add('is-scroll-locked');
        document.getElementById('global-search-input')?.focus();
      } else {
        document.documentElement.classList.remove('is-scroll-locked');
      }
    }

    return () => {
      document.documentElement.classList.remove('is-scroll-locked');
    };
  }, [searchDropdownIsActive, burgerMenuIsActive]);

  return (
    <FocusTrap
      active={searchDropdownIsActive || burgerMenuIsActive}
      focusTrapOptions={{ preventScroll: true }}
    >
      <div>
        <Wrapper isBurgerOpen={burgerMenuIsActive}>
          <GridCell>
            <Container>
              <Burger>
                <BurgerTrigger
                  burgerMenuisActive={burgerMenuIsActive}
                  href="#footer-nav-1"
                  id="header-burger-trigger"
                  aria-label="menu"
                  onClick={event => {
                    event.preventDefault();
                    setBurgerMenuIsActive(!burgerMenuIsActive);
                  }}
                >
                  <span />
                  <span />
                  <span />
                </BurgerTrigger>
              </Burger>
              <HeaderBrand
                isSearchToggleActive={globalSearchHeader && !isMinimalHeader}
              >
                <a href="/">
                  <WellcomeCollectionBlack />
                </a>
              </HeaderBrand>
              <NavLoginWrapper>
                <HeaderNav
                  burgerMenuisActive={burgerMenuIsActive}
                  id="header-nav"
                  aria-labelledby="header-burger-trigger"
                >
                  <HeaderList className={`${font('wb', 5)} no-margin`}>
                    {(customNavLinks || links).map((link, i) => (
                      <HeaderItem key={i}>
                        <HeaderLink
                          burgerMenuisActive={link.siteSection === siteSection}
                          href={link.href}
                          {...(link.siteSection === siteSection
                            ? { 'aria-current': true }
                            : {})}
                        >
                          {link.title}
                        </HeaderLink>
                      </HeaderItem>
                    ))}
                  </HeaderList>
                  {!isMinimalHeader && <MobileSignIn />}
                </HeaderNav>

                <HeaderActions>
                  {globalSearchHeader && !isMinimalHeader && (
                    <NextLink href="/search" passHref>
                      <SearchButton
                        text={
                          <Icon
                            icon={searchDropdownIsActive ? cross : search}
                          />
                        }
                        aria-label={
                          searchDropdownIsActive
                            ? 'Close search bar'
                            : 'Open search bar'
                        }
                        onClick={event => {
                          event.preventDefault(); // Prevents routing if JS is enabled to use the dropdown instead
                          setSearchDropdownIsActive(
                            currentState => !currentState
                          );
                        }}
                        ref={searchButtonRef}
                      />
                    </NextLink>
                  )}

                  {!isMinimalHeader && <DesktopSignIn />}
                </HeaderActions>
              </NavLoginWrapper>
            </Container>
          </GridCell>
        </Wrapper>
        {!isMinimalHeader && (
          <HeaderSearch
            isActive={searchDropdownIsActive}
            handleCloseModal={() => setSearchDropdownIsActive(false)}
            searchButtonRef={searchButtonRef}
          />
        )}
      </div>
    </FocusTrap>
  );
};

export default Header;
