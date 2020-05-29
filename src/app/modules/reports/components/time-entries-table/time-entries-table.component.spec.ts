import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {EntryState} from '../../../time-clock/store/entry.reducer';
import {TimeEntriesTableComponent} from './time-entries-table.component';
import {entriesForReport} from '../../../time-clock/store/entry.selectors';

describe('Reports Page', () => {
  describe('TimeEntriesTableComponent', () => {
    let component: TimeEntriesTableComponent;
    let fixture: ComponentFixture<TimeEntriesTableComponent>;
    let store: MockStore<EntryState>;
    let geTimeEntriesSelectorMock;
    const timeEntry = {
      id: '123',
      start_date: new Date(),
      end_date: new Date(),
      activity_id: '123',
      technologies: ['react', 'redux'],
      comments: 'any comment',
      uri: 'custom uri',
      project_id: '123'
    };

    const state = {
      active: timeEntry,
      entryList: [timeEntry],
      isLoading: false,
      message: '',
      createError: false,
      updateError: false,
      timeEntriesSummary: null,
      entriesForReport: [timeEntry],
    };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [],
        providers: [provideMockStore({initialState: state})],
      }).compileComponents();
      store = TestBed.inject(MockStore);

    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimeEntriesTableComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      store.setState(state);
      geTimeEntriesSelectorMock = store.overrideSelector(entriesForReport, state.entriesForReport);
    });

    it('component should be created', () => {
      expect(component).toBeTruthy();
    });

    it('on success load time entries, the report should be populated', () => {
      component.ngOnInit();
      fixture.detectChanges();

      expect(component.data).toEqual(state.entriesForReport);
    });

    it('after the component is initialized it should initialize the table', () => {
      spyOn(component.dtTrigger, 'next');

      component.ngAfterViewInit();

      expect(component.dtTrigger.next).toHaveBeenCalled();
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
});
