import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputProjectComponent } from './input-project.component';

describe('InputProjectComponent', () => {
  let component: InputProjectComponent;
  let fixture: ComponentFixture<InputProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
