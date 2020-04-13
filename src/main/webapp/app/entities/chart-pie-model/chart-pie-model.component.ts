import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChartPieModel } from 'app/shared/model/chart-pie-model.model';
import { ChartPieModelService } from './chart-pie-model.service';
import { ChartPieModelDeleteDialogComponent } from './chart-pie-model-delete-dialog.component';

@Component({
  selector: 'jhi-chart-pie-model',
  templateUrl: './chart-pie-model.component.html'
})
export class ChartPieModelComponent implements OnInit, OnDestroy {
  chartPieModels?: IChartPieModel[];
  eventSubscriber?: Subscription;

  constructor(
    protected chartPieModelService: ChartPieModelService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.chartPieModelService.query().subscribe((res: HttpResponse<IChartPieModel[]>) => (this.chartPieModels = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInChartPieModels();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IChartPieModel): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInChartPieModels(): void {
    this.eventSubscriber = this.eventManager.subscribe('chartPieModelListModification', () => this.loadAll());
  }

  delete(chartPieModel: IChartPieModel): void {
    const modalRef = this.modalService.open(ChartPieModelDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.chartPieModel = chartPieModel;
  }
}
