import { SVGProps, FunctionComponent } from 'react';
type Props = SVGProps<SVGSVGElement>;

const SvgEmail: FunctionComponent<Props> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      className="icon__shape"
      fillRule="nonzero"
      d="M21.86 19.64v-9.58A2.85 2.85 0 0 0 19 7.21a.81.81 0 0 0-.15 0V2.36a.85.85 0 0 0-.85-.85H6a.85.85 0 0 0-.85.85v4.89a.81.81 0 0 0-.18 0 2.85 2.85 0 0 0-2.85 2.85v9.85a.83.83 0 0 0 0 .36A2.85 2.85 0 0 0 5 22.49h14a2.85 2.85 0 0 0 2.77-2.21.83.83 0 0 0 .05-.37c.03-.08.04-.17.04-.27zm-6.11-4.42l4.41-3v6.16l-4.41-3.16zM19 8.91c.635 0 1.15.515 1.15 1.15v.08l-1.3.89V8.88a.81.81 0 0 0 .15.03zm-1.84-5.7v9L12 15.72l-5.14-3.64V3.21h10.3zM3.83 12l4.48 3.16-4.48 3.21V12zM5 8.91a.81.81 0 0 0 .18 0v2L3.85 10A1.14 1.14 0 0 1 5 8.91zm14 11.88H5a1.13 1.13 0 0 1-.93-.5l5.73-4.06 1.73 1.22a.85.85 0 0 0 1 0l1.77-1.21 5.68 4a1.13 1.13 0 0 1-.98.55z"
    />
  </svg>
);

export default SvgEmail;
