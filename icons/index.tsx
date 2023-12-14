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

export const SearchIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M10.5763 9.54717H10.0343L9.8422 9.36192C10.5146 8.57976 10.9194 7.56432 10.9194 6.45969C10.9194 3.99657 8.92281 2 6.45969 2C3.99657 2 2 3.99657 2 6.45969C2 8.92281 3.99657 10.9194 6.45969 10.9194C7.56432 10.9194 8.57976 10.5146 9.36192 9.8422L9.54717 10.0343V10.5763L12.9777 14L14 12.9777L10.5763 9.54717ZM6.45969 9.54717C4.75129 9.54717 3.37221 8.1681 3.37221 6.45969C3.37221 4.75129 4.75129 3.37221 6.45969 3.37221C8.1681 3.37221 9.54717 4.75129 9.54717 6.45969C9.54717 8.1681 8.1681 9.54717 6.45969 9.54717Z'
      fill='#898989'
    />
  </svg>
);

export const LogoutIcon = () => (
  <svg
    className='fill-current'
    width='16'
    height='16'
    viewBox='0 0 22 22'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z'
      fill=''
    />
    <path
      d='M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z'
      fill=''
    />
  </svg>
);

export const HelpIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z'
      fill='#898989'
    />
  </svg>
);

export const LogoIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
  >
    <rect
      x='11.5'
      y='0.893555'
      width='15'
      height='15'
      transform='rotate(45 11.5 0.893555)'
      fill='white'
      stroke='#33475B'
      strokeLinejoin='round'
    />
    <rect
      x='11.5'
      y='10.0146'
      width='8'
      height='8'
      transform='rotate(45 11.5 10.0146)'
      fill='#33475B'
      stroke='#33475B'
      strokeLinejoin='round'
    />
    <rect
      x='11.5'
      y='7.25781'
      width='6'
      height='6'
      transform='rotate(45 11.5 7.25781)'
      fill='#A0A0A0'
      stroke='#33475B'
      strokeLinejoin='round'
    />
  </svg>
);

export const BarIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z'
      fill='#898989'
    />
  </svg>
);

export const OverviewIcon = ({ active }: { active?: boolean }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z'
      fill={active ? '#EE8062' : '#898989'}
    />
  </svg>
);

export const InviteFriend = ({ active }: { active?: boolean }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='19'
    viewBox='0 0 20 19'
    fill='none'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M18 4H14V2L12 0H8L6 2V4H2C0.89 4 0.01 4.89 0.01 6L0 17C0 18.11 0.89 19 2 19H18C19.11 19 20 18.11 20 17V6C20 4.89 19.11 4 18 4ZM8 2H12V4H8V2ZM8.5 15.5L5 12L6.41 10.59L8.5 12.68L13.68 7.5L15.09 8.91L8.5 15.5Z'
      fill={active ? '#EE8062' : '#898989'}
    />
  </svg>
);

export const SettingsIcon = ({ active }: { active?: boolean }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='17'
    height='17'
    viewBox='0 0 17 17'
    fill='none'
    className='absolute'
    style={{ left: '2px' }}
  >
    <path
      d='M9.43478 16.5217H7.08696L6.43478 14.5217C6 14.3913 5.56522 14.2174 5.17391 14L3.26087 14.9565L1.6087 13.3043L2.56522 11.3913C2.34783 11 2.17391 10.5652 2.04348 10.1304L0 9.43478V7.08696L2 6.43478C2.13043 6 2.30435 5.56522 2.52174 5.17391L1.56522 3.26087L3.21739 1.6087L5.13043 2.56522C5.52174 2.34783 5.95652 2.17391 6.3913 2.04348L7.08696 0H9.43478L10.087 2C10.5217 2.13043 10.9565 2.30435 11.3478 2.52174L13.2609 1.56522L14.913 3.21739L13.9565 5.13043C14.1739 5.52174 14.3478 5.95652 14.4783 6.3913L16.4783 7.04348V9.3913L14.4783 10.0435C14.3478 10.4783 14.1739 10.913 13.9565 11.3043L14.913 13.2174L13.2609 14.8696L11.3478 13.913C10.9565 14.1304 10.5217 14.3043 10.087 14.4348L9.43478 16.5217ZM7.69565 15.6522H8.82609L9.43478 13.7826L9.65217 13.7391C10.1739 13.6087 10.6522 13.3913 11.1304 13.1304L11.3478 13L13.087 13.8696L13.8696 13.087L13 11.3478L13.1304 11.1304C13.3913 10.6957 13.6087 10.1739 13.7391 9.65217L13.7826 9.43478L15.6522 8.82609V7.69565L13.7826 7.08696L13.7391 6.86957C13.6087 6.34783 13.3913 5.86957 13.1304 5.3913L13 5.17391L13.8696 3.43478L13.087 2.65217L11.3478 3.52174L11.1304 3.3913C10.6522 3.13043 10.1739 2.91304 9.65217 2.78261L9.43478 2.73913L8.82609 0.869565H7.69565L7.08696 2.73913L6.86956 2.78261C6.34783 2.91304 5.86956 3.13043 5.3913 3.3913L5.17391 3.52174L3.43478 2.65217L2.65217 3.43478L3.52174 5.17391L3.3913 5.3913C3.13043 5.82609 2.91304 6.34783 2.78261 6.86957L2.73913 7.08696L0.869565 7.69565V8.82609L2.73913 9.43478L2.78261 9.65217C2.91304 10.1739 3.13043 10.6522 3.3913 11.1304L3.52174 11.3478L2.65217 13.087L3.43478 13.8696L5.17391 13L5.3913 13.1304C5.86956 13.3913 6.34783 13.6087 6.86956 13.7391L7.08696 13.7826L7.69565 15.6522Z'
      fill={active ? '#EE8062' : 'white'}
    />
  </svg>
);

