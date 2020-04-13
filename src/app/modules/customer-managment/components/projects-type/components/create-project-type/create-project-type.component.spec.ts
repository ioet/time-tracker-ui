import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectTypeComponent } from './create-project-type.component';

describe('InputProjectTypeComponent', () => {
  let component: CreateProjectTypeComponent;
  let fixture: ComponentFixture<CreateProjectTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProjectTypeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
