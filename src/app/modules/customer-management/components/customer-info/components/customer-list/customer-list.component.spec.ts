import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListComponent } from './customer-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { allCustomers } from './../../../../store/customer-management.selectors';
import { CustomerState } from 'src/app/modules/customer-management/store';

describe('CustomerTableListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let store: MockStore<CustomerState>;
  let mockCustomerSelector;


  const state = {
    data: [{ tenant_id: 'id', name: 'name', description: 'description' }],
    isLoading: false,
    message: '',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [CustomerListComponent],
      providers: [provideMockStore({ initialState: state })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
    store.setState(state);
    mockCustomerSelector = store.overrideSelector(allCustomers, state.data);
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('onNgInit customers are loaded from store executing an action', () => {
    spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalled();
    expect(component.customers).toEqual(state.data);
  });

  afterEach(() => {
    fixture.destroy();
  });

});
