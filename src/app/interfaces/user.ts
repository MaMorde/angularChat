import { Igender } from './gender';

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  birthday: Date;
  city: string;
  gender: string;
}
