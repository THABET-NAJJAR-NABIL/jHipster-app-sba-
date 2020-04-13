import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBook1, Book1 } from 'app/shared/model/book-1.model';
import { Book1Service } from './book-1.service';
import { Book1Component } from './book-1.component';
import { Book1DetailComponent } from './book-1-detail.component';
import { Book1UpdateComponent } from './book-1-update.component';

@Injectable({ providedIn: 'root' })
export class Book1Resolve implements Resolve<IBook1> {
  constructor(private service: Book1Service, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBook1> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((book1: HttpResponse<Book1>) => {
          if (book1.body) {
            return of(book1.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Book1());
  }
}

export const book1Route: Routes = [
  {
    path: '',
    component: Book1Component,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterApp.book1.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: Book1DetailComponent,
    resolve: {
      book1: Book1Resolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterApp.book1.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: Book1UpdateComponent,
    resolve: {
      book1: Book1Resolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterApp.book1.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: Book1UpdateComponent,
    resolve: {
      book1: Book1Resolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterApp.book1.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
