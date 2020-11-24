import { ProjectType } from '../../../../shared/models/project-type.model';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { ProjectTypeService } from '../services/project-type.service';
import { ProjectTypeActionTypes } from './project-type.actions';
import { ProjectTypeEffects } from './project-type.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { INFO_DELETE_SUCCESSFULLY, INFO_SAVED_SUCCESSFULLY } from '../../../../shared/messages';

describe('ProjectTypeEffects', () => {
  let actions$: Observable<Action>;
  let effects: ProjectTypeEffects;
  let service: ProjectTypeService;
  let toastrService;
  const projectType: ProjectType = { id: 'id', name: 'name', description: 'description' };
  const projectTypes: ProjectType[] = [];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectTypeEffects, provideMockActions(() => actions$)],
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      declarations: [],
    });
    effects = TestBed.inject(ProjectTypeEffects);
    service = TestBed.inject(ProjectTypeService);
    toastrService = TestBed.inject(ToastrService);
  });

  it('SHOULD be created', async () => {
    expect(effects).toBeTruthy();
  });

  it('action type is LOAD_PROJECT_TYPES_SUCCESS when service is executed sucessfully', async () => {
    actions$ = of({ type: ProjectTypeActionTypes.LOAD_PROJECT_TYPES });
    const serviceSpy = spyOn(service, 'getProjectTypes');
    serviceSpy.and.returnValue(of(projectTypes));

    effects.getProjectTypes$.subscribe((action) => {
      expect(action.type).toEqual(ProjectTypeActionTypes.LOAD_PROJECT_TYPES_SUCCESS);
    });
  });

  it('action type is LOAD_PROJECT_TYPES_FAIL when service fail in execution', async () => {
    actions$ = of({ type: ProjectTypeActionTypes.LOAD_PROJECT_TYPES });
    const serviceSpy = spyOn(service, 'getProjectTypes');
    serviceSpy.and.returnValue(throwError({ error: { message: 'fail!' } }));
    spyOn(toastrService, 'error');

    effects.getProjectTypes$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(ProjectTypeActionTypes.LOAD_PROJECT_TYPES_FAIL);
    });
  });

  it('action type is UPDATE_PROJECT_TYPE_SUCCESS when service is executed sucessfully', async () => {
    actions$ = of({ type: ProjectTypeActionTypes.UPDATE_PROJECT_TYPE, projectType });
    spyOn(toastrService, 'success');
    spyOn(service, 'updateProjectType').and.returnValue(of(projectType));

    effects.updateProjectType$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith(INFO_SAVED_SUCCESSFULLY);
      expect(action.type).toEqual(ProjectTypeActionTypes.UPDATE_PROJECT_TYPE_SUCCESS);
    });
  });

  it('action type is UPDATE_PROJECT_TYPE_FAIL when service fail in execution', async () => {
    actions$ = of({ type: ProjectTypeActionTypes.UPDATE_PROJECT_TYPE, projectType });
    spyOn(toastrService, 'error');
    spyOn(service, 'updateProjectType').and.returnValue(throwError({ error: { message: 'fail!' } }));

    effects.updateProjectType$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(ProjectTypeActionTypes.UPDATE_PROJECT_TYPE_FAIL);
    });
  });

  it('action type is CREATE_PROJECT_TYPE_SUCCESS when service is executed sucessfully', async () => {
    actions$ = of({ type: ProjectTypeActionTypes.CREATE_PROJECT_TYPE, payload: projectType });
    spyOn(toastrService, 'success');
    spyOn(service, 'createProjectType').and.returnValue(of(projectType));

    effects.createProjectType$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith(INFO_SAVED_SUCCESSFULLY);
      expect(action.type).toEqual(ProjectTypeActionTypes.CREATE_PROJECT_TYPE_SUCCESS);
    });
  });

  it('action type is CREATE_PROJECT_TYPE_FAIL when service fail in execution', async () => {
    actions$ = of({ type: ProjectTypeActionTypes.CREATE_PROJECT_TYPE, payload: projectType });
    spyOn(toastrService, 'error');
    spyOn(service, 'createProjectType').and.returnValue(throwError({ error: { message: 'fail!' } }));

    effects.createProjectType$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(ProjectTypeActionTypes.CREATE_PROJECT_TYPE_FAIL);
    });
  });

  it('action type is DELETE_PROJECT_TYPE_SUCCESS when service is executed sucessfully', async () => {
    const projectTypeId = 'projectTypeId';
    actions$ = of({ type: ProjectTypeActionTypes.DELETE_PROJECT_TYPE, projectTypeId });
    spyOn(toastrService, 'success');
    spyOn(service, 'deleteProjectType').and.returnValue(of({}));

    effects.deleteProjectType$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith(INFO_DELETE_SUCCESSFULLY);
      expect(action.type).toEqual(ProjectTypeActionTypes.DELETE_PROJECT_TYPE_SUCCESS);
    });
  });

  it('action type is DELETE_PROJECT_TYPE_FAIL when service fail in execution', async () => {
    const projectTypeId = 'projectTypeId';
    actions$ = of({ type: ProjectTypeActionTypes.DELETE_PROJECT_TYPE, projectTypeId });
    spyOn(toastrService, 'error');
    spyOn(service, 'deleteProjectType').and.returnValue(throwError({ error: { message: 'fail!' } }));

    effects.deleteProjectType$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(ProjectTypeActionTypes.DELETE_PROJECT_TYPE_FAIL);
    });
  });
});
