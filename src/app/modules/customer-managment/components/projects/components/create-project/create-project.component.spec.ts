import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectComponent } from './create-project.component';

describe('InputProjectComponent', () => {
  let component: CreateProjectComponent;
  let fixture: ComponentFixture<CreateProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProjectComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });
});
