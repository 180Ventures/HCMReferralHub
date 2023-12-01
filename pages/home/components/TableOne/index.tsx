import { ThreeDots } from '@/icons';
import Image from 'next/image';
import { IDashBoardTableData } from '../../types';

interface IProps {
  data?: IDashBoardTableData[];
}

const TableOne = ({ data }: IProps) => {
  return (
    <div className='rounded-xl border border-stroke bg-white px-5 pt-6 pb-2.5 sm:px-7.5 xl:pb-1'>
      <div className='mb-3 justify-between gap-4 flex'>
        <div>
          <h2 className='text-2xl font-Inter font-semibold text-blackLight'>
            All Leads Referred
          </h2>
          <h5 className='text-sm font-Inter font-normal text-blackLight mt-2'>
            This month
          </h5>
        </div>
        <div>
          <span className='cursor-pointer'>
            <ThreeDots />
          </span>
        </div>
      </div>
      <div className='flex flex-col overflow-auto'>
        <div className='grid rounded-sm bg-gray-2 grid-cols-12 overflow-auto'>
          <div className='p-2.5 xl:p-5'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>No</h5>
          </div>
          <div className='p-2.5 text-center xl:p-5 col-span-3'>
            <h5 className='text-sm font-medium uppercase text-left xsm:text-base'>
              Client Name
            </h5>
          </div>
          <div className='p-2.5 text-center xl:p-5 col-span-2'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>
              Status
            </h5>
          </div>
          <div className=' p-2.5 text-center col-span-2 sm:block xl:p-5'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>
              Date
            </h5>
          </div>
          <div className=' p-2.5 text-center sm:block col-span-2 xl:p-5'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>
              Payout
            </h5>
          </div>
          <div className=' p-2.5 text-center sm:block xl:p-5 col-span-2'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>
              Notes
            </h5>
          </div>
        </div>
        {data?.length == 0 && (
          <p className='text-sm text-blackLight font-normal text-center py-2 capitalize'>
            No data found!
          </p>
        )}
        {data?.map((item, index) => {
          return (
            <div
              key={item.id}
              className='grid overflow-auto border-b border-stroke dark:border-strokedark grid-cols-12'
            >
              <div className='flex items-center justify-center col-span-1'>
                <p className='text-blackLight text-xs font-normal font-Inter text-left'>
                  {index + 1}.
                </p>
              </div>
              <div className='flex items-center gap-3 p-2.5 col-span-3 xl:p-5'>
                <div className='w-10 h-10 relative'>
                  <Image alt='Logo' src='/images/avatar.jpg' fill priority />
                </div>
                <div className='flex flex-col items-start'>
                  <p className=' text-sm font-medium font-Inter text-blackLight sm:block capitalize'>
                    {item.clientName}
                  </p>
                  <p className=' text-sm font-medium font-Inter text-[#35B0A4] sm:block'>
                    {item.price}
                  </p>
                </div>
              </div>

              <div className='flex items-center justify-center p-2.5 xl:p-5 col-span-2'>
                <p className='text-blackLight text-xs font-normal font-Inter'>
                  {item.status}
                </p>
              </div>

              <div className='flex items-center justify-center p-2.5 xl:p-5 col-span-2'>
                <p className='text-blackLight text-xs font-normal font-Inter'>
                  {item.date as string}
                </p>
              </div>

              <div className=' items-center justify-center p-2.5 sm:flex xl:p-5 col-span-2'>
                <p className='text-blackLight text-xs font-normal font-Inter'>
                  {item.payout as string}
                </p>
              </div>

              <div className=' items-center justify-center p-2.5 sm:flex xl:p-5 col-span-2'>
                <p className='text-meta-5 underline cursor-pointer hover:opacity-60 text-blackLight text-xs font-normal font-Inter'>
                  See Notes
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableOne;
