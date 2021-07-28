import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let fakeInfo: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownComponent ]
    })
    .compileComponents();

    fakeInfo = {
      id: 'fake',
      name: 'fake',
      description: 'fake',
      tenant_id: '',
      status: '',
      key: 'active',
      _status: false,
      btnColor: 'btn-white',
      btnIcon: 'fa-circle',
      btnIconTwo:  'fa-caret-check',
      btnName: 'Active',
      iconColor: 'text-success'
    };

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the item when clicked in method changeOperation', () => {
    spyOn(component.updateInfo, 'emit');
    component.info = fakeInfo;

    fixture.detectChanges();
    component.changeOperation(fakeInfo);

    expect(component.updateInfo.emit).toHaveBeenCalled();
  });

  it('should changed properties of item when is Active', () => {
    const fakeInfoActive = {
      id: 'fake',
      name: 'fake',
      description: 'fake',
      tenant_id: '',
      status: '',
      key: 'active',
      _status: true,
      btnColor: 'btn-white',
      btnIcon: 'fa-circle',
      btnIconTwo:  'fa-caret-check',
      btnName: 'Active',
      iconColor: 'text-success'
    };
    const expectChangeValue = {
      btnName: 'Inactive',
      btnIcon: 'fa-circle',
      iconColor: 'text-danger'
    };
    component.info = fakeInfoActive;

    component.changePropertiesItem(fakeInfoActive);

    expect(component.dataChange.btnName).toEqual(expectChangeValue.btnName);
    expect(component.dataChange.btnIcon).toEqual(expectChangeValue.btnIcon);
    expect(component.dataChange.iconColor).toEqual(expectChangeValue.iconColor);
  });

  it('should change properties of item when is Inactive', () => {
    const fakeInfoInactive = {
      id: 'fake',
      name: 'fake',
      description: 'fake',
      tenant_id: '',
      status: '',
      key: 'active',
      _status: true,
      btnColor: 'btn-white',
      btnIcon: 'fa-circle',
      btnIconTwo:  'fa-caret-check',
      btnName: 'Inactive',
      iconColor: 'text-danger'
    };
    const expectChangeValue = {
      btnName: 'Active',
      btnIcon: 'fa-circle',
      iconColor: 'text-success'
    };
    component.info = fakeInfoInactive;

    component.changePropertiesItem(fakeInfoInactive);

    expect(component.dataChange.btnName).toEqual(expectChangeValue.btnName);
    expect(component.dataChange.btnIcon).toEqual(expectChangeValue.btnIcon);
    expect(component.dataChange.iconColor).toEqual(expectChangeValue.iconColor);

  });
});



