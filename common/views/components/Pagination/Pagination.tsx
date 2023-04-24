import { useEffect, useState, FunctionComponent, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { AppContext } from '@weco/common/views/components/AppContext/AppContext';
import { chevron } from '@weco/common/icons';
import Icon from '@weco/common/views/components/Icon/Icon';
import { font } from '@weco/common/utils/classnames';
import { formatNumber } from '@weco/common/utils/grammar';

export type Props = {
  totalPages: number;
  ariaLabel: string;
  hasDarkBg?: boolean;
  isHiddenMobile?: boolean;
  isLoading?: boolean;
};

const Container = styled.nav.attrs({ className: font('intr', 6) })<{
  isHiddenMobile?: boolean;
}>`
  display: flex;
  align-items: center;

  // We're removing the top pagination on mobile to avoid the controls getting too crowded.
  ${props =>
    props.theme.media(
      'medium',
      'max-width'
    )(`
    ${props.isHiddenMobile && 'display: none;'}; 
  `)}
`;

const ChevronWrapper = styled.button<{ prev?: boolean; hasDarkBg?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  width: 34px;
  border-radius: 100%;
  margin: 0 0 0 1rem;
  cursor: pointer;
  transition: background ${props => props.theme.transitionProperties};
  background-color: transparent;

  // This is required to make the icon be the right size on iOS.  If this class
  // has 'position: relative', then iOS will give it an incorrect height and
  // it will appear super small.  Illegible!
  .icon {
    position: absolute;
  }

  &[disabled] {
    pointer-events: none;
    color: ${props =>
      props.theme.color(props.hasDarkBg ? 'neutral.300' : 'neutral.500')};
    border-color: ${props =>
      props.theme.color(props.hasDarkBg ? 'neutral.300' : 'neutral.500')};
  }

  ${props => props.prev && `margin: 0 1rem 0 0;`}

  ${props => `
    color: ${props.theme.color(props.hasDarkBg ? 'white' : 'black')};
    border: 1px solid ${props.theme.color(
      props.hasDarkBg ? 'neutral.400' : 'neutral.600'
    )};
    transform: rotate(${props.prev ? '90' : '270'}deg);

    &:hover, &:focus {
      background-color: ${props.theme.color(
        props.hasDarkBg ? 'neutral.600' : 'neutral.300'
      )};
    }
  `}
`;

const PageSelectorInput = styled.input<{ darkBg?: boolean }>`
  height: 36px;
  width: 36px;
  max-width: 50px;
  background: none;
  color: ${({ darkBg, theme }) => theme.color(darkBg ? 'white' : 'black')};
  border: ${({ darkBg, theme }) =>
      theme.color(darkBg ? 'neutral.300' : 'neutral.600')}
    1px solid;
  border-radius: 5px;
  text-align: center;
  margin: 0 10px;
`;

export const Pagination: FunctionComponent<Props> = ({
  totalPages,
  ariaLabel,
  hasDarkBg,
  isHiddenMobile,
  isLoading,
}) => {
  const router = useRouter();
  const { query, pathname } = router;

  const pageNumber = query.page ? Number(query.page) : 1;
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const { isEnhanced } = useContext(AppContext);

  useEffect(() => {
    // Only push changes if the page number is a different one than on currently
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);

      // Remove page from query if it's the first page
      // Using router.replace won't add this URL change to the browser history
      if (pageNumber === 1) {
        const { page, ...rest } = query;
        router.replace(
          { pathname: router.pathname, query: { ...rest } },
          undefined,
          { shallow: true }
        );
      }
    }
  }, [query.page]);

  const showPrev = pageNumber > 1;
  const showNext = pageNumber < totalPages;

  return (
    <Container
      {...(!isHiddenMobile && { 'data-testid': 'pagination' })} // This ensures that we only target the version of component that is also visible on mobile
      aria-label={ariaLabel}
      isHiddenMobile={isHiddenMobile}
    >
      {showPrev && (
        <Link
          passHref
          href={{ pathname, query: { ...query, page: currentPage - 1 } }}
          legacyBehavior
        >
          <ChevronWrapper hasDarkBg={hasDarkBg} prev disabled={isLoading}>
            <Icon icon={chevron} />
            <span className="visually-hidden">
              {`Previous (page ${currentPage - 1})`}
            </span>
          </ChevronWrapper>
        </Link>
      )}

      {isEnhanced && isHiddenMobile ? (
        <>
          <span aria-hidden>Showing page</span>
          <span id="searchInputLabel" className="visually-hidden">
            {`Showing page ${currentPage} / ${formatNumber(totalPages)}`}
          </span>
          <PageSelectorInput
            name="page"
            form="search-page-form"
            aria-labelledby="searchInputLabel"
            value={currentPage}
            onChange={e => setCurrentPage(Number(e.target.value))}
            darkBg={hasDarkBg}
          />
          <span aria-hidden>/ {formatNumber(totalPages)}</span>
        </>
      ) : (
        <span>
          Page <strong>{currentPage}</strong> of {formatNumber(totalPages)}
        </span>
      )}

      {showNext && (
        <Link
          passHref
          href={{ pathname, query: { ...query, page: currentPage + 1 } }}
          legacyBehavior
        >
          <ChevronWrapper hasDarkBg={hasDarkBg} disabled={isLoading}>
            <Icon icon={chevron} />
            <span className="visually-hidden">
              {`Next (page ${currentPage + 1})`}
            </span>
          </ChevronWrapper>
        </Link>
      )}
    </Container>
  );
};

export default Pagination;
