import { SVGProps, FunctionComponent } from 'react';
type Props = SVGProps<SVGSVGElement>;

const SvgClear: FunctionComponent<Props> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g className="icon__shape" fillRule="nonzero">
      <path d="M19.07 4.93a9.85 9.85 0 0 0-7-2.89 10 10 0 0 0-7.15 17 9.85 9.85 0 0 0 7 2.89 10 10 0 0 0 7.15-17zM17.6 17.6a8 8 0 0 1-5.68 2.4 7.84 7.84 0 0 1-5.58-2.31A8 8 0 0 1 12.08 4a7.84 7.84 0 0 1 5.58 2.31 8 8 0 0 1-.06 11.29z" />
      <path d="M15.48 8.41a1 1 0 0 0-1.41 0l-2.12 2.12-2.13-2.12a1 1 0 0 0-1.41 1.41l2.12 2.12-2.12 2.13a1 1 0 1 0 1.41 1.41l2.12-2.12 2.12 2.12a1 1 0 1 0 1.41-1.41l-2.12-2.12 2.12-2.12a1 1 0 0 0 .01-1.42z" />
    </g>
  </svg>
);

export default SvgClear;
