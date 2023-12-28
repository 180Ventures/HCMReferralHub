import { useMemo } from 'react';

interface IProps {
  value: string;
  title: string;
  progress?: number;
  progressColor?: string;
  chidrenIcon?: any;
  price?: string;
}

const CardItem = ({ title, value, progress, progressColor, price, chidrenIcon }: IProps) => {
  const backgroundColor = useMemo(() => {
    return `bg-[${progressColor}]`;
  }, [progressColor]);

  return (
    <div className="border flex flex-col gap-4 justify-between border-stroke bg-white p-6 2xl:p-9 rounded-xl cursor-pointer hover:opacity-75">
      <div className="flex w-full items-center justify-between rounded-xl">
        <div className="flex flex-col">
          <span className="text-3xl font-Inter font-bold text-blackLight">{value}</span>
          <span className="text-sm font-medium text-[#35B0A4] mt-1">{price}</span>
        </div>
        {chidrenIcon}
      </div>
      <p className="text-sm font-normal text-grayLight capitalize">{title}</p>
      {/* <div className='flex items-center justify-between gap-4 mt-2'>
        <div className='w-full bg-gray-200 rounded-sm h-1'>
          <div className={`h-1 bg-orangeLight rounded-l-sm w-[${progress}%] ${progressColor ? backgroundColor : ''}`}></div>
        </div>
        <p className='flex items-center gap-1 text-xs font-medium text-grayLight'>
          {progress}%
          <svg
            className='fill-meta-3'
            width='10'
            height='11'
            viewBox='0 0 10 11'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z'
              fill=''
            />
          </svg>
        </p>
      </div> */}
    </div>
  );
};

export default CardItem;
