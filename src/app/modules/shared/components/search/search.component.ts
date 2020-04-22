import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  filterValue: string;
  @Output() changedFilterValue = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  changeFilterValue() {
    this.changedFilterValue.emit(this.filterValue);
  }
}
