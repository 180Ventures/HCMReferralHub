import { SVGAttributes, SVGProps } from 'react';

interface IconProps extends SVGAttributes<SVGSVGElement> {}

export const StarCircleIcon = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='6'
    height='6'
    viewBox='0 0 7 7'
    fill='none'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M3.5 6.58C5.20104 6.58 6.58 5.20104 6.58 3.5C6.58 1.79896 5.20104 0.42 3.5 0.42C1.79896 0.42 0.42 1.79896 0.42 3.5C0.42 5.20104 1.79896 6.58 3.5 6.58ZM3.5 7C5.433 7 7 5.433 7 3.5C7 1.567 5.433 0 3.5 0C1.567 0 0 1.567 0 3.5C0 5.433 1.567 7 3.5 7Z'
      fill='#4B4039'
    />
    <path
      d='M3.5 0L4.2858 2.41844H6.8287L4.77145 3.91312L5.55725 6.33156L3.5 4.83688L1.44275 6.33156L2.22855 3.91312L0.171302 2.41844H2.7142L3.5 0Z'
      fill='#4B4039'
    />
  </svg>
);
