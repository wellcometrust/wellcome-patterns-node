import BackToResults from '@weco/content/components/BackToResults/BackToResults';
import type { Meta, StoryObj } from '@storybook/react';
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

type Story = StoryObj<typeof BackToResults>;

export const Basic: Story = {
  name: 'BackToResults',
};

const meta: Meta<typeof BackToResults> = {
  component: BackToResults,
  title: 'Components/BackToResults',
  decorators: [
    Story => (
      <SearchContext.Provider
        value={{
          link: nextLink,
          setLink: () => {
            /* */
          },
        }}
      >
        <Story />
      </SearchContext.Provider>
    ),
  ],
};

export default meta;
