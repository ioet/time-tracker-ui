import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEntriesComponent } from './time-entries.component';
import { GroupByDatePipe } from '../../shared/pipes/group-by-date/group-by-date.pipe';

describe('TimeEntriesComponent', () => {
  let component: TimeEntriesComponent;
  let fixture: ComponentFixture<TimeEntriesComponent>;
  const entry = {
    id: "entry_1",
    project: "Mido - 05 de Febrero",
    startDate: "2020-02-05T15:36:15.887Z",
    endDate: "2020-02-05T18:36:15.887Z",
    activity: "development",
    technology: "Angular, TypeScript",
    comments: "No comments",
    ticket: "EY-25"
  };

  function setup() {
    // tslint:disable-next-line: no-shadowed-variable
    const fixture = TestBed.createComponent(TimeEntriesComponent);
    const app = fixture.debugElement.componentInstance;
    return { fixture, app };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEntriesComponent, GroupByDatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  /* it('should have p tag as \'time-entries works!\'', async(() => {
    // tslint:disable-next-line: no-shadowed-variable
    const { app, fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const ptag = compile.querySelector('p');
    expect(ptag.textContent).toBe('time-entries works!');
  })); */

  it('should call filter entry', async(() => {
    component.ngOnInit();
    expect(component.dataByMonth.length).toEqual(3);
  }));

  it('should open Delete Modal', () => {
    component.openModal(entry);
    expect(component.entryToDelete).toBe(entry);
    expect(component.showModal).toBe(true);
  });

 it('should filter the Entry to edit', () => {
    const entryId = "entry_1"
    component.editEntry(entryId);
    expect(component.entry.project).toBe(entry.project);
    expect(component.entry.startDate).toBe(entry.startDate);
    expect(component.entry.endDate).toBe(entry.endDate);
    expect(component.entry.activity).toBe(entry.activity);
    expect(component.entry.technology).toBe(entry.technology);
  });

  it('should save an Entry', () => {
    component.entryId = 'entry_1';
    component.saveEntry(entry);
    expect(component.entryList[0].project).toBe('Mido - 05 de Febrero');
    expect(component.entryList[0].startDate).toBe('2020-02-05T15:36:15.887Z');
    expect(component.entryList[0].endDate).toBe('2020-02-05T18:36:15.887Z');
    expect(component.entryList[0].activity).toBe('development');
    expect(component.entryList[0].technology).toBe('Angular, TypeScript');
  });

  it('should delete a Entry', () => {
    const entryId = "entry_2";
    component.removeEntry(entryId);
    expect(component.dataByMonth.length).toBe(2);
  });

  it('should get the entry List by Month', () => {
    const month = 3;
    component.getMonth(month);
    expect(component.dataByMonth.length).toEqual(1);
  });
});
