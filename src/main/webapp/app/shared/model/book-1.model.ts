export interface IBook1 {
  id?: number;
  isbn?: string;
  title?: string;
  description?: string;
}

export class Book1 implements IBook1 {
  constructor(public id?: number, public isbn?: string, public title?: string, public description?: string) {}
}
