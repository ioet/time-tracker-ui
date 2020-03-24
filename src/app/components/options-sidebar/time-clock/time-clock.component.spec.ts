import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { TimeClockComponent } from './time-clock.component';
import { ProjectListHoverComponent } from '../../shared/project-list-hover/project-list-hover.component';

describe('TimeClockComponent', () => {
  let component: TimeClockComponent;
  let fixture: ComponentFixture<TimeClockComponent>;
  let de: DebugElement;

  function setup() {
    const fixture = TestBed.createComponent(TimeClockComponent);
    const app = fixture.debugElement.componentInstance;
    return { fixture, app };
  }

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

  it('should have p tag as \'Dario clocked out at 00:00:00\'', async(() => {
    const { fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const ptag = compile.querySelector('p');
    expect(ptag.textContent).toBe('Dario clocked out at 00:00:00');
  }));

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

  it('should have button text as Options', async(() => {
    const { fixture } = setup();
    fixture.detectChanges();
    const x = document.getElementById('optionsContainer');
    const ptag = x.querySelector('button');
    expect(ptag.textContent).toBe(' Options ');
  }));

  it('should set Clock In', () => {
    const { fixture } = setup();
    fixture.detectChanges();
    const x = document.getElementById('clockInOutContainer');
    const ptag = x.querySelector('button');
    expect(ptag.textContent).toBe('Clock In');
  });

  it('should setVartToEmpty called', () => {
    spyOn(component, 'setDefaultValuesToFields');
    component.setDefaultValuesToFields();
    expect(component.setDefaultValuesToFields).toHaveBeenCalled();
  });

  it('should employeClockIn called', () => {
    spyOn(component, 'employeClockIn');
    component.employeClockIn();
    expect(component.employeClockIn).toHaveBeenCalled();
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
