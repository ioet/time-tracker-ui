import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLiistComponent } from './project-liist.component';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ProjectTableListComponent', () => {
  let component: ProjectLiistComponent;
  let fixture: ComponentFixture<ProjectLiistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [ProjectLiistComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLiistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
