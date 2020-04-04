import { AfterContentInit, Component, OnInit } from '@angular/core';
import { PieService } from 'app/core/pie_chartjs/pie.service';
import * as log from 'loglevel';

@Component({
  selector: 'jhi-chartjs-test',
  templateUrl: './chartjs-test.component.html',
  styleUrls: ['./chartjs-test.component.scss']
})
export class ChartjsTestComponent implements OnInit, AfterContentInit {
  dataResponse: any = [];
  pie_data: any = [];
  pie_labels: any = [];
  chartDataPie = [{ data: [], label: '' }];
  chartLabelsPie: any = [];
  chartOptions = {
    responsive: true
  };

  constructor(private pieService: PieService) {}

  ngOnInit(): void {
    setInterval(() => {
      this.getPieDataFromServer();
    }, 5000);
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

  ngAfterContentInit(): void {}
}
