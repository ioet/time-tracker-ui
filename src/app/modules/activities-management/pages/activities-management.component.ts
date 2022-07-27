import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EnvironmentType } from 'src/environments/enum';

@Component({
  selector: 'app-activities-management',
  templateUrl: './activities-management.component.html',
  styleUrls: ['./activities-management.component.scss'],
})
export class ActivitiesManagementComponent implements OnInit {
  @Input() showActivityForm: boolean;
  showOptionInDevelopment = true;

  ngOnInit() {
    this.showOptionInDevelopment = environment.production === EnvironmentType.TT_DEV;
  }
}
