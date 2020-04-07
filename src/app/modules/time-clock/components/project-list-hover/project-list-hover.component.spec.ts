import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProjectListHoverComponent } from './project-list-hover.component';
import { ProjectState } from '../../../project-management/store/project.reducer';
import { allProjects } from '../../../project-management/store/project.selectors';
import { FilterProjectPipe } from '../../../shared/pipes';

describe('ProjectListHoverComponent', () => {
  let component: ProjectListHoverComponent;
  let fixture: ComponentFixture<ProjectListHoverComponent>;
  let store: MockStore<ProjectState>;
  let mockProjectsSelector;

  const state = {
    projectList: [{ id: 'id', name: 'name', description: 'description' }],
    isLoading: false,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectListHoverComponent, FilterProjectPipe],
      providers: [provideMockStore({ initialState: state })],
      imports: [HttpClientTestingModule],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    mockProjectsSelector = store.overrideSelector(allProjects, state);
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
    component.showFields.subscribe((showFields: boolean) => expect(showFields).toEqual(true));
    component.clockIn(id);
  });
});
