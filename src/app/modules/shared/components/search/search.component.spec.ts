import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit changedFilterValue event #changeFilterValue', () => {
    component.filterValue = 'angular';
    spyOn(component.changedFilterValue, 'emit');
    component.changeFilterValue();
    expect(component.changedFilterValue.emit).toHaveBeenCalled();
  });
});
