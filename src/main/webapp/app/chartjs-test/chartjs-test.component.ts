import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-chartjs-test',
  templateUrl: './chartjs-test.component.html',
  styleUrls: ['./chartjs-test.component.scss']
})
export class ChartjsTestComponent implements OnInit {
  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];
  constructor() {}

  ngOnInit(): void {}
}
