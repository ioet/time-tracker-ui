import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Activity } from '../../../shared/models';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent {

  @Input() activities: Activity[] = [];

  constructor() { }

}
