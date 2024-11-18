import { IPortalLead } from '@/utils/types';
import { DropdownIcon } from '@/icons';
import { LoadingPage, ModalBase, PaginatedItems, PopoverBase } from '@/components';
import useTableHook from './hook';
import { LeadPaymentStatus, PriceByStatusLead } from '@/utils/enums';
import { FIRST_INDEX, ITEMS_PER_PAGE, USDollar } from '@/constants';
import CreateNote from '../CreateNote';
import clsx from 'clsx';
import { getFirstCharacterName, getFullNameUser, getListPhoneNumbers } from '@/utils';
import moment from 'moment';

interface IProps {
  data: IPortalLead[];
  itemsPerPage?: number;
  countPage?: number;
  currentPage: number;
  onPageClick?: (e: any) => void;
}

const STATUS_DATA = [
  {
    id: LeadPaymentStatus.won,
    name: 'Won',
  },
  {
    id: LeadPaymentStatus.loss,
    name: 'Loss',
  },
  {
    id: LeadPaymentStatus.pending,
    name: 'Pending',
  },
];

const TableOne = ({ data, currentPage, itemsPerPage, countPage, onPageClick }: IProps) => {
  const {
    isImportingLeads,
    sheetUrl,
    isShowAddSheetUrlModal,
    isAdmin,
    loading,
    notes,
    showModelCreateNotes,
    onChangeSheetUrl,
    setNotes,
    handleSaveNotes,
    setShowModelCreateNotes,
    handleChangeStatus,
    handleClickNotes,
    setShowAddSheetUrlModal,
    onShowAddSheetUrlModal,
    onImportLead,
  } = useTableHook();

  return (
    <div className="rounded-xl min-w-[560px] overflow-auto border border-stroke bg-white px-12 py-8 2xl:pt-6 pb-2.5 xl:pb-1">
      {(loading || isImportingLeads) && <LoadingPage />}
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
      <ModalBase
        setOpen={setShowAddSheetUrlModal}
        open={isShowAddSheetUrlModal}
        bodyNode={
          <div className="flex flex-col p-6 gap-y-3">
            <label htmlFor="notes" className="block  text-left text-lg font-medium text-gray-900 font-Inter">
              Sheet URL
            </label>
            <input
              value={sheetUrl}
              onChange={onChangeSheetUrl}
              placeholder="Add sheet url"
              className={clsx(
                'focus:ring-2 focus:ring-indigo-600',
                'block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-lg sm:leading-6'
              )}
            />
            <button
              disabled={!sheetUrl}
              className="bg-primary text-white font-semibold text-base lg:text-lg 2xl:text-xl rounded-lg px-4 py-2 disabled:bg-gray-200 mt-2"
              type="button"
              onClick={onImportLead}
            >
              Import
            </button>
          </div>
        }
      />
      <div className="mb-3 justify-between gap-4 flex  items-center flex-row ">
        <h2 className="text-2xl font-Inter font-semibold text-blackLight">All Leads Referred</h2>
        {!isAdmin &&
          <button
            onClick={onShowAddSheetUrlModal}
            type="button"
            className="bg-primary text-white font-semibold text-base lg:text-lg 2xl:text-xl rounded-lg px-4 py-2"
          >
            Import leads
          </button>
        }
      </div>
      <div className="flex flex-col overflow-auto mt-8">
        <div className="grid rounded-sm bg-gray-2 grid-cols-12 overflow-auto">
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
        <div className={`h-auto overflow-auto`}>
          {data?.length == 0 && (
            <p className="text-sm text-blackLight font-normal text-center pt-10 pb-4 capitalize">no records found.</p>
          )}
          {data?.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`grid cursor-pointer border-b border-stroke dark:border-strokedark grid-cols-12 ${index === data.length - 1 ? 'border-none' : ''
                  }`}
              >
                <div className="flex items-center justify-start col-span-1 p-2.5 2xl:p-5">
                  {isAdmin && (
                    <div className="hidden lg:flex w-10 h-10 relative mr-2">
                      <div className="uppercase w-full h-full bg-orangeLight rounded-full flex justify-center items-center">
                        <span className="text-white uppercase">{getFirstCharacterName(item.firstName)}</span>
                      </div>
                    </div>
                  )}
                  <p className="text-blackLight text-xs font-normal font-Inter text-left">
                    {ITEMS_PER_PAGE * (currentPage + 1) - (ITEMS_PER_PAGE - index) + 1}.
                  </p>
                </div>
                <div className="flex items-center gap-3 p-2.5 col-span-2 2xl:p-5">
                  {!isAdmin && (
                    <div className="hidden lg:flex w-10 h-10 relative">
                      <div className="uppercase w-full h-full bg-orangeLight rounded-full flex justify-center items-center">
                        <span className="text-white uppercase">{getFirstCharacterName(item.firstName)}</span>
                      </div>
                    </div>
                  )}
                  <div className={clsx('flex flex-col items-start', isAdmin ? 'w-full' : 'w-2/3')}>
                    <p className=" text-sm font-medium font-Inter text-blackLight sm:block capitalize truncate w-full">
                      {getFullNameUser(item.firstName, item.lastName)}
                    </p>
                    {item.paymentStatus === LeadPaymentStatus.pending ? (
                      <p className=" text-sm font-normal font-Inter text-grayLight sm:block capitalize">
                        {LeadPaymentStatus.pending}
                      </p>
                    ) : item.paymentStatus === LeadPaymentStatus.loss ? (
                      <p className=" text-sm font-medium font-Inter text-grayLight sm:block">$0</p>
                    ) : (
                      <p className=" text-sm font-medium font-Inter text-[#35B0A4] sm:block">
                        {USDollar.format(PriceByStatusLead.won)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center p-2.5 2xl:p-5 col-span-2 hover:opacity-75">
                  {isAdmin ? (
                    <PopoverBase data={STATUS_DATA} onClickItem={(statusId) => handleChangeStatus(statusId, item.id)}>
                      <div className="flex items-center">
                        <p className="text-blackLight text-xs font-bold font-Inter text-center pr-1 capitalize">
                          {item.paymentStatus}
                        </p>
                        <DropdownIcon />
                      </div>
                    </PopoverBase>
                  ) : (
                    <div className="flex items-center">
                      <p className="text-blackLight text-xs font-bold font-Inter text-center pr-1 capitalize">
                        {item.paymentStatus}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center p-2.5 sm:flex 2xl:p-5 col-span-2">
                  <p className="text-blackLight text-xs font-normal font-Inter">
                    {item.wonDateSubmitted ? moment(item.wonDateSubmitted.toDate()).format('DD/MM/YYYY') : '-'}
                  </p>
                </div>
                {isAdmin ? (
                  <div className="flex flex-col items-center justify-center p-2.5 sm:flex 2xl:p-5 col-span-2">
                    {item.phoneNumber
                      ? getListPhoneNumbers(item.phoneNumber).map((phoneNumber) => (
                        <p key={phoneNumber} className="text-blackLight text-xs font-normal font-Inter truncate">
                          {phoneNumber}
                        </p>
                      ))
                      : '-'}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-2.5 sm:flex 2xl:p-5 col-span-3">
                    {item.phoneNumber
                      ? getListPhoneNumbers(item.phoneNumber).map((phoneNumber) => (
                        <p key={phoneNumber} className="text-blackLight text-xs font-normal font-Inter truncate">
                          {phoneNumber}
                        </p>
                      ))
                      : '-'}
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
      {countPage && countPage > 1 ? (
        <div className="my-4 w-full flex justify-center">
          <PaginatedItems
            handlePageClick={onPageClick}
            itemsPerPage={itemsPerPage || FIRST_INDEX}
            pageCount={countPage || FIRST_INDEX}
            currentPage={currentPage || FIRST_INDEX}
          />
        </div>
      ) : null}
    </div>
  );
};

export default TableOne;
