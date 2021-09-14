import { SVGProps, FunctionComponent } from 'react';
type Props = SVGProps<SVGSVGElement>;

const SvgPlay: FunctionComponent<Props> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M20,12.8c1.2-0.6,1.2-1.5,0-2L5.3,3.9C4.6,3.4,3.7,3.6,3.3,4.2C3.1,4.5,3,4.9,3.1,5.2v13.1     C3,19.1,3.5,19.8,4.3,20c0.3,0.1,0.7,0,1-0.2L20,12.8z" />
  </svg>
);

export default SvgPlay;
