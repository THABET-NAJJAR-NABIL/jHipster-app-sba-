import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPieModel, PieModel } from 'app/shared/model/pie-model.model';
import { PieModelService } from './pie-model.service';

@Component({
  selector: 'jhi-pie-model-update',
  templateUrl: './pie-model-update.component.html'
})
export class PieModelUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    quantity: [],
    label: []
  });

  constructor(protected pieModelService: PieModelService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pieModel }) => {
      this.updateForm(pieModel);
    });
  }

  updateForm(pieModel: IPieModel): void {
    this.editForm.patchValue({
      id: pieModel.id,
      quantity: pieModel.quantity,
      label: pieModel.label
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pieModel = this.createFromForm();
    if (pieModel.id !== undefined) {
      this.subscribeToSaveResponse(this.pieModelService.update(pieModel));
    } else {
      this.subscribeToSaveResponse(this.pieModelService.create(pieModel));
    }
  }

  private createFromForm(): IPieModel {
    return {
      ...new PieModel(),
      id: this.editForm.get(['id'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      label: this.editForm.get(['label'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPieModel>>): void {
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
