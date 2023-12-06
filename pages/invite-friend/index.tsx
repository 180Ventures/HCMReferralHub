import { NextPage } from 'next';
import withAuth from '@/components/AuthHOC';
import Button from '@/components/Button';
import Sidebar from '../home/components/SideBar';
import useDashBoardHook from '../home/hooks';
import Header from '../home/components/Header';

const InviteFriendPage: NextPage = () => {
  const {
    link,
    sidebarOpen,
    isCopied,
    handleNewLead,
    setSidebarOpen,
    handleChangeLink,
    handleCopy,
  } = useDashBoardHook();

  return (
    <div className='dark:bg-boxdark-2 dark:text-bodydark'>
      <div className='flex h-screen overflow-hidden'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-[#F9F9F9] min-h-[100vh]'>
              <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
                <div className='flex flex-col'>
                  <h1 className='text-4xl font-semibold font-Inter text-blackLight mb-2'>
                    Hi Rachael,
                  </h1>
                  <p className='font-Inter text-sm font-normal'>
                    Welcome back to The Referral Hub!
                  </p>
                </div>
                <div className='flex flex-col sm:flex-row no-input mt-4 md:mt-0'>
                  <div className='sm:mr-6 flex items-center px-4 w-auto md:w-[540px] h-12 bg-white rounded-lg border border-slate-200 text-[#898989] placeholder:text-slate-500 lg:placeholder:text-accent text-sm font-normal'>
                    <input
                      value={link}
                      onChange={(e) => handleChangeLink(e.target.value)}
                      className='flex-grow pl-0 border-none'
                    />
                    <span
                      onClick={handleCopy}
                      className='text-sm font-medium text-blackLight font-Inter cursor-pointer'
                    >
                      {isCopied ? 'Copied' : 'Copy link'}
                    </span>
                  </div>
                  <Button
                    text='+ Add New Lead'
                    customStyle='max-w-[160px] mt-4 sm:mt-0'
                    onClick={handleNewLead}
                  />
                </div>
              </div>
          
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default withAuth(InviteFriendPage, 'all');