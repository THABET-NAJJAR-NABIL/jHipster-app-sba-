import { Component, OnInit } from '@angular/core';
import { PieService } from 'app/core/pie_chartjs/pie.service';
import * as log from 'loglevel';
import { repeat } from 'rxjs/operators';

@Component({
  selector: 'jhi-chartjs-test',
  templateUrl: './chartjs-test.component.html',
  styleUrls: ['./chartjs-test.component.scss']
})
export class ChartjsTestComponent implements OnInit {
  dataResponse: any = [];
  pie_data: any = [];
  pie_labels: any = [];
  chartDataPie: any = [];
  chartLabelsPie: any = [];
  chartOptions = {
    responsive: true
  };

  chartDataLine = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];

  chartLabelsLine = ['January', 'February', 'Mars', 'April'];

  constructor(private pieService: PieService) {}

  ngOnInit(): void {
    this.pieService.getAll().subscribe(
      response => {
        this.dataResponse = response;
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
}
