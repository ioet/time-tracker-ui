import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, Subject } from 'rxjs';
import { delay, filter } from 'rxjs/operators';
import { ProjectSelectedEvent } from '../../shared/components/details-fields/project-selected-event';
import { SaveEntryEvent } from '../../shared/components/details-fields/save-entry-event';
import { Entry } from '../../shared/models';
import { DataSource } from '../../shared/models/data-source.model';
import * as entryActions from '../../time-clock/store/entry.actions';
import * as moment from 'moment';
import { EntryState } from '../../time-clock/store/entry.reducer';
import { EntryActionTypes } from './../../time-clock/store/entry.actions';
import { getActiveTimeEntry, getTimeEntriesDataSource } from './../../time-clock/store/entry.selectors';
import { CookieService } from 'ngx-cookie-service';
import { FeatureToggle } from './../../../../environments/enum';
import { CalendarView } from 'angular-calendar';
@Component({
  selector: 'app-time-entries',
  templateUrl: './time-entries.component.html',
  styleUrls: ['./time-entries.component.scss'],
})
export class TimeEntriesComponent implements OnInit, OnDestroy, AfterViewInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  rerenderTableSubscription: Subscription;
  entryId: string;
  entry: Entry;
  activeTimeEntry: Entry;
  showModal = false;
  message: string;
  idToDelete: string;
  entriesSubscription: Subscription;
  wasEditingExistingTimeEntry = false;
  canMarkEntryAsWIP = true;
  timeEntriesDataSource$: Observable<DataSource<Entry>>;
  isFeatureToggleCalendarActive: boolean;
  displayGridView: boolean;
  selectedDate: moment.Moment;
  selectedYearAsText: string;
  selectedMonth: number;
  selectedYear: number;
  selectedMonthAsText: string;
  isActiveEntryOverlapping = false;
  calendarView: CalendarView = CalendarView.Month;
  actualDate: Date;
  readonly NO_DATA_MESSAGE: string = 'No data available in table';
  constructor(
    private store: Store<EntryState>,
    private toastrService: ToastrService,
    private actionsSubject$: ActionsSubject,
    private cookiesService: CookieService) {
    this.displayGridView = false;
    this.selectedDate = moment(new Date());
    this.actualDate = new Date();
    this.timeEntriesDataSource$ = this.store.pipe(delay(0), select(getTimeEntriesDataSource));
  }

  ngOnInit(): void {
    this.dtOptions = {
      order: [[ 0, 'desc' ]],
      destroy: true,
    };
    this.loadActiveEntry();
    this.isFeatureToggleCalendarActive = (this.cookiesService.get(FeatureToggle.TIME_TRACKER_CALENDAR) === 'true');
    this.entriesSubscription = this.actionsSubject$.pipe(
      filter((action: any) => (
        action.type === EntryActionTypes.CREATE_ENTRY_SUCCESS ||
        action.type === EntryActionTypes.UPDATE_ENTRY_SUCCESS ||
        action.type === EntryActionTypes.DELETE_ENTRY_SUCCESS
      )
      )
    ).subscribe((action) => {
      this.loadActiveEntry();
      this.store.dispatch(new entryActions.LoadEntries(this.selectedMonth, this.selectedYear));
    });
    this.rerenderTableSubscription = this.timeEntriesDataSource$.subscribe((ds) => {
      this.dtTrigger.next();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.rerenderTableSubscription.unsubscribe();
    this.entriesSubscription.unsubscribe();
  }

  newEntry() {
    if (this.wasEditingExistingTimeEntry) {
      this.entry = null;
    }
    this.entryId = null;
    this.store.pipe(select(getTimeEntriesDataSource)).subscribe(ds => {
      this.canMarkEntryAsWIP = !this.isThereAnEntryRunning(ds.data);
    });
  }
  private getEntryRunning(entries: Entry[]) {
    const runningEntry: Entry = entries.find(entry => entry.running === true);
    return runningEntry;
  }
  private isThereAnEntryRunning(entries: Entry[]) {
    return !!this.getEntryRunning(entries);
  }
  editEntry(entryId: string) {
    this.entryId = entryId;
    this.store.pipe(select(getTimeEntriesDataSource)).subscribe(ds => {
      this.entry = ds.data.find((entry) => entry.id === entryId);
      this.canMarkEntryAsWIP = this.isEntryRunningEqualsToEntryToEdit(this.getEntryRunning(ds.data), this.entry)
        || this.isTheEntryToEditTheLastOne(ds.data);
    });
    this.wasEditingExistingTimeEntry = true;
  }
  private isEntryRunningEqualsToEntryToEdit(entryRunning: Entry, entryToEdit: Entry) {
    if (entryRunning && entryToEdit) {
      return entryRunning.id === entryToEdit.id;
    } else {
      return false;
    }
  }
  private isTheEntryToEditTheLastOne(entries: Entry[]) {
    if (entries && entries.length > 0) {
      const lastEntry = entries[0];
      return lastEntry.id === this.entryId;
    } else {
      return false;
    }
  }
  private isNewEntry() {
    return this.entryId === null;
  }
  saveEntry(event: SaveEntryEvent): void {
    if (this.activeTimeEntry) {
      const startDateAsLocalDate = new Date(event.entry.start_date);
      const endDateAsLocalDate = new Date(event.entry.end_date);
      const activeEntryAsLocalDate = new Date(this.activeTimeEntry.start_date);
      const isEditingEntryEqualToActiveEntry = this.entryId === this.activeTimeEntry.id;
      const isStartDateGreaterThanActiveEntry = startDateAsLocalDate > activeEntryAsLocalDate;
      const isEndDateGreaterThanActiveEntry = endDateAsLocalDate > activeEntryAsLocalDate;
      const isTimeEntryOverlapping = isStartDateGreaterThanActiveEntry || isEndDateGreaterThanActiveEntry;
      this.checkIfActiveEntryOverlapping(isEditingEntryEqualToActiveEntry, startDateAsLocalDate);
      if (!isEditingEntryEqualToActiveEntry && isTimeEntryOverlapping || this.isActiveEntryOverlapping ) {
        const message = this.isActiveEntryOverlapping ? 'try another "Time in"' : 'try with earlier times';
        this.toastrService.error(`You are on the clock and this entry overlaps it, ${message}.`);
        this.isActiveEntryOverlapping = false;
      } else {
        this.doSave(event);
      }
    } else {
      this.doSave(event);
    }
  }
  projectSelected(event: ProjectSelectedEvent): void {
    this.wasEditingExistingTimeEntry = false;
    this.store.pipe(select(getTimeEntriesDataSource)).subscribe(ds => {
      const dataToUse = ds.data.find(item => item.project_id === event.projectId);
      if (dataToUse && this.isNewEntry()) {
        const defaultSeconds = 0;
        const currentDate = new Date();
        currentDate.setSeconds(defaultSeconds);
        currentDate.setMilliseconds(defaultSeconds);
        const entry = {
          description: dataToUse.description ? dataToUse.description : '',
          technologies: dataToUse.technologies ? dataToUse.technologies : [],
          uri: dataToUse.uri ? dataToUse.uri : '',
          activity_id: dataToUse.activity_id,
          project_id: dataToUse.project_id,
          start_date: currentDate,
          end_date: currentDate
        };
        this.entry = entry;
      }
    });
  }
  doSave(event: SaveEntryEvent) {
    if (this.entryId) {
      event.entry.id = this.entryId;
      this.store.dispatch(new entryActions.UpdateEntry(event.entry));
      if (event.shouldRestartEntry) {
        this.store.dispatch(new entryActions.RestartEntry(event.entry));
      }
    } else {
      this.store.dispatch(new entryActions.CreateEntry(event.entry));
    }
  }
  loadActiveEntry() {
    this.store.dispatch(new entryActions.LoadActiveEntry());
    this.store.pipe(select(getActiveTimeEntry)).subscribe((activeTimeEntry) => {
      this.activeTimeEntry = activeTimeEntry;
    });
  }
  onDisplayModeChange() {
    this.displayGridView = !this.displayGridView;
  }
  removeEntry() {
    this.store.dispatch(new entryActions.DeleteEntry(this.idToDelete));
    this.showModal = false;
  }
  dateSelected(event: { monthIndex: number; year: number }) {
    this.selectedYear = event.year;
    this.selectedYearAsText = event.year.toString();
    this.selectedMonth = event.monthIndex + 1;
    this.selectedMonthAsText = moment().month(event.monthIndex).format('MMMM');
    this.store.dispatch(new entryActions.LoadEntries(this.selectedMonth, this.selectedYear));
    this.selectedDate = moment().month(event.monthIndex).year(event.year);
    if (this.actualDate.getMonth() !== event.monthIndex){
      this.selectedDate = this.selectedDate.startOf('month');
    }
  }

  changeDate(event: { date: Date }){
    const newDate: moment.Moment = moment(event.date);
    if (this.selectedDate.month() !== newDate.month()){
      const monthSelected = newDate.month();
      const yearSelected = newDate.year();
      const selectedDate = {
        monthIndex: monthSelected,
        year: yearSelected
      };
      this.dateSelected(selectedDate);
    }
    this.selectedDate = newDate;
  }

  changeView(event: { calendarView: CalendarView }){
    this.calendarView = event.calendarView || CalendarView.Month;
  }

  openModal(item: any) {
    this.idToDelete = item.id;
    this.message = `Are you sure you want to delete ${item.activity_name}?`;
    this.showModal = true;
  }

  resetDraggablePosition(event: any): void {
    event.source._dragRef.reset();
  }

  checkIfActiveEntryOverlapping(isEditingEntryEqualToActiveEntry: boolean, startDateAsLocalDate: Date) {
    if (isEditingEntryEqualToActiveEntry) {
      this.store.pipe(select(getTimeEntriesDataSource)).subscribe(ds => {
        const overlappingEntry = ds.data.find((item) => {
          const itemEndDate = new Date(item.end_date);
          return startDateAsLocalDate  < itemEndDate;
        });
        this.isActiveEntryOverlapping = overlappingEntry ? true : false;
      });
    }
  }
}
