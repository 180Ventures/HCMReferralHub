import { useCallback, useEffect, useMemo, useState } from 'react';
import { DASHBOARD_MARKETING_DATA_TEMPLATE } from '@/utils/data';
import { IMarketingData } from '@/utils/types/dashboard';
import { useAuthState } from '@/contexts/auth';
import { useRouter } from 'next/router';
import { getLeads } from '@/queries/leads';
import { ROUTERS } from '@/constants';
import { ILead } from '@/utils/types';
import { generateLink } from '@/utils/generateLink';

export const copyContent = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Content copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

const useDashBoardHook = () => {
  const [textSearch, setTextSearch] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { profile } = useAuthState();
  const [link, setLink] = useState<string>(`${process.env.NEXT_PUBLIC_REFERRAL_URL}${generateLink(profile?.uid as string)}`);

  const [tableData, setTableData] = useState<ILead[]>([]);
  const [tableDataTemplate, setTableDataTemplate] = useState<ILead[]>([]);
  const [marketingData, setMarketingData] = useState<IMarketingData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { isAdmin } = useAuthState();

  const onToggleSideBar = useCallback((value: boolean) => {
    setSidebarOpen(value);
  },[sidebarOpen]);

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
      (item) => item.name.toLowerCase().trim().search(textSearch.toLowerCase().trim()) != -1
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
  
  useEffect(() => {
    if (isAdmin && window.location.pathname.includes(ROUTERS.home)) router.replace(ROUTERS.admin);
  }, [isAdmin]);

  useEffect(() => {
    Promise.allSettled([getLeadsData]).then((data) => {
      const [dataTableRes] = data;
      if (dataTableRes.status == 'fulfilled') {
        const { value } = dataTableRes;
        if(dataTableRes.value) {
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
