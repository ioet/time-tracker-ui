import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-liist',
  templateUrl: './project-liist.component.html',
  styleUrls: ['./project-liist.component.scss'],
})
export class ProjectLiistComponent implements OnInit {
  initPage3 = 1;

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
