import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DetailsFieldsComponent } from './details-fields.component';

describe('DetailsFieldsComponent', () => {
  let component: DetailsFieldsComponent;
  let fixture: ComponentFixture<DetailsFieldsComponent>;
  const initialData = {
    project: '',
    activity: '',
    ticket: '',
    technology: '',
    comments: ''
  }

  const newData = {
    project: 'Ernst&Young',
    activity: 'development',
    ticket: 'WA-15',
    technology: 'Angular',
    comments: 'No notes'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsFieldsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit saveEntry event', () => {
    spyOn(component.saveEntry, 'emit');
    component.onSubmit();
    expect(component.saveEntry.emit).toHaveBeenCalledWith(initialData);
  });

  it('should emit ngOnChange without data', () => {
    component.entryToEdit = null;
    component.ngOnChanges();
    expect(component.entryForm.value).toEqual(initialData);
  });

  it('should emit ngOnChange with new data', () => {
    component.entryToEdit = newData;
    component.ngOnChanges();
    expect(component.entryForm.value).toEqual(newData);
  });
});
