import { SVGProps, FunctionComponent } from 'react';
type Props = SVGProps<SVGSVGElement>;

const SvgCcNd: FunctionComponent<Props> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      className="icon__shape"
      fillRule="nonzero"
      d="M8.2 9.5H16v1.9H8.2V9.5zm0 3.5H16v1.9H8.2V13z"
    />
    <path
      className="icon__shape"
      fillRule="nonzero"
      d="M19.6 4.4c-2-2.1-4.8-3.2-7.7-3.1-2.9-.1-5.6 1-7.6 3.1-1 1-1.8 2.2-2.4 3.6a10.6 10.6 0 0 0 0 8.2c.5 1.3 1.3 2.5 2.4 3.5 1 1 2.2 1.8 3.5 2.3 1.3.5 2.7.8 4.1.8 2.9 0 5.7-1.1 7.7-3.2 2-2 3.1-4.7 3.1-7.6 0-2.8-1.1-5.6-3.1-7.6zM5.7 18.2C4 16.6 3.1 14.3 3.1 12c0-2.3.9-4.6 2.6-6.2 1.6-1.7 3.9-2.6 6.2-2.6h.9c2 .2 3.9 1.1 5.3 2.5.8.8 1.5 1.8 1.9 2.8.4 1.1.7 2.2.7 3.4.1 2.3-.9 4.6-2.5 6.2-.8.8-1.8 1.5-2.9 2-1.1.4-2.2.7-3.3.7-1.1 0-2.3-.2-3.4-.7-.4-.2-.9-.4-1.2-.7-.7-.3-1.2-.7-1.7-1.2z"
    />
  </svg>
);

export default SvgCcNd;
