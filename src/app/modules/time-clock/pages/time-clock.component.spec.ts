import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TimeClockComponent } from './time-clock.component';
import { ProjectListHoverComponent } from '../components';
import { ProjectService } from '../../project-management/services/project.service';
import { FilterProjectPipe } from '../../shared/pipes';

describe('TimeClockComponent', () => {
  let component: TimeClockComponent;
  let fixture: ComponentFixture<TimeClockComponent>;
  let de: DebugElement;
  let projectService: ProjectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TimeClockComponent, ProjectListHoverComponent, FilterProjectPipe],
      providers: [ProjectService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeClockComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
    projectService = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance', inject(
    [ProjectService],
    (injectService: ProjectService) => {
      expect(injectService).toBe(projectService);
    }
  ));

  it('should set showfileds as true', () => {
    const show = true;
    component.setShowFields(show);
    expect(component.showFields).toBe(true);
  });

  it('should be called the setShowFields event #1', () => {
    spyOn(component, 'setShowFields');
    const showFields = de.query(By.directive(ProjectListHoverComponent));
    const cmp = showFields.componentInstance;
    cmp.showFields.emit(true);
    expect(component.setShowFields).toHaveBeenCalledWith(true);
  });

  /* ---------------------- EMPLOYE CLOCK IN ------------------------------------- */
  it('should be verify the init state of vars', () => {
    expect(component.isClockIn).toBeTruthy();
    expect(component.isEnterTechnology).toBeFalsy();
    expect(component.showAlertEnterTecnology).toBeFalsy();
    expect(component.showFields).toBeFalsy();
    expect(component.execOnlyOneTimeCounter).toBeFalsy();
    expect(component.execOnlyOneTimeClockIn).toBeFalsy();
    expect(component.isClockInEnable).toBeFalsy();
    expect(component.isHidenForm).toBeTruthy();

    expect(component.hourCounterRealTime).toEqual(0);
    expect(component.minuteCounterRealTime).toEqual(0);
    expect(component.secondsCounterRealTime).toEqual(0);

    expect(component.hour).toEqual(0);
    expect(component.minute).toEqual(0);
    expect(component.seconds).toEqual(0);
  });

  it('should be change state of isClockInEnale, isClockIn, isHidenForm when function is called', () => {
    component.employeClockIn();
    expect(component.isClockInEnable).toBeTruthy();
    expect(component.isClockIn).toBeFalsy();
  });

  it('the function should return false', () => {
    expect(component.employeClockIn()).toEqual(false);
  });

  it('should be called to intern methods of employeClockIn', () => {
    spyOn(component, 'startTimer');
    spyOn(component, 'setArrivalAndDepartureTimes');

    component.employeClockIn();

    expect(component.startTimer).toHaveBeenCalled();
    expect(component.setArrivalAndDepartureTimes).toHaveBeenCalled();
  });

  /* ---------------------- EMPLOYE CLOCK OUT ------------------------------------- */
  it('should enter if and assign the value to vars', () => {
    component.isEnterTechnology = false;
    component.employeClockOut();
    expect(component.isClockIn).toBeFalsy();
    expect(component.showAlertEnterTecnology).toBeTruthy();
  });

  it('should enter if and not called to intern methods', () => {
    component.isEnterTechnology = false;
    spyOn(component, 'setDefaultValuesToFields');
    spyOn(component, 'pauseTimer');
    spyOn(component, 'setArrivalAndDepartureTimes');
    component.employeClockOut();
    expect(component.setDefaultValuesToFields).not.toHaveBeenCalled();
    expect(component.pauseTimer).not.toHaveBeenCalled();
    expect(component.setArrivalAndDepartureTimes).not.toHaveBeenCalled();
  });

  it('should enter else and execute internal methods', () => {
    component.isEnterTechnology = true;

    spyOn(component, 'setDefaultValuesToFields');
    spyOn(component, 'pauseTimer');
    spyOn(component, 'setArrivalAndDepartureTimes');

    component.employeClockOut();

    expect(component.setDefaultValuesToFields).toHaveBeenCalled();
    expect(component.pauseTimer).toHaveBeenCalled();
    expect(component.setArrivalAndDepartureTimes).toHaveBeenCalled();
  });

  /* ---------------------- ENTER TECHNOLOGY ------------------------------------- */
  it('should enter if and assign the value to var', () => {
    const dataTechnology = 'Angular';
    component.enterTechnology(dataTechnology);
    expect(component.isEnterTechnology).toBeTruthy();
  });

  it('should enter else and assign the value to var ', () => {
    const dataTechnology = '';
    component.enterTechnology(dataTechnology);
    expect(component.isEnterTechnology).toBeFalsy();
  });

  /* ---------------------- SET SHOW FIELDS ------------------------------------- */
  it('should execute all internal methods', () => {
    const show = true;
    component.isClockInEnable = false;
    component.execOnlyOneTimeCounter = false;

    spyOn(component, 'startTimer');
    spyOn(component, 'setArrivalAndDepartureTimes');

    component.setShowFields(show);

    expect(component.isHidenForm).toBeFalsy();
    expect(component.isClockIn).toBeFalsy();
    expect(component.showFields).toEqual(show);
    expect(component.startTimer).toHaveBeenCalled();
    expect(component.execOnlyOneTimeCounter).toBeTruthy();
    expect(component.setArrivalAndDepartureTimes).toHaveBeenCalled();
  });

  it('should not call nested if internal methods', () => {
    const show = true;
    component.isClockInEnable = false;
    component.execOnlyOneTimeCounter = true;

    spyOn(component, 'startTimer');
    spyOn(component, 'setArrivalAndDepartureTimes');

    component.setShowFields(show);

    expect(component.isHidenForm).toBeFalsy();
    expect(component.isClockIn).toBeFalsy();
    expect(component.showFields).toEqual(show);
    expect(component.startTimer).not.toHaveBeenCalled();
    expect(component.execOnlyOneTimeCounter).toBeTruthy();
    expect(component.setArrivalAndDepartureTimes).toHaveBeenCalled();
  });

  it('shouldn not execute any main if method', () => {
    const show = true;
    component.isClockInEnable = true;
    component.execOnlyOneTimeCounter = true;

    spyOn(component, 'startTimer');
    spyOn(component, 'setArrivalAndDepartureTimes');

    component.setShowFields(show);

    expect(component.isHidenForm).toBeFalsy();
    expect(component.isClockIn).toBeTruthy();
    expect(component.showFields).toEqual(undefined);
    expect(component.startTimer).not.toHaveBeenCalled();
    expect(component.execOnlyOneTimeCounter).toBeTruthy();
    expect(component.setArrivalAndDepartureTimes).not.toHaveBeenCalled();
  });

  /* ---------------------- TIMER ------------------------------------- */
  it('should be var not equal to zero', () => {
    component.timer();
    expect(component.secondsCounterRealTime).not.toEqual(0);
  });

  /* ---------------------- ARRIVALS ------------------------------------- */
  it('should execute intern methods of arrivals', () => {
    const currentDate = new Date();
    component.execOnlyOneTimeClockIn = false;
    component.setArrivalAndDepartureTimes();
    expect(component.hour).toEqual(currentDate.getHours());
    expect(component.minute).toEqual(currentDate.getMinutes());
    expect(component.seconds).toEqual(currentDate.getSeconds());
    expect(component.execOnlyOneTimeClockIn).toEqual(true);
  });

  it('should not execute intern methods of arrivals', () => {
    component.execOnlyOneTimeClockIn = true;
    component.setArrivalAndDepartureTimes();
    expect(component.hour).toEqual(0);
    expect(component.minute).toEqual(0);
    expect(component.seconds).toEqual(0);
    expect(component.execOnlyOneTimeClockIn).toEqual(true);
  });

  /* ---------------------- DEFAULT FIELDS ------------------------------------- */
  it('set values to empty', () => {
    component.setDefaultValuesToFields();
    expect(component.isHidenForm).toBeTruthy();
    expect(component.isClockIn).toBeTruthy();
    expect(component.isEnterTechnology).toBeFalsy();
    expect(component.showAlertEnterTecnology).toBeFalsy();
    expect(component.execOnlyOneTimeClockIn).toBeFalsy();
    expect(component.execOnlyOneTimeCounter).toBeFalsy();
    expect(component.isClockInEnable).toBeFalsy();
  });
});
