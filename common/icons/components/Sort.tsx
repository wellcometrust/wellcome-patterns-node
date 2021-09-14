import { SVGProps, FunctionComponent } from 'react';
type Props = SVGProps<SVGSVGElement>;

const SvgSort: FunctionComponent<Props> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g className="icon__shape" fillRule="nonzero">
      <path d="M4 19.22a1 1 0 0 1-1-1v-12a3 3 0 0 1 3-3h7.5a1 1 0 0 1 0 2H6a1 1 0 0 0-1 1v12a1 1 0 0 1-1 1z" />
      <path d="M4 21.18a1 1 0 0 1-.8-.4l-3-4a1 1 0 0 1 1.6-1.2L4 18.51l2.2-2.93a1 1 0 1 1 1.6 1.2l-3 4a1 1 0 0 1-.8.4zm13.94 0H10.5a1 1 0 0 1 0-2h7.43a1 1 0 0 0 1-1v-12a1 1 0 0 1 2 0v12a3 3 0 0 1-2.99 3z" />
      <path d="M22.94 9.22a1 1 0 0 1-.8-.4l-2.2-2.93-2.2 2.93a1 1 0 1 1-1.6-1.2l3-4a1 1 0 0 1 1.6 0l3 4a1 1 0 0 1-.8 1.6zM6.97 7.46h7.3v2h-7.3v-2zm0 4h10.3v2H6.97v-2zm3 4h7.3v2h-7.3v-2z" />
    </g>
  </svg>
);

export default SvgSort;
