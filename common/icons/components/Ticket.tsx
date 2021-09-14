import { SVGProps, FunctionComponent } from 'react';
type Props = SVGProps<SVGSVGElement>;

const SvgTicket: FunctionComponent<Props> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g className="icon__shape" fillRule="nonzero">
      <path d="M23.69 10.4l-2.6-2.6a1 1 0 0 0-1-.25A2.81 2.81 0 0 1 16.6 4a1 1 0 0 0-.25-1L13.75.4a1 1 0 0 0-1.41 0L.5 12.29a1 1 0 0 0 0 1.41l2.6 2.6a1 1 0 0 0 1 .25 2.81 2.81 0 0 1 3.51 3.51 1 1 0 0 0 .25 1l2.6 2.6a1 1 0 0 0 1.41 0l11.82-11.85a1 1 0 0 0 0-1.41zm-5.13 3.71l-.11-.11A1.011 1.011 0 0 0 17 15.41l.12.12-6 6L9.65 20a4.8 4.8 0 0 0-5.52-5.5L2.62 13l6-6 .12.12a1 1 0 0 0 1.41-1.42L10 5.58l3-3 1.5 1.5a4.8 4.8 0 0 0 5.52 5.52l1.5 1.5-2.96 3.01z" />
      <path d="M12.3 7.85a1 1 0 0 0-1.41 1.41l.53.53a1 1 0 1 0 1.41-1.41l-.53-.53zm3.22 3.22a1 1 0 0 0-1.41 1.41l.53.53a1 1 0 0 0 1.41-1.41l-.53-.53z" />
    </g>
  </svg>
);

export default SvgTicket;
