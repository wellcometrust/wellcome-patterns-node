// @flow
import { type Context } from 'next';
import { Fragment, useEffect, useState, useContext } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  type CatalogueApiError,
  type CatalogueResultsList,
} from '@weco/common/model/catalogue';
import { font, grid, classNames } from '@weco/common/utils/classnames';
import convertUrlToString from '@weco/common/utils/convert-url-to-string';
import CataloguePageLayout from '@weco/common/views/components/CataloguePageLayout/CataloguePageLayout';
import InfoBanner from '@weco/common/views/components/InfoBanner/InfoBanner';
import Paginator from '@weco/common/views/components/Paginator/Paginator';
import ErrorPage from '@weco/common/views/components/ErrorPage/ErrorPage';
import Layout12 from '@weco/common/views/components/Layout12/Layout12';
import { worksUrl } from '@weco/common/services/catalogue/urls';
import TogglesContext from '@weco/common/views/components/TogglesContext/TogglesContext';
import BetaBar from '@weco/common/views/components/BetaBar/BetaBar';
import TabNav from '@weco/common/views/components/TabNav/TabNav';
import CatalogueSearchContext from '@weco/common/views/components/CatalogueSearchContext/CatalogueSearchContext';
import {
  trackSearch,
  SearchEventNames,
} from '@weco/common/views/components/Tracker/Tracker';
import RelevanceRater from '@weco/common/views/components/RelevanceRater/RelevanceRater';
import MessageBar from '@weco/common/views/components/MessageBar/MessageBar';
import StaticWorksContent from '../components/StaticWorksContent/StaticWorksContent';
import SearchForm from '../components/SearchForm/SearchForm';
import { getWorks } from '../services/catalogue/works';
import WorkCard from '../components/WorkCard/WorkCard';
import Space from '@weco/common/views/components/styled/Space';
import { formatDateForApi } from '@weco/common/utils/dates';
import { capitalize } from '@weco/common/utils/grammar';
import styled from 'styled-components';

const ProtoTag = styled.div`
  font-size: 0.5em;
  display: inline-block;
  padding: 0.5em 1em;
  border: 1px solid #333;
  background: ${props => (props.isActive ? '#333' : '#fff')};
  color: ${props => (props.isActive ? '#fff' : '#333')};
  border-radius: 3px;
  transition: all 200ms ease;
  margin-right: 4px;
  margin-top: 4px;

  &:hover {
    background: #333;
    color: #fff;
  }
`;

type Props = {|
  query: ?string,
  works: ?CatalogueResultsList | CatalogueApiError,
  page: ?number,
  workType: ?(string[]),
  _isFilteringBySubcategory?: ?string,
|};

const WorksSearchProvider = ({ works, query, page, workType }: Props) => (
  <Works works={works} query={query} page={page} workType={workType} />
);

