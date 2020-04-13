import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEntityTest } from 'app/shared/model/entity-test.model';

type EntityResponseType = HttpResponse<IEntityTest>;
type EntityArrayResponseType = HttpResponse<IEntityTest[]>;

@Injectable({ providedIn: 'root' })
export class EntityTestService {
  public resourceUrl = SERVER_API_URL + 'api/entity-tests';

  constructor(protected http: HttpClient) {}

  create(entityTest: IEntityTest): Observable<EntityResponseType> {
    return this.http.post<IEntityTest>(this.resourceUrl, entityTest, { observe: 'response' });
  }

  update(entityTest: IEntityTest): Observable<EntityResponseType> {
    return this.http.put<IEntityTest>(this.resourceUrl, entityTest, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEntityTest>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntityTest[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
