import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Technology } from '../models/technology.model';
import { STACK_EXCHANGE_ID, STACK_EXCHANGE_ACCESS_TOKEN, environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  baseUrl = `${environment.stackexchangeApiUrl}/2.2/tags?order=desc&sort=popular`;
  constructor(private http: HttpClient) {}

  getTechnologies(value: string): Observable<Technology> {
    const url = `${this.baseUrl}&inname=${value}&site=stackoverflow&key=${STACK_EXCHANGE_ID}&access_token=${STACK_EXCHANGE_ACCESS_TOKEN}`;
    return this.http.get<Technology>(url);
  }
}
