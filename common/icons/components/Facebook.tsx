import { SVGProps, FunctionComponent } from 'react';
type Props = SVGProps<SVGSVGElement>;

const SvgFacebook: FunctionComponent<Props> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      className="icon__shape"
      fillRule="nonzero"
      d="M17.7 12.67h-3.64v9.74h-3.71v-9.74H7.77V9.16h2.58v-3c0-2.35 1.52-4.52 5-4.52a21.31 21.31 0 0 1 2.47.14l-.08 3.28h-2.21c-1.26 0-1.47.58-1.47 1.55v2.56h3.81l-.17 3.5z"
    />
  </svg>
);

export default SvgFacebook;
