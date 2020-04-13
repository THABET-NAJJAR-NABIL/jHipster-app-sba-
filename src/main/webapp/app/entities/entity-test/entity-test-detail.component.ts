import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntityTest } from 'app/shared/model/entity-test.model';

@Component({
  selector: 'jhi-entity-test-detail',
  templateUrl: './entity-test-detail.component.html'
})
export class EntityTestDetailComponent implements OnInit {
  entityTest: IEntityTest | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entityTest }) => (this.entityTest = entityTest));
  }

  previousState(): void {
    window.history.back();
  }
}
