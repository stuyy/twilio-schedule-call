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
