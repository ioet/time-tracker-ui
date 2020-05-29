import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InputLabelComponent} from './input-label.component';

describe('InputLabelComponent', () => {
  let component: InputLabelComponent;
  let fixture: ComponentFixture<InputLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputLabelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should insert the provided text into the component', async(() => {
    const anyLabelText = 'Any random label';
    component.text = anyLabelText;

    fixture.detectChanges();

    const compile = fixture.debugElement.nativeElement;
    const span = compile.querySelector('span');
    expect(span.textContent).toEqual(anyLabelText);
  }));
});
