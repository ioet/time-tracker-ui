import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  baseUrl = `https://private-8c3d21-ts32.apiary-mock.com/customers`;

  constructor(private http: HttpClient) {}

  createCustomer(customerData): Observable<any> {
    const body = {
      ...customerData,
      tenant_id: '4225ab1e-1033-4a5f-8650-0dd4950f38c8',
    };
    return this.http.post(this.baseUrl, body);
  }
}
