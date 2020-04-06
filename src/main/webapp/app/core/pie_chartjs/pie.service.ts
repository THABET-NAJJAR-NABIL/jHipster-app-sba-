import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPie } from 'app/core/pie_chartjs/pie.model';

@Injectable({ providedIn: 'root' })
export class PieService {
  public resourceUrl = 'http://localhost:8080/getPieData';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IPie> {
    return this.http.get<IPie>(`${this.resourceUrl}`);
  }
}