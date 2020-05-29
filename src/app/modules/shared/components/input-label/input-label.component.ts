import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-input-label',
  templateUrl: './input-label.component.html',
})
export class InputLabelComponent {
  @Input()
  text: any;
  constructor() {
  }
}
