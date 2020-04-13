import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IChartPieModel, ChartPieModel } from 'app/shared/model/chart-pie-model.model';
import { ChartPieModelService } from './chart-pie-model.service';

@Component({
  selector: 'jhi-chart-pie-model-update',
  templateUrl: './chart-pie-model-update.component.html'
})
export class ChartPieModelUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    quantity: [null, [Validators.required]],
    lable: [null, [Validators.required]]
  });

  constructor(protected chartPieModelService: ChartPieModelService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chartPieModel }) => {
      this.updateForm(chartPieModel);
    });
  }

  updateForm(chartPieModel: IChartPieModel): void {
    this.editForm.patchValue({
      id: chartPieModel.id,
      quantity: chartPieModel.quantity,
      lable: chartPieModel.lable
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chartPieModel = this.createFromForm();
    if (chartPieModel.id !== undefined) {
      this.subscribeToSaveResponse(this.chartPieModelService.update(chartPieModel));
    } else {
      this.subscribeToSaveResponse(this.chartPieModelService.create(chartPieModel));
    }
  }

  private createFromForm(): IChartPieModel {
    return {
      ...new ChartPieModel(),
      id: this.editForm.get(['id'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      lable: this.editForm.get(['lable'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChartPieModel>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
