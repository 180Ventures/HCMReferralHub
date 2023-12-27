import { db } from '@/firebase';
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { UserData } from './type';
import { Tables } from '@/utils/enums';

export const getUser = async (userID: string): Promise<DocumentData | null> => {
  const docRef = doc(db, Tables.users, userID);
  const result = await getDoc(docRef);
  if (result.exists()) {
    return result.data();
  } else {
    return null;
  }
};

export const addUser = async (user: UserData) => {
  await setDoc(doc(db, Tables.users, user.uid), {
    uid: user.uid,
    email: user.email,
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    role: user.role,
    port: user.port,
  });
};

export const updateUser = async (userId: string, userData: any) => {
  const userRef = doc(db, Tables.users, userId);
  return await updateDoc(userRef, userData);
};

export const getUserByEmail = async (
  email: string
): Promise<DocumentData | null> => {
  const q = query(collection(db, Tables.users), where('email', '==', email));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((it) => ({
    id: it.id,
    ...it.data(),
  })) as DocumentData[];

  if(data.length === 0) return null;
  return data[0];
};
