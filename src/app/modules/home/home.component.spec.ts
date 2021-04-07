import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AzureAdB2CService } from '../login/services/azure.ad.b2c.service';
import { FeatureSwitchGroupService } from '../shared/feature-toggles/switch-group/feature-switch-group.service';
import { LoadUser } from '../user/store/user.actions';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let azureAdB2CService: AzureAdB2CService;
  let featureSwitchGroupService: FeatureSwitchGroupService;
  let store: MockStore;
  let fixture: ComponentFixture<HomeComponent>;
  const initialState = {};
  const azureB2CServiceStub = {
    getUserId: () => 'user_id',
  };
  const featureSwitchGroupServiceStub = {
    isActivated: () => of(false),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomeComponent],
        providers: [
          provideMockStore({ initialState }),
          { provide: AzureAdB2CService, useValue: azureB2CServiceStub },
          { provide: FeatureSwitchGroupService, useValue: featureSwitchGroupServiceStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    azureAdB2CService = TestBed.inject(AzureAdB2CService);
    featureSwitchGroupService = TestBed.inject(FeatureSwitchGroupService);
    store = TestBed.inject(MockStore);

    component = fixture.componentInstance;
    fixture.detectChanges();
    store.setState(initialState);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('onInit, if featureSwitchGroup is true LoadUser action is dispatched', () => {
    const userId = 'user_id';
    spyOn(featureSwitchGroupService, 'isActivated').and.returnValue(of(true));
    spyOn(azureAdB2CService, 'getUserId').and.returnValue(userId);
    spyOn(store, 'dispatch');

    component.ngOnInit();

    featureSwitchGroupService.isActivated().subscribe(() => {
      expect(featureSwitchGroupService.isActivated).toHaveBeenCalled();
      expect(azureAdB2CService.getUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(new LoadUser(userId));
    });
  });

  it('onInit, if featureSwitchGroup is false nothing happens', () => {
    spyOn(featureSwitchGroupService, 'isActivated').and.returnValue(of(false));
    spyOn(azureAdB2CService, 'getUserId');
    spyOn(store, 'dispatch');

    component.ngOnInit();

    featureSwitchGroupService.isActivated().subscribe(() => {
      expect(featureSwitchGroupService.isActivated).toHaveBeenCalled();
      expect(azureAdB2CService.getUserId).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
