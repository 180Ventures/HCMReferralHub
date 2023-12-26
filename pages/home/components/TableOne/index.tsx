import { useAuthState } from '@/contexts/auth';
import { ThreeDots } from '@/icons';
import { ILead } from '@/utils/types';

interface IProps {
  data: ILead[];
}

const TableOne = ({ data }: IProps) => {
  const { isAdmin } = useAuthState();

  return (
    <div className='rounded-xl border border-stroke bg-white px-5 py-3 2xl:pt-6 pb-2.5 xl:pb-1'>
      <div className='mb-3 justify-between gap-4 flex'>
        <div>
          <h2 className='text-2xl font-Inter font-semibold text-blackLight'>
            All Leads Referred
          </h2>
          {!isAdmin && (
            <h5 className='text-sm font-Inter font-normal text-blackLight mt-2'>
              This month
            </h5>
          )}
        </div>
        <div>
          <span className='cursor-pointer'>
            <ThreeDots />
          </span>
        </div>
      </div>
      <div className='flex flex-col overflow-auto'>
        <div className='grid rounded-sm bg-gray-2 grid-cols-12 overflow-auto'>
          <div className='p-2.5 2xl:p-5 col-span-1'>
            <h5 className='text-sm font-medium uppercase sm:text-base'>No</h5>
          </div>
          <div className='p-2.5 text-center 2xl:p-5 col-span-3'>
            <h5 className='text-sm font-medium uppercase text-left sm:text-base'>
              Client Name
            </h5>
          </div>
          <div className='p-2.5 text-center 2xl:p-5 col-span-2 pl-0'>
            <h5 className='text-sm font-medium uppercase sm:text-base'>
              Status
            </h5>
          </div>

          <div className=' p-2.5 text-center sm:block col-span-2 2xl:p-5'>
            <h5 className='text-sm font-medium uppercase sm:text-base'>
              Payout Date
            </h5>
          </div>
          <div className={`p-2.5 text-center sm:block 2xl:p-5 ${isAdmin ? 'col-span-2' : 'col-span-4'}`}>
            <h5 className='text-sm font-medium uppercase sm:text-base'>
              Phone Number
            </h5>
          </div>
          {isAdmin && (
            <div className=' p-2.5 text-center sm:block 2xl:p-5 pl-0 col-span-2'>
              <h5 className='text-sm font-medium text-start uppercase sm:text-base'>
                AOR
              </h5>
            </div>
          )}
        </div>
        {data?.length == 0 && (
          <p className='text-sm text-blackLight font-normal text-center py-2 capitalize'>
            No data found!
          </p>
        )}
        <div className={`${isAdmin ? 'h-[50vh]' : 'max-h-40'} overflow-auto`}>
          {data?.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`grid overflow-auto cursor-pointer border-b border-stroke dark:border-strokedark grid-cols-12 ${
                  index === data.length - 1 ? 'border-none' : ''
                }`}
              >
                <div className='flex items-center justify-start col-span-1 p-2.5 2xl:p-5'>
                  <p className='text-blackLight text-xs font-normal font-Inter text-left'>
                    {index + 1}.
                  </p>
                </div>
                <div className='flex items-center gap-3 p-2.5 col-span-3 2xl:p-5'>
                  <div className='hidden sm:flex w-10 h-10 relative'>
                    <div className='uppercase w-full h-full bg-orangeLight rounded-full flex justify-center items-center'>
                      <span className='text-white uppercase'>
                        {item.name?.length > 0 ? item.name[0] : 'A'}
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-col items-start'>
                    <p className=' text-sm font-medium font-Inter text-blackLight sm:block capitalize truncate'>
                      {item?.name.toLowerCase()}
                    </p>
                    <p className=' text-sm font-medium font-Inter text-[#35B0A4] sm:block'>
                      {item.price}
                    </p>
                  </div>
                </div>

                <div className='flex items-center justify-center p-2.5 2xl:p-5 col-span-2'>
                  <p className='text-blackLight text-xs font-normal font-Inter text-center'>
                    {item.status}
                  </p>
                </div>

                <div className=' items-center justify-center p-2.5 sm:flex 2xl:p-5 col-span-2'>
                  <p className='text-blackLight text-xs font-normal font-Inter'>
                    {(item.payout as string) || '...'}
                  </p>
                </div>

                <div className={`items-center justify-center p-2.5 sm:flex 2xl:p-5 ${isAdmin ? 'col-span-2' : 'col-span-4'}`}>
                  <p className='text-meta-5 cursor-pointer hover:opacity-60 text-blackLight text-xs font-normal font-Inter'>
                    {(item.phone as string) || '...'}
                  </p>
                </div>

                {isAdmin && (
                  <div className=' items-center justify-start p-2.5 sm:flex 2xl:p-5 col-span-2'>
                    <p className='text-meta-5 capitalize cursor-pointer hover:opacity-60 text-blackLight text-xs font-normal font-Inter underline truncate w-[100px]'>
                      {item.userName || ''}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TableOne;
