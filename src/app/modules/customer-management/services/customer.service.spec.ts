import { TestBed, inject } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Customer } from '../../shared/models/customer.model';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('services are ready to be used', inject(
    [HttpClientTestingModule, CustomerService],
    (httpClient: HttpClientTestingModule, customerService: CustomerService) => {
      expect(customerService).toBeTruthy();
      expect(httpClient).toBeTruthy();
    }
  ));

  it('create customer using POST from baseUrl', () => {
    const customer: Customer[] = [{ name: 'aa', description: 'bb', tenant_id: 'cc' }];

    service.baseUrl = 'customers';

    service.createCustomer(customer).subscribe((response) => {
      expect(response.length).toBe(1);
    });

    const createCustomerRequest = httpMock.expectOne(service.baseUrl);
    expect(createCustomerRequest.request.method).toBe('POST');
    createCustomerRequest.flush(customer);
  });
});
