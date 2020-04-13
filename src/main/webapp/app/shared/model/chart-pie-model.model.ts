export interface IChartPieModel {
  id?: number;
  quantity?: number;
  lable?: string;
}

export class ChartPieModel implements IChartPieModel {
  constructor(public id?: number, public quantity?: number, public lable?: string) {}
}
