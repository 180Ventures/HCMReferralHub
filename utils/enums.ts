export enum Tables {
  users = 'users',
  contacts = 'contacts',
  portalLeads = 'portalLeads',
  //delete
  // leads = 'leads',
  comments = 'comments',
  replies = 'replies',
  chapters = 'chapters',
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


export enum LeadPaymentStatus {
  won = 'won',
  pending = 'pending',
  loss = 'loss',
};

export enum LeadCreateBy {
  referralHub = 'referralHub'
}