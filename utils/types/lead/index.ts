export interface ILead {
  id?: string;
  // name: string;
  phone: string;
  name: string;
  status?: string;
  price?: string;
  payout?: string | Date;

  userId?: string;
  userName?: string;
  
  createdAt?: string;
}
