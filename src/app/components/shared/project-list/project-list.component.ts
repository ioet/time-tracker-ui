import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.css"]
})
export class ProjectListComponent implements OnInit {
  @Input() projects: any;
  @Output() showFields = new EventEmitter<boolean>();

  selectedId: string;
  showButton: number;

  constructor() {
    this.showButton = -1;
  }

  ngOnInit(): void {}

  clockIn(id: string) {
    this.selectedId = id;
    this.showFields.emit(true);
  }
}
