import { useCallback, useEffect, useMemo, useState } from 'react';
import { DASHBOARD_MARKETING_DATA_TEMPLATE } from '@/utils/data';
import { IMarketingData } from '@/utils/types/dashboard';
import { useAuthState } from '@/contexts/auth';
import { useRouter } from 'next/router';
import { countLeads, getLeads } from '@/queries/leads';
import { FORMAT_DATE, ROUTERS, USDollar } from '@/constants';
import { ILead } from '@/utils/types';
import { generateLink } from '@/utils/generateLink';
import moment from 'moment';
import { LeadStatus, PriceByStatusLead, PromiseStatus } from '@/utils/enums';

export const copyContent = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

const useDashBoardHook = () => {
  const [textSearch, setTextSearch] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { profile } = useAuthState();
  const [link, setLink] = useState<string>(
    `${process.env.NEXT_PUBLIC_REFERRAL_URL}${generateLink(
      profile?.uid as string
    )}`
  );

  const [tableData, setTableData] = useState<ILead[]>([]);
  const [tableDataTemplate, setTableDataTemplate] = useState<ILead[]>([]);
  const [marketingData, setMarketingData] = useState<IMarketingData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { isAdmin } = useAuthState();
  const [totalLeads, setTotalLeads] = useState<number>(0);
  const [totalClients, setTotalClients] = useState<number>(0);
  const [pieChart, setPieCart] = useState<number[]>([0,0,0]);

  const initialCards = [
    {
      id: 'card_01',
      value: `${totalClients} Clients`,
      title: 'helped this month',
      progress: 90,
      price: USDollar.format(totalClients * +PriceByStatusLead.won),
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

  const onChangeTextSearch = useCallback(
    (value: string) => {
      if (!value) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setTableData(tableDataTemplate);
        }, 500);
      }
      setTextSearch(value);
    },
    [tableDataTemplate]
  );

  const handleSearchLeads = useCallback(() => {
    setLoading(true);
    const values = tableDataTemplate.filter(
      (item) =>
        item.name
          .toLowerCase()
          .trim()
          .search(textSearch.toLowerCase().trim()) != -1
    );
    setTimeout(() => {
      setLoading(false);
      setTableData(values);
    }, 500);
  }, [textSearch]);

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
    return getLeads(profile?.uid);
  }, [profile]);

  const countLeadsOfWeek = useMemo(() => {
    if (!profile) return null;
    try {
      const startOfWeek = moment().startOf('week').add(1, 'day').format(FORMAT_DATE.monthDayYear);
      const endOfWeek = moment().endOf('week').add(1, 'day').format(FORMAT_DATE.monthDayYear);
      return countLeads(profile?.uid, startOfWeek, endOfWeek);
    } catch (error) {
      console.log(error);
    }
  }, [profile]);

  const countClientThisMonth = useMemo(() => {
    if (!profile) return null;
    try {
      const startOfThisMonth = moment().startOf('month').format(FORMAT_DATE.monthDayYear);
      const endOfThisMonth = moment().endOf('month').format(FORMAT_DATE.monthDayYear);      
      return countLeads(profile?.uid, startOfThisMonth, endOfThisMonth, LeadStatus.won);
    } catch (error) {
      console.log(error);
    }
  }, [profile]);

  const getChartData = useMemo(() => {
    if (!profile) return [];
    const startOfThisMonth = moment().startOf('month').format(FORMAT_DATE.monthDayYear);
    const endOfThisMonth = moment().endOf('month').format(FORMAT_DATE.monthDayYear);      
    return [
      countLeads(profile?.uid, startOfThisMonth, endOfThisMonth, LeadStatus.pending),
      countLeads(profile?.uid, startOfThisMonth, endOfThisMonth, LeadStatus.won),
      countLeads(profile?.uid, startOfThisMonth, endOfThisMonth, LeadStatus.lost)
    ]
  }, [profile]);

  useEffect(() => {
    if (isAdmin && window.location.pathname.includes(ROUTERS.home))
      router.replace(ROUTERS.admin);
  }, [isAdmin]);

  useEffect(() => {
    Promise.allSettled([getLeadsData, countLeadsOfWeek, countClientThisMonth, ...getChartData]).then((data) => {
      const [dataTableRes, leadsOfWeek, clientThisMonth, pedingData, wonData, lostData] = data;

      if(pedingData.status === PromiseStatus.fulfilled && wonData.status == PromiseStatus.fulfilled && lostData.status === PromiseStatus.fulfilled) {
        setPieCart([pedingData.value, wonData.value, lostData.value]);
      }

      if(clientThisMonth.status === PromiseStatus.fulfilled) {
        const { value } = clientThisMonth;
        if(value) setTotalClients(value);
      }

      if(leadsOfWeek.status === PromiseStatus.fulfilled) {
        const { value } = leadsOfWeek;
        if(value) setTotalLeads(value);
      }
      if (dataTableRes.status == PromiseStatus.fulfilled) {
        const { value } = dataTableRes;
        if (dataTableRes.value) {
          setTableData(value as ILead[]);
          setTableDataTemplate(value as ILead[]);
        }
      }
      setMarketingData(DASHBOARD_MARKETING_DATA_TEMPLATE);
    });
  }, []);

  return {
    link,
    profile,
    loading,
    isCopied,
    sidebarOpen,
    tableData,
    initialCards,
    pieChart,
    marketingData,
    onToggleSideBar,
    handleSearchLeads,
    onChangeTextSearch,
    handleChangeLink,
    setSidebarOpen,
    handleCopy,
    handleNewLead,
  };
};
export default useDashBoardHook;
