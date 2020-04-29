import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { Customer } from '../../shared/models/index';

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
    const customer: Customer[] = [{ name: 'aa', description: 'bb'}];

    service.baseUrl = 'customers';

    service.createCustomer(customer).subscribe((response) => {
      expect(response.length).toBe(1);
    });

    const createCustomerRequest = httpMock.expectOne(service.baseUrl);
    expect(createCustomerRequest.request.method).toBe('POST');
    createCustomerRequest.flush(customer);
  });

  it('delete customer using DELETE from baseUrl', () => {
    const customer: any[] = [
      { name: 'aa', description: 'bb', tenant_id: 'cc', id: '1' },
      { name: 'xx', description: 'yy', tenant_id: 'zz', id: '2' },
    ];
    const url = `${service.baseUrl}/1`;
    service.deleteCustomer(customer[0].id).subscribe();
    const getCustomerRequest = httpMock.expectOne(url);

    expect(getCustomerRequest.request.method).toBe('DELETE');
    getCustomerRequest.flush(customer);
  });

  it('update customer using PUT from baseUrl', () => {
    const customer = { id: '1', name: 'aaa', description: 'bbb' };
    service.baseUrl = 'customers' + '/' + customer.id;

    service.updateCustomer(customer).subscribe((response) => {
      expect(response.name).toBe('aaa');
    });

    const updateCustomerRequest = httpMock.expectOne(`${service.baseUrl}/${customer.id}`);

    expect(updateCustomerRequest.request.method).toBe('PUT');
    updateCustomerRequest.flush(customer);
  });

  it('customers are read using GET from baseUrl', () => {
    const customer: any[] = [
      { name: 'aa', description: 'bb', tenant_id: 'cc', id: '1' },
      { name: 'xx', description: 'yy', tenant_id: 'zz', id: '2' },
    ];
    const customersFoundSize = customer.length;
    service.baseUrl = 'foo';
    service.getCustomers().subscribe((customerResponse) => {
      expect(customerResponse.length).toBe(customersFoundSize);
    });
    const getActivitiesRequest = httpMock.expectOne(service.baseUrl);

    expect(getActivitiesRequest.request.method).toBe('GET');
    getActivitiesRequest.flush(customer);
  });
});
