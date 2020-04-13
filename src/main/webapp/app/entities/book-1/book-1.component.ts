import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBook1 } from 'app/shared/model/book-1.model';
import { Book1Service } from './book-1.service';
import { Book1DeleteDialogComponent } from './book-1-delete-dialog.component';

@Component({
  selector: 'jhi-book-1',
  templateUrl: './book-1.component.html'
})
export class Book1Component implements OnInit, OnDestroy {
  book1S?: IBook1[];
  eventSubscriber?: Subscription;

  constructor(protected book1Service: Book1Service, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.book1Service.query().subscribe((res: HttpResponse<IBook1[]>) => (this.book1S = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBook1S();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBook1): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBook1S(): void {
    this.eventSubscriber = this.eventManager.subscribe('book1ListModification', () => this.loadAll());
  }

  delete(book1: IBook1): void {
    const modalRef = this.modalService.open(Book1DeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.book1 = book1;
  }
}
