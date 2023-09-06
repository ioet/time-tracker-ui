import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-project',
  templateUrl: './search-project.component.html',
  styleUrls: ['./search-project.component.scss'],
})
export class SearchProjectComponent {
  readonly ALLOW_SELECT_MULTIPLE = false;
  selectedProject: string;

  @Input() projects: string[] = [];

  @Output() selectedProjectId = new EventEmitter<string>();

  updateProject() {
    this.selectedProjectId.emit(this.selectedProject || '*');
  }
}
