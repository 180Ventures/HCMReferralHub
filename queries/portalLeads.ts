import { db } from '@/firebase';
import {
  Timestamp,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
  doc,
  updateDoc,
} from 'firebase/firestore';

import { LeadCreateBy, Tables } from '@/utils/enums';
import { IAddLeadFormValues, IPortalLead } from '@/utils/types';

export const addLead = async (leadData: IAddLeadFormValues) => {
  const leadDocument = await addDoc(collection(db, Tables.portalLeads), {
    ...leadData,
    createdAt: Timestamp.now(),
  });
  return leadDocument;
};

export const getLeadsByReferralId = async (referralId: string, _limit?: number): Promise<IPortalLead[]> => {
  const q = query(
    collection(db, Tables.portalLeads),
    where('referralId', '==', referralId),
    orderBy('createdAt', 'desc'),
    limit(_limit || 999)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((it) => ({
    id: it.id,
    ...it.data(),
    createdAt: it.data().createdAt.toString(),
  })) as IPortalLead[];
};

export const countLeads = async (
  referralId: string,
  startDate: string,
  endDate: string,
  paymentStatus?: string
): Promise<number> => {
  let q;
  if (paymentStatus) {
    q = query(
      collection(db, Tables.portalLeads),
      where('referralId', '==', referralId),
      where('paymentStatus', '==', paymentStatus),
      where('createdAt', '>=', Timestamp.fromDate(new Date(startDate))),
      where('createdAt', '<=', Timestamp.fromDate(new Date(endDate)))
    );
  } else {
    q = query(
      collection(db, Tables.portalLeads),
      where('referralId', '==', referralId),
      where('createdAt', '>=', Timestamp.fromDate(new Date(startDate))),
      where('createdAt', '<=', Timestamp.fromDate(new Date(endDate)))
    );
  }
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length;
};

export const getAllLeads = async (_limit?: number): Promise<IPortalLead[]> => {
  const q = query(
    collection(db, Tables.portalLeads),
    where('createdBy', '==', LeadCreateBy.referralHub),
    orderBy('createdAt', 'desc'),
    limit(_limit || 999)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((it) => ({
    id: it.id,
    ...it.data(),
    createdAt: it.data().createdAt.toString(),
  })) as IPortalLead[];
};

export const updateLead = async (leadId: string, leadData: any) => {
  const leadRef = doc(db, Tables.portalLeads, leadId);
  return await updateDoc(leadRef, leadData);
};


export const importLeadFromSheet = async (googleSheetUrl: string, referralName: string, referralId: string) => {
  const data = await fetch(`/api/upload-lead-from-sheet`, {
    method: "POST",
    body: JSON.stringify({
      googleSheetUrl: googleSheetUrl,
      referralName: referralName,
      referralId: referralId,

    }),
  });
  const dataJson = await data.json();
  return dataJson;
};