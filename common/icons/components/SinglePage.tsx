import { SVGProps, FunctionComponent } from 'react';
type Props = SVGProps<SVGSVGElement>;

const SvgSinglePage: FunctionComponent<Props> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <rect className="icon__shape" x={8.7} y={7.3} width={6.7} height={2} />
    <rect className="icon__shape" x={8.7} y={10.7} width={6.7} height={2} />
    <rect className="icon__shape" x={8.7} y={14} width={6.7} height={2} />
    <path
      className="icon__shape"
      d="M15.7,3.3H8.3c-1.7,0-3,1.3-3,3v11.3c0,1.7,1.3,3,3,3h7.3c1.7,0,3-1.3,3-3V6.3C18.7,4.7,17.3,3.3,15.7,3.3z M16.7,17.7     c0,0.6-0.4,1-1,1H8.3c-0.6,0-1-0.4-1-1V6.3c0-0.6,0.4-1,1-1h7.3c0.6,0,1,0.4,1,1V17.7z"
    />
  </svg>
);

export default SvgSinglePage;
