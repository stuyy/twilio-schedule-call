export type CreateUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
  mobile: string;
}>;

export type UpdateUserParams = Partial<{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile: string;
  verified: boolean;
}>;

export type VerifyCodeResponse = {
  sid: string;
  serviceSid: string;
  accountSid: string;
  to: string;
  channel: string;
  status: string;
  valid: boolean;
  amount?: number;
  payee?: any;
  dateCreated: Date;
  dateUpdated: Date;
};

export type VerifyPhoneParams = {
  userId: number;
  mobile: string;
  code: string;
};

export type ScheduledCallStatus =
  | 'scheduled'
  | 'completed'
  | 'failed'
  | 'cancelled';

export type CreateSMSDetails = {
  to: string;
  from: string;
  body: string;
};
