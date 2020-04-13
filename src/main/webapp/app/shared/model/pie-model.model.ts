export interface IPieModel {
  id?: number;
  quantity?: number;
  label?: string;
}

export class PieModel implements IPieModel {
  constructor(public id?: number, public quantity?: number, public label?: string) {}
}
