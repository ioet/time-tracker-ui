import { Component } from '@angular/core';
import { ITEMS_PER_PAGE } from 'src/environments/environment';

@Component({
  selector: 'app-project-type-list',
  templateUrl: './project-type-list.component.html',
  styleUrls: ['./project-type-list.component.scss'],
})
export class ProjectTypeListComponent {
  initPage2 = 1;
  itemsPerPage = ITEMS_PER_PAGE;

  projectsType = [
    {
      id: '1',
      name: 'Training',
    },
    {
      id: '2',
      name: 'On-site',
    },
  ];

  constructor() {}
}
