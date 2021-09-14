import { SVGProps, FunctionComponent } from 'react';
type Props = SVGProps<SVGSVGElement>;

const SvgRotateRight: FunctionComponent<Props> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      className="icon__shape"
      fillRule="nonzero"
      d="M20.69 12.6a1 1 0 0 0-1.17.8 7.71 7.71 0 1 1-2-6.66h-1.63a1 1 0 0 0 0 2H20a1 1 0 0 0 1-1V3.67a1 1 0 0 0-2 0v1.66a9.6 9.6 0 0 0-7-3 9.69 9.69 0 1 0 9.52 11.45 1 1 0 0 0-.83-1.18z"
    />
  </svg>
);

export default SvgRotateRight;
