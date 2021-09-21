import { Project } from '../../../../../shared/models/project.model';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { ProjectActionTypes } from './project.actions';
import { ProjectEffects } from './project.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { INFO_SAVED_SUCCESSFULLY, INFO_DELETE_SUCCESSFULLY } from '../../../../../shared/messages';

describe('ProjectEffects', () => {
  let actions$: Observable<Action>;
  let effects: ProjectEffects;
  let service: ProjectService;
  let toastrService;
  const project: Project = { id: 'id', name: 'name', description: 'descrition', status: 'inactive' };
  const projects: Project[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectEffects, provideMockActions(() => actions$)],
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      declarations: [],
    });
    effects = TestBed.inject(ProjectEffects);
    service = TestBed.inject(ProjectService);
    toastrService = TestBed.inject(ToastrService);
  });

  it('SHOULD be created', async () => {
    expect(effects).toBeTruthy();
  });

  it('action type is LOAD_PROJECTS_SUCCESS when service is executed sucessfully', async () => {
    actions$ = of({ type: ProjectActionTypes.LOAD_PROJECTS });
    const serviceSpy = spyOn(service, 'getAllProjects');
    serviceSpy.and.returnValue(of(projects));

    effects.loadProjects$.subscribe((action) => {
      expect(action.type).toEqual(ProjectActionTypes.LOAD_PROJECTS_SUCCESS);
    });
  });

  it('action type is LOAD_PROJECTS_FAIL when service fail in execution', async () => {
    actions$ = of({ type: ProjectActionTypes.LOAD_PROJECTS });
    const serviceSpy = spyOn(service, 'getAllProjects');
    serviceSpy.and.returnValue(throwError({ error: { message: 'fail!' } }));
    spyOn(toastrService, 'error');

    effects.loadProjects$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(ProjectActionTypes.LOAD_PROJECTS_FAIL);
    });
  });

  it('action type is LOAD_RECENT_PROJECTS_SUCCESS when service is executed sucessfully', async () => {
    actions$ = of({ type: ProjectActionTypes.LOAD_PROJECTS });
    const serviceSpy = spyOn(service, 'getRecentProjects');
    serviceSpy.and.returnValue(of(projects));

    effects.loadRecentProjects$.subscribe((action) => {
      expect(action.type).toEqual(ProjectActionTypes.LOAD_RECENT_PROJECTS_SUCCESS);
    });
  });

  it('action type is LOAD_RECENT_PROJECTS_FAIL when service fail in execution', async () => {
    actions$ = of({ type: ProjectActionTypes.LOAD_PROJECTS });
    const serviceSpy = spyOn(service, 'getRecentProjects');
    serviceSpy.and.returnValue(throwError({ error: { message: 'fail!' } }));
    spyOn(toastrService, 'error');

    effects.loadRecentProjects$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(ProjectActionTypes.LOAD_RECENT_PROJECTS_FAIL);
    });
  });

  it('action type is UPDATE_PROJECT_SUCCESS when service is executed sucessfully', async () => {
    actions$ = of({ type: ProjectActionTypes.UPDATE_PROJECT, project });
    spyOn(toastrService, 'success');
    spyOn(service, 'updateProject').and.returnValue(of(project));

    effects.updateProject$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith(INFO_SAVED_SUCCESSFULLY);
      expect(action.type).toEqual(ProjectActionTypes.UPDATE_PROJECT_SUCCESS);
    });
  });

  it('action type is UPDATE_PROJECT_FAIL when service fail in execution', async () => {
    actions$ = of({ type: ProjectActionTypes.UPDATE_PROJECT, project });
    spyOn(toastrService, 'error');
    spyOn(service, 'updateProject').and.returnValue(throwError({ error: { message: 'fail!' } }));

    effects.updateProject$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(ProjectActionTypes.UPDATE_PROJECT_FAIL);
    });
  });

  it('action type is CREATE_PROJECT_SUCCESS when service is executed sucessfully', async () => {
    actions$ = of({ type: ProjectActionTypes.CREATE_PROJECT, payload: project });
    spyOn(toastrService, 'success');
    spyOn(service, 'createProject').and.returnValue(of(project));

    effects.createProject$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith(INFO_SAVED_SUCCESSFULLY);
      expect(action.type).toEqual(ProjectActionTypes.CREATE_PROJECT_SUCCESS);
    });
  });

  it('action type is CREATE_PROJECT_FAIL when service fail in execution', async () => {
    actions$ = of({ type: ProjectActionTypes.CREATE_PROJECT, payload: project });
    spyOn(toastrService, 'error');
    spyOn(service, 'createProject').and.returnValue(throwError({ error: { message: 'fail!' } }));

    effects.createProject$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(ProjectActionTypes.CREATE_PROJECT_FAIL);
    });
  });

  it('action type is DELETE_PROJECT_SUCCESS when service is executed sucessfully', async () => {
    const projectId = 'projectId';
    actions$ = of({ type: ProjectActionTypes.DELETE_PROJECT, projectId });
    spyOn(toastrService, 'success');
    spyOn(service, 'deleteProject').and.returnValue(of({}));

    effects.deleteProject$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith(INFO_DELETE_SUCCESSFULLY);
      expect(action.type).toEqual(ProjectActionTypes.DELETE_PROJECT_SUCCESS);
    });
  });

  it('action type is DELETE_PROJECT_FAIL when service fail in execution', async () => {
    const projectId = 'projectId';
    actions$ = of({ type: ProjectActionTypes.DELETE_PROJECT, projectId });
    spyOn(toastrService, 'error');
    spyOn(service, 'deleteProject').and.returnValue(throwError({ error: { message: 'fail!' } }));

    effects.deleteProject$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(ProjectActionTypes.DELETE_PROJECT_FAIL);
    });
  });

  it('action type is LOAD_CUSTOMER_PROJECTS_SUCCESS when service is executed sucessfully', async () => {
    const customerId = 'customerId';
    actions$ = of({ type: ProjectActionTypes.LOAD_CUSTOMER_PROJECTS, payload: customerId});
    const serviceSpy = spyOn(service, 'getProjects');
    serviceSpy.and.returnValue(of(projects));

    effects.loadCustomerProjects$.subscribe((action) => {
      expect(action.type).toEqual(ProjectActionTypes.LOAD_CUSTOMER_PROJECTS_SUCCESS);
    });
  });

  it('action type is LOAD_CUSTOMER_PROJECTS_FAIL when service fail in execution', async () => {
    const customerId = 'customerId';
    actions$ = of({ type: ProjectActionTypes.LOAD_CUSTOMER_PROJECTS, payload: customerId });
    const serviceSpy = spyOn(service, 'getProjects');
    serviceSpy.and.returnValue(throwError({ error: { message: 'fail!' } }));
    spyOn(toastrService, 'error');

    effects.loadCustomerProjects$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(ProjectActionTypes.LOAD_CUSTOMER_PROJECTS_FAIL);
    });
  });

  it('action type is UNARCHIVE_PROJECT_SUCCESS when service is executed sucessfully', async () => {
    const projectId = 'projectId';
    actions$ = of({ type: ProjectActionTypes.UNARCHIVE_PROJECT, projectId });
    spyOn(toastrService, 'success');
    spyOn(service, 'updateProject').and.returnValue(of(project));

    effects.unarchiveProject$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith(INFO_SAVED_SUCCESSFULLY);
      expect(action.type).toEqual(ProjectActionTypes.UNARCHIVE_PROJECT_SUCCESS);
    });
  });

  it('action type is UNARCHIVE_PROJECT_FAIL when service fail in execution', async () => {
    actions$ = of({ type: ProjectActionTypes.UNARCHIVE_PROJECT, project });
    spyOn(toastrService, 'error');
    spyOn(service, 'updateProject').and.returnValue(throwError({ error: { message: 'fail!' } }));

    effects.unarchiveProject$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(ProjectActionTypes.UNARCHIVE_PROJECT_FAIL);
    });
  });
});
