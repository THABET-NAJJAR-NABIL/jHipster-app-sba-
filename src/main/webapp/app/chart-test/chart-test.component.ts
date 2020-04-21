import { Component, OnInit } from '@angular/core';
import { PieService } from 'app/core/pie_chartjs/pie.service';
import * as log from 'loglevel';
import { HttpResponse } from '@angular/common/http';
import { IChartPieModel } from 'app/shared/model/chart-pie-model.model';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'jhi-chart-test',
  templateUrl: './chart-test.component.html',
  styleUrls: ['./chart-test.component.scss']
})
export class ChartTestComponent implements OnInit {
  faCoffee = faCoffee;
  dataResponse: any = [];
  pie_data: any = [];
  pie_labels: any = [];
  chartDataPie = [{ data: [], label: '' }];
  chartLabelsPie: any = [];
  chartOptions = {
    responsive: true
  };
  // test pull request
  // merging test test

  greeting: any;
  name = '';

  constructor(private pieService: PieService) {}

  ngOnInit(): void {
    this.getPieDataFromServer();
  }

  getPieDataFromServer(): void {
    this.pieService.query().subscribe((response: HttpResponse<IChartPieModel[]>) => {
      this.dataResponse = response.body || [];
      log.warn('CHART PIE MODEL SERVER RESPONSE :', response.body);
      this.pie_data.length = 0;
      this.pie_labels.length = 0;
      for (let i = 0; i < this.dataResponse.length; i++) {
        this.pie_data.push(this.dataResponse[i].quantity);
        this.pie_labels.push(this.dataResponse[i].lable);
      }

      this.chartDataPie = [{ data: this.pie_data, label: 'Group' }];
      this.chartLabelsPie = this.pie_labels;
      log.warn('CHART PIE MODEL SERVER RESPONSE :', this.chartDataPie);
    });
  }
  // hello feature_1

  handleMessage(message: any): void {
    this.greeting = message;
  }
}
