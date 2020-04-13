import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBook1 } from 'app/shared/model/book-1.model';
import { Book1Service } from './book-1.service';

@Component({
  templateUrl: './book-1-delete-dialog.component.html'
})
export class Book1DeleteDialogComponent {
  book1?: IBook1;

  constructor(protected book1Service: Book1Service, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.book1Service.delete(id).subscribe(() => {
      this.eventManager.broadcast('book1ListModification');
      this.activeModal.close();
    });
  }
}
