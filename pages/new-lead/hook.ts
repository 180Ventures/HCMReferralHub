import { ERROR_SOMTHING_WENT_WRONG, FIELD_REQUIRED, MESSAGE, ROUTERS } from '@/constants';
import { useAuthState } from '@/contexts/auth';
import { addLead } from '@/queries/portalLeads';
import { toastError, toastSuccess } from '@/utils';
import { LeadCreateBy, LeadPaymentStatus, PriceByStatusLead } from '@/utils/enums';
import { IAddLeadFormValues } from '@/utils/types';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import * as Yup from 'yup';

export const leadSchema = Yup.object().shape({
  firstName: Yup.string().required(FIELD_REQUIRED),
  lastName: Yup.string().required(FIELD_REQUIRED),
  phoneNumber: Yup.string()
    //.matches(/^[0-9]+$/, 'Phone number can only contain digits')
    // .min(10, 'Phone number must have at least 10 digits')
    .max(15, 'Phone number cannot have more than 15 digits')
    .required('Phone number is required'),
});

const useNewLeadHook = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { profile } = useAuthState();


  const fullName = useMemo(() => profile?.firstName + ' ' + profile?.lastName, [profile]);

  const initialValues: IAddLeadFormValues = useMemo(() => {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: '',
      subAdsCampaign: LeadCreateBy.referralHub,
      paymentStatus: LeadPaymentStatus.pending,
      createdBy: LeadCreateBy.referralHub,
      country: '',
      state: '',
      referralId: profile?.uid ?? '',
      referralName: fullName ?? '',
      note: '',
    }
  }, [fullName, profile]);

  const onSubmitForm = useCallback(async (values: IAddLeadFormValues) => {
    if (loading && !profile) return;
    try {
      setLoading(true);
      await addLead({
        ...values,
        referralName: fullName,
        referralId: profile?.uid ?? '',
      });
      toastSuccess(MESSAGE.addedNewLead);
      if (profile?.role === 'admin') router.push(ROUTERS.admin);
      else router.push(ROUTERS.home);
    } catch (error) {
      console.error(error);
      toastError(ERROR_SOMTHING_WENT_WRONG);
    } finally {
      setLoading(false);
    }
  }, []);
  return {
    initialValues,
    loading,
    onSubmitForm,
  };
};

export default useNewLeadHook;
