import { ERROR_SOMTHING_WENT_WRONG, FORMAT_DATE, MESSAGE } from '@/constants';
import { useAuthState } from '@/contexts/auth';
import { getFullNameUser, toastError, toastInfo, toastSuccess } from '@/utils';
import { ChangeEvent, useCallback, useState } from 'react';
import { getLeadsByReferralId, importLeadFromSheet, updateLead } from '@/queries/portalLeads';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setRefreshLeadData, updateLeadsAdmin } from '@/redux/slides/leadsAdminSlice';
import { LeadPaymentStatus, PriceByStatusLead } from '@/utils/enums';
import moment from 'moment';
import { Timestamp } from 'firebase/firestore';

const useTableHook = () => {
  const { isAdmin, profile } = useAuthState();
  const [loading, setLoading] = useState<boolean>(false);
  const leadsData = useSelector((state: RootState) => state.leadsAdminReducer.data);
  const dispatch = useDispatch();
  const [showModelCreateNotes, setShowModelCreateNotes] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [currentLeadId, setCurrentLeadId] = useState<string>('');
  const [isShowAddSheetUrlModal, setShowAddSheetUrlModal] = useState<boolean>(false);
  const [sheetUrl, setSheetUrl] = useState<string>('');
  const [isImportingLeads, setIsImportingLeads] = useState<boolean>(false);

  const onChangeSheetUrl = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSheetUrl(value);
  }, []);

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

  const onShowAddSheetUrlModal = useCallback(() => {
    setShowAddSheetUrlModal(true);
  }, []);

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

  const onImportLead = useCallback(async () => {
    try {
      setIsImportingLeads(true);
      await importLeadFromSheet(
        sheetUrl,
        getFullNameUser(profile?.firstName ?? '', profile?.lastName ?? ''),
        profile?.uid ?? ''
      );
      toastSuccess(MESSAGE.importLeadSuccess);
      dispatch(setRefreshLeadData(true));
      setShowAddSheetUrlModal(false);
    } catch (error) {
      console.log('Error when import leads: ', error);
      toastSuccess(MESSAGE.importLeadFail);
    } finally {
      setIsImportingLeads(false);
    }
  }, [sheetUrl, profile]);

  return {
    isImportingLeads,
    sheetUrl,
    isShowAddSheetUrlModal,
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
    onShowAddSheetUrlModal,
    setShowAddSheetUrlModal,
    onChangeSheetUrl,
    onImportLead,
  };
};

export default useTableHook;
