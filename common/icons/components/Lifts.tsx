import { SVGProps, FunctionComponent } from 'react';
type Props = SVGProps<SVGSVGElement>;

const SvgLifts: FunctionComponent<Props> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g className="icon__shape" fillRule="nonzero" transform="translate(2)">
      <path d="M15 .45H4.6a4 4 0 0 0-4 4v18.3a1 1 0 0 0 2 0V4.45a2 2 0 0 1 2-2H15a2 2 0 0 1 2 2v18.3a1 1 0 0 0 2 0V4.45a4 4 0 0 0-4-4z" />
      <path d="M12.42 8.2H7.17a2.43 2.43 0 0 0-2.43 2.43v4.47a1 1 0 0 0 2 0v-4.47a.43.43 0 0 1 .43-.43h5.25a.43.43 0 0 1 .43.43v4.47a1 1 0 0 0 2 0v-4.47a2.43 2.43 0 0 0-2.43-2.43z" />
      <circle cx={9.8} cy={5.32} r={2.08} />
      <path d="M8.42 14.35a1 1 0 0 0-1 1v7.4a1 1 0 0 0 2 0v-7.4a1 1 0 0 0-1-1zm3 0a1 1 0 0 0-1 1v7.4a1 1 0 0 0 2 0v-7.4a1 1 0 0 0-1-1z" />
    </g>
  </svg>
);

export default SvgLifts;
