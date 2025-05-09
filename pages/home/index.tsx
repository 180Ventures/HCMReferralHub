import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Sidebar from './components/SideBar';
import Header from './components/Header';
import withAuth from '@/components/AuthHOC';
import Button from '@/components/Button';
import useDashBoardHook from './hooks';
import CardItem from './components/CardItem';
import TableOne from './components/TableOne';
import MaketingComponent from './components/Maketing';
import { Container, LoadingPage } from '@/components';
import { ITEMS_PER_PAGE } from '@/constants';
const ChartOne = dynamic(() => import('./components/Charts/ChartOne'), {
  ssr: false,
});
const ChartThree = dynamic(() => import('./components/Charts/ChartThree'), {
  ssr: false,
});

const HomePage: NextPage = () => {
  const {
    link,
    sidebarOpen,
    profile,
    isCopied,
    initialCards,
    tableData,
    pieChart,
    areaChart,
    marketingData,
    loading,
    currentPage,
    pageCount,
    handlePageClick,
    handleNewLead,
    onToggleSideBar,
    handleSearchLeads,
    handleCopy,
    onChangeTextSearch,
  } = useDashBoardHook();

  return (
    <Container headTitle='Dashboard'>
      <div className='dark:bg-boxdark-2 dark:text-bodydark'>
        {loading && <LoadingPage />}
        <div className='flex h-screen overflow-hidden'>
          {sidebarOpen && (
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={onToggleSideBar} />
          )}
          <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
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
                      Hi {profile?.firstName?.trim().toLowerCase() + ' ' + profile?.lastName?.trim().toLowerCase()},
                    </h1>
                    <p className="font-Inter text-sm font-normal">Welcome back to The Referral Hub!</p>
                  </div>
                  <div className="flex flex-col sm:flex-row no-input mt-4 md:mt-0">
                    <div className="sm:mr-6 flex items-center px-4 w-auto md:w-[430px] 2xl:w-[540px] h-10 2xl:h-12 bg-white rounded-lg border border-slate-200 text-[#898989] placeholder:text-slate-500 lg:placeholder:text-accent text-sm font-normal">
                      <input
                        value={link}
                        // onChange={(e) => handleChangeLink(e.target.value)}
                        className="flex-grow pl-0 border-none pt-0 pb-0"
                      />
                      <span
                        onClick={handleCopy}
                        className="text-sm font-medium text-blackLight font-Inter cursor-pointer"
                      >
                        {isCopied ? 'Copied' : 'Copy link'}
                      </span>
                    </div>
                    <Button text="+ Add New Lead" customStyle="max-w-[160px] mt-4 sm:mt-0" onClick={handleNewLead} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 2xl:mt-8 gap-4 md:grid-cols-3 md:gap-6 2xl:gap-7.5">
                  {initialCards.map((item) => (
                    <CardItem
                      value={item.value}
                      title={item.title}
                      progress={item.progress}
                      key={item.id}
                      progressColor={item.progressColor}
                      price={item.price}
                    />
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                  {typeof window !== 'undefined' && <ChartOne series={pieChart} />}
                  {typeof window !== 'undefined' && <ChartThree series={areaChart.series} total={areaChart.total} />}
                  <div className="col-span-12 rounded-xl shadow-default xl:col-span-4">
                    <MaketingComponent data={marketingData} />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mt-4">
                  <div className="col-span-12 overflow-auto">
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
      </div>
    </Container>

  );
};

export default withAuth(HomePage, 'all');
