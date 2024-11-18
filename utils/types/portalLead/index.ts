import { Timestamp } from "firebase/firestore";

// export interface ILead {
//   id?: string;
//   name: string;
//   phone: string;
//   status?: string;
//   price?: number;
//   payout?: string | Date;
//   createdAt?: string;
// }


export type IAddLeadFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  subAdsCampaign: string;
  paymentStatus: string;
  createdBy: string;
  country: string;
  state: string;
  referralId: string;
  referralName: string;
  note: string
}

export interface IPortalLead extends IAddLeadFormValues {
  id: string;
  createdAt: Timestamp;
  wonDateSubmitted: Timestamp | null;
  firstYearPremium: number;
}