import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getUserGroups } from '../store/user.selectors';
import { GROUPS } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  constructor(private store: Store) {}

  groups(): Observable<string[]> {
    return this.store.pipe(select(getUserGroups));
  }

  isMemberOf(groupName: string): Observable<boolean> {
    return this.groups().pipe(map((groups: string[]) => groups.includes(groupName)));
  }

  isAdmin(): Observable<boolean> {
    return this.isMemberOf(GROUPS.ADMIN);
  }

  isTester(): Observable<boolean> {
    return this.isMemberOf(GROUPS.TESTER);
  }
}
