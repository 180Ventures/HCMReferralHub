import { ERROR_SOMTHING_WENT_WRONG, MESSAGE } from '@/constants';
import { useAuthState } from '@/contexts/auth';
import { toastError, toastInfo, toastSuccess } from '@/utils';
import { useCallback, useState } from 'react';
import { copyContent } from '../../hooks';
import { updateLead } from '@/queries/leads';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateLeadsAdmin } from '@/redux/slides/leadsAdminSlice';
import { LeadStatus, PriceByStatusLead } from '@/utils/enums';

const useTableHook = () => {
  const { isAdmin } = useAuthState();
  const [loading, setLoading] = useState<boolean>(false);
  const leadsData = useSelector(
    (state: RootState) => state.leadsAdminReducer.data
  );
  const dispatch = useDispatch();

  const handleCopy = useCallback(async (subReferralLink: string) => {
    await copyContent(process.env.NEXT_PUBLIC_REFERRAL_URL + subReferralLink);
    toastInfo(MESSAGE.copied);
  }, []);

  const handleChangeStatus = useCallback(
    async (stsId: string, leadId?: string) => {
      if (!leadId) return;
      try {
        setLoading(true);
        const dataParams = { status: stsId, price: stsId === LeadStatus.sold ? PriceByStatusLead.sold : PriceByStatusLead.loss}
        await updateLead(leadId, dataParams);
        const leadsUpdated = leadsData.map(item => {
          if(item.id === leadId) return { ...item, ...dataParams};
          return item;
        })
        dispatch(updateLeadsAdmin(leadsUpdated));
        toastSuccess(MESSAGE.updatedLead);
      } catch (error) {
        console.error(error);
        toastError(ERROR_SOMTHING_WENT_WRONG);
      } finally {
        setLoading(false);
      }
    },[leadsData]);

  return {
    isAdmin,
    loading,
    setLoading,
    handleChangeStatus,
    handleCopy,
  };
};

export default useTableHook;
