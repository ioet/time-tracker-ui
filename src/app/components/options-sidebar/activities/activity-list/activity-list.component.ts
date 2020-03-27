import { Activity } from './../model/activity';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent {

  @Input() activities: Activity[] = [];

  constructor() { }

}
