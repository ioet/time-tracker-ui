import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getUserGroupsInfo } from '../store/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private store: Store) { }

  verifyGroup(groupName: string): boolean {
    let isGroupBelongsToUser: boolean;

    const groupsStored = this.store.pipe(select(getUserGroupsInfo)).subscribe((groups) => {
      isGroupBelongsToUser = groups.includes(groupName);
    });

    return isGroupBelongsToUser;
  }
}
