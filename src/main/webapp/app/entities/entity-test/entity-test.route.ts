import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEntityTest, EntityTest } from 'app/shared/model/entity-test.model';
import { EntityTestService } from './entity-test.service';
import { EntityTestComponent } from './entity-test.component';
import { EntityTestDetailComponent } from './entity-test-detail.component';
import { EntityTestUpdateComponent } from './entity-test-update.component';

@Injectable({ providedIn: 'root' })
export class EntityTestResolve implements Resolve<IEntityTest> {
  constructor(private service: EntityTestService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntityTest> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((entityTest: HttpResponse<EntityTest>) => {
          if (entityTest.body) {
            return of(entityTest.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EntityTest());
  }
}

export const entityTestRoute: Routes = [
  {
    path: '',
    component: EntityTestComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterApp.entityTest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EntityTestDetailComponent,
    resolve: {
      entityTest: EntityTestResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterApp.entityTest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EntityTestUpdateComponent,
    resolve: {
      entityTest: EntityTestResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterApp.entityTest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EntityTestUpdateComponent,
    resolve: {
      entityTest: EntityTestResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterApp.entityTest.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
