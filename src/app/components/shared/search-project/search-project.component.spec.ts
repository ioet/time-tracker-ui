import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProjectComponent } from './search-project.component';

describe('SearchProjectComponent', () => {
  let component: SearchProjectComponent;
  let fixture: ComponentFixture<SearchProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
