import { Meta, StoryObj } from '@storybook/react';
import BooksPageComponent from '@weco/content/pages/books/BooksPageComponent';
import { books } from '../../../data/books.js';

export const Basic: StoryObj<typeof BooksPageComponent> = {
  name: 'Books',
};

const meta: Meta<typeof BooksPageComponent> = {
  component: BooksPageComponent,
  title: 'Templates/Books',
  args: {
    books,
  },
};

export default meta;
