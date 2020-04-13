import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChartPieModel } from 'app/shared/model/chart-pie-model.model';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
type EntityArrayResponseType = HttpResponse<IChartPieModel[]>;

@Injectable({ providedIn: 'root' })
export class PieService {
  public resourceUrl = SERVER_API_URL + 'api/chart-pie-models';

  constructor(private http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChartPieModel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
