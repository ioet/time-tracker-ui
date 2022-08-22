import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternetConnectionStatusComponent } from './internet-connection-status.component';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

describe('InternetConnectionStatusComponent', () => {
  let component: InternetConnectionStatusComponent;
  let fixture: ComponentFixture<InternetConnectionStatusComponent>;
  const toastrServiceStub = {
    error: () => {
      return 'test error';
    },
    warning: () => {
      return 'warning error';
    },
    success: () => {
      return 'success error';
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternetConnectionStatusComponent ],
      providers: [{ provide: ToastrService, useValue: toastrServiceStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetConnectionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show a stable connection warning', () => {
    component.connection$ = of('4g');
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.isFast).toBe(true);
  });

  it('should show a slow connection warning', () => {
    component.connection$ = of('2g');
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.isFast).toBe(false);
  });

  it('should show offline warning', () => {
    component.connection$ = of('Offline');
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.isFast).toBe(false);
  });

  it('should change the network type', () => {
    component.connection$ = of('5g');
    fixture.detectChanges();
    component.ngOnInit();
    component.connection$.subscribe((networkType: string) => {
      expect(networkType).toEqual('5g');
    });

    jasmine.clock().install();
    jasmine.clock().tick(300);

    component.connection$ = of('2g');
    fixture.detectChanges();
    console.log(window.navigator);
    component.connection$.subscribe((networkType: string) => {
      expect(networkType).toEqual('2g');
    });

    jasmine.clock().uninstall();
  });

  it('should return when window.navigator.connection is undefined', () => {
    const attributeCustome = '__defineGetter__';
    window.navigator[attributeCustome]('connection', () => {
      return undefined;
    });
    fixture = TestBed.createComponent(InternetConnectionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const statusInit = component.ngOnInit();
    expect(statusInit).toEqual(undefined);
  });
});
