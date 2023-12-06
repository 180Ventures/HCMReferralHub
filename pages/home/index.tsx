import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Sidebar from './components/SideBar';
import Header from './components/Header';
import withAuth from '@/components/AuthHOC';
import Button from '@/components/Button';
import useDashBoardHook from './hooks';
import CardItem from './components/CardItem';
import { IcSendIcon, IcTrendingUp, InviteFriend, WedgitIcon } from '@/icons';
import TableOne from './components/TableOne';
import MaketingComponent from './components/Maketing';
const ChartOne = dynamic(() => import('./components/Charts/ChartOne'), {
  ssr: false,
});
const ChartTwo = dynamic(() => import('./components/Charts/ChartTwo'), {
  ssr: false,
});
const ChartThree = dynamic(() => import('./components/Charts/ChartThree'), {
  ssr: false,
});

const DASHBOARD_CARDS = [
  {
    id: 'card_01',
    value: '9',
    title: 'Tier 4 Commission Level',
    progress: 90,
    progressColor: '#EE8062',
    icon: <InviteFriend active />,
  },
  {
    id: 'card_02',
    value: '$250.00/ea',
    title: 'Tier 4 Commission Level',
    progress: 45,
    progressColor: '#7785DE',
    icon: <WedgitIcon />,
  },
  {
    id: 'card_03',
    value: '98.98%',
    title: 'Tier 4 Commission Level',
    progress: 98,
    progressColor: '#01ADC7',
    icon: <IcTrendingUp />,
  },
  {
    id: 'card_04',
    value: '4',
    title: 'Tier 4 Commission Level',
    progress: 45,
    progressColor: '#FAC76F',
    icon: <IcSendIcon />,
  },
];

const HomePage: NextPage = () => {
  const {
    link,
    sidebarOpen,
    profile,
    isCopied,
    tableData,
    marketingData,
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
            <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-[#F9F9F9]'>
              <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
                <div className='flex flex-col'>
                  <h1 className='text-2xl 2xl:text-4xl font-semibold font-Inter text-blackLight mb-2 capitalize'>
                    Hi {profile?.firstName + ' ' + profile?.lastName},
                  </h1>
                  <p className='font-Inter text-sm font-normal'>
                    Welcome back to The Referral Hub!
                  </p>
                </div>
                <div className='flex flex-col sm:flex-row no-input mt-4 md:mt-0'>
                  <div className='sm:mr-6 flex items-center px-4 w-auto md:w-[430px] 2xl:w-[540px] h-10 2xl:h-12 bg-white rounded-lg border border-slate-200 text-[#898989] placeholder:text-slate-500 lg:placeholder:text-accent text-sm font-normal'>
                    <input
                      value={link}
                      onChange={(e) => handleChangeLink(e.target.value)}
                      className='flex-grow pl-0 border-none pt-0 pb-0'
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
              <div className='grid grid-cols-1 sm:grid-cols-2 mt-8 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                {DASHBOARD_CARDS.map((item) => (
                  <CardItem
                    value={item.value}
                    title={item.title}
                    progress={item.progress}
                    key={item.id}
                    progressColor={item.progressColor}
                    chidrenIcon={item.icon}
                  />
                ))}
              </div>
              <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 pb-12'>
                {typeof window !== 'undefined' && <ChartOne />}
                {typeof window !== 'undefined' && <ChartTwo />}
                {typeof window !== 'undefined' && <ChartThree />}
                <div className='col-span-12 xl:col-span-8'>
                  <TableOne data={tableData}/>
                </div>
                <div className='col-span-12 xl:col-span-4'>
                  <MaketingComponent data={marketingData}/>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default withAuth(HomePage, 'all');
// export default HomePage;
