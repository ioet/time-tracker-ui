import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit removeProject event #removedProject', () => {
    const project = {
      id: 1,
      name: 'app 4',
      details: 'It is a good app',
      status: 'inactive',
      completed: true
    };

    spyOn(component.removeProject, 'emit');
    component.project = project;
    fixture.detectChanges();
    component.removedProject(project.id);
    expect(component.removeProject.emit).toHaveBeenCalled();
    component.cancelDeleteModal.nativeElement.click();
  });
});

