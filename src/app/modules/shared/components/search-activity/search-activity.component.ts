import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-activity',
  templateUrl: './search-activity.component.html',
  styleUrls: ['./search-activity.component.scss'],
})

export class SearchActivityComponent {

  readonly ALLOW_SELECT_MULTIPLE = false;
  selectedActivity: string;

  @Input() activities: string[] = [];

  @Output() selectedActivityId = new EventEmitter<string>();

  updateActivity() {
    this.selectedActivityId.emit(this.selectedActivity || '*' );
  }
}

