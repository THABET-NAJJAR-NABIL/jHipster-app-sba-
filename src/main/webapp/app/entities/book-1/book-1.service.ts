import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBook1 } from 'app/shared/model/book-1.model';

type EntityResponseType = HttpResponse<IBook1>;
type EntityArrayResponseType = HttpResponse<IBook1[]>;

@Injectable({ providedIn: 'root' })
export class Book1Service {
  public resourceUrl = SERVER_API_URL + 'api/book-1-s';

  constructor(protected http: HttpClient) {}

  create(book1: IBook1): Observable<EntityResponseType> {
    return this.http.post<IBook1>(this.resourceUrl, book1, { observe: 'response' });
  }

  update(book1: IBook1): Observable<EntityResponseType> {
    return this.http.put<IBook1>(this.resourceUrl, book1, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBook1>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBook1[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
