import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import * as actions from '../../store/technology.actions';
import { select, Store } from '@ngrx/store';
import {TechnologyState} from '../../store/technology.reducers';
import {allTechnologies} from '../../store/technology.selectors';
import {Technology} from '../../models';


@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss']
})
export class TechnologiesComponent implements OnInit {
  private readonly MAX_NUM_TECHNOLOGIES = 10;
  private readonly MIN_QUERY_LENGTH = 2;
  public query = '';
  showList = false;
  isLoading = false;
  technology: Technology;

  @Input()
  selectedTechnologies: string[] = [];
  @ViewChild('technologiesDropdown') list: ElementRef;
  @Output()
  technologyRemoved: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()
  technologyAdded: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(private store: Store<TechnologyState>, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.showList && !this.list.nativeElement.contains(e.target)) {
        this.showList = false;
      }
    });
  }

  queryTechnologies(event: Event) {
    const inputElement: HTMLInputElement = (event.target) as HTMLInputElement;
    const query: string = inputElement.value;
    if (query.length >= this.MIN_QUERY_LENGTH) {
      this.showList = true;
      this.store.dispatch(new actions.FindTechnology(query));
    }
  }

  ngOnInit(): void {
    const technologies$ = this.store.pipe(select(allTechnologies));
    technologies$.subscribe((response) => {
      this.isLoading = response.isLoading;
      if ( response.technologyList.items ) {
        const filteredItems = response.technologyList.items.filter(item => !this.selectedTechnologies.includes(item.name));
        this.technology = {items: filteredItems};
      } else {
        this.technology = {items: []};
      }
    });
  }

  addTechnology(name: string) {
    if (this.selectedTechnologies.length < this.MAX_NUM_TECHNOLOGIES) {
      this.selectedTechnologies = [...this.selectedTechnologies, name];
      this.technologyAdded.emit(this.selectedTechnologies);
      this.showList = false;
      this.query = '';
    }
  }

  removeTechnology(index: number) {
    this.selectedTechnologies = this.selectedTechnologies.filter((item) => item !== this.selectedTechnologies[index]);
    this.technologyRemoved.emit(this.selectedTechnologies);
  }
}
