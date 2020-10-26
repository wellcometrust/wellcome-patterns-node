// @flow
import { useState, useEffect, useContext } from 'react';
import { type WorksRouteProps } from '@weco/common/services/catalogue/routes';
import {
  type CatalogueAggregationBucket,
  type CatalogueAggregations,
} from '@weco/common/model/catalogue';
import { defaultWorkTypes } from '@weco/common/services/catalogue/api';
import SearchFiltersDesktop from '@weco/common/views/components/SearchFilters/SearchFiltersDesktop';
import SearchFiltersMobile from '@weco/common/views/components/SearchFilters/SearchFiltersMobile';
// $FlowFixMe (tsx)
import ModalFilters from '@weco/common/views/components/ModalFilters/ModalFilters';
import theme from '@weco/common/views/themes/default';
import TogglesContext from '../TogglesContext/TogglesContext';

type Props = {|
  searchForm: {| current: ?HTMLFormElement |},
  worksRouteProps: WorksRouteProps,
  workTypeAggregations: CatalogueAggregationBucket[],
  aggregations: ?CatalogueAggregations,
  changeHandler: () => void,
|};

export type SearchFiltersSharedProps = {|
  ...Props,
  inputDateFrom: ?string,
  inputDateTo: ?string,
  setInputDateFrom: (value: string) => void,
  setInputDateTo: (value: string) => void,
  workTypeFilters: CatalogueAggregationBucket[],
  productionDatesFrom: ?string,
  productionDatesTo: ?string,
  workTypeInUrlArray: string[],
  locationsTypeInUrlArray: string[],
  imagesColor: ?string,
  aggregations: ?CatalogueAggregations,
|};

const SearchFilters = ({
  searchForm,
  worksRouteProps,
  workTypeAggregations,
  changeHandler,
  aggregations,
}: Props) => {
  const workTypeInUrlArray = worksRouteProps?.workType || [];
  const locationsTypeInUrlArray = worksRouteProps?.itemsLocationsType || [];
  const productionDatesFrom = worksRouteProps?.productionDatesFrom || '';
  const productionDatesTo = worksRouteProps?.productionDatesTo || '';
  const imagesColor = worksRouteProps?.imagesColor;

  const [isMobile, setIsMobile] = useState(false);
  const [inputDateFrom, setInputDateFrom] = useState(productionDatesFrom);
  const [inputDateTo, setInputDateTo] = useState(productionDatesTo);
  const { unfilteredSearchResults, modalFiltersPrototype } = useContext(
    TogglesContext
  );

  const workTypeFilters = unfilteredSearchResults
    ? workTypeAggregations
    : workTypeAggregations.filter(agg =>
        defaultWorkTypes.includes(agg.data.id)
      );

  useEffect(() => {
    function updateIsMobile() {
      setIsMobile(window.innerWidth < theme.sizes.medium);
    }

    window.addEventListener('resize', updateIsMobile);

    updateIsMobile();

    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  useEffect(() => {
    if (productionDatesFrom !== inputDateFrom) {
      setInputDateFrom(productionDatesFrom);
    }

    if (productionDatesTo !== inputDateTo) {
      setInputDateTo(productionDatesTo);
    }
  }, [productionDatesFrom, productionDatesTo]);

  useEffect(() => {
    if (
      productionDatesFrom !== inputDateFrom &&
      (!inputDateFrom || (inputDateFrom && inputDateFrom.match(/^\d{4}$/)))
    ) {
      changeHandler();
    }
  }, [inputDateFrom]);

  useEffect(() => {
    if (
      productionDatesTo !== inputDateTo &&
      (!inputDateTo || (inputDateTo && inputDateTo.match(/^\d{4}$/)))
    ) {
      changeHandler();
    }
  }, [inputDateTo]);

  const sharedProps: SearchFiltersSharedProps = {
    searchForm,
    worksRouteProps,
    workTypeAggregations,
    changeHandler,
    inputDateFrom,
    inputDateTo,
    setInputDateFrom,
    setInputDateTo,
    workTypeFilters,
    productionDatesFrom,
    productionDatesTo,
    workTypeInUrlArray,
    locationsTypeInUrlArray,
    imagesColor,
    aggregations,
  };

  return (
    <>
      {modalFiltersPrototype ? (
        <ModalFilters {...sharedProps} />
      ) : (
        <>
          {isMobile ? (
            <SearchFiltersMobile {...sharedProps} />
          ) : (
            <SearchFiltersDesktop {...sharedProps} />
          )}
        </>
      )}
    </>
  );
};

export default SearchFilters;
