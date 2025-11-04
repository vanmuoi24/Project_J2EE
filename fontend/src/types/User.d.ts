export type User = {
  id: number;
  username: string;
  avatar?: string;
  address: string;
  email: string;
  phone: string;
};

export interface IUserUpdate {
  username?: string;
  file?: File;
  phone?: string;
  address?: string;
}
