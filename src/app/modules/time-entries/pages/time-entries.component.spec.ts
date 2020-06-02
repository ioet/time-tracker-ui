import { getActiveTimeEntry } from './../../time-clock/store/entry.selectors';
import { ToastrService } from 'ngx-toastr';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MonthPickerComponent, DetailsFieldsComponent, EmptyStateComponent } from '../../shared/components';
import { GroupByDatePipe } from '../../shared/pipes';
import { TechnologyState } from '../../shared/store/technology.reducers';
import { allTechnologies } from '../../shared/store/technology.selectors';
import { TimeEntriesComponent } from './time-entries.component';
import { ProjectState } from '../../customer-management/components/projects/components/store/project.reducer';
import { getProjects } from '../../customer-management/components/projects/components/store/project.selectors';
import { EntryState } from '../../time-clock/store/entry.reducer';
import { allEntries } from '../../time-clock/store/entry.selectors';
import * as entryActions from '../../time-clock/store/entry.actions';
import { TechnologiesComponent } from '../../shared/components/technologies/technologies.component';
import { TimeEntriesSummaryComponent } from '../../time-clock/components/time-entries-summary/time-entries-summary.component';

describe('TimeEntriesComponent', () => {
  type Merged = TechnologyState & ProjectState & EntryState;
  let component: TimeEntriesComponent;
  let fixture: ComponentFixture<TimeEntriesComponent>;
  let store: MockStore<Merged>;
  let mockTechnologySelector;
  let mockProjectsSelector;
  let mockEntriesSelector;
  let injectedToastrService;

  const toastrService = {
    error: () => {},
  };

  const state = {
    projects: {
      projects: [{ id: 'abc', customer_id: 'customerId', name: '', description: '', project_type_id: 'id' }],
      customerProjects: [{ id: 'id', name: 'name', description: 'description', project_type_id: '123' }],
      isLoading: false,
      message: '',
      projectToEdit: undefined,
    },
    activities: {
      data: [{ id: 'id', name: 'name', description: 'description' }],
      isLoading: false,
      message: 'message',
    },
    technologies: {
      technologyList: { items: [{ name: 'test' }] },
      isLoading: false,
    },
    entries: {
      entryList: [],
      active: {
        start_date: new Date('2019-01-01T15:36:15.887Z'),
        id: 'active-entry',
      }
    },
  };

  const entry = {
    id: 'entry_1',
    project_id: 'abc',
    start_date: new Date('2020-02-05T15:36:15.887Z'),
    end_date: new Date('2020-02-05T18:36:15.887Z'),
    activity_id: 'development',
    technologies: ['Angular', 'TypeScript'],
    comments: 'No comments',
    uri: 'EY-25',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmptyStateComponent,
        DetailsFieldsComponent,
        GroupByDatePipe,
        MonthPickerComponent,
        TimeEntriesComponent,
        TechnologiesComponent,
        TimeEntriesSummaryComponent,
      ],
      providers: [provideMockStore({ initialState: state }),
        { provide: ToastrService, useValue: toastrService },
      ],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    mockTechnologySelector = store.overrideSelector(allTechnologies, state.technologies);
    mockProjectsSelector = store.overrideSelector(getProjects, state.projects.projects);
    mockEntriesSelector = store.overrideSelector(allEntries, state.entries.entryList);
    injectedToastrService = TestBed.inject(ToastrService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call dataByMonth in ngOnInit()', async(() => {
    component.ngOnInit();
    expect(component.dataByMonth.length).toEqual(0);
  }));

  it('should call dataByMonth with data in ngOnInit()', async(() => {
    const entryCurrentMonth = {
      id: '1',
      project_id: 'Mido - 05 de Febrero',
      start_date: new Date(),
      end_date: new Date(),
      activity_id: 'development',
      technologies: ['Angular', 'TypeScript'],
      comments: 'No comments',
      uri: 'EY-25',
    };
    mockEntriesSelector = store.overrideSelector(allEntries, [entryCurrentMonth]);

    component.ngOnInit();

    expect(component.dataByMonth.length).toEqual(1);
  }));

  it('should call dataByMonth with data without end_date in ngOnInit()', async(() => {
    const newEntry = {
      id: 'entry_1',
      project_id: 'Mido - 05 de Febrero',
      start_date: new Date(),
      end_date: null,
      activity_id: 'development',
      technologies: ['Angular', 'TypeScript'],
      comments: 'No comments',
      uri: 'EY-25',
    };
    mockEntriesSelector = store.overrideSelector(allEntries, [newEntry]);
    component.ngOnInit();
    expect(component.dataByMonth.length).toEqual(1);
  }));

  it('should call dataByMonth without new date in ngOnInit()', async(() => {
    const newEntry = {
      id: 'entry_1',
      project_id: 'Mido - 05 de Febrero',
      start_date: new Date('2020-02-05T15:36:15.887Z'),
      end_date: new Date('2020-02-05T18:36:15.887Z'),
      activity_id: 'development',
      technologies: ['Angular', 'TypeScript'],
      comments: 'No comments',
      uri: 'EY-25',
    };
    mockEntriesSelector = store.overrideSelector(allEntries, [newEntry]);
    component.ngOnInit();
    expect(component.dataByMonth.length).toEqual(1);
  }));

  it('should set entry and entryid to null', () => {
    component.newEntry();
    expect(component.entry).toBe(null);
    expect(component.entryId).toBe(null);
  });

  it('should set entry and entryid to with data', () => {
    component.dataByMonth = [entry];
    component.editEntry('entry_1');
    expect(component.entry).toEqual(entry);
    expect(component.entryId).toBe('entry_1');
  });

  it('displays an error when start date of entry is > than active entry start date', () => {
    const newEntry = {
      project_id: 'p-id',
      start_date: '2020-05-05T10:04',
      description: 'description',
      technologies: [],
      uri: 'abc',
    };
    component.entryId = 'new-entry';
    spyOn(injectedToastrService, 'error');

    component.saveEntry(newEntry);

    expect(injectedToastrService.error).toHaveBeenCalled();
  });

  it('should dispatch an action when entry is going to be saved', () => {
    const newEntry = {
      project_id: 'p-id',
      start_date: '2020-05-05T10:04',
      description: 'description',
      technologies: [],
      uri: 'abc',
    };
    component.entryId = 'active-entry';
    spyOn(store, 'dispatch');

    component.saveEntry(newEntry);

    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should create new Entry', () => {
    const newEntry = {
      project_id: 'projectId',
      start_date: '2010-05-05T10:04',
      description: 'description',
      technologies: [],
      uri: 'abc',
    };
    component.entryId = undefined;
    spyOn(store, 'dispatch');

    component.saveEntry(newEntry);

    expect(store.dispatch).toHaveBeenCalledWith(new entryActions.CreateEntry(newEntry));
  });

  it('should delete Entry by id', () => {
    spyOn(store, 'dispatch');
    component.removeEntry('id');
    expect(store.dispatch).toHaveBeenCalledWith(new entryActions.DeleteEntry('id'));
  });

  it('should get the entry List by Month', () => {
    const month = 1;
    spyOn(store, 'dispatch');
    component.getMonth(month);
    expect(store.dispatch).toHaveBeenCalledWith(new entryActions.LoadEntries(month));
  });


  it('doSave when activeTimeEntry === null', async(() => {
    const entryToSave = {
      project_id: 'project-id',
      start_date: '2010-05-05T10:04',
      description: 'description',
      technologies: [],
      uri: 'abc',
    };
    spyOn(component, 'doSave');
    component.activeTimeEntry = null;

    component.saveEntry(entryToSave);

    expect(component.doSave).toHaveBeenCalledWith(entryToSave);
  }));
});
