import { AzureAdB2CService } from 'src/app/modules/login/services/azure.ad.b2c.service';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { TimeClockComponent } from '../../../time-clock/pages/time-clock.component';
import { of } from 'rxjs';
import { UserInfoService } from 'src/app/modules/user/services/user-info.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let azureAdB2CServiceStubInjected;
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
    logout(){
      return true;
    }
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
    userInfoService = TestBed.inject(UserInfoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should be created', () => {
    spyOn(azureAdB2CServiceStubInjected, 'isAdmin').and.returnValue(false);
    expect(component).toBeTruthy();
  });

  it('admin users should have six menu items', () => {
    component.getSidebarItems().subscribe(() => {
      const menuItems = component.itemsSidebar;
      expect(menuItems.length).toBe(6);
    });
  });

  it('non admin users should have two menu items', () => {
    spyOn(userInfoServiceStub, 'isAdmin').and.returnValue(of(false));

    component.getSidebarItems().subscribe(() => {
      const menuItems = component.itemsSidebar;
      expect(menuItems.length).toBe(2);
    });
  });

  it('when item is selected should be set as active and the others as inactive', () => {
    const route = 'time-clock';
    router.navigate([route]);

    component.itemsSidebar.filter((item) => item.route === `/${route}`).map((item) => {
      expect(item.active).toBeTrue();
    });
    component.itemsSidebar.filter((item) => item.route !== `/${route}`).map((item) => {
      expect(item.active).toBeFalse();
    });
  });

  it('should toggle the sidebar', () => {
    component.toggleSideBar();
    fixture.detectChanges();
    const sidebarElement = fixture.debugElement.nativeElement.querySelector('#wrapper');
    expect(sidebarElement.classList.contains('toggled')).toBeTrue();
  });

  it('should use the Azure service on logout', () => {
    spyOn(azureAdB2CServiceStubInjected, 'logout');
    component.logout();
    expect(azureAdB2CServiceStubInjected.logout).toHaveBeenCalled();
  });
});
