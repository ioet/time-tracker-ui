import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-time-clock",
  templateUrl: "./time-clock.component.html",
  styleUrls: ["./time-clock.component.css"]
})
export class TimeClockComponent implements OnInit {
  projects = [
    { id: "P1", name: "Project 1" },
    { id: "P2", name: "Project 2" },
    { id: "P3", name: "Project 3" },
    { id: "P4", name: "Project 4" }
  ];

  showFields: boolean;

  constructor() {}

  ngOnInit(): void {}

  setShowFields(show: boolean) {
    this.showFields = show;
  }
}
