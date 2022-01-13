import { HTMLString } from '../../../services/prismic/types';
import { HTMLSerializer, RichText, RichTextBlock } from 'prismic-reactjs';
import linkResolver from '../../../services/prismic/link-resolver';
import { ReactElement } from 'react';

type Props = {
  html: HTMLString;
  htmlSerializer?: HTMLSerializer<ReactElement | undefined>;
};

const PrismicHtmlBlock = ({ html, htmlSerializer }: Props) => (
  <RichText
    render={html as RichTextBlock[]}
    htmlSerializer={htmlSerializer}
    linkResolver={linkResolver}
  />
);

export default PrismicHtmlBlock;
