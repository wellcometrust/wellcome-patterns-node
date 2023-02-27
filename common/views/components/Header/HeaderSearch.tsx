import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { classNames } from '@weco/common/utils/classnames';
import SearchBar from '@weco/common/views/components/SearchBar/SearchBar';
import Space from '@weco/common/views/components/styled/Space';
import { getQueryPropertyValue, linkResolver } from '@weco/common/utils/search';
import { formDataAsUrlQuery } from '@weco/common/utils/forms';

const Overlay = styled.div.attrs<{ isActive: boolean }>(props => ({
  className: classNames({
    'is-hidden': !props.isActive,
  }),
}))<{ isActive: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
`;

const SearchBarWrapper = styled(Space).attrs({
  v: { size: 'xl', properties: ['padding-bottom'] },
})`
  position: absolute;
  width: 100%;
  ${props => props.theme.makeSpacePropertyValues('l', ['padding-top'])};
  background-color: ${props => props.theme.color('white')};
`;

type Props = {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
};

const HeaderSearch = ({ isActive, setIsActive }: Props) => {
  const router = useRouter();
  const routerQuery = getQueryPropertyValue(router?.query?.query);
  const [inputValue, setInputValue] = useState(routerQuery || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => setIsActive(false);

  useEffect(() => {
    setIsActive(false);
    setInputValue('');
  }, [router?.pathname, router?.query]);

  useEffect(() => {
    if (isActive) {
      inputRef?.current?.focus();

      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }
  }, [isActive]);

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setIsActive(false);
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  const updateUrl = (form: HTMLFormElement) => {
    const formValues = formDataAsUrlQuery(form);
    const link = linkResolver({ params: formValues, pathname: '/search' });

    return router.push(link.href, link.as);
  };

  return (
    <Overlay isActive={isActive}>
      <SearchBarWrapper onClick={e => e.stopPropagation()}>
        <form
          className="container"
          id="global-search-form"
          onSubmit={event => {
            event.preventDefault();
            updateUrl(event.currentTarget);
          }}
        >
          <SearchBar
            inputValue={inputValue}
            setInputValue={setInputValue}
            form="global-search-form"
            placeholder="Search our stories, images and catalogue"
            inputRef={inputRef}
            location="header"
          />
        </form>
      </SearchBarWrapper>
    </Overlay>
  );
};

export default HeaderSearch;
