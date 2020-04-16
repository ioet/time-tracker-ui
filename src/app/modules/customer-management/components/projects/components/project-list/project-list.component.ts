import { Component } from '@angular/core';
import { ITEMS_PER_PAGE } from 'src/environments/environment';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent {
  initPage3 = 1;
  itemsPerPage = ITEMS_PER_PAGE;

  projects = [
    {
      id: '1',
      name: 'Mobile app',
    },
    {
      id: '2',
      name: 'Legacy code',
    },
  ];

  constructor() {}
}
