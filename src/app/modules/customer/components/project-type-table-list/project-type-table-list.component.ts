import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-type-table-list',
  templateUrl: './project-type-table-list.component.html',
  styleUrls: ['./project-type-table-list.component.scss'],
})
export class ProjectTypeTableListComponent implements OnInit {
  initPage2: number = 1;
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

  ngOnInit(): void {}
}
