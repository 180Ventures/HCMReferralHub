import DropdownUser from '../DropdownUser';
import DropdownNotification from '../DropdownNotification';
import { BarIcon, HelpIcon, SearchIcon } from '@/icons';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className='dashboard-header sticky top-0 border-b border-b-[#DCDCDC] h-full max-h-[72px] z-999 flex w-full bg-white drop-shadow-1'>
      <div className='flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11'>
        <div className='flex items-center gap-2 sm:gap-4 lg:hidden'>
          <button
            aria-controls='sidebar'
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className='z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden'
          >
            <BarIcon />
          </button>
        </div>

        <div className='hidden sm:block'>
          <form>
            <div className='relative w-[300px] px-4 py-5 h-8 rounded-lg bg-[#F9F9F9] flex items-center'>
              <SearchIcon />
              <input
                type='search'
                placeholder='Search...'
                className=' text-sm font-normal  border-none bg-transparent focus:border-none'
              />
            </div>
          </form>
        </div>

        <div className='flex items-center gap-3 2xsm:gap-7'>
          <ul className='flex items-center gap-2 2xsm:gap-4'>
            <HelpIcon />
            <DropdownNotification />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