export const ArrowLeftIcon = ({ active }: { active?: boolean }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M9.99984 6L8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6Z'
      fill={active ? '#EE8062' : '#898989'}
    />
  </svg>
);

export const WedgitIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z'
      fill='#7785DE'
    />
  </svg>
);

export const IcSendIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z'
      fill='#FAC76F'
    />
  </svg>
);

export const IcTrendingUp = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6L16 6Z'
      fill='#01ADC7'
    />
  </svg>
);

export const ThreeDots = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z'
      fill='#898989'
    />
  </svg>
);

export const DownloadIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='19'
    viewBox='0 0 20 19'
    fill='none'
  >
    <mask
      id='mask0_1441_7170'
      // 'mask-type:luminance'
      // style={{}}
      maskUnits='userSpaceOnUse'
      x='5'
      y='2'
      width='9'
      height='12'
    >
      <path
        d='M5.80273 2.23047H13.5064V13.4643H5.80273V2.23047Z'
        fill='white'
      />
    </mask>
    <g mask='url(#mask0_1441_7170)'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.3261 11.2515V2.87086C10.3261 2.70125 10.2568 2.53861 10.1293 2.41739C10.0017 2.29974 9.83054 2.23047 9.65191 2.23047C9.47338 2.23047 9.30218 2.29974 9.17458 2.41739C9.04707 2.53861 8.97782 2.70125 8.97782 2.87086V11.2515C8.97782 11.2515 7.69155 10.0296 6.97377 9.34759C6.84616 9.22646 6.67496 9.16067 6.49643 9.16067C6.3178 9.16067 6.1466 9.22646 6.0191 9.34759C5.75666 9.59691 5.75666 10.0019 6.0191 10.2511L9.20013 13.2731C9.32041 13.3874 9.48071 13.4497 9.65191 13.4497C9.82321 13.4497 9.98351 13.3874 10.1038 13.2731L13.2848 10.2511C13.5473 10.0019 13.5473 9.59691 13.2848 9.34759C13.1573 9.22646 12.9861 9.16067 12.8075 9.16067C12.629 9.16067 12.4578 9.22646 12.3302 9.34759C11.6087 10.0296 10.3261 11.2515 10.3261 11.2515Z'
        fill='#2D3E50'
      />
    </g>
    <mask
      id='mask1_1441_7170'
      // style='mask-type:luminance'
      maskUnits='userSpaceOnUse'
      x='2'
      y='11'
      width='16'
      height='6'
    >
      <path d='M2 11.2354H17.2963V16.7614H2V11.2354Z' fill='white' />
    </mask>
    <g mask='url(#mask1_1441_7170)'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2 15.5573C2 15.8792 2.13484 16.1873 2.37529 16.4123C2.61584 16.6407 2.9401 16.7688 3.27537 16.7688H16.0287C16.3677 16.7688 16.6919 16.6407 16.9288 16.4123C17.1693 16.1839 17.3041 15.8757 17.3041 15.5573V11.8914C17.3041 11.5383 17.0016 11.251 16.63 11.251C16.4515 11.251 16.2802 11.3202 16.1527 11.4379C16.0251 11.559 15.9559 11.7218 15.9559 11.8914V14.8857C15.9559 15.2215 15.6717 15.4915 15.3182 15.4915H3.98592C3.63243 15.4915 3.34819 15.2215 3.34819 14.8857V11.8914C3.34819 11.7218 3.27537 11.559 3.15143 11.4379C3.02392 11.3168 2.85262 11.251 2.67409 11.251C2.30247 11.251 2 11.5383 2 11.8914V15.5573Z'
        fill='#2D3E50'
      />
    </g>
  </svg>
);
