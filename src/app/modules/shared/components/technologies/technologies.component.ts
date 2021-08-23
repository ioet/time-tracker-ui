import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import * as actions from '../../store/technology.actions';
import { TechnologyState } from '../../store/technology.reducers';
import { allTechnologies } from '../../store/technology.selectors';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss']
})
export class TechnologiesComponent implements OnInit, OnDestroy {
  readonly MAX_NUM_TECHNOLOGIES = 10;
  readonly NO_RESULTS_MESSAGE = 'No technologies found';
  readonly TECHNOLOGIES_PLACEHOLDER = 'Time Entry Technologies';
  readonly ALLOW_SELECT_MULTIPLE = true;
  readonly ALLOW_SEARCH = true;
  readonly MIN_SEARCH_TERM_LENGTH = 2;
  readonly TYPE_TO_SEARCH_TEXT = 'Please enter 2 or more characters';

  isLoading = false;
  technologies: string[];
  technologiesInput$ = new Subject<string>();

  technologiesInputSubscription: Subscription;
  technologiesSubscription: Subscription;

  @Input()
  isDisabled: boolean;

  @Input()
  selectedTechnologies: string[] = [];

  @Output()
  technologyUpdated: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(private store: Store<TechnologyState>) {}

  ngOnInit(): void {
    const technologies$ = this.store.pipe(select(allTechnologies));

    this.technologiesInputSubscription = this.technologiesInput$.pipe(
      filter(searchQuery => searchQuery && searchQuery.length >= this.MIN_SEARCH_TERM_LENGTH),
      distinctUntilChanged(),
      debounceTime(400)
    ).subscribe((searchQuery) => this.searchTechnologies(searchQuery));

    this.technologiesSubscription = technologies$.subscribe(({ isLoading, technologyList }) => {
      this.isLoading = isLoading;
      if ( technologyList.items ) {
        this.technologies = technologyList.items;
      } else {
        this.technologies = [];
      }
    });
  }

  searchTechnologies(searchQuery) {
    this.store.dispatch(new actions.FindTechnology(searchQuery));
  }

  updateTechnologies() {
    this.technologyUpdated.emit(this.selectedTechnologies);
    this.technologies = [];
  }

  ngOnDestroy() {
    this.technologiesSubscription.unsubscribe();
    this.technologiesInputSubscription.unsubscribe();
  }
}
