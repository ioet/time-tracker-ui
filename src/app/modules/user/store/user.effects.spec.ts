import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { User } from '../models/user';
import { UserEffects } from './user.effects';
import { TestBed } from '@angular/core/testing';
import { UserService } from '../services/user.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadUser, UserActionTypes } from './user.actions';

describe('UserEffects', () => {
  let actions$: Observable<Action>;
  let effects: UserEffects;
  let service: UserService;
  const userInfo: User = {
    name: 'Unknown Name',
    email: 'example@mail.com',
    roles: [],
    groups: [],
    id: 'dummy_tenant_id_load',
    tenant_id: null,
    deleted: null
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserEffects, provideMockActions(() => actions$)],
      imports: [HttpClientTestingModule],
    });

    effects = TestBed.inject(UserEffects);
    service = TestBed.inject(UserService);
  });

  it('should be created', async () => {
    expect(effects).toBeTruthy();
  });

  it('action type is LOAD_USER_SUCCESS when service is executed successfully', async () => {
    const userId = 'dummy_id_load';
    const serviceSpy = spyOn(service, 'loadUser');

    actions$ = of(new LoadUser(userId));
    serviceSpy.and.returnValue(of(userInfo));

    effects.loadUserInfo$.subscribe((action) => {
      expect(action.type).toEqual(UserActionTypes.LOAD_USER_SUCCESS);
    });
  });

  it('action type is LOAD_USER_FAIL when service fail in execution', async () => {
    const userId = 'dummy_id_load';
    const serviceSpy = spyOn(service, 'loadUser');

    actions$ = of(new LoadUser(userId));
    serviceSpy.and.returnValue(throwError({ error: { message: 'fail!' } }));

    effects.loadUserInfo$.subscribe((action) => {
      expect(action.type).toEqual(UserActionTypes.LOAD_USER_FAIL);
    });
  });
});
