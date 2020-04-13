import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPieModel, PieModel } from 'app/shared/model/pie-model.model';
import { PieModelService } from './pie-model.service';
import { PieModelComponent } from './pie-model.component';
import { PieModelDetailComponent } from './pie-model-detail.component';
import { PieModelUpdateComponent } from './pie-model-update.component';

@Injectable({ providedIn: 'root' })
export class PieModelResolve implements Resolve<IPieModel> {
  constructor(private service: PieModelService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPieModel> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pieModel: HttpResponse<PieModel>) => {
          if (pieModel.body) {
            return of(pieModel.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PieModel());
  }
}

export const pieModelRoute: Routes = [
  {
    path: '',
    component: PieModelComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterApp.pieModel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PieModelDetailComponent,
    resolve: {
      pieModel: PieModelResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterApp.pieModel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PieModelUpdateComponent,
    resolve: {
      pieModel: PieModelResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterApp.pieModel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PieModelUpdateComponent,
    resolve: {
      pieModel: PieModelResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterApp.pieModel.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
