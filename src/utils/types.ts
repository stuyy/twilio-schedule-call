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
