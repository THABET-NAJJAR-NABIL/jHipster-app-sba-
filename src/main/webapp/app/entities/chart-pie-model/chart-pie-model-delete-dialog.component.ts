import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChartPieModel } from 'app/shared/model/chart-pie-model.model';
import { ChartPieModelService } from './chart-pie-model.service';

@Component({
  templateUrl: './chart-pie-model-delete-dialog.component.html'
})
export class ChartPieModelDeleteDialogComponent {
  chartPieModel?: IChartPieModel;

  constructor(
    protected chartPieModelService: ChartPieModelService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chartPieModelService.delete(id).subscribe(() => {
      this.eventManager.broadcast('chartPieModelListModification');
      this.activeModal.close();
    });
  }
}
