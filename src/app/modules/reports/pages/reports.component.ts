import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  userId: string;
  projectId: string;
  activityId: string;

  user(userId: string){
    this.userId = userId;
  }
  activity(activityId: string){
    this.activityId = activityId;
  }
  project(projectId: string){
    this.projectId = projectId;
  }
}
