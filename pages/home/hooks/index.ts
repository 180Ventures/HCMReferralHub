import { useCallback, useEffect, useState } from 'react';
import { DASHBOARD_MARKETING_DATA_TEMPLATE, DASHBOARD_TABLE_DATE_TEMPLATE } from '@/utils/data';
import { IDashBoardMarketingData, IDashBoardTableData } from '@/utils/types/dashboard';
import { useAuthState } from '@/contexts/auth';

const copyContent = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Content copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

const useDashBoardHook = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { profile } = useAuthState();
  const [link, setLink] = useState<string>(`${process.env.NEXT_PUBLIC_REFERRAL_URL + `?refid=${profile?.uid}`}`);

  const [tableData, setTableData] = useState<IDashBoardTableData[]>([]);
  const [marketingData, setMarketingData] = useState<IDashBoardMarketingData[]>([]);
  
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
  },[]);

  const handleNewLead = useCallback(() => {
    //TODO: handle add new lead
  }, []);

  useEffect(() => {
    //TODO: Waiting for api links
    setTableData(DASHBOARD_TABLE_DATE_TEMPLATE);
    setMarketingData(DASHBOARD_MARKETING_DATA_TEMPLATE);
  }, [])

  return {
    link,
    profile,
    isCopied,
    sidebarOpen,
    tableData,
    marketingData,
    handleChangeLink,
    setSidebarOpen,
    handleCopy,
    handleNewLead,
  };
};
export default useDashBoardHook;
