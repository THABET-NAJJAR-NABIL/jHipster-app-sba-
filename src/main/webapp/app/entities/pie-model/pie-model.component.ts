import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPieModel } from 'app/shared/model/pie-model.model';
import { PieModelService } from './pie-model.service';
import { PieModelDeleteDialogComponent } from './pie-model-delete-dialog.component';

@Component({
  selector: 'jhi-pie-model',
  templateUrl: './pie-model.component.html'
})
export class PieModelComponent implements OnInit, OnDestroy {
  pieModels?: IPieModel[];
  eventSubscriber?: Subscription;

  constructor(protected pieModelService: PieModelService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.pieModelService.query().subscribe((res: HttpResponse<IPieModel[]>) => (this.pieModels = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPieModels();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPieModel): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPieModels(): void {
    this.eventSubscriber = this.eventManager.subscribe('pieModelListModification', () => this.loadAll());
  }

  delete(pieModel: IPieModel): void {
    const modalRef = this.modalService.open(PieModelDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pieModel = pieModel;
  }
}
