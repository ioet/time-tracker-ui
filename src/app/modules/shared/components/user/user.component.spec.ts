import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserComponent } from './user.component';
import { AzureAdB2CService } from '../../../login/services/azure.ad.b2c.service';
import {AppRoutingModule} from '../../../../app-routing.module';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let azureAdB2CService: AzureAdB2CService;

  const azureAdB2CServiceStub = {
    isLogin() {
      return true;
    },
    signIn() {
      return of();
    },
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [AppRoutingModule],
      providers: [{ providers: AzureAdB2CService, useValue: azureAdB2CServiceStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    azureAdB2CService = TestBed.inject(AzureAdB2CService);
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('onInit checks if isLogin and gets the name and set tenantIn in the storage', () => {
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(true);
    spyOn(azureAdB2CService, 'getName').and.returnValue('Name');
    spyOn(azureAdB2CService, 'getUserEmail').and.returnValue('Email');
    spyOn(azureAdB2CService, 'setTenantId');
    component.ngOnInit();
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
    expect(azureAdB2CService.getName).toHaveBeenCalled();
    expect(azureAdB2CService.getUserEmail).toHaveBeenCalled();
    expect(azureAdB2CService.setTenantId).toHaveBeenCalled();
  });

  it('onInit does not get the name if isLogin false', () => {
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(false);
    spyOn(azureAdB2CService, 'getName').and.returnValue('Name');
    spyOn(azureAdB2CService, 'getUserEmail').and.returnValue('Email');
    spyOn(azureAdB2CService, 'setTenantId');
    component.ngOnInit();
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
    expect(azureAdB2CService.getName).toHaveBeenCalledTimes(0);
    expect(azureAdB2CService.getUserEmail).toHaveBeenCalledTimes(0);
    expect(azureAdB2CService.setTenantId).not.toHaveBeenCalled();
  });
});
