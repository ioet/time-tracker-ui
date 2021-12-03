import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activities-management',
  templateUrl: './activities-management.component.html',
  styleUrls: ['./activities-management.component.scss'],
})
export class ActivitiesManagementComponent implements OnInit {
  @Input() showActivityForm: boolean;
  showOptionInDevelopment = true;

  ngOnInit() {
    this.showOption();
  }

  showOption(): void {
    if (environment.production){
      this.showOptionInDevelopment = false;
    }
  }
}
