import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IChartPieModel } from 'app/shared/model/chart-pie-model.model';

type EntityResponseType = HttpResponse<IChartPieModel>;
type EntityArrayResponseType = HttpResponse<IChartPieModel[]>;

@Injectable({ providedIn: 'root' })
export class ChartPieModelService {
  public resourceUrl = SERVER_API_URL + 'api/chart-pie-models';

  constructor(protected http: HttpClient) {}

  create(chartPieModel: IChartPieModel): Observable<EntityResponseType> {
    return this.http.post<IChartPieModel>(this.resourceUrl, chartPieModel, { observe: 'response' });
  }

  update(chartPieModel: IChartPieModel): Observable<EntityResponseType> {
    return this.http.put<IChartPieModel>(this.resourceUrl, chartPieModel, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IChartPieModel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChartPieModel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
