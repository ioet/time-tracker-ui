import {FormBuilder} from '@angular/forms';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {provideMockStore, MockStore} from '@ngrx/store/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {ProjectListHoverComponent} from './project-list-hover.component';
import {ProjectState} from '../../../customer-management/components/projects/components/store/project.reducer';
import {getCustomerProjects} from '../../../customer-management/components/projects/components/store/project.selectors';
import {FilterProjectPipe} from '../../../shared/pipes';
import {CreateEntry, UpdateActiveEntry} from '../../store/entry.actions';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

describe('ProjectListHoverComponent', () => {
  let component: ProjectListHoverComponent;
  let fixture: ComponentFixture<ProjectListHoverComponent>;
  let store: MockStore<ProjectState>;
  let mockProjectsSelector;

  const state = {
    projects: {
      projects: [],
      customerProjects: [{id: 'id', name: 'name', description: 'description', project_type_id: '123'}],
      isLoading: false,
      message: '',
      projectToEdit: undefined,
    },
    entries: {
      active: {
        project_id: 'p-1',
        start_date: '2020-04-23T16:11:06.455000+00:00',
        technologies: ['java', 'typescript'],
      },
      entryList: [],
      isLoading: false,
      message: '',
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectListHoverComponent, FilterProjectPipe],
      providers: [FormBuilder, provideMockStore({initialState: state})],
      imports: [HttpClientTestingModule, AutocompleteLibModule],
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

  it('dispatchs a CreateEntry action when activeEntry is null', () => {
    component.activeEntry = null;
    spyOn(store, 'dispatch');

    component.clockIn();

    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(CreateEntry));
  });

  it('dispatchs a UpdateEntry action when activeEntry is not null', () => {
    const entry = {id: '123', project_id: 'p1', start_date: new Date().toISOString()};
    component.activeEntry = entry;
    spyOn(store, 'dispatch');

    component.clockIn();

    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(UpdateActiveEntry));
  });
});
