import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPieModel } from 'app/shared/model/pie-model.model';

@Component({
  selector: 'jhi-pie-model-detail',
  templateUrl: './pie-model-detail.component.html'
})
export class PieModelDetailComponent implements OnInit {
  pieModel: IPieModel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pieModel }) => (this.pieModel = pieModel));
  }

  previousState(): void {
    window.history.back();
  }
}
