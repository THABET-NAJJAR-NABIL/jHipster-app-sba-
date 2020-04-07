import { IUser } from 'app/core/user/user.model';

export interface IBook {
  id?: number;
  isbn?: string;
  title?: string;
  description?: string;
  user?: IUser;
}

export class Book implements IBook {
  constructor(public id?: number, public isbn?: string, public title?: string, public description?: string, public user?: IUser) {}
}
