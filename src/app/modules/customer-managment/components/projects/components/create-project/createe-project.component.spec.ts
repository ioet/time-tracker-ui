import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateeProjectComponent } from './createe-project.component';

describe('InputProjectComponent', () => {
  let component: CreateeProjectComponent;
  let fixture: ComponentFixture<CreateeProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateeProjectComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateeProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
