import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
    }).compileComponents();
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
    const merged = {
      id: '1',
      name: 'app 4',
      description: 'It is a good app',
      project_type_id: '123',
      completed: true,
      project: 'ErnstYoung',
      startDate: '2020-02-05T15:36:15.887Z',
      endDate: '2020-02-05T18:36:15.887Z',
      activity: 'development',
      technologies: ['Angular', 'TypeScript'],
    };

    spyOn(component.removeList, 'emit');
    component.list = merged;
    fixture.detectChanges();
    component.removeListById(merged.id);
    expect(component.removeList.emit).toHaveBeenCalled();
    component.cancelDeleteModal.nativeElement.click();
  });
});
