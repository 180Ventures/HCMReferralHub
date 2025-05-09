import { ERROR_CODE_FIREBASE } from '@/constants';
import { FirebaseError } from 'firebase/app';
import { toast, ToastOptions } from 'react-toastify';

//Toast Notification
export const toastConfig: ToastOptions = {
  position: 'bottom-left',
  autoClose: 3000,
  theme: 'light',
  hideProgressBar: true,
};

export const toastError = (message: string) => {
  toast.error(message);
};

export const toastSuccess = (message: string) => {
  toast.success(message);
};

export const toastInfo = (message: string) => {
  toast.info(message);
};

export const toastWarning = (message: string) => {
  toast.warning(message);
};

//Local Storage
export const getItemLocalStorage = (key: string) => {
  const value = window.localStorage.getItem(key);
  return value;
};

export const setItemLocalStorage = (key: string, value: string) => {
  if (key && value) {
    window.localStorage.setItem(key, value);
  }
};

export const removeItemLocalStorage = (key: string) => {
  if (key) {
    window.localStorage.removeItem(key);
  }
};

export const removeAllLocalStorage = () => {
  window.localStorage.clear();
};

export const formatNumberWithCommas = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const showErrorMessageFirebase = (error: FirebaseError) => {
  const code = error.code as keyof typeof ERROR_CODE_FIREBASE;
  const errorMessage = ERROR_CODE_FIREBASE[code];
  toastError(errorMessage || 'Something went wrong please try again later!');
};

export const formatPhoneNumberToList = (phoneNumberInput: string) => {
  return phoneNumberInput
    .split(',')
    .map((phoneNumber) => formatPhoneNumber(phoneNumber))
    .join(', ');
};

export const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber
    .trim()
    .replace(/\D+/g, '')
    .replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
};

export const copyContent = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

export const getFirstCharacterName = (firstName: string) => {
  return (firstName && firstName.charAt(0)) ?? 'A';
};

export const getFullNameUser = (firstName: string, lastName: string) => {
  const fullName = (firstName ?? '') + ' ' + (lastName ?? '');
  return fullName.toLowerCase();
};

export const getListPhoneNumbers = (phoneNumber: string) => {
  const listPhoneNumberSplits = phoneNumber.split(',');
  return listPhoneNumberSplits.map(phoneNumber => formatPhoneNumber(phoneNumber));
};
