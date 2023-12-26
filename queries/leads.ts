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
} from 'firebase/firestore';

import { Tables } from '@/utils/enums';
import { ILead } from '@/utils/types';

export const addLead = async (leadData: ILead) => {
  const leadDocument = await addDoc(collection(db, Tables.leads), {
    name: leadData.name,
    phone: leadData.phone,
    userId: leadData.userId,
    userName: leadData.userName,
    status: leadData.status,
    price: leadData.price,
    payout: leadData.payout,
    createdAt: Timestamp.now(),
  });
  return leadDocument;
};

export const getLeads = async (
  userId: string,
  _limit?: number
): Promise<ILead[]> => {
  const q = query(
    collection(db, Tables.leads),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(_limit || 999)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((it) => ({
    id: it.id,
    ...it.data(),
    createdAt: it.data().createdAt.toString()
  })) as ILead[];
};

export const getAllLeads = async (
  _limit?: number
): Promise<ILead[]> => {
  const q = query(
    collection(db, Tables.leads),
    orderBy('createdAt', 'desc'),
    limit(_limit || 999)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((it) => ({
    id: it.id,
    ...it.data(),
    createdAt: it.data().createdAt.toString()
  })) as ILead[];
};
