import { ROUTERS } from '@/constants';
import { useAuthState } from '@/contexts/auth';
import { getAllLeads } from '@/queries/leads';
import { updateLeadsAdmin } from '@/redux/slides/leadsAdminSlice';
import { RootState } from '@/redux/store';
import { ILead } from '@/utils/types';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useAdminHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<ILead[]>([]);
  const [textSearch, setTextSearch] = useState<string>('');
  const router = useRouter();
  const leadsData = useSelector((state: RootState) => state.leadsAdminReducer.data);
  const { profile, isAdmin } = useAuthState();

  const onChangeTextSearch = useCallback(
    (value: string) => {
      if (!value) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setTableData(leadsData);
        }, 500);
      }
      setTextSearch(value);
    },
    [leadsData]
  );

  const handleSearchLeads = useCallback(() => {
    setLoading(true);
    const values = leadsData.filter(
      (item) => item.name.toLowerCase().trim().search(textSearch.toLowerCase().trim()) != -1
    );
    setTimeout(() => {
      setLoading(false);
      setTableData(values);
    }, 500);
  }, [textSearch]);

  const fetchLeads = useCallback(async () => {
    try {
      const response = await getAllLeads();
      dispatch(updateLeadsAdmin(response));
    } catch (error) {
      console.error(error);
      dispatch(updateLeadsAdmin([]));
    }
  }, [profile]);

  useEffect(() => {
    if (!isAdmin) router.replace(ROUTERS.home);
  }, [isAdmin]);

  useEffect(() => {
    isAdmin && fetchLeads();
  }, [profile]);

  useEffect(() => {
    const values = leadsData.filter(
      (item) => item.name.toLowerCase().trim().search(textSearch.toLowerCase().trim()) != -1
    );
    setTableData(values);
  }, [leadsData]);

  return { tableData, loading, leadsData, handleSearchLeads, onChangeTextSearch };
};

export default useAdminHook;
