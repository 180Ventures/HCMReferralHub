import { ERROR_SOMTHING_WENT_WRONG, FIELD_REQUIRED, MESSAGE, ROUTERS } from '@/constants';
import { useAuthState } from '@/contexts/auth';
import { addLead } from '@/queries/leads';
import { toastError, toastSuccess } from '@/utils';
import { LeadStatus, PriceByStatusLead } from '@/utils/enums';
import { generateLink } from '@/utils/generateLink';
import { ILead } from '@/utils/types';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import * as Yup from 'yup';

export const inititalValues: ILead = {
  name: '',
  phone: '',
  payout: '',
  status: LeadStatus.pending,
  price: PriceByStatusLead.lost,
  referralName: '',
  referralId: '',
  note: '',
};

export const leadSchema = Yup.object().shape({
  name: Yup.string().required(FIELD_REQUIRED),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number can only contain digits')
    .min(10, 'Phone number must have at least 10 digits')
    .max(15, 'Phone number cannot have more than 15 digits')
    .required('Phone number is required'),
});

const useNewLeadHook = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { profile } = useAuthState();

  const fullName = useMemo(() => profile?.firstName + ' ' + profile?.lastName, [profile]);

  const onSubmitForm = useCallback(async (values: ILead) => {
    if (loading && !profile) return;
    try {
      setLoading(true);
      await addLead({
        ...values,
        referralName: fullName,
        referralId: profile?.uid,
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
    loading,
    onSubmitForm,
  };
};

export default useNewLeadHook;
