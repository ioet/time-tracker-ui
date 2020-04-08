import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputProjectTypeComponent } from './input-project-type.component';

describe('InputProjectTypeComponent', () => {
  let component: InputProjectTypeComponent;
  let fixture: ComponentFixture<InputProjectTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputProjectTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputProjectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
