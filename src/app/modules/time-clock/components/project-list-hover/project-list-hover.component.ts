import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/modules/shared/models/project.model';
import { ProjectService } from 'src/app/modules/project-management/services/project.service';

@Component({
  selector: 'app-project-list-hover',
  templateUrl: './project-list-hover.component.html',
  styleUrls: ['./project-list-hover.component.scss']
})
export class ProjectListHoverComponent implements OnInit {
  @Input() projects: any;
  @Output() showFields = new EventEmitter<boolean>();

  selectedId: string;
  showButton: number;
  filterProjects: string = '';
  listProjects: Project[] = [];

  constructor() {
    this.showButton = -1;
  }

  ngOnInit(): void { }

  clockIn(id: string) {
    this.selectedId = id;
    this.showFields.emit(true);
  }
}
