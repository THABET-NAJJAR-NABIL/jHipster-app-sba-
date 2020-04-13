import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBook1, Book1 } from 'app/shared/model/book-1.model';
import { Book1Service } from './book-1.service';

@Component({
  selector: 'jhi-book-1-update',
  templateUrl: './book-1-update.component.html'
})
export class Book1UpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    isbn: [null, [Validators.required]],
    title: [null, [Validators.required]],
    description: [null, [Validators.required]]
  });

  constructor(protected book1Service: Book1Service, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ book1 }) => {
      this.updateForm(book1);
    });
  }

  updateForm(book1: IBook1): void {
    this.editForm.patchValue({
      id: book1.id,
      isbn: book1.isbn,
      title: book1.title,
      description: book1.description
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const book1 = this.createFromForm();
    if (book1.id !== undefined) {
      this.subscribeToSaveResponse(this.book1Service.update(book1));
    } else {
      this.subscribeToSaveResponse(this.book1Service.create(book1));
    }
  }

  private createFromForm(): IBook1 {
    return {
      ...new Book1(),
      id: this.editForm.get(['id'])!.value,
      isbn: this.editForm.get(['isbn'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBook1>>): void {
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
