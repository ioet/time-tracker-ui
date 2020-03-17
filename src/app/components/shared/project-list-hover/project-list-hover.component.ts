import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-project-list-hover",
  templateUrl: "./project-list-hover.component.html",
  styleUrls: ["./project-list-hover.component.css"]
})
export class ProjectListHoverComponent implements OnInit {
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
