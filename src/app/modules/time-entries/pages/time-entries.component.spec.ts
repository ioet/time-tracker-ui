import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MonthPickerComponent,
  DetailsFieldsComponent,
  EmptyStateComponent,
} from '../../shared/components';
import { GroupByDatePipe } from '../../shared/pipes';
import { TechnologyState } from '../../shared/store/technology.reducers';
import { allTechnologies } from '../../shared/store/technology.selectors';
import { TimeEntriesComponent } from './time-entries.component';
import { ProjectState } from '../../customer-management/components/projects/components/store/project.reducer';
import { getProjects } from '../../customer-management/components/projects/components/store/project.selectors';
import { EntryState } from '../../time-clock/store/entry.reducer';
import { allEntries } from '../../time-clock/store/entry.selectors';
import * as entryActions from '../../time-clock/store/entry.actions';
import {TechnologiesComponent} from '../../shared/components/technologies/technologies.component';
import {TimeEntriesSummaryComponent} from '../../time-clock/components/time-entries-summary/time-entries-summary.component';

describe('TimeEntriesComponent', () => {
  type Merged = TechnologyState & ProjectState & EntryState;
  let component: TimeEntriesComponent;
  let fixture: ComponentFixture<TimeEntriesComponent>;
  let store: MockStore<Merged>;
  let mockTechnologySelector;
  let mockProjectsSelector;
  let mockEntriesSelector;

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
        TimeEntriesSummaryComponent
      ],
      providers: [provideMockStore({ initialState: state })],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    mockTechnologySelector = store.overrideSelector(allTechnologies, state.technologies);
    mockProjectsSelector = store.overrideSelector(getProjects, state.projects.projects);
    mockEntriesSelector = store.overrideSelector(allEntries, state.entries.entryList);
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
    expect(component.dataByMonth.length).toEqual(0);
  }));

  it('should set entry and entryid to null', () => {
    component.newEntry();
    expect(component.entry).toBe(null);
    expect(component.entryId).toBe(null);
  });

  it('should set entry and entryid to with data', () => {
    component.entryList = [entry];
    component.editEntry('entry_1');
    expect(component.entry).toBe(entry);
    expect(component.entryId).toBe('entry_1');
  });

  it('should update entry by id', () => {
    const newEntry = {
      project_id: 'projectId',
      start_date: '',
      description: 'description',
      technologies: [],
      uri: 'abc',
    };
    component.entryId = 'entry_1';
    spyOn(store, 'dispatch');
    component.saveEntry(newEntry);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should create new Entry', () => {
    const newEntry = {
      project_id: 'projectId',
      start_date: '',
      description: 'description',
      technologies: [],
      uri: 'abc',
    };
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
    component.entryList = [entry];
    component.getMonth(month);
    expect(component.dataByMonth.length).toEqual(1);
  });
});
