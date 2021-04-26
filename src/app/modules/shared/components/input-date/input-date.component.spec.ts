import { waitForAsync, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InputDateComponent } from './input-date.component';
import * as moment from 'moment';

describe('InputDateComponent', () => {
  let component: InputDateComponent;
  let fixture: ComponentFixture<InputDateComponent>;
  let input;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [InputDateComponent],
        imports: [MatInputModule, MatDatepickerModule, MatMomentDateModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    input = fixture.debugElement.nativeElement.querySelector('input');

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should insert the provided text into the component', fakeAsync(() => {
    setInputValue('input', moment('2020-05-20').format('l'));

    expect(component.value).toEqual('2020-05-20');
  }));

  const params: boolean[] = [true, false];
  params.forEach(disable => {
    it('when the disabled attribute is provided, it should disable the input ', fakeAsync(() => {
      component.isDisabled = disable;

      fixture.detectChanges();

      expect(input.disabled).toEqual(disable);
    }));
  });

  function setInputValue(selector: string, value: string) {
    fixture.detectChanges();
    tick();
    input.value = value;
    input.dispatchEvent(new Event('input'));
    tick();
  }

  afterEach(() => {
    fixture.destroy();
  });
});
