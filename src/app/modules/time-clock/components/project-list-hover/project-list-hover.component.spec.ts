import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { SwitchTimeEntry, ClockIn } from './../../store/entry.actions';
import { FormBuilder } from '@angular/forms';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { Subscription, of } from 'rxjs';
import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import { getCustomerProjects } from '../../../customer-management/components/projects/components/store/project.selectors';
import { FilterProjectPipe } from '../../../shared/pipes';
import { UpdateEntryRunning } from '../../store/entry.actions';
import { ProjectListHoverComponent } from './project-list-hover.component';

describe('ProjectListHoverComponent', () => {
  let component: ProjectListHoverComponent;
  let fixture: ComponentFixture<ProjectListHoverComponent>;
  let store: MockStore<ProjectState>;
  let mockProjectsSelector;
  const toastrServiceStub = {
    error: (message?: string, title?: string, override?: Partial<IndividualConfig>) => {},
  };

  const state = {
    projects: {
      projects: [],
      customerProjects: [{ id: 'id', name: 'name', description: 'description', project_type_id: '123' }],
      recentProjects: [],
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
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProjectListHoverComponent, FilterProjectPipe],
        providers: [
          FormBuilder,
          provideMockStore({ initialState: state }),
          { provide: ToastrService, useValue: toastrServiceStub },
        ],
        imports: [HttpClientTestingModule, AutocompleteLibModule],
      }).compileComponents();
      store = TestBed.inject(MockStore);
      mockProjectsSelector = store.overrideSelector(getCustomerProjects, state.projects);
    })
  );

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
    const activitiesMock  = [{
      id: 'xyz',
      name: 'test',
      description : 'test1'
    }];
    component.activities = activitiesMock;
    spyOn(store, 'dispatch');

    component.clockIn(1, 'customer', 'project');

    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(ClockIn));
  });

  it('dispatch a UpdateEntryRunning action on updateProject', () => {
    component.activeEntry = { id: '123' };
    spyOn(store, 'dispatch');

    component.updateProject(1);

    expect(store.dispatch).toHaveBeenCalledWith(
      new UpdateEntryRunning({ id: component.activeEntry.id, project_id: 1 })
    );
  });

  it('displays a message when the activity_id is null', () => {
    spyOn(toastrServiceStub, 'error');
    component.activeEntry = { activity_id: null };

    component.switch(1, 'customer', 'project');

    expect(toastrServiceStub.error).toHaveBeenCalled();
  });

  it('dispatch a SwitchTimeEntry action', () => {
    spyOn(store, 'dispatch');
    component.activeEntry = { id: '123' };

    component.switch(1, 'customer', 'project');

    expect(store.dispatch).toHaveBeenCalledWith(new SwitchTimeEntry(component.activeEntry.id, 1));
  });

  it('calls unsubscribe on ngDestroy', () => {
    component.updateEntrySubscription = new Subscription();
    component.projectsSubscription = new Subscription();
    component.activeEntrySubscription = new Subscription();
    spyOn(component.updateEntrySubscription, 'unsubscribe');
    spyOn(component.projectsSubscription, 'unsubscribe');
    spyOn(component.activeEntrySubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.updateEntrySubscription.unsubscribe).toHaveBeenCalled();
    expect(component.projectsSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.activeEntrySubscription.unsubscribe).toHaveBeenCalled();
  });

  it('sets customer name and project name on setSelectedProject', () => {
    spyOn(component.projectsForm, 'setValue');
    component.activeEntry = { project_id: 'p1' };
    component.listProjects = [{ id: 'p1', customer: { name: 'customer', description: 'nomatter' }, name: 'xyz' }];

    component.setSelectedProject();

    expect(component.projectsForm.setValue).toHaveBeenCalledWith({ project_id: 'customer - xyz' });
  });

  it('should change projects showed to recent projects list when search input is empty on onSearch', () => {
    const recentProjects = [{ id: '1', customer: { name: 'customer'}, name: 'xyz' }];
    const search = {term: '', items: []};
    component.listRecentProjects = recentProjects;
    component.onSearch(search);

    expect(component.listProjectsShowed).toEqual(recentProjects);
  });

  it('should change projects showed to projects list when search input is not empty on onSearch', () => {
    const listProjects = [{id: '1', customer: { name: 'customer'}, name: 'xyz' }];
    const search = {term: 'xyz', items: []};
    component.listProjects = listProjects;
    component.onSearch(search);

    expect(component.listProjectsShowed).toEqual(listProjects);
  });

  it('should clock in when select a project on onSelect', () => {
    const [id, customer, name] = ['1', 'customer', 'xyz'];
    const projectSelected = { id, customer: { name: customer}, name };
    spyOn(component, 'clockIn');
    component.showClockIn = true;
    component.onSelect(projectSelected);

    expect(component.clockIn).toHaveBeenCalledWith(id, customer, name);
  });

  // TODO Fix this test since it is throwing this error
  // Expected spy dispatch to have been called with:
  // [CreateEntry({ payload: Object({ project_id: '1', start_date: '2020-07-27T22:30:26.743Z', timezone_offset: 300 }),
  // type: '[Entry] CREATE_ENTRY' })]
  // but actual calls were:
  // [CreateEntry({ payload: Object({ project_id: '1', start_date: '2020-07-27T22:30:26.742Z', timezone_offset: 300 }),
  // type: '[Entry] CREATE_ENTRY' })].

  //   Call 0:
  // Expected $[0].payload.start_date = '2020-07-27T22:30:26.742Z' to equal '2020-07-27T22:30:26.743Z'.
  // it('creates time-entry with timezone_offset property', () => {
  //   spyOn(store, 'dispatch');
  //   component.clockIn('1', 'customer', 'project');
  //   expect(store.dispatch).toHaveBeenCalledWith(
  //     new CreateEntry({
  //       project_id: '1',
  //       start_date: new Date().toISOString(),
  //       timezone_offset: new Date().getTimezoneOffset()
  //     })
  //   );
  // });
});
