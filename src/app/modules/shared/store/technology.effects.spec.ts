import { Technology } from '../models/technology.model';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { TechnologyService } from '../services/technology.service';
import { TechnologyActionTypes, FindTechnology } from './technology.actions';
import { TechnologyEffects } from './technology.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TechnologyEffects', () => {
  let actions$: Observable<Action>;
  let effects: TechnologyEffects;
  let service: TechnologyService;
  const technology: Technology = { items: ['angular', 'angularjs'] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TechnologyEffects, provideMockActions(() => actions$)],
      imports: [HttpClientTestingModule],
      declarations: [],
    });
    effects = TestBed.inject(TechnologyEffects);
    service = TestBed.inject(TechnologyService);
  });

  it('should be created', async () => {
    expect(effects).toBeTruthy();
  });

  it('action type is LOAD_TECHNOLOGIES_SUCCESS when service is executed sucessfully', async () => {
    const findTechnology = 'angular';
    actions$ = of(new FindTechnology(findTechnology));
    const serviceSpy = spyOn(service, 'getTechnologies');
    serviceSpy.and.returnValue(of(technology));

    effects.findTechnology$.subscribe((action) => {
      expect(action.type).toEqual(TechnologyActionTypes.FIND_TECHNOLOGIES_SUCESS);
    });
  });

  it('action type is LOAD_TECHNOLOGIES_FAIL when service fail in execution', async () => {
    const findTechnology = 'angular';
    actions$ = of(new FindTechnology(findTechnology));
    const serviceSpy = spyOn(service, 'getTechnologies');
    serviceSpy.and.returnValue(throwError({ error: { message: 'fail!' } }));

    effects.findTechnology$.subscribe((action) => {
      expect(action.type).toEqual(TechnologyActionTypes.FIND_TECHNOLOGIES_FAIL);
    });
  });
});
