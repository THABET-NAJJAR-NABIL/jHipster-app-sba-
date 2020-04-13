import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEntityTest } from 'app/shared/model/entity-test.model';
import { EntityTestService } from './entity-test.service';
import { EntityTestDeleteDialogComponent } from './entity-test-delete-dialog.component';

@Component({
  selector: 'jhi-entity-test',
  templateUrl: './entity-test.component.html'
})
export class EntityTestComponent implements OnInit, OnDestroy {
  entityTests?: IEntityTest[];
  eventSubscriber?: Subscription;

  constructor(protected entityTestService: EntityTestService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.entityTestService.query().subscribe((res: HttpResponse<IEntityTest[]>) => (this.entityTests = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEntityTests();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEntityTest): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEntityTests(): void {
    this.eventSubscriber = this.eventManager.subscribe('entityTestListModification', () => this.loadAll());
  }

  delete(entityTest: IEntityTest): void {
    const modalRef = this.modalService.open(EntityTestDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.entityTest = entityTest;
  }
}
