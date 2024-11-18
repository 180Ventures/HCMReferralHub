import { useCallback, useEffect, useMemo, useState } from 'react';
import { DASHBOARD_MARKETING_DATA_TEMPLATE } from '@/utils/data';
import { IMarketingData } from '@/utils/types/dashboard';
import { useAuthState } from '@/contexts/auth';
import { useRouter } from 'next/router';
import { countLeads, getLeadsByReferralId } from '@/queries/portalLeads';
import { FIRST_INDEX, FORMAT_DATE, ITEMS_PER_PAGE, ROUTERS, USDollar } from '@/constants';
import { IPortalLead } from '@/utils/types';
import { generateLink } from '@/utils/generateLink';
import moment from 'moment';
import { LeadPaymentStatus, PriceByStatusLead, PromiseStatus } from '@/utils/enums';
import { ChartThreeState } from '../components/Charts/ChartThree';
import { getStartAndEndDate12Month } from '@/utils/date';
import { copyContent } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setRefreshLeadData } from '@/redux/slides/leadsAdminSlice';

const DATA_12MONTHS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const useDashBoardHook = () => {
  const dispatch = useAppDispatch();
  const { refreshLeadData } = useAppSelector(store => store.leadsAdminReducer);
  const [textSearch, setTextSearch] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { profile } = useAuthState();
  const [link, setLink] = useState<string>(
    `${process.env.NEXT_PUBLIC_REFERRAL_URL}${generateLink(profile?.uid as string)}`
  );

  //Table
  const [tableData, setTableData] = useState<IPortalLead[]>([]);
  const [tableDataTemplate, setTableDataTemplate] = useState<IPortalLead[]>([]);
  const [marketingData, setMarketingData] = useState<IMarketingData[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { isAdmin } = useAuthState();

  //Pagination
  const [itemOffset, setItemOffset] = useState<number>(FIRST_INDEX);
  const [currentPage, setCurrentPage] = useState<number>(FIRST_INDEX);
  const [totalItems, setTotalItems] = useState<number>(FIRST_INDEX);
  const pageCount = useMemo(() => {
    return Math.ceil(totalItems / ITEMS_PER_PAGE);
  }, [totalItems]);

  //Dashboard & Charts
  const [totalLeads, setTotalLeads] = useState<number>(0);
  const [totalClients, setTotalClients] = useState<number>(0);
  const [areaChart, setAreaChart] = useState<ChartThreeState>({
    total: 0,
    series: [
      {
        name: 'Earned',
        data: DATA_12MONTHS,
      },
    ],
  });
  const [pieChart, setPieCart] = useState<number[]>([0, 0, 0]);
  const initialCards = [
    {
      id: 'card_01',
      value: `${totalClients} Clients`,
      title: 'helped this month',
      progress: 90,
      price: USDollar.format(totalClients * PriceByStatusLead.won),
      progressColor: '#EE8062',
    },
    {
      id: 'card_02',
      value: '$250.00/ea',
      title: 'Tier 4 Commission Level',
      progress: 45,
      progressColor: '#7785DE',
    },
    {
      id: 'card_04',
      value: `${totalLeads} Leads`,
      title: 'referred this week  ',
      progress: 45,
      progressColor: '#FAC76F',
    },
  ];

  const onToggleSideBar = useCallback(
    (value: boolean) => {
      setSidebarOpen(value);
    },
    [sidebarOpen]
  );

  const onChangeTextSearch = useCallback((value: string) => {
    if (!value) {
      setLoading(true);
      setTimeout(() => {
        const dataSlice = [...tableDataTemplate].slice(FIRST_INDEX, FIRST_INDEX + ITEMS_PER_PAGE);
        setTableData(dataSlice);
        setTotalItems(tableDataTemplate.length);
        setItemOffset(FIRST_INDEX);
        setCurrentPage(FIRST_INDEX)
        setLoading(false);
      }, 500);
    }
    setTextSearch(value);
  }, [tableDataTemplate]);

  const handleSearchLeads = useCallback(() => {
    setLoading(true);
    const lowerCasedSearch = textSearch.toLowerCase().trim();
    const searchedValues = tableDataTemplate.filter(item =>
      item.firstName.trim().toLowerCase().includes(lowerCasedSearch) ||
      item.lastName.trim().toLowerCase().includes(lowerCasedSearch)
    );
    setTotalItems(searchedValues.length);
    setItemOffset(FIRST_INDEX);
    setCurrentPage(FIRST_INDEX)

    setTimeout(() => {
      setLoading(false);
      const dataSlice = [...searchedValues].slice(FIRST_INDEX, FIRST_INDEX + ITEMS_PER_PAGE);
      setTableData(dataSlice);
    }, 500);
  }, [textSearch, tableDataTemplate]);

  const handleCopy = useCallback(async () => {
    if (isCopied) return;
    await copyContent(link);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  }, [link]);

  const handleChangeLink = useCallback((text: string) => {
    setLink(text);
  }, []);

  const handleNewLead = useCallback(() => {
    router.push(ROUTERS.newLead);
  }, []);

  const getLeadsData = useMemo(() => {
    if (!profile?.uid) return null;
    return getLeadsByReferralId(profile?.uid);
  }, [profile, refreshLeadData]);

  const countLeadsOfWeek = useMemo(() => {
    if (!profile) return null;
    try {
      const startOfWeek = moment().startOf('week').add(1, 'day').format(FORMAT_DATE.monthDayYear);
      const endOfWeek = moment().endOf('week').add(1, 'day').format(FORMAT_DATE.monthDayYear);
      return countLeads(profile?.uid, startOfWeek, endOfWeek);
    } catch (error) {
      console.log(error);
    }
  }, [profile, refreshLeadData]);

  const countClientThisMonth = useMemo(() => {
    if (!profile) return null;
    try {
      const startOfThisMonth = moment().startOf('month').format(FORMAT_DATE.monthDayYear);
      const endOfThisMonth = moment().endOf('month').format(FORMAT_DATE.monthDayYear);
      return countLeads(profile?.uid, startOfThisMonth, endOfThisMonth, LeadPaymentStatus.won);
    } catch (error) {
      console.log(error);
    }
  }, [profile, refreshLeadData]);

  const getPieChartData = useMemo(() => {
    if (!profile) return [];
    const startOfThisMonth = moment().startOf('month').format(FORMAT_DATE.monthDayYear);
    const endOfThisMonth = moment().endOf('month').format(FORMAT_DATE.monthDayYear);
    return [
      countLeads(profile?.uid, startOfThisMonth, endOfThisMonth, LeadPaymentStatus.pending),
      countLeads(profile?.uid, startOfThisMonth, endOfThisMonth, LeadPaymentStatus.won),
      countLeads(profile?.uid, startOfThisMonth, endOfThisMonth, LeadPaymentStatus.loss),
    ];
  }, [profile, refreshLeadData]);

  const getAreaChartData = useCallback(async () => {
    if (!profile) return [];
    const months = getStartAndEndDate12Month();
    const monthsPromise = months.map((month) => {
      return countLeads(profile.uid, month.start, month.end, LeadPaymentStatus.won);
    });
    try {
      const responsive = await Promise.allSettled(monthsPromise);
      const leadsByMonths = DATA_12MONTHS.map((value, index) => {
        if (responsive[index].status === PromiseStatus.fulfilled) {
          return (responsive[index] as any)?.value * PriceByStatusLead.won;
        } else {
          return value;
        }
      });
      const sumLeadsByMonths = leadsByMonths.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      setAreaChart({
        total: sumLeadsByMonths,
        series: [
          {
            name: 'Earned',
            data: leadsByMonths,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  }, [profile, refreshLeadData]);

  useEffect(() => {
    if (isAdmin && window.location.pathname.includes(ROUTERS.home)) router.replace(ROUTERS.admin);
  }, [isAdmin]);

  useEffect(() => {
    Promise.allSettled([getLeadsData, countLeadsOfWeek, countClientThisMonth, ...getPieChartData]).then((data) => {
      const [leadsData, leadsOfWeek, clientThisMonth, pendingData, wonData, lostData] = data;

      if (pendingData.status === PromiseStatus.fulfilled && wonData.status == PromiseStatus.fulfilled && lostData.status === PromiseStatus.fulfilled) {
        setPieCart([pendingData.value, wonData.value, lostData.value]);
      }

      if (clientThisMonth.status === PromiseStatus.fulfilled) {
        const { value } = clientThisMonth;
        if (value) setTotalClients(value);
      }

      if (leadsOfWeek.status === PromiseStatus.fulfilled) {
        const { value } = leadsOfWeek;
        if (value) setTotalLeads(value);
      }
      if (leadsData.status == PromiseStatus.fulfilled) {
        const { value } = leadsData;
        if (value) {
          setTotalItems(value?.length)
          const dataSlice = [...value].slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
          setTableData(dataSlice as IPortalLead[]);
          setTableDataTemplate(value as IPortalLead[]);
        }
      }
      setMarketingData(DASHBOARD_MARKETING_DATA_TEMPLATE);
    });
    getAreaChartData();
    dispatch(setRefreshLeadData(false));
  }, [refreshLeadData]);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
    const newOffset = (event.selected * ITEMS_PER_PAGE) % totalItems;
    const data = [...tableDataTemplate].slice(newOffset, newOffset + ITEMS_PER_PAGE);
    setTableData(data);
    setItemOffset(newOffset);
  };

  return {
    link,
    profile,
    loading,
    isCopied,
    sidebarOpen,
    tableData,
    initialCards,
    pieChart,
    areaChart,
    marketingData,
    pageCount,
    itemOffset,
    currentPage,
    onToggleSideBar,
    handleSearchLeads,
    onChangeTextSearch,
    handleChangeLink,
    setSidebarOpen,
    handlePageClick,
    handleCopy,
    handleNewLead,
  };
};
export default useDashBoardHook;
