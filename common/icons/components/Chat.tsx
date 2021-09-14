import { SVGProps, FunctionComponent } from 'react';
type Props = SVGProps<SVGSVGElement>;

const SvgChat: FunctionComponent<Props> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g className="icon__shape" fillRule="nonzero">
      <path d="M15.9 6.38h-10c-1.72 0-3 1.85-3 3.5v5.5a3 3 0 0 0 3 3h1.5v3a1 1 0 0 0 .63.93 1 1 0 0 0 1.1-.24l3.55-3.72h3.22a3 3 0 0 0 3-3v-5.5c0-1.59-1.31-3.47-3-3.47zm1 9a1 1 0 0 1-1 1h-3.65a1 1 0 0 0-.73.3L9.4 18.91v-1.5a1 1 0 0 0-1-1 1 1 0 0 0-.2 0H5.9a1 1 0 0 1-1-1v-5.5c0-.66.56-1.5 1-1.5h10c.4 0 1 .79 1 1.5v5.47z" />
      <path d="M19.9 2.38h-10a2.87 2.87 0 0 0-2.37 1.46 1 1 0 0 0 1.68 1.08 1 1 0 0 1 .69-.54h10c.4 0 1 .79 1 1.5v5.5a1 1 0 0 1-.5.87 1 1 0 1 0 1 1.73 3 3 0 0 0 1.5-2.6v-5.5c0-1.62-1.31-3.5-3-3.5z" />
    </g>
  </svg>
);

export default SvgChat;