const Works = ({ works }: Props) => {
  const [isFilteringBySubcategory, setIsFilteringBySubcategory] = useState(
    false
  );
  const [loading, setLoading] = useState(false);
  const { query, page, workType, _queryType, _dateFrom, _dateTo } = useContext(
    CatalogueSearchContext
  );
  const trackEvent = () => {
    if (query && query !== '') {
      const event = {
        event: SearchEventNames.Search,
        data: {
          query,
          page,
          workType,
          _queryType,
        },
      };
      trackSearch(event);
    }
  };

  useEffect(() => {
    setIsFilteringBySubcategory(
      Boolean(Router.query._isFilteringBySubcategory)
    );
  }, []);
  // We have to have this for the initial page load, and have it on the router
  // change as the page doesnt actually re-render when the URL parameters change.
  useEffect(() => {
    trackEvent();
  }, []);

  useEffect(() => {
    function routeChangeStart(url: string) {
      setLoading(true);
    }
    function routeChangeComplete(url: string) {
      setLoading(false);
      trackEvent();
    }
    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeComplete);

    return () => {
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeComplete);
    };
  }, []);

  if (works && works.type === 'Error') {
    return (
      <ErrorPage
        title={
          works.httpStatus === 500
            ? `We're experiencing technical difficulties at the moment. We're working to get this fixed.`
            : undefined
        }
        statusCode={works.httpStatus}
      />
    );
  }

  const workTypes = [
    {
      title: 'texts',
      materialTypes: [
        { title: 'books', letter: 'a' },
        { title: 'e-books', letter: 'v' },
        { title: 'manuscripts, asian', letter: 'b' },
        { title: 'e-manuscripts, asian', letter: 'x' },
        { title: 'journals', letter: 'd' },
        { title: 'e-journals', letter: 'j' },
        { title: 'student dissertations', letter: 'w' },
        { title: 'music', letter: 'c' },
      ],
    },
    {
      title: 'visuals',
      materialTypes: [
        { title: 'pictures', letter: 'k' },
        { title: 'digital images', letter: 'q' },
        { title: 'maps', letter: 'e' },
        { title: 'ephemera', letter: 'l' },
      ],
    },
    {
      title: 'media',
      materialTypes: [
        { title: 'e-videos', letter: 'f' },
        { title: 'e-sound', letter: 's' },
        { title: 'videorecording', letter: 'g' },
        { title: 'sound', letter: 'i' },
        { title: 'cinefilm', letter: 'n' },
      ],
    },
    {
      title: 'objects',
      materialTypes: [
        { title: '3D objects', letter: 'r' },
        { title: 'mixed materials', letter: 'p' },
        { title: 'CD-ROMs', letter: 'm' },
      ],
    },
  ];

  function subcategoriesForWorkType(title) {
    const category = workTypes.find(wt => wt.title === title);

    return category && category.materialTypes;
  }

  function doArraysOverlap(arr1, arr2) {
    return arr1.some(t => arr2.includes(t));
  }

  function titleForWorkTypes(workTypesArray) {
    const category = workTypes.find(wt => {
      const wtLetters = wt.materialTypes.map(a => a.letter);

      return doArraysOverlap(wtLetters, workTypesArray);
    });

    return category && category.title;
  }

  function updateWorkTypes(workType, subcategory, isFiltering) {
    const activeWorkType = workTypes.find(
      t => t.title === titleForWorkTypes(workType)
    );

    if (isFiltering) {
      // If you're filtering and about to remove the last filter,
      // we give you all the results for the category
      if (workType.length === 1 && workType.includes(subcategory.letter)) {
        console.log(2, subcategory.title);
        return activeWorkType.materialTypes.map(t => t.letter);
      }
      // Otherwise add/remove items to the array
      console.log(3);
      return workType.includes(subcategory.letter)
        ? workType.filter(t => t !== subcategory.letter)
        : workType.concat(subcategory.letter);
    }

    console.log(4);
    // Not yet filtering, just add the single subcategory
    return [subcategory.letter];
  }

  return (
    <Fragment>
      <Head>
        {works && works.prevPage && (
          <link
            rel="prev"
            href={convertUrlToString(
              worksUrl({ query, page: (page || 1) - 1 }).as
            )}
          />
        )}
        {works && works.nextPage && (
          <link
            rel="next"
            href={convertUrlToString(worksUrl({ query, page: page + 1 }).as)}
          />
        )}
      </Head>

      <CataloguePageLayout
        title={`${query ? `${query} | ` : ''}Catalogue search`}
        description="Search through the Wellcome Collection image catalogue"
        url={worksUrl({ query, page }).as}
        openGraphType={'website'}
        jsonLd={{ '@type': 'WebPage' }}
        siteSection={'works'}
        imageUrl={null}
        imageAltText={null}
      >
        <InfoBanner
          text={[
            {
              type: 'paragraph',
              text: `Coming from Wellcome Images? All freely available images have now been moved to the Wellcome Collection website. Here we're working to improve data quality, search relevance and tools to help you use these images more easily`,
              spans: [],
            },
          ]}
          cookieName="WC_wellcomeImagesRedirect"
        />

        <Layout12>
          <TogglesContext.Consumer>
            {({ useStageApi }) =>
              useStageApi && (
                <MessageBar tagText="Dev alert">
                  You are using the stage catalogue API - data mileage may vary!
                </MessageBar>
              )
            }
          </TogglesContext.Consumer>
          <BetaBar />
        </Layout12>

        <Space
          v={{
            size: 'l',
            properties: ['padding-top', 'padding-bottom'],
          }}
          className={classNames(['row bg-cream'])}
        >
          <div className="container">
            <div className="grid">
              <div className={grid({ s: 12, m: 12, l: 12, xl: 12 })}>
                <Space
                  v={{
                    size: 'm',
                    properties: ['margin-bottom'],
                  }}
                  className={classNames([
                    'flex flex--h-space-between flex--v-center flex--wrap',
                  ])}
                >
                  <>
                    {!works && (
                      <Space
                        as="h1"
                        v={{ size: 'm', properties: ['margin-bottom'] }}
                        className="h1"
                      >
                        Explore our collections
                      </Space>
                    )}
                  </>
                </Space>
              </div>
            </div>

            <div className="grid">
              <div className={grid({ s: 12, m: 10, l: 8, xl: 8 })}>
                <p
                  className={classNames({
                    [font('hnl', 4)]: true,
                    'visually-hidden': Boolean(works),
                  })}
                  id="search-form-description"
                >
                  Find thousands of freely licensed digital books, artworks,
                  photos and images of historical library materials and museum
                  objects.
                </p>

                <SearchForm
                  ariaDescribedBy="search-form-description"
                  compact={false}
                />

                {workType && (
                  <NextLink
                    {...worksUrl({
                      query,
                      workType: null,
                      page: 1,
                      _dateFrom,
                      _dateTo,
                    })}
                  >
                    <a>
                      <ProtoTag isActive>
                        category: {titleForWorkTypes(workType)} &times;
                      </ProtoTag>
                    </a>
                  </NextLink>
                )}

                {works && (
                  <>
                    <TabNav
                      items={[
                        {
                          text: 'Everything',
                          link: worksUrl({
                            query,
                            workType: null,
                            page: 1,
                            _dateFrom,
                            _dateTo,
                          }),
                          selected: !workType,
                        },
                      ].concat(
                        workTypes.map(t => {
                          return {
                            text: capitalize(t.title),
                            link: worksUrl({
                              query,
                              workType: t.materialTypes.map(m => m.letter),
                              page: 1,
                              _dateFrom,
                              _dateTo,
                            }),
                            selected:
                              !!workType &&
                              doArraysOverlap(
                                t.materialTypes.map(m => m.letter),
                                workType
                              ),
                          };
                        })
                      )}
                    />
                    {workType && (
                      <>
                        {subcategoriesForWorkType(
                          titleForWorkTypes(workType)
                        ).map(subcategory => (
                          <NextLink
                            key={subcategory.title}
                            {...worksUrl({
                              query,
                              workType: updateWorkTypes(
                                workType,
                                subcategory,
                                isFilteringBySubcategory
                              ),
                              page: 1,
                              _dateFrom,
                              _dateTo,
                              _isFilteringBySubcategory: 'yo',
                            })}
                          >
                            <a>
                              <ProtoTag
                                isActive={
                                  !isFilteringBySubcategory &&
                                  workType.includes(subcategory.letter)
                                }
                              >
                                {subcategory.title}
                              </ProtoTag>
                            </a>
                          </NextLink>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </Space>

        {!works && <StaticWorksContent />}

        {works && works.results.length > 0 && (
          <Fragment>
            <Space v={{ size: 'l', properties: ['padding-top'] }}>
              <div className="container">
                <div className="grid">
                  <div
                    className={classNames({
                      [grid({ s: 12, m: 10, l: 8, xl: 8 })]: true,
                    })}
                  >
                    <div className="flex flex--h-space-between flex--v-center">
                      <Fragment>
                        <Paginator
                          currentPage={page || 1}
                          pageSize={works.pageSize}
                          totalResults={works.totalResults}
                          link={worksUrl({
                            query,
                            workType,
                            page,
                            _dateFrom,
                            _dateTo,
                          })}
                          onPageChange={async (event, newPage) => {
                            event.preventDefault();
                            const link = worksUrl({
                              query,
                              workType,
                              page: newPage,
                              _dateFrom,
                              _dateTo,
                            });
                            Router.push(link.href, link.as).then(() =>
                              window.scrollTo(0, 0)
                            );
                          }}
                        />
                      </Fragment>
                    </div>
                  </div>
                </div>
              </div>
            </Space>

            <Space
              v={{
                size: 'l',
                properties: ['padding-top'],
              }}
              style={{ opacity: loading ? 0 : 1 }}
            >
              <div className="container">
                <div className="grid">
                  {works.results.map((result, i) => (
                    <div
                      key={result.id}
                      className={classNames({
                        [grid({ s: 12, m: 10, l: 8, xl: 8 })]: true,
                      })}
                    >
                      <div
                        onClick={() => {
                          const event = {
                            event: SearchEventNames.SearchResultSelected,
                            data: {
                              id: result.id,
                              position: i,
                              query,
                              page,
                              workType,
                              _queryType,
                            },
                          };
                          trackSearch(event);
                        }}
                      >
                        <WorkCard work={result} />
                      </div>
                      <TogglesContext.Consumer>
                        {({ relevanceRating }) =>
                          relevanceRating && (
                            <RelevanceRater
                              id={result.id}
                              position={i}
                              query={query}
                              page={page}
                              workType={workType}
                              _queryType={_queryType}
                            />
                          )
                        }
                      </TogglesContext.Consumer>
                    </div>
                  ))}
                </div>
              </div>

              <Space
                v={{
                  size: 'l',
                  properties: ['padding-top', 'padding-bottom'],
                }}
              >
                <div className="container">
                  <div className="grid">
                    <div
                      className={classNames({
                        [grid({ s: 12, m: 10, l: 8, xl: 8 })]: true,
                      })}
                    >
                      <div className="flex flex--h-space-between flex--v-center">
                        <Fragment>
                          <Paginator
                            currentPage={page || 1}
                            pageSize={works.pageSize}
                            totalResults={works.totalResults}
                            link={worksUrl({
                              query,
                              workType,
                              page,
                            })}
                            onPageChange={async (event, newPage) => {
                              event.preventDefault();
                              const link = worksUrl({
                                query,
                                workType,
                                page: newPage,
                              });
                              Router.push(link.href, link.as).then(() =>
                                window.scrollTo(0, 0)
                              );
                            }}
                          />
                        </Fragment>
                      </div>
                    </div>
                  </div>
                </div>
              </Space>
            </Space>
          </Fragment>
        )}

        {works && works.results.length === 0 && (
          <Space
            v={{ size: 'xl', properties: ['padding-top', 'padding-bottom'] }}
          >
            <div className="container">
              <div className="grid">
                <div className={grid({ s: 12, m: 10, l: 8, xl: 8 })}>
                  <p className={font('hnl', 2)}>
                    We couldn{`'`}t find anything that matched{' '}
                    <span
                      className={classNames({
                        [font('hnm', 2)]: true,
                      })}
                      style={{ fontWeight: '400' }}
                    >
                      {query}
                    </span>
                    {workType && (
                      <>
                        {' '}
                        in{' '}
                        <span className={font('hnm', 2)}>
                          {titleForWorkTypes(workType)}
                        </span>
                      </>
                    )}
                    {(_dateFrom || _dateTo) && (
                      <> within the date range provided</>
                    )}
                    . Please try again.
                  </p>
                </div>
              </div>
            </div>
          </Space>
        )}
      </CataloguePageLayout>
    </Fragment>
  );
};

WorksSearchProvider.getInitialProps = async (ctx: Context): Promise<Props> => {
  const query = ctx.query.query;
  const _dateFrom = formatDateForApi(ctx.query._dateFrom);
  const _dateTo = formatDateForApi(ctx.query._dateTo);
  const page = ctx.query.page ? parseInt(ctx.query.page, 10) : 1;

  const {
    useStageApi,
    searchCandidateQueryMsm,
    searchCandidateQueryBoost,
    searchCandidateQueryMsmBoost,
    showDatesPrototype,
    showDatesSliderPrototype,
    unfilteredSearchResults,
  } = ctx.query.toggles;
  const toggledQueryType = searchCandidateQueryMsm
    ? 'msm'
    : searchCandidateQueryBoost
    ? 'boost'
    : searchCandidateQueryMsmBoost
    ? 'msmboost'
    : null;
  const workTypeQuery = ctx.query.workType;
  const _queryType = ctx.query._queryType || toggledQueryType;
  const defaultWorkType = unfilteredSearchResults
    ? []
    : ['a', 'k', 'q', 'v', 'f', 's'];
  const workTypeFilter = workTypeQuery
    ? workTypeQuery.split(',').filter(Boolean)
    : defaultWorkType;

  const filters = {
    workType: workTypeFilter,
    'items.locations.locationType': unfilteredSearchResults
      ? []
      : ['iiif-image', 'iiif-presentation'],
    _queryType,
    ...(_dateFrom ? { _dateFrom } : {}),
    ...(_dateTo ? { _dateTo } : {}),
  };

  const isDatesPrototype = showDatesPrototype || showDatesSliderPrototype;
  const shouldGetWorks = isDatesPrototype
    ? filters._dateTo || filters._dateFrom || (query && query !== '')
    : query && query !== '';

  const worksOrError = shouldGetWorks
    ? await getWorks({
        query,
        page,
        filters,
        env: useStageApi ? 'stage' : 'prod',
      })
    : null;

  return {
    works: worksOrError,
    query,
    page,
    workType: workTypeQuery && workTypeQuery.split(',').filter(Boolean),
  };
};

export default WorksSearchProvider;
