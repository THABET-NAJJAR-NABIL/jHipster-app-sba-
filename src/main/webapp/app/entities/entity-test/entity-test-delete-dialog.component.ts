import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEntityTest } from 'app/shared/model/entity-test.model';
import { EntityTestService } from './entity-test.service';

@Component({
  templateUrl: './entity-test-delete-dialog.component.html'
})
export class EntityTestDeleteDialogComponent {
  entityTest?: IEntityTest;

  constructor(
    protected entityTestService: EntityTestService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.entityTestService.delete(id).subscribe(() => {
      this.eventManager.broadcast('entityTestListModification');
      this.activeModal.close();
    });
  }
}
