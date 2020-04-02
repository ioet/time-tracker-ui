import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/modules/shared/models';
import { ProjectService } from 'src/app/modules/project-management/services/project.service';

@Component({
  selector: 'app-project-list-hover',
  templateUrl: './project-list-hover.component.html',
  styleUrls: ['./project-list-hover.component.scss'],
})
export class ProjectListHoverComponent implements OnInit {
  @Input() projects: any;
  @Output() showFields = new EventEmitter<boolean>();

  selectedId: string;
  showButton: number;
  filterProjects = '';
  listProjects: Project[] = [];

  constructor(private projectService: ProjectService) {
    this.showButton = -1;
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((data) => (this.listProjects = data));
  }

  clockIn(id: string) {
    this.selectedId = id;
    this.showFields.emit(true);
  }
}
