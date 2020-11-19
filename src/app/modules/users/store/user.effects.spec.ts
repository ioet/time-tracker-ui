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
  let toastrService;
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

  it('should return a list of users when the action LOAD_USERS call succeeds', async () => {
    actions$ = of({ type: UserActionTypes.LOAD_USERS });
    const serviceSpy = spyOn(service, 'loadUsers');
    serviceSpy.and.returnValue(of(user));

    effects.loadUsers$.subscribe((action) => {
      expect(action.type).toEqual(UserActionTypes.LOAD_USERS_SUCCESS);
    });
  });

  it('should return an error when the action LOAD_USERS call fails', async () => {
    actions$ = of({ type: UserActionTypes.LOAD_USERS });
    const serviceSpy = spyOn(service, 'loadUsers');
    serviceSpy.and.returnValue(throwError({ error: { message: 'fail!' } }));
    spyOn(toastrService, 'error');

    effects.loadUsers$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(UserActionTypes.LOAD_USERS_FAIL);
    });
  });
});
