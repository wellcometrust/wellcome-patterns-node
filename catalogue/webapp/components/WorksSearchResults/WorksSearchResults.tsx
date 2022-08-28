import { FunctionComponent } from 'react';
import styled from 'styled-components';
import WorksSearchResult from '../WorksSearchResult/WorksSearchResult';
import { Work } from '@weco/common/model/catalogue';
import { CatalogueResultsList } from '../../model/catalogue';

type Props = {
  works: CatalogueResultsList<Work>;
};

const SearchResultUnorderedList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
`;

const SearchResultListItem = styled.li`
  flex-basis: 100%;
  max-width: 100%;
`;

const WorkSearchResults: FunctionComponent<Props> = ({ works }: Props) => {
  return (
    <SearchResultUnorderedList>
      {works.results.map((result, i) => (
        <SearchResultListItem key={result.id}>
          <WorksSearchResult work={result} resultPosition={i} />
        </SearchResultListItem>
      ))}
    </SearchResultUnorderedList>
  );
};

export default WorkSearchResults;
