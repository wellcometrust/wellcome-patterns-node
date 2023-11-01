import Pagination, {
  Props,
} from '@weco/content/components/Pagination/Pagination';

const Template = (args: Props) => (
  <Pagination totalPages={args.totalPages} ariaLabel="Cardigan pagination" />
);

export const middleOfPagination = Template.bind({});
middleOfPagination.args = {
  totalPages: 10,
};
middleOfPagination.storyName = 'Midway through pagination';
middleOfPagination.parameters = {
  nextRouter: {
    query: {
      page: '5',
    },
  },
};

export const startOfPagination = Template.bind({});
startOfPagination.args = {
  totalPages: 10,
};
startOfPagination.storyName = 'Start of pagination';
