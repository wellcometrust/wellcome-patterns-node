import BackToResults from '@weco/content/components/BackToResults/BackToResults';
import Readme from '@weco/content/components/BackToResults/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';
import SearchContext from '@weco/common/views/components/SearchContext/SearchContext';

const nextLink = {
  href: {
    pathname: '/search/works',
    query: {
      query: 'sun',
      page: 2,
    },
  },
  as: {
    pathname: '/search/works',
    query: {
      query: 'sun',
      page: 2,
    },
  },
};

const WrappedBackToResults = () => (
  <SearchContext.Provider
    value={{
      link: nextLink,
      setLink: () => {
        /* */
      },
    }}
  >
    <BackToResults />
  </SearchContext.Provider>
);

const Template = args => (
  <ReadmeDecorator
    WrappedComponent={WrappedBackToResults}
    args={args}
    Readme={Readme}
  />
);
export const basic = Template.bind({});

basic.storyName = 'BackToResults';
