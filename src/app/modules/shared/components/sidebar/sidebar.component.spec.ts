import { AzureAdB2CService } from 'src/app/modules/login/services/azure.ad.b2c.service';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { TimeClockComponent } from '../../../time-clock/pages/time-clock.component';
import { of } from 'rxjs';
import { FeatureManagerService } from '../../feature-toggles/feature-toggle-manager.service';
import { UserInfoService } from 'src/app/modules/user/services/user-info.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let azureAdB2CServiceStubInjected;
  let featureManagerServiceStubInjected: FeatureManagerService;
  let userInfoService: UserInfoService;
  let router;
  const routes: Routes = [{ path: 'time-clock', component: TimeClockComponent }];

  const azureAdB2CServiceStub = {
    isLogin() {
      return true;
    },
    isAdmin() {
      return true;
    },
  };

  const userInfoServiceStub = {
    isAdmin: () => of(true),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SidebarComponent],
        providers: [
          { provide: AzureAdB2CService, useValue: azureAdB2CServiceStub },
          { provide: UserInfoService, useValue: userInfoServiceStub },
        ],
        imports: [RouterTestingModule.withRoutes(routes)],
      }).compileComponents();
      router = TestBed.inject(Router);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    azureAdB2CServiceStubInjected = TestBed.inject(AzureAdB2CService);
    featureManagerServiceStubInjected = TestBed.inject(FeatureManagerService);
    userInfoService = TestBed.inject(UserInfoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    spyOn(azureAdB2CServiceStubInjected, 'isAdmin').and.returnValue(false);
    expect(component).toBeTruthy();
  });

  it('admin users have six menu items', () => {
    component.getSidebarItems().subscribe(() => {
      const menuItems = component.itemsSidebar;
      expect(menuItems.length).toBe(6);
    });
  });

  it('non admin users have two menu items', () => {
    spyOn(userInfoServiceStub, 'isAdmin').and.returnValue(of(false));

    component.getSidebarItems().subscribe(() => {
      const menuItems = component.itemsSidebar;
      expect(menuItems.length).toBe(2);
    });
  });

  it('when item is selected is should be set as active and the others as inactive', () => {
    const route = 'time-clock';
    router.navigate([route]);

    component.itemsSidebar.filter((item) => item.route === `/${route}`).map((item) => {
      expect(item.active).toBeTrue();
    });
    component.itemsSidebar.filter((item) => item.route !== `/${route}`).map((item) => {
      expect(item.active).toBeFalse();
    });
  });

  it('List Technologies item is added when feature flag "ui-list-technologies" is enabled for user', () => {
    spyOn(featureManagerServiceStubInjected, 'isToggleEnabledForUser').and.returnValue(of(true));
    const itemsSidebar = [];

    component.toggleListTechnologies(itemsSidebar);

    expect(itemsSidebar.length).toBe(1);
  });

  it('List Technologies item is not added when feature flag "ui-list-technologies" is disabled for user', () => {
    spyOn(featureManagerServiceStubInjected, 'isToggleEnabledForUser').and.returnValue(of(false));
    const itemsSidebar = [];

    component.toggleListTechnologies(itemsSidebar);

    expect(itemsSidebar.length).toBe(0);
  });
});
