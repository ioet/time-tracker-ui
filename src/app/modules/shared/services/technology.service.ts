import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Technology } from '../models/technology.model';
import { KEY, environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  baseUrl = `${environment.stackexchangeApiUrl}/2.2/tags?order=desc&sort=popular`;
  constructor(private http: HttpClient) {}

  getTechnologies(value: string): Observable<Technology> {
    const url = `${this.baseUrl}&inname=${value}&site=stackoverflow&key=${KEY}`;
    return this.http.get<Technology>(url);
  }
}
