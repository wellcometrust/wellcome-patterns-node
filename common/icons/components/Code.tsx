import { SVGProps, FunctionComponent } from 'react';
type Props = SVGProps<SVGSVGElement>;

const SvgCode: FunctionComponent<Props> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      className="icon__shape"
      fillRule="nonzero"
      d="M19.49 9l-2.21-2.19a1 1 0 1 0-1.41 1.41l1.63 1.63-1.63 1.63a1 1 0 1 0 1.41 1.41l2.21-2.21a1 1 0 0 0 .27-.84 1 1 0 0 0-.27-.84zM8.29 6.81a1 1 0 0 0-1.41 0L4.66 9a1 1 0 0 0-.27.84 1 1 0 0 0 .27.84l2.21 2.21a1 1 0 0 0 1.41-1.41L6.65 9.86l1.64-1.63a1 1 0 0 0 0-1.42zM19.68 1H4.45A4.22 4.22 0 0 0 .24 5.19v8.75a4.22 4.22 0 0 0 4.21 4.21h4.24v3H6.52a1 1 0 0 0 0 2h11.09a1 1 0 0 0 0-2h-2.17v-3h4.24a4.22 4.22 0 0 0 4.21-4.21V5.19A4.22 4.22 0 0 0 19.68 1zm-6.24 20.19h-2.75v-3h2.75v3zm8.45-7.24a2.22 2.22 0 0 1-2.21 2.21H4.45a2.22 2.22 0 0 1-2.21-2.21V5.19A2.21 2.21 0 0 1 4.45 3h15.23c1.22 0 2.21.99 2.21 2.21v8.74zm-7.48-9.64a1 1 0 0 0-1.3.56l-3.38 8.5a1 1 0 1 0 1.86.74L15 5.61a1 1 0 0 0-.59-1.3z"
    />
  </svg>
);

export default SvgCode;
