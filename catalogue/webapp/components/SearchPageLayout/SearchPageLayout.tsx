import { useRouter } from 'next/router';
import {
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';

import CataloguePageLayout from 'components/CataloguePageLayout/CataloguePageLayout';
import SearchBar from '@weco/common/views/components/SearchBar/SearchBar';
import Space from '@weco/common/views/components/styled/Space';

import { pageDescriptions } from '@weco/common/data/microcopy';
import { formDataAsUrlQuery } from '@weco/common/utils/forms';
import SubNavigation from '@weco/common/views/components/SubNavigation/SubNavigation';
import convertUrlToString from '@weco/common/utils/convert-url-to-string';
import { trackGaEvent } from '@weco/common/utils/ga';
import {
  getUrlQueryFromSortValue,
  getQueryPropertyValue,
  linkResolver,
} from '@weco/common/utils/search';
import { capitalize } from '@weco/common/utils/grammar';
import { ApiToolbarLink } from '@weco/common/views/components/ApiToolbar';

const SearchBarContainer = styled(Space)`
  ${props => props.theme.media('medium', 'max-width')`
    margin-bottom:0;
  `}
`;

type PageLayoutMetadata = {
  openGraphType: 'website';
  siteSection: null;
  jsonLd: { '@type': 'WebPage' };
  hideNewsletterPromo: true;
  excludeRoleMain: true;
  title: string;
  description: string;
  url: {
    pathname: string;
    query: Record<string, string | string[] | undefined>;
  };
  apiToolbarLinks?: ApiToolbarLink[];
};

const SearchLayout: FunctionComponent<
  PropsWithChildren<{ apiToolbarLinks: ApiToolbarLink[] }>
> = ({ children, apiToolbarLinks }) => {
  const router = useRouter();
  const queryString = getQueryPropertyValue(router?.query?.query);
  const [inputValue, setInputValue] = useState(queryString || '');

  const currentSearchCategory =
    router.pathname === '/search'
      ? 'overview'
      : router.pathname.slice(router.pathname.lastIndexOf('/') + 1);

  const basePageMetadata: PageLayoutMetadata = {
    apiToolbarLinks,
    openGraphType: 'website',
    siteSection: null, // We don't want search to display under any menu section
    jsonLd: { '@type': 'WebPage' },
    hideNewsletterPromo: true,
    excludeRoleMain: true,
    title: `${queryString ? `${queryString} | ` : ''}Search`,
    description: pageDescriptions.search.overview,
    url: {
      pathname: '/search',
      query: queryString ? { query: queryString } : {},
    },
  };

  const [pageLayoutMetadata, setPageLayoutMetadata] =
    useState<PageLayoutMetadata>(basePageMetadata);

  const getURL = (pathname: string) => {
    return convertUrlToString({
      pathname,
      query: { query: queryString },
    });
  };

  useEffect(() => {
    const queryStringTitle = queryString ? `${queryString} | ` : '';
    setInputValue(queryString || ''); // This accounts for queries done on these pages, but from the global search

    switch (currentSearchCategory) {
      case 'overview':
        setPageLayoutMetadata({
          ...basePageMetadata,
          title: `${queryStringTitle}Search`,
        });
        break;
      case 'stories':
        setPageLayoutMetadata({
          ...basePageMetadata,
          description: pageDescriptions.search.stories,
          title: `${queryStringTitle}Stories search`,
          url: {
            ...basePageMetadata.url,
            pathname: '/search/stories',
          },
        });
        break;
      case 'images':
        setPageLayoutMetadata({
          ...basePageMetadata,
          description: pageDescriptions.search.images,
          title: `${queryStringTitle}Images search`,
          url: {
            ...basePageMetadata.url,
            pathname: '/search/images',
          },
        });
        break;
      case 'works':
        setPageLayoutMetadata({
          ...basePageMetadata,
          description: pageDescriptions.search.works,
          title: `${queryStringTitle}Catalogue search`,
          url: {
            ...basePageMetadata.url,
            pathname: '/search/works',
          },
        });
        break;

      default:
        break;
    }
  }, [currentSearchCategory, queryString]);

  const searchbarPlaceholderText = {
    overview: 'Search our stories, images and catalogue',
    stories: 'Search for stories',
    images: 'Search for images',
    works: 'Search the catalogue',
  };

  const updateUrl = (form: HTMLFormElement) => {
    const formValues = formDataAsUrlQuery(form);

    const sortOptionValue = getQueryPropertyValue(formValues.sortOrder);
    const urlFormattedSort = sortOptionValue
      ? getUrlQueryFromSortValue(sortOptionValue)
      : undefined;

    let link;
    if (queryString !== inputValue) {
      console.log(
        'should strip all other filter values since the search query itself changed',
        formValues
      );
      link = linkResolver({
        params: {
          query: formValues.query,
        },
        pathname: router.pathname,
      });
    } else {
      link = linkResolver({
        params: {
          ...formValues,
          ...(urlFormattedSort && {
            sort: urlFormattedSort.sort,
            sortOrder: urlFormattedSort.sortOrder,
          }),
        },
        pathname: router.pathname,
      });
    }

    return router.push(link.href, link.as);
  };

  return (
    <CataloguePageLayout {...pageLayoutMetadata}>
      <div className="container">
        <form
          role="search"
          id="search-page-form"
          onSubmit={event => {
            event.preventDefault();

            trackGaEvent({
              category: 'SearchForm',
              action: 'submit search',
              label: router.query.query as string,
            });

            updateUrl(event.currentTarget);
          }}
        >
          <h1 className="visually-hidden">
            {`${capitalize(currentSearchCategory)} search`}
          </h1>

          <SearchBarContainer
            v={{ size: 'l', properties: ['margin-top', 'margin-bottom'] }}
          >
            <SearchBar
              inputValue={inputValue}
              setInputValue={setInputValue}
              placeholder={searchbarPlaceholderText[currentSearchCategory]}
              form="search-page-form"
              location="search"
            />
          </SearchBarContainer>
        </form>
        <SubNavigation
          label="Search Categories"
          items={[
            {
              id: 'overview',
              url: getURL('/search'),
              name: 'All',
            },
            {
              id: 'stories',
              url: getURL('/search/stories'),
              name: 'Stories',
            },
            {
              id: 'images',
              url: getURL('/search/images'),
              name: 'Images',
            },
            {
              id: 'works',
              url: getURL('/search/works'),
              name: 'Catalogue',
            },
          ]}
          currentSection={currentSearchCategory}
          hasDivider
        />
      </div>
      {children}
    </CataloguePageLayout>
  );
};

export const getSearchLayout = (page: ReactElement): JSX.Element => (
  <SearchLayout apiToolbarLinks={page.props.apiToolbarLinks}>
    {page}
  </SearchLayout>
);

export default SearchLayout;
