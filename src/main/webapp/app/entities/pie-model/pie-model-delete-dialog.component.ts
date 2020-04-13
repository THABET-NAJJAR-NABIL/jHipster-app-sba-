import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPieModel } from 'app/shared/model/pie-model.model';
import { PieModelService } from './pie-model.service';

@Component({
  templateUrl: './pie-model-delete-dialog.component.html'
})
export class PieModelDeleteDialogComponent {
  pieModel?: IPieModel;

  constructor(protected pieModelService: PieModelService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pieModelService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pieModelListModification');
      this.activeModal.close();
    });
  }
}
