import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersService } from 'src/app/modules/users/services/users.service';
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

