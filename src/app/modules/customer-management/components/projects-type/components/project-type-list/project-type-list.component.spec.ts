import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NgxPaginationModule } from 'ngx-pagination';

import { DeleteProjectType, SetProjectTypeToEdit } from './../../store/project-type.actions';
import { allProjectTypes, ProjectTypeState } from '../../store';
import { ProjectTypeListComponent } from './project-type-list.component';

describe('ProjectTypeTableListComponent', () => {
  let component: ProjectTypeListComponent;
  let fixture: ComponentFixture<ProjectTypeListComponent>;
  let store: MockStore<ProjectTypeState>;
  let mockProjectTypeSelector;

  const state = {
    data: [{ id: 'id', name: 'name', description: 'description' }],
    isLoading: false,
    message: '',
    projectTypeIdToEdit: '',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [ProjectTypeListComponent],
      providers: [
        provideMockStore({ initialState: state })
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
    store.setState(state);
    mockProjectTypeSelector = store.overrideSelector(allProjectTypes, state.data);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('onInit, projectTypes field is populated with data from store', () => {
    component.ngOnInit();
    expect(component.projectTypes).toBe(state.data);
  });

  it('dispatchs DeleteProjectType on deleteProjectType', () => {
    spyOn(store, 'dispatch');
    component.idToDelete = 'id';
    component.deleteProjectType();

    expect(store.dispatch).toHaveBeenCalledWith(new DeleteProjectType('id'));
  });

  it('dispatchs UpdateProjectType on updateProjectType', () => {
    spyOn(store, 'dispatch');

    component.updateProjectType('id');

    expect(store.dispatch).toHaveBeenCalledWith(new SetProjectTypeToEdit('id'));
  });

});
