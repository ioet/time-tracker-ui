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

  it('When technologies are updated, technolgyUpdated should emit an event with new Technologies', () => {
    const selectedTechnologies = ['java', 'angular'];
    const technologyUpdatedSpy = spyOn(component.technologyUpdated, 'emit');
    component.selectedTechnologies = selectedTechnologies;

    component.updateTechnologies();

    expect(technologyUpdatedSpy).toHaveBeenCalled();
    expect(technologyUpdatedSpy).toHaveBeenCalledWith(selectedTechnologies);
    expect(component.technologies).toEqual([]);
  });

  it('when querying technologies, then a FindTechnology action should be dispatched', () => {
    const query = 'react';
    spyOn(store, 'dispatch');
    component.searchTechnologies(query);

    expect(store.dispatch).toHaveBeenCalledWith(new actions.FindTechnology(query));
  });

  it('calls unsubscribe on ngDestroy', () => {

    const technologyInputSpy = spyOn(component.technologiesInputSubscription, 'unsubscribe');
    const technologiesSpy = spyOn(component.technologiesSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(technologyInputSpy).toHaveBeenCalled();
    expect(technologiesSpy).toHaveBeenCalled();
  });
});
