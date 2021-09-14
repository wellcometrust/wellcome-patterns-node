import { SVGProps, FunctionComponent } from 'react';
type Props = SVGProps<SVGSVGElement>;

const SvgGridView: FunctionComponent<Props> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      className="icon__shape"
      fillRule="nonzero"
      d="M8.51 2.91H5.22a2.64 2.64 0 0 0-2.64 2.64v3.29a2.64 2.64 0 0 0 2.64 2.64h3.29a2.65 2.65 0 0 0 2.64-2.64V5.55a2.65 2.65 0 0 0-2.64-2.64zm.64 5.93a.65.65 0 0 1-.64.64H5.22a.65.65 0 0 1-.64-.64V5.55a.65.65 0 0 1 .64-.64h3.29a.65.65 0 0 1 .64.64v3.29zm9.57-5.93h-3.29a2.64 2.64 0 0 0-2.64 2.64v3.29a2.64 2.64 0 0 0 2.64 2.64h3.28a2.65 2.65 0 0 0 2.64-2.64V5.55a2.65 2.65 0 0 0-2.63-2.64zm.64 5.93a.65.65 0 0 1-.64.64h-3.29a.65.65 0 0 1-.64-.64V5.55a.65.65 0 0 1 .64-.64h3.28a.65.65 0 0 1 .64.64l.01 3.29zM8.51 13.12H5.22a2.64 2.64 0 0 0-2.64 2.64V19a2.64 2.64 0 0 0 2.64 2.64h3.29A2.64 2.64 0 0 0 11.15 19v-3.24a2.65 2.65 0 0 0-2.64-2.64zM9.15 19a.65.65 0 0 1-.64.64H5.22a.65.65 0 0 1-.64-.64v-3.24a.65.65 0 0 1 .64-.64h3.29a.65.65 0 0 1 .64.64V19zm9.57-5.88h-3.29a2.64 2.64 0 0 0-2.64 2.64V19a2.64 2.64 0 0 0 2.64 2.64h3.28A2.64 2.64 0 0 0 21.36 19v-3.24a2.65 2.65 0 0 0-2.64-2.64zm.64 5.88a.65.65 0 0 1-.64.64h-3.29a.65.65 0 0 1-.64-.64v-3.24a.65.65 0 0 1 .64-.64h3.28a.65.65 0 0 1 .64.64l.01 3.24z"
    />
  </svg>
);

export default SvgGridView;
