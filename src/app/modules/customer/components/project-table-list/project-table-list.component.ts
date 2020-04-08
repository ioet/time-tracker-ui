import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-table-list',
  templateUrl: './project-table-list.component.html',
  styleUrls: ['./project-table-list.component.scss'],
})
export class ProjectTableListComponent implements OnInit {
  initPage3: number = 1;

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

  ngOnInit(): void {}
}
