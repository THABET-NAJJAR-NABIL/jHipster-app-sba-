export interface IPie {
  id?: any;
  quantity?: any;
  label?: string;
}

export class Pie implements IPie {
  constructor(public id?: any, public quantity?: any, public label?: string) {}
}
