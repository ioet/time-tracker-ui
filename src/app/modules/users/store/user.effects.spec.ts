import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { UsersService } from '../services/users.service';
import { UserActionTypes } from './user.actions';
import { UserEffects } from './user.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('UserEffects', () => {
  let actions$: Observable<Action>;
  let effects: UserEffects;
  let service: UsersService;
  let toastrService: ToastrService;
  const user = { id: 'id', name: 'name', email: 'email' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserEffects, provideMockActions(() => actions$)],
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      declarations: [],
    });
    effects = TestBed.inject(UserEffects);
    service = TestBed.inject(UsersService);
    toastrService = TestBed.inject(ToastrService);
  });

  it('should be created', async () => {
    expect(effects).toBeTruthy();
  });

  it('action type is LOAD_USER_SUCCESS when service is executed sucessfully', async () => {
    actions$ = of({ type: UserActionTypes.LOAD_USERS });
    const serviceSpy = spyOn(service, 'loadUsers');
    serviceSpy.and.returnValue(of(user));

    effects.loadUsers$.subscribe((action) => {
      expect(action.type).toEqual(UserActionTypes.LOAD_USERS_SUCCESS);
    });
  });

  it('action type is LOAD_USER_FAIL when service fail in execution', async () => {
    actions$ = of({ type: UserActionTypes.LOAD_USERS });
    const serviceSpy = spyOn(service, 'loadUsers');
    serviceSpy.and.returnValue(throwError({ error: { message: 'fail!' } }));
    spyOn(toastrService, 'error');

    effects.loadUsers$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(UserActionTypes.LOAD_USERS_FAIL);
    });
  });

  it('action type is ADD_USER_TO_GROUP_SUCCESS when service is executed sucessfully', async () => {
    const userId = 'userId';
    const groupName = 'groupName';
    actions$ = of({
      type: UserActionTypes.ADD_USER_TO_GROUP,
      userId,
      groupName,
    });

    spyOn(toastrService, 'success');
    spyOn(service, 'addUserToGroup').and.returnValue(of(user));

    effects.addUserToGroup$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith('Add user to group success');
      expect(action.type).toEqual(UserActionTypes.ADD_USER_TO_GROUP_SUCCESS);
    });
  });

  it('action type is ADD_USER_TO_GROUP_FAIL when service is executed and fail', async () => {
    const userId = 'userId';
    const groupName = 'groupName';
    actions$ = of({
      type: UserActionTypes.ADD_USER_TO_GROUP,
      userId,
      groupName,
    });

    spyOn(toastrService, 'error');
    spyOn(service, 'addUserToGroup').and.returnValue(throwError({ error: { message: 'error' } }));

    effects.addUserToGroup$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(UserActionTypes.ADD_USER_TO_GROUP_FAIL);
    });
  });

  it('action type is REMOVE_USER_FROM_GROUP_SUCCESS when service is executed succesfully', async () => {
    const userId = 'userId';
    const groupName = 'groupName';
    actions$ = of({
      type: UserActionTypes.REMOVE_USER_FROM_GROUP,
      userId,
      groupName,
    });

    spyOn(toastrService, 'success');
    spyOn(service, 'removeUserFromGroup').and.returnValue(of(user));

    effects.removeUserFromGroup$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith('Remove user from group success');
      expect(action.type).toEqual(UserActionTypes.REMOVE_USER_FROM_GROUP_SUCCESS);
    });
  });

  it('action type is REMOVE_USER_FROM_GROUP_FAIL when service is executed succesfully', async () => {
    const userId = 'userId';
    const groupName = 'groupName';
    actions$ = of({
      type: UserActionTypes.REMOVE_USER_FROM_GROUP,
      userId,
      groupName,
    });

    spyOn(toastrService, 'error');
    spyOn(service, 'removeUserFromGroup').and.returnValue(throwError({ error: { message: 'error' } }));

    effects.removeUserFromGroup$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(UserActionTypes.REMOVE_USER_FROM_GROUP_FAIL);
    });
  });
});
