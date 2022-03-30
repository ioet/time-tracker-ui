import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
})

export class SearchUserComponent {

  readonly ALLOW_SELECT_MULTIPLE = true;
  selectedUser: string;

  @Input() users: string[] = [];

  @Output() selectedUserId = new EventEmitter<string>();

  updateUser() {
    this.selectedUserId.emit(this.selectedUser || '*');
  }
}

