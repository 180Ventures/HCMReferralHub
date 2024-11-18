import { ERROR_SOMTHING_WENT_WRONG, FORMAT_DATE, MESSAGE } from '@/constants';
import { useAuthState } from '@/contexts/auth';
import { toastError, toastInfo, toastSuccess } from '@/utils';
import { useCallback, useState } from 'react';
import { updateLead } from '@/queries/portalLeads';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateLeadsAdmin } from '@/redux/slides/leadsAdminSlice';
import { LeadPaymentStatus, PriceByStatusLead } from '@/utils/enums';
import moment from 'moment';
import { Timestamp } from 'firebase/firestore';

const useTableHook = () => {
  const { isAdmin } = useAuthState();
  const [loading, setLoading] = useState<boolean>(false);
  const leadsData = useSelector((state: RootState) => state.leadsAdminReducer.data);
  const dispatch = useDispatch();

  const [showModelCreateNotes, setShowModelCreateNotes] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [currentLeadId, setCurrentLeadId] = useState<string>('');

  const handleChangeStatus = useCallback(
    async (status: string, leadId?: string) => {
      if (!leadId) return;
      try {
        setLoading(true);
        const dataParams = {
          paymentStatus: status,
          wonDateSubmitted: status === LeadPaymentStatus.won ? Timestamp.now() : null,
        };
        await updateLead(leadId, dataParams);
        const leadsUpdated = leadsData.map((item) => {
          if (item.id === leadId) return { ...item, ...dataParams };
          return item;
        });
        dispatch(updateLeadsAdmin(leadsUpdated));
        toastSuccess(MESSAGE.updatedLead);
      } catch (error) {
        console.error(error);
        toastError(ERROR_SOMTHING_WENT_WRONG);
      } finally {
        setLoading(false);
      }
    },
    [leadsData]
  );

  const handleClickNotes = useCallback((leadId: string, leadNotes: string) => {
    setNotes(leadNotes);
    setShowModelCreateNotes(true);
    setCurrentLeadId(leadId);
  }, []);

  const handleSaveNotes = useCallback(async () => {
    try {
      setLoading(true);
      const dataParams = { note: notes };
      await updateLead(currentLeadId, dataParams);
      const leadsUpdated = leadsData.map((item) => {
        if (item.id === currentLeadId) return { ...item, ...dataParams };
        return item;
      });
      dispatch(updateLeadsAdmin(leadsUpdated));
      toastSuccess(MESSAGE.updatedLead);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setShowModelCreateNotes(false);
    }
  }, [notes, currentLeadId]);

  return {
    isAdmin,
    loading,
    notes,
    showModelCreateNotes,
    setNotes,
    setLoading,
    handleSaveNotes,
    setShowModelCreateNotes,
    handleClickNotes,
    handleChangeStatus,
  };
};

export default useTableHook;
