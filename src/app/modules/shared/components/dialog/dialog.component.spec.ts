import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit removeProject event #removedProject', () => {
    spyOn(component.closeModalEvent, 'emit');
    component.body = 'test';
    fixture.detectChanges();
    component.closeModal();
    expect(component.closeModalEvent.emit).toHaveBeenCalled();
  });

});
