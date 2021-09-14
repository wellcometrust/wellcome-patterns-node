import { SVGProps, FunctionComponent } from 'react';
type Props = SVGProps<SVGSVGElement>;

const SvgClosedCaptioning: FunctionComponent<Props> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g className="icon__shape" fillRule="nonzero">
      <path d="M20 2.18H4.1a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4H20a4 4 0 0 0 4-4v-12a4 4 0 0 0-4-4zm2 16a2 2 0 0 1-2 2H4.1a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2H20a2 2 0 0 1 2 2v12z" />
      <path d="M8.2 15.78c-1.47 0-2.42-1-2.42-3.42s.94-3.44 2.42-3.44a2.75 2.75 0 0 1 2.08.93l1.13-1.28A4.38 4.38 0 0 0 8.2 7.21c-2.88 0-4.25 2.16-4.25 5.14 0 2.98 1.38 5.13 4.25 5.13a4.16 4.16 0 0 0 3.31-1.58l-1.21-1.09a2.63 2.63 0 0 1-2.1.97zm8.37 0c-1.47 0-2.42-1-2.42-3.42s.94-3.44 2.42-3.44a2.75 2.75 0 0 1 2.08.93l1.13-1.28a4.38 4.38 0 0 0-3.21-1.35c-2.88 0-4.25 2.16-4.25 5.14 0 2.98 1.38 5.13 4.25 5.13a4.16 4.16 0 0 0 3.31-1.58l-1.22-1.09a2.63 2.63 0 0 1-2.09.96z" />
    </g>
  </svg>
);

export default SvgClosedCaptioning;
