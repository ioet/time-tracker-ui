import { StopTimeEntryRunning } from './../../store/entry.actions';
import { FormBuilder } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProjectListHoverComponent } from './project-list-hover.component';
import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import { getCustomerProjects } from '../../../customer-management/components/projects/components/store/project.selectors';
import { FilterProjectPipe } from '../../../shared/pipes';
import { CreateEntry, UpdateEntryRunning } from '../../store/entry.actions';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { Subscription } from 'rxjs';

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
      providers: [FormBuilder, provideMockStore({ initialState: state })],
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

  it('dispatchs a CreateEntry action on clockIn', () => {
    component.activeEntry = null;
    spyOn(store, 'dispatch');

    component.clockIn(1, 'customer', 'project');

    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(CreateEntry));
  });

  it('dispatchs a UpdateEntryRunning action on updateProject', () => {
    component.activeEntry = { id: '123' };
    spyOn(store, 'dispatch');

    component.updateProject(1);

    expect(store.dispatch).toHaveBeenCalledWith(new UpdateEntryRunning({ id: component.activeEntry.id, project_id: 1 }));
  });

  it('stop activeEntry and clockIn on swith', () => {
    spyOn(component, 'clockIn');
    spyOn(store, 'dispatch');
    component.activeEntry = { id: '123' };

    component.switch(1, 'customer', 'project');

    expect(store.dispatch).toHaveBeenCalledWith(new StopTimeEntryRunning(component.activeEntry.id));
    expect(component.clockIn).toHaveBeenCalled();
  });

  it('calls unsubscribe on ngDestroy', () => {
    component.updateEntrySubscription = new Subscription();
    spyOn(component.updateEntrySubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.updateEntrySubscription.unsubscribe).toHaveBeenCalled();
  });

  it('sets customer name and project name on setSelectedProject', () => {
    spyOn(component.projectsForm, 'setValue');
    component.activeEntry = { project_id : 'p1'};
    component.listProjects = [{ id: 'p1', customer_name: 'customer', name: 'xyz' }];

    component.setSelectedProject();

    expect(component.projectsForm.setValue)
      .toHaveBeenCalledWith({ project_id: 'customer - xyz'});
  });
});
