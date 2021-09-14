import { SVGProps, FunctionComponent } from 'react';
type Props = SVGProps<SVGSVGElement>;

const SvgLink: FunctionComponent<Props> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      className="icon__shape"
      fillRule="nonzero"
      d="M8.12 16.76a2.556 2.556 0 1 1-3.62-3.61L8.75 8.9a2.56 2.56 0 0 1 3.61 3.61 1 1 0 0 0 1.41 1.41 4.56 4.56 0 0 0-6.43-6.44l-4.25 4.25a4.554 4.554 0 0 0 6.44 6.44 1 1 0 0 0-1.41-1.41zM20.84 5.45a4.56 4.56 0 0 0-6.44 0 1 1 0 0 0 1.41 1.41 2.553 2.553 0 0 1 3.61 3.61l-4.25 4.25a2.63 2.63 0 0 1-3.61 0 2.56 2.56 0 0 1 0-3.61 1 1 0 0 0-1.41-1.41 4.554 4.554 0 0 0 6.44 6.44l4.25-4.25a4.56 4.56 0 0 0 0-6.44z"
    />
  </svg>
);

export default SvgLink;
