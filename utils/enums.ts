export enum Tables {
  users = 'users',
  contacts = 'contacts',
  leads = 'leads',
  //delete
  comments = 'comments',
  replies = 'replies',
  chapters = 'chapters',
}

export enum LeadStatus {
  pending = 'Pending',
  won = 'Won',
  lost = 'Lost',
}

export enum PriceByStatusLead {
  won = 250,
  lost = 0,
}

export enum Roles {
  admin = 'admin',
  user = 'user',
}

export enum PromiseStatus {
  fulfilled = 'fulfilled',
  rejected = 'rejected',
}
