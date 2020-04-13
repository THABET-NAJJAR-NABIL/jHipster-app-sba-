import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IChartPieModel, ChartPieModel } from 'app/shared/model/chart-pie-model.model';
import { ChartPieModelService } from './chart-pie-model.service';
import { ChartPieModelComponent } from './chart-pie-model.component';
import { ChartPieModelDetailComponent } from './chart-pie-model-detail.component';
import { ChartPieModelUpdateComponent } from './chart-pie-model-update.component';

@Injectable({ providedIn: 'root' })
export class ChartPieModelResolve implements Resolve<IChartPieModel> {
  constructor(private service: ChartPieModelService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChartPieModel> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((chartPieModel: HttpResponse<ChartPieModel>) => {
          if (chartPieModel.body) {
            return of(chartPieModel.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ChartPieModel());
  }
}

export const chartPieModelRoute: Routes = [
  {
    path: '',
    component: ChartPieModelComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterApp.chartPieModel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ChartPieModelDetailComponent,
    resolve: {
      chartPieModel: ChartPieModelResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterApp.chartPieModel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ChartPieModelUpdateComponent,
    resolve: {
      chartPieModel: ChartPieModelResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterApp.chartPieModel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ChartPieModelUpdateComponent,
    resolve: {
      chartPieModel: ChartPieModelResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterApp.chartPieModel.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
