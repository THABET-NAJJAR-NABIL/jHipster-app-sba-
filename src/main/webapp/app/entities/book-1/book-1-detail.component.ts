import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBook1 } from 'app/shared/model/book-1.model';

@Component({
  selector: 'jhi-book-1-detail',
  templateUrl: './book-1-detail.component.html'
})
export class Book1DetailComponent implements OnInit {
  book1: IBook1 | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ book1 }) => (this.book1 = book1));
  }

  previousState(): void {
    window.history.back();
  }
}
