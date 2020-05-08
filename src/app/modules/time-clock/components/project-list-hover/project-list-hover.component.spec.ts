import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ToastrService } from 'ngx-toastr';
import { ProjectListHoverComponent } from './project-list-hover.component';
import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import { getCustomerProjects } from '../../../customer-management/components/projects/components/store/project.selectors';
import { FilterProjectPipe } from '../../../shared/pipes';
import { CreateEntry, UpdateActiveEntry } from '../../store/entry.actions';

describe('ProjectListHoverComponent', () => {
  let component: ProjectListHoverComponent;
  let fixture: ComponentFixture<ProjectListHoverComponent>;
  let store: MockStore<ProjectState>;
  let mockProjectsSelector;

  const state = {
    projects: {
      projects: [],
      customerProjects: [{ id: 'id', name: 'name', description: 'description', project_type_id: '123' }],
      isLoading: false,
      message: '',
      projectToEdit: undefined,
    },
    entries: {
      active: {
        project_id: '2b87372b-3d0d-4dc0-832b-ae5863cd39e5',
        start_date: '2020-04-23T16:11:06.455000+00:00',
        technologies: ['java', 'typescript'],
      },
      entryList: [],
      isLoading: false,
      message: '',
    },
  };

  const toastrService = {
    success: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectListHoverComponent, FilterProjectPipe],
      providers: [provideMockStore({ initialState: state }), { provide: ToastrService, useValue: toastrService }],
      imports: [HttpClientTestingModule],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    mockProjectsSelector = store.overrideSelector(getCustomerProjects, state.projects);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clock-in dispatchs a CreateEntry action', () => {
    const entry = {
      project_id: '2b87372b-3d0d-4dc0-832b-ae5863cd39e5',
      start_date: new Date().toISOString(),
    };

    component.activeEntry = null;
    spyOn(store, 'dispatch');

    component.clockIn('2b87372b-3d0d-4dc0-832b-ae5863cd39e5');

    expect(store.dispatch).toHaveBeenCalledWith(new CreateEntry(entry));
  });

  it('clock-in dispatchs a UpdateActiveEntry action', () => {
    const entry = {
      id: '123',
      project_id: '2b87372b-3d0d-4dc0-832b-ae5863cd39e5',
      start_date: new Date().toISOString(),
    };
    const updatedEntry = {
      id: '123',
      project_id: '123372b-3d0d-4dc0-832b-ae5863cd39e5',
    };

    component.activeEntry = entry;
    spyOn(store, 'dispatch');

    component.clockIn('123372b-3d0d-4dc0-832b-ae5863cd39e5');

    expect(store.dispatch).toHaveBeenCalledWith(new UpdateActiveEntry(updatedEntry));
  });

});
