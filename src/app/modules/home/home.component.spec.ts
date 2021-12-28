import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AzureAdB2CService } from '../login/services/azure.ad.b2c.service';
import { LoadUser } from '../user/store/user.actions';
import { HomeComponent } from './home.component';
import { LoginService } from '../login/services/login.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let azureAdB2CService: AzureAdB2CService;
  let store: MockStore;
  let fixture: ComponentFixture<HomeComponent>;
  const initialState = {};
  const azureB2CServiceStub = {
    getUserId: () => 'user_id',
  };
  const loginServiceStub = {
    getUserId: () => 'user_id',
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomeComponent],
        providers: [
          provideMockStore({ initialState }),
          { provide: AzureAdB2CService, useValue: azureB2CServiceStub },
          { provide: LoginService, useValue: loginServiceStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    azureAdB2CService = TestBed.inject(AzureAdB2CService);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store.setState(initialState);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('onInit, LoadUser action is dispatched', () => {
    component.isProduction = true;
    const userId = 'user_id';
    spyOn(azureAdB2CService, 'getUserId').and.returnValue(userId);
    spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(azureAdB2CService.getUserId).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(new LoadUser(userId));
  });
});
