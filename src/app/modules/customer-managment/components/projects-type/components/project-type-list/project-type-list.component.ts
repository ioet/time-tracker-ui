import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-type-list',
  templateUrl: './project-type-list.component.html',
  styleUrls: ['./project-type-list.component.scss'],
})
export class ProjectTypeListComponent implements OnInit {
  initPage2 = 1;
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
