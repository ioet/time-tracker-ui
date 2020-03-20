import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserComponent } from './user.component';
import { AzureAdB2CService } from '../../../login/services/azure.ad.b2c.service';

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
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers: [
        { providers: AzureAdB2CService, useValue: azureAdB2CServiceStub}
      ]
    })
    .compileComponents();
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

  it('onInit checks if isLogin and gets the name', () => {
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(true);
    spyOn(azureAdB2CService, 'getName').and.returnValue('Name');
    component.ngOnInit();
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
    expect(azureAdB2CService.getName).toHaveBeenCalled();
  });

  it('onInit does not get the name if isLogin false', () => {
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(false);
    spyOn(azureAdB2CService, 'getName').and.returnValue('Name');
    component.ngOnInit();
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
    expect(azureAdB2CService.getName).toHaveBeenCalledTimes(0);
  });

  it('uses the Azure service on logout', () => {
    spyOn(azureAdB2CService, 'logout');

    component.logout();

    expect(azureAdB2CService.logout).toHaveBeenCalled();
  });

});
