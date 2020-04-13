import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChartPieModel } from 'app/shared/model/chart-pie-model.model';

@Component({
  selector: 'jhi-chart-pie-model-detail',
  templateUrl: './chart-pie-model-detail.component.html'
})
export class ChartPieModelDetailComponent implements OnInit {
  chartPieModel: IChartPieModel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chartPieModel }) => (this.chartPieModel = chartPieModel));
  }

  previousState(): void {
    window.history.back();
  }
}
