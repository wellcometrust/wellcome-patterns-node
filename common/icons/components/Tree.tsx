import { SVGProps, FunctionComponent } from 'react';
type Props = SVGProps<SVGSVGElement>;

const SvgTree: FunctionComponent<Props> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      className="icon__shape"
      fillRule="nonzero"
      d="M21 18.58V15.3a3 3 0 0 0-3-3h-5v-2.14a4 4 0 1 0-2 0v2.14H6a3 3 0 0 0-3 3v3.28a2 2 0 1 0 2 0V15.3a1 1 0 0 1 1-1h5v4.28a2 2 0 1 0 2 0V14.3h5a1 1 0 0 1 1 1v3.28a2 2 0 1 0 2 0zM10 6.3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
    />
  </svg>
);

export default SvgTree;
