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

import { Tables } from '@/utils/enums';
import { ILead } from '@/utils/types';

export const addLead = async (leadData: ILead) => {
  const leadDocument = await addDoc(collection(db, Tables.leads), {
    name: leadData.name,
    phone: leadData.phone,
    referralId: leadData.referralId,
    referralName: leadData.referralName,
    status: leadData.status,
    price: leadData.price,
    payout: leadData.payout,
    note: leadData.note,
    createdAt: Timestamp.now(),
  });
  return leadDocument;
};

export const getLeads = async (
  referralId: string,
  _limit?: number
): Promise<ILead[]> => {
  const q = query(
    collection(db, Tables.leads),
    where('referralId', '==', referralId),
    orderBy('createdAt', 'desc'),
    limit(_limit || 999)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((it) => ({
    id: it.id,
    ...it.data(),
    createdAt: it.data().createdAt.toString(),
  })) as ILead[];
};

export const countLeads = async (
  referralId: string,
  startDate: string,
  endDate: string,
  status?: string
): Promise<number> => {
  let q;
  if (status) {
    q = query(
      collection(db, Tables.leads),
      where('referralId', '==', referralId),
      where('status', '==', status),
      where('createdAt', '>=', Timestamp.fromDate(new Date(startDate))),
      where('createdAt', '<=', Timestamp.fromDate(new Date(endDate)))
    );
  } else {
    q = query(
      collection(db, Tables.leads),
      where('referralId', '==', referralId),
      where('createdAt', '>=', Timestamp.fromDate(new Date(startDate))),
      where('createdAt', '<=', Timestamp.fromDate(new Date(endDate)))
    );
  }
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length;
};

export const getAllLeads = async (_limit?: number): Promise<ILead[]> => {
  const q = query(
    collection(db, Tables.leads),
    orderBy('createdAt', 'desc'),
    limit(_limit || 999)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((it) => ({
    id: it.id,
    ...it.data(),
    createdAt: it.data().createdAt.toString(),
  })) as ILead[];
};

export const updateLead = async (leadId: string, leadData: any) => {
  const leadRef = doc(db, Tables.leads, leadId);
  return await updateDoc(leadRef, leadData);
};
