import { IUser } from './user';

export interface IMessage {
  id: number;
  user: IUser;
  text: string;
  editing: boolean;
  date: Date;
}
