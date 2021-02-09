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
import { FeatureManagerService } from 'src/app/modules/shared/feature-toggles/feature-toggle-manager.service';

describe('ProjectListHoverComponent', () => {
  let component: ProjectListHoverComponent;
  let fixture: ComponentFixture<ProjectListHoverComponent>;
  let store: MockStore<ProjectState>;
  let mockProjectsSelector;
  let featureManagerService: FeatureManagerService;
  const toastrServiceStub = {
    error: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { }
  };

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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectListHoverComponent, FilterProjectPipe],
      providers: [FormBuilder, provideMockStore({ initialState: state }),
        { provide: ToastrService, useValue: toastrServiceStub }],
      imports: [HttpClientTestingModule, AutocompleteLibModule],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    mockProjectsSelector = store.overrideSelector(getCustomerProjects, state.projects);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    featureManagerService = TestBed.inject(FeatureManagerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dispatchs a CreateEntry action on clockIn', () => {
    component.activeEntry = null;
    spyOn(store, 'dispatch');

    component.clockIn(1, 'customer', 'project');

    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(ClockIn));
  });

  it('dispatch a UpdateEntryRunning action on updateProject', () => {
    component.activeEntry = { id: '123' };
    spyOn(store, 'dispatch');

    component.updateProject(1);

    expect(store.dispatch).toHaveBeenCalledWith(new UpdateEntryRunning({ id: component.activeEntry.id, project_id: 1 }));
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
    spyOn(component.updateEntrySubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.updateEntrySubscription.unsubscribe).toHaveBeenCalled();
  });

  // it('calls projectsSubscribe unsubscribe on ngDestroy', () => {
  //   component.projectsSubscription = new Subscription();
  //   spyOn(component.projectsSubscribe, 'unsubscribe');
    
  //     component.ngOnDestroy();
    
  //   expect(component.projectsSubscribe.unsubscribe).toHaveBeenCalledTimes(1);
  // });

  // fit('When Component is created, should call the feature toggle method', () => {
  //   // component.exponentialGrowth = true;
  //   component.projectsSubscribe = new Subscription();
  //   component.activeEntrySubscribe = new Subscription();
  //   spyOn(component.projectsSubscribe, 'unsubscribe');
  //   spyOn(component.activeEntrySubscribe, 'unsubscribe');

  //   component.ngOnDestroy();

  //   expect(component.projectsSubscribe.unsubscribe).toHaveBeenCalled();
  //   expect(component.activeEntrySubscribe.unsubscribe).toHaveBeenCalled();
  
  // });

  it('sets customer name and project name on setSelectedProject', () => {
    spyOn(component.projectsForm, 'setValue');
    component.activeEntry = { project_id : 'p1'};
    component.listProjects = [{ id: 'p1', customer_name: 'customer', name: 'xyz' }];

    component.setSelectedProject();

    expect(component.projectsForm.setValue)
      .toHaveBeenCalledWith({ project_id: 'customer - xyz'});
  });
 
    var toggleValue = true;
    fit(`when FeatureToggle is ${toggleValue} should return ${toggleValue}`, () => {
      spyOn(featureManagerService, 'isToggleEnabledForUser').and.returnValue(of(toggleValue));
      component.projectsSubscription = new Subscription();
      component.activeEntrySubscription = new Subscription();

      spyOn(component.projectsSubscription, 'unsubscribe');
      spyOn(component.activeEntrySubscription, 'unsubscribe');

      component.ngOnDestroy();

      expect(component.projectsSubscription.unsubscribe).toHaveBeenCalled();
      expect(component.activeEntrySubscription.unsubscribe).toHaveBeenCalled();
    });

    toggleValue = false;
    fit(`when FeatureToggle is ${toggleValue} should return ${toggleValue}`, () => {
      spyOn(component, 'isFeatureToggleActivated').and.returnValue(of(toggleValue));
      component.projectsSubscription = new Subscription();
      component.activeEntrySubscription = new Subscription();

      spyOn(component.projectsSubscription, 'unsubscribe');
      spyOn(component.activeEntrySubscription, 'unsubscribe');

      component.ngOnDestroy();

      expect(component.projectsSubscription.unsubscribe).not.toHaveBeenCalled();
      expect(component.activeEntrySubscription.unsubscribe).not.toHaveBeenCalled();
    });

  // const exponentialGrowth = [true, false];
  // exponentialGrowth.map((toggleValue) => {
  //   it(`when FeatureToggle is ${toggleValue} should return ${toggleValue}`, () => {
  //     spyOn(featureManagerService, 'isToggleEnabled').and.returnValue(of(toggleValue));
  //     const isFeatureToggleActivated: Promise<boolean> = component.isFeatureToggleActivated();
  //     expect(featureManagerService.isToggleEnabled).toHaveBeenCalled();
  //     isFeatureToggleActivated.then((value) => expect(value).toEqual(toggleValue));
  //   });
  // });

  // it('deleteProject, should dispatch DeleteProject action', () => {
  //   component.projectsSubscription = new Subscription();
  //   const subscription = spyOn(component.projectsSubscription, 'unsubscribe');

  //   component.idToDelete = project.id;
  //   spyOn(store, 'dispatch');
  //   component.deleteProject();
  //   component.ngOnDestroy();
  //   expect(subscription).toHaveBeenCalledTimes(1);
  //   expect(store.dispatch).toHaveBeenCalledTimes(1);
  //   expect(store.dispatch).toHaveBeenCalledWith(new DeleteProject(project.id));
  // });
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
