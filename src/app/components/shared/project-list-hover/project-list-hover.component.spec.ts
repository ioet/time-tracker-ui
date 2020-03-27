import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectListHoverComponent } from "./project-list-hover.component";
import { FilterProjectPipe } from 'src/app/components/shared/pipes/filter-project/filter-project.pipe';

describe("ProjectListHoverComponent", () => {
  let component: ProjectListHoverComponent;
  let fixture: ComponentFixture<ProjectListHoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectListHoverComponent, FilterProjectPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set selectedId with Id", () => {
    const id: string = "P1";
    component.clockIn(id);
    expect(component.selectedId).toBe(id);
  });

  it("should emit showFields event", () => {
    const id: string = "P1";
    component.showFields.subscribe((showFields: boolean) =>
      expect(showFields).toEqual(true)
    );
    component.clockIn(id);
  });
});
