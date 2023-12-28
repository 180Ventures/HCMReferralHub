import { ILead } from '@/utils/types';
import { DropdownIcon } from '@/icons';
import { LoadingPage, ModalBase, PopoverBase } from '@/components';
import useTableHook from './hook';
import { USDollar } from '@/constants';
import { LeadStatus, PriceByStatusLead } from '@/utils/enums';
import CreateNote from '../CreateNote';
import clsx from 'clsx';
import { formatPhoneNumber } from '@/utils';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

interface IProps {
  data: ILead[];
}

const STATUS_DATA = [
  {
    id: 'Won',
    name: 'Won',
  },
  {
    id: 'Lost',
    name: 'Lost',
  },
  {
    id: 'Pending',
    name: 'Pending',
  },
];

const TableOne = ({ data }: IProps) => {
  const {
    isAdmin,
    loading,
    notes,
    showModelCreateNotes,
    setNotes,
    handleSaveNotes,
    setShowModelCreateNotes,
    handleChangeStatus,
    handleClickNotes,
  } = useTableHook();

  return (
    <div className="rounded-xl min-w-[560px] overflow-auto border border-stroke bg-white p-8">
      {loading && <LoadingPage />}
      <ModalBase
        setOpen={setShowModelCreateNotes}
        open={showModelCreateNotes}
        bodyNode={
          <CreateNote
            name={notes}
            setName={setNotes}
            onSaveNote={handleSaveNotes}
            hideSave={!isAdmin}
            disableArea={!isAdmin}
          />
        }
      />
      <div className="mb-3 justify-between gap-4 flex">
        <div>
          <h2 className="text-2xl font-Inter font-semibold text-blackLight">All Leads Referred</h2>
          {/* {!isAdmin && <h5 className="text-sm font-Inter font-normal text-blackLight mt-2">This month</h5>} */}
        </div>
      </div>
      <div className="flex flex-col overflow-auto mt-5">
        <div className="grid rounded-sm bg-gray-2 grid-cols-12 overflow-x-auto">
          <div className="p-2.5 2xl:p-5 col-span-1">
            <h5 className="text-sm font-medium text-[#898989] capitalize">No</h5>
          </div>
          <div className="p-2.5 text-center 2xl:p-5 col-span-2">
            <h5 className="text-sm font-medium capitalize text-left text-[#898989]">Client Name</h5>
          </div>
          <div className="p-2.5 text-center 2xl:p-5 col-span-2">
            <h5 className="text-sm font-medium capitalize text-[#898989]">Status</h5>
          </div>

          <div className=" p-2.5 text-center sm:block col-span-2 2xl:p-5">
            <h5 className="text-sm font-medium capitalize text-[#898989]">Payout Date</h5>
          </div>
          {isAdmin ? (
            <div className={`p-2.5 text-center sm:block 2xl:p-5 col-span-2`}>
              <h5 className="text-sm font-medium capitalize text-[#898989]">Phone Number</h5>
            </div>
          ) : (
            <div className={`p-2.5 text-center sm:block 2xl:p-5 col-span-3`}>
              <h5 className="text-sm font-medium capitalize text-[#898989]">Phone Number</h5>
            </div>
          )}
          {isAdmin && (
            <div className=" p-2.5 text-center sm:block 2xl:p-5 col-span-2">
              <h5 className="text-sm font-medium text-center capitalize text-[#898989]">AOR</h5>
            </div>
          )}
          <div className=" p-2.5 text-center sm:block col-span-1 2xl:p-5">
            <h5 className="text-sm font-medium capitalize text-[#898989]">Notes</h5>
          </div>
        </div>
        {data?.length == 0 && (
          <p className='text-sm text-blackLight font-normal text-center pt-10 pb-4 capitalize'>
            no records found.
          </p>
        )}
        <div className={`${isAdmin ? 'h-[50vh]' : 'max-h-40'}`}>
          {data?.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`grid cursor-pointer border-b border-stroke dark:border-strokedark grid-cols-12 ${
                  index === data.length - 1 ? 'border-none' : ''
                }`}
              >
                <div className="flex items-center justify-start col-span-1 p-2.5 2xl:p-5">
                  {isAdmin && (
                    <div className="hidden lg:flex w-10 h-10 relative mr-2">
                      <div className="uppercase w-full h-full bg-orangeLight rounded-full flex justify-center items-center">
                        <span className="text-white uppercase">{item.name?.length > 0 ? item.name[0] : 'A'}</span>
                      </div>
                    </div>
                  )}
                  <p className="text-blackLight text-xs font-normal font-Inter text-left">{index + 1}.</p>
                </div>
                <div className="flex items-center gap-3 p-2.5 col-span-2 2xl:p-5">
                  {!isAdmin && (
                    <div className="hidden lg:flex w-10 h-10 relative">
                      <div className="uppercase w-full h-full bg-orangeLight rounded-full flex justify-center items-center">
                        <span className="text-white uppercase">{item.name?.length > 0 ? item.name[0] : 'A'}</span>
                      </div>
                    </div>
                  )}
                  <div className={clsx('flex flex-col items-start', isAdmin ? 'w-full' : 'w-2/3')}>
                    <p className=" text-sm font-medium font-Inter text-blackLight sm:block capitalize truncate w-full">
                      {item?.name.toLowerCase()}
                    </p>
                    {item.status === LeadStatus.pending ? (
                      <p className=" text-sm font-normal font-Inter text-grayLight sm:block">{LeadStatus.pending}</p>
                    ) : item.price === PriceByStatusLead.lost ? (
                      <p className=" text-sm font-medium font-Inter text-grayLight sm:block">
                        $0
                      </p>
                    ) : (
                      <p className=" text-sm font-medium font-Inter text-[#35B0A4] sm:block">
                        {item.price && USDollar.format(item.price)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center p-2.5 2xl:p-5 col-span-2 hover:opacity-75">
                  {isAdmin ? (
                    <PopoverBase data={STATUS_DATA} onClickItem={(statusId) => handleChangeStatus(statusId, item.id)}>
                      <div className="flex items-center">
                        <p className="text-blackLight text-xs font-bold font-Inter text-center pr-1">{item.status}</p>
                        <DropdownIcon />
                      </div>
                    </PopoverBase>
                  ) : (
                    <div className="flex items-center">
                      <p className="text-blackLight text-xs font-bold font-Inter text-center pr-1">{item.status}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center p-2.5 sm:flex 2xl:p-5 col-span-2">
                  <p className="text-blackLight text-xs font-normal font-Inter">{(item.payout as string) || '...'}</p>
                </div>
                {isAdmin ? (
                  <div className="flex items-center justify-center p-2.5 sm:flex 2xl:p-5 col-span-2">
                    <p className="text-blackLight text-xs font-normal font-Inter">{formatPhoneNumberIntl(item.phone) || '...'}</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-2.5 sm:flex 2xl:p-5 col-span-3">
                    <p className="text-blackLight text-xs font-normal font-Inter truncate">{formatPhoneNumberIntl(item.phone) || '...'}</p>
                  </div>
                )}
                {isAdmin && (
                  <div className="flex items-center justify-center p-2.5 sm:flex 2xl:p-5 col-span-2">
                    <p className="text-center capitalize cursor-pointer hover:opacity-60 text-blackLight text-xs font-normal font-Inter underline truncate w-full">
                      {item.referralName || ''}
                    </p>
                  </div>
                )}

                <div
                  onClick={() => item.id && handleClickNotes(item.id, item.note || '')}
                  className="flex items-center justify-center p-2.5 sm:flex 2xl:p-5 col-span-1"
                >
                  <p className="text-meta-5 capitalize cursor-pointer hover:opacity-60 text-blackLight text-xs font-normal font-Inter underline truncate">
                    See Notes
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TableOne;
