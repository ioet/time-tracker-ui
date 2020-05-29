import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {InputDateComponent} from './input-date.component';

describe('InputDateComponent', () => {
  let component: InputDateComponent;
  let fixture: ComponentFixture<InputDateComponent>;
  let input;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputDateComponent]
    }).compileComponents();
  }));

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
    setInputValue('input', '2020-05-20');

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
