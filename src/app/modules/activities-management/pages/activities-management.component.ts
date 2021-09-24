import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-activities-management',
  templateUrl: './activities-management.component.html',
  styleUrls: ['./activities-management.component.scss'],
})
export class ActivitiesManagementComponent {
  @Input() showActivityForm: boolean;
}
