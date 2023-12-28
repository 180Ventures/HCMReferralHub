export interface ILead {
  id?: string;
  name: string;
  phone: string;
  status?: string;
  price?: number;
  payout?: string | Date;
  referralId?: string;
  referralName?: string;
  createdAt?: string;
  note?: string;
}
