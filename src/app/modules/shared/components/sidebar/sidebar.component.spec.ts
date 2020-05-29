import { AzureAdB2CService } from 'src/app/modules/login/services/azure.ad.b2c.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let azureAdB2CServiceStubInjected;

  const azureAdB2CServiceStub = {
    isLogin() {
      return true;
    },
    isAdmin() {
      return true;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      providers: [
        { providers: AzureAdB2CService, useValue: azureAdB2CServiceStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    azureAdB2CServiceStubInjected = TestBed.inject(AzureAdB2CService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    spyOn(azureAdB2CServiceStubInjected, 'isAdmin').and.returnValue(false);
    expect(component).toBeTruthy();
  });

  it('admin users have five menu items', () => {
    spyOn(azureAdB2CServiceStubInjected, 'isAdmin').and.returnValue(true);

    component.getItemsSidebar();
    const menuItems = component.itemsSidebar;

    expect(menuItems.length).toBe(5);
  });

  it('non admin users have two menu items', () => {
    spyOn(azureAdB2CServiceStubInjected, 'isAdmin').and.returnValue(false);

    component.getItemsSidebar();
    const menuItems = component.itemsSidebar;

    expect(menuItems.length).toBe(2);
  });

});
