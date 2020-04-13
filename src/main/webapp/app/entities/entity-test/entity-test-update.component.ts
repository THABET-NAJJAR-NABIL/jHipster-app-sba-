import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEntityTest, EntityTest } from 'app/shared/model/entity-test.model';
import { EntityTestService } from './entity-test.service';

@Component({
  selector: 'jhi-entity-test-update',
  templateUrl: './entity-test-update.component.html'
})
export class EntityTestUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    test: [null, [Validators.required]]
  });

  constructor(protected entityTestService: EntityTestService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entityTest }) => {
      this.updateForm(entityTest);
    });
  }

  updateForm(entityTest: IEntityTest): void {
    this.editForm.patchValue({
      id: entityTest.id,
      test: entityTest.test
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entityTest = this.createFromForm();
    if (entityTest.id !== undefined) {
      this.subscribeToSaveResponse(this.entityTestService.update(entityTest));
    } else {
      this.subscribeToSaveResponse(this.entityTestService.create(entityTest));
    }
  }

  private createFromForm(): IEntityTest {
    return {
      ...new EntityTest(),
      id: this.editForm.get(['id'])!.value,
      test: this.editForm.get(['test'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntityTest>>): void {
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
