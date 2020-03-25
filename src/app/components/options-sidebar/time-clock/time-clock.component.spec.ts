import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { TimeClockComponent } from './time-clock.component';
import { ProjectListHoverComponent } from '../../shared/project-list-hover/project-list-hover.component';

describe('TimeClockComponent', () => {
  let component: TimeClockComponent;
  let fixture: ComponentFixture<TimeClockComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeClockComponent, ProjectListHoverComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeClockComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

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

  it('should be called the setShowFields event #2', () => {
    spyOn(component, 'setShowFields');
    const showFields = de.query(By.directive(ProjectListHoverComponent));
    const li = showFields.query(By.css('li'));
    li.nativeElement.click();
    expect(component.setShowFields).toHaveBeenCalledWith(true);
  });

  it('should internt methods employeClockIn called', () => {
    spyOn(component, 'startTimer');
    spyOn(component, 'setArrivalAndDepartureTimes');

    component.employeClockIn();
    expect(component.startTimer).toHaveBeenCalled();
    expect(component.setArrivalAndDepartureTimes).toHaveBeenCalled();

  });

  it('called intern method setArrivalAndDepartureTimes', () => {
    const show = true;

    component.isClockInEnable = false;
    component.execOnlyOneTimeCounter = true;

    spyOn(component, 'setArrivalAndDepartureTimes');
    spyOn(component, 'startTimer');
    component.setShowFields(show);

    expect(component.showFields).toBe(true);
    expect(component.setArrivalAndDepartureTimes).toHaveBeenCalled();
    expect(component.startTimer).not.toHaveBeenCalled();
  });

  it('called intern methods of employeClockOut ', () => {
    component.isEnterTechnology = true;

    spyOn(component, 'setDefaultValuesToFields');
    spyOn(component, 'pauseTimer');
    spyOn(component, 'setArrivalAndDepartureTimes');

    component.employeClockOut();

    expect(component.setArrivalAndDepartureTimes).toHaveBeenCalled();
    expect(component.pauseTimer).toHaveBeenCalled();
    expect(component.setArrivalAndDepartureTimes).toHaveBeenCalled();
  });


  it('not called intern methods of employeClockOut ', () => {
    component.isEnterTechnology = false;

    spyOn(component, 'setDefaultValuesToFields');
    spyOn(component, 'pauseTimer');
    spyOn(component, 'setArrivalAndDepartureTimes');

    component.employeClockOut();

    expect(component.setArrivalAndDepartureTimes).not.toHaveBeenCalled();
    expect(component.pauseTimer).not.toHaveBeenCalled();
    expect(component.setArrivalAndDepartureTimes).not.toHaveBeenCalled();
  });


  it('should setVartToEmpty called', () => {
    spyOn(component, 'setDefaultValuesToFields');
    component.setDefaultValuesToFields();
    expect(component.setDefaultValuesToFields).toHaveBeenCalled();
  });


  it('should employeClockOut called', () => {
    spyOn(component, 'employeClockOut');
    component.employeClockOut();
    expect(component.employeClockOut).toHaveBeenCalled();
  });

  it('should enterTechnolofy called', () => {
    spyOn(component, 'enterTechnology');
    component.enterTechnology('');
    expect(component.enterTechnology).toHaveBeenCalled();
  });

});


