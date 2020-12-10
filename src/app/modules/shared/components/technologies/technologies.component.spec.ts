import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TechnologyState} from '../../store/technology.reducers';
import {allTechnologies} from '../../store/technology.selectors';
import {TechnologiesComponent} from './technologies.component';
import * as actions from '../../store/technology.actions';

describe('Technologies component', () => {
  let component: TechnologiesComponent;
  let fixture: ComponentFixture<TechnologiesComponent>;
  let store: MockStore<TechnologyState>;
  let mockTechnologySelector;

  const state = {
    technologies: {
      technologyList: {items: [{name: 'java'}]},
      isLoading: false,
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TechnologiesComponent],
      providers: [provideMockStore({initialState: state})],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    mockTechnologySelector = store.overrideSelector(allTechnologies, state.technologies);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when a new technology is added, it should be added to the selectedTechnologies list', () => {
    const name = 'ngrx';
    component.selectedTechnologies = ['java', 'javascript'];
    component.selectedTechnologies.indexOf(name);
    length = component.selectedTechnologies.length;
    component.addTechnology(name);
    expect(component.selectedTechnologies.length).toBe(3);
  });

  it('when the max number of technologies is reached, then adding technologies is not allowed', () => {
    const name = 'ngrx';
    component.selectedTechnologies = [
      'java',
      'javascript',
      'angular',
      'angular-ui',
      'typescript',
      'scss',
      'bootstrap',
      'jasmine',
      'karma',
      'github',
    ];
    length = component.selectedTechnologies.length;
    component.addTechnology(name);
    expect(component.selectedTechnologies.length).toBe(10);
  });

  it('when a technology is removed, then it should be removed from the technologies list', () => {
    const index = 1;
    component.selectedTechnologies = ['java', 'angular'];
    component.removeTechnology(index);
    expect(component.selectedTechnologies.length).toBe(1);
  });

  it('when querying technologies, then a FindTechnology action should be dispatched', () => {
    const query = 'react';
    const target = {value: query};
    const event = new InputEvent('input');
    spyOnProperty(event, 'target').and.returnValue(target);
    spyOn(store, 'dispatch');
    component.queryTechnologies(event);

    expect(store.dispatch).toHaveBeenCalledWith(new actions.FindTechnology(query));
  });
});
