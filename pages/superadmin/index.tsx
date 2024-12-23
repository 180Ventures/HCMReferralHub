import { NextPage } from 'next';
import { Container, LoadingPage } from '@/components';
import useDashBoardHook from '../home/hooks';
import Header from '../home/components/Header';
import Button from '@/components/Button';
import withAuth from '@/components/AuthHOC';
import Sidebar from '../home/components/SideBar';
import TableOne from '../home/components/TableOne';
import useAdminHook from './hook';
import { ITEMS_PER_PAGE } from '@/constants';
import React from 'react';

const AdminPage: NextPage = () => {
  const {
    link,
    sidebarOpen,
    profile,
    isCopied,
    onToggleSideBar,
    handleCopy,
  } = useDashBoardHook();

  const {
    pageCount,
    loading,
    tableData,
    itemOffset,
    currentPage,
    handlePageClick,
    handleSearchLeads,
    onChangeTextSearch,
  } = useAdminHook();

  return (
    <Container headTitle='Dashboard' >
      {loading && <LoadingPage />}
      <div className="flex h-screen overflow-hidden">
        {sidebarOpen && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={onToggleSideBar} />}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header
            onSearchLeads={handleSearchLeads}
            onChangeTextSearch={onChangeTextSearch}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={onToggleSideBar}
          />
          <main className="bg-[#F9F9F9] h-full">
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-[#F9F9F9]">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="flex flex-col">
                  <h1 className="text-2xl 2xl:text-4xl font-semibold font-Inter text-blackLight mb-2 capitalize">
                    Hi {profile?.firstName?.trim()?.toLowerCase() + ' ' + profile?.lastName?.trim()?.toLowerCase()}
                  </h1>
                  <p className="font-Inter text-sm font-normal">Welcome back to The Referral Hub!</p>
                </div>
                <div className="flex flex-col sm:flex-row no-input mt-4 md:mt-0">
                  <div className="sm:mr-6 flex items-center px-4 w-auto md:w-[430px] 2xl:w-[540px] h-10 2xl:h-12 bg-white rounded-lg border border-slate-200 text-[#898989] placeholder:text-slate-500 lg:placeholder:text-accent text-sm font-normal">
                    <input
                      value={link}
                      //onChange={(e) => handleChangeLink(e.target.value)}
                      className="flex-grow pl-0 border-none pt-0 pb-0"
                    />
                    <span
                      onClick={handleCopy}
                      className="text-sm font-medium text-blackLight font-Inter cursor-pointer"
                    >
                      {isCopied ? 'Copied' : 'Copy link'}
                    </span>
                  </div>
                  <Button
                    text="+ Add Referral Partner"
                    customStyle="max-w-[160px] mt-4 sm:mt-0"
                  //onClick={handleNewLead}
                  />
                </div>
              </div>

              <div className='grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mt-12'>
                <div className='col-span-12 overflow-auto'>
                  <TableOne
                    data={tableData}
                    countPage={pageCount}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageClick={(e) => handlePageClick(e)}
                    currentPage={currentPage}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Container>
  );
};

export default withAuth(AdminPage, 'admin');
