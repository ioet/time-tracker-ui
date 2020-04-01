import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ProjectListHoverComponent } from './project-list-hover.component';

describe('ProjectListHoverComponent', () => {
  let component: ProjectListHoverComponent;
  let fixture: ComponentFixture<ProjectListHoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectListHoverComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedId with Id', () => {
    const id = 'P1';
    component.clockIn(id);
    expect(component.selectedId).toBe(id);
  });

  it('should emit showFields event', () => {
    const id = 'P1';
    component.showFields.subscribe((showFields: boolean) =>
      expect(showFields).toEqual(true)
    );
    component.clockIn(id);
  });
});
