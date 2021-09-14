import { SVGProps, FunctionComponent } from 'react';
type Props = SVGProps<SVGSVGElement>;

const SvgTumblr: FunctionComponent<Props> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      className="icon__shape"
      fillRule="nonzero"
      d="M15.86 18.6a1.76 1.76 0 0 1-2-2v-5.87h3.81V7.31H13.9V2.26h-3a.15.15 0 0 0-.14.14 6.08 6.08 0 0 1-4 5.37v2.92h2.33v6.19c0 2.24 1.39 5.41 5.84 5.34 1.49 0 3.17-.64 3.52-1.17l-1-2.85a4.07 4.07 0 0 1-1.59.4z"
    />
  </svg>
);

export default SvgTumblr;
