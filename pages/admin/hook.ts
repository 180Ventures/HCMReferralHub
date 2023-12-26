import { ROUTERS } from '@/constants';
import { useAuthState } from '@/contexts/auth';
import { getAllContactWithRefId } from '@/queries/contacts';
import { getAllLeads } from '@/queries/leads';
import { updateLeadsAdmin } from '@/redux/slides/leadsAdminSlice';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useAdminHook = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const leadsData = useSelector(
    (state: RootState) => state.leadsAdminReducer.data
  );
  const { profile, isAdmin } = useAuthState();

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

  return { leadsData };
};

export default useAdminHook;
