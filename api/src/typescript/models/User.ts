export interface IUserData {
  firstName: string;
  lastName: string;
  middleName?: string;
  bio?: string;
  email: string;
  password: string;
}

export interface IUserUpdateData {
  bio?: string;
}
