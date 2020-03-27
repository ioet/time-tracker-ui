import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-project',
  templateUrl: './search-project.component.html',
  styleUrls: ['./search-project.component.css']
})
export class SearchProjectComponent implements OnInit {

  filterProject: string;
  @Output() changeFilterProject = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  changeFilterValue() {
    this.changeFilterProject.emit( this.filterProject );
  }
}
