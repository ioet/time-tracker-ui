import { Activity } from './../model/activity';
import { ActivityService } from './../services/activity.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities-management',
  templateUrl: './activities-management.component.html',
  styleUrls: ['./activities-management.component.css']
})
export class ActivitiesManagementComponent implements OnInit {

  constructor(private activityService: ActivityService) { }

  activities: Activity[];

  ngOnInit(): void {
    this.activityService.getActivities().subscribe( data =>  this.activities = data );
  }
}
