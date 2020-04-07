import { Component, OnInit } from '@angular/core';
import { PieService } from 'app/core/pie_chartjs/pie.service';
import * as log from 'loglevel';
import { WebSocketAPI } from '../WebSocketAPI';

@Component({
  selector: 'jhi-chartjs-test',
  templateUrl: './chartjs-test.component.html',
  styleUrls: ['./chartjs-test.component.scss']
})
export class ChartjsTestComponent implements OnInit {
  dataResponse: any = [];
  pie_data: any = [];
  pie_labels: any = [];
  chartDataPie = [{ data: [], label: '' }];
  chartLabelsPie: any = [];
  chartOptions = {
    responsive: true
  };
  // test pull request
  // merging test

  webSocketAPI: WebSocketAPI | undefined;
  greeting: any;
  name = '';

  constructor(private pieService: PieService) {}

  ngOnInit(): void {
    // setInterval(() => {this.getPieDataFromServer();}, 5000);
    this.webSocketAPI = new WebSocketAPI();
  }

  getPieDataFromServer(): void {
    this.pieService.getAll().subscribe(
      response => {
        this.dataResponse = response;
        this.pie_data.length = 0;
        this.pie_labels.length = 0;
        for (let i = 0; i < this.dataResponse.length; i++) {
          this.pie_data.push(this.dataResponse[i].quantity);
          this.pie_labels.push(this.dataResponse[i].label);
        }
        this.chartDataPie = [{ data: this.pie_data, label: 'Group' }];
        this.chartLabelsPie = this.pie_labels;
      },
      err => {
        log.warn('ERROR', err);
      }
    );
  }
  connect(): void {
    // @ts-ignore
    this.webSocketAPI._connect();
  }

  disconnect(): void {
    // @ts-ignore
    this.webSocketAPI._disconnect();
  }

  sendMessage(): void {
    // @ts-ignore
    this.webSocketAPI._send(this.name);
  }

  // hello feature_1
  handleMessage(message: any): void {
    this.greeting = message;
  }
}
