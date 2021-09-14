import { SVGProps, FunctionComponent } from 'react';
type Props = SVGProps<SVGSVGElement>;

const SvgMessage: FunctionComponent<Props> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g className="icon__shape" fillRule="nonzero">
      <path d="M5.47 6.71h13v1.63h-13V6.71zm0 6.5h13v1.63h-13v-1.63zm0-3.25h13v1.63h-13V9.96z" />
      <path d="M19.47 3.34h-15a3.16 3.16 0 0 0-3 3v9a3.16 3.16 0 0 0 3 3v3a1 1 0 0 0 1.7.66l3.71-3.71h9.59a3.16 3.16 0 0 0 3-3v-9a3.16 3.16 0 0 0-3-2.95zm1 12a1.17 1.17 0 0 1-1 1h-10a1 1 0 0 0-.71.29l-2.29 2.3v-1.59a1 1 0 0 0-1-1h-1a1.17 1.17 0 0 1-1-1v-9a1.17 1.17 0 0 1 1-1h15c.52.071.929.48 1 1v9z" />
    </g>
  </svg>
);

export default SvgMessage;
