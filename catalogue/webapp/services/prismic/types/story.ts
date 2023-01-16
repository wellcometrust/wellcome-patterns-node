import { ContentType } from './index';
import { RichTextField } from '@prismicio/types';

export type Story = {
  id: string;
  title: Title;
  image: {
    url: string;
    width: number;
    height: number;
  };
  url: string;
  firstPublicationDate: Date;
  contributors: (string | undefined)[];
  type: ContentType[];
  summary: Standfirst;
  label: Label;
};

export type Label = {
  text: string;
};

export type Title = {
  text: {
    text: RichTextField;
  };
};

export type Standfirst = {
  caption: {
    text: string;
  };
};
