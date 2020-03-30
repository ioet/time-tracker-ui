import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/activity.service';
import { Activity } from '../../shared/models';

@Component({
  selector: 'app-activities-management',
  templateUrl: './activities-management.component.html',
  styleUrls: ['./activities-management.component.scss']
})
export class ActivitiesManagementComponent implements OnInit {

  constructor(private activityService: ActivityService) { }

  activities: Activity[];

  ngOnInit(): void {
    this.activityService.getActivities().subscribe( data =>  this.activities = data );
  }
}
