import { StopTimeEntryRunning } from './../store/entry.actions';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ToastrService } from 'ngx-toastr';
import { TimeClockComponent } from './time-clock.component';
import { ProjectState } from '../../customer-management/components/projects/components/store/project.reducer';
import { ProjectListHoverComponent } from '../components';
import { FilterProjectPipe } from '../../shared/pipes';
import { AzureAdB2CService } from '../../login/services/azure.ad.b2c.service';

describe('TimeClockComponent', () => {
  let component: TimeClockComponent;
  let fixture: ComponentFixture<TimeClockComponent>;
  let store: MockStore<ProjectState>;
  let azureAdB2CService: AzureAdB2CService;
  let injectedToastrService;

  const toastrService = {
    success: () => {},
  };
  const state = {
    projects: {
      projects: [{ id: 'id', name: 'name', project_type_id: '' }],
      customerProjects: [{ id: 'id', name: 'name', description: 'description' }],
      isLoading: false,
    },
    activities: {
      data: [{ id: 'id', name: 'name', description: 'description' }],
      isLoading: false,
      message: 'message',
    },
    entries: {
      active: {
        id: 'id',
        project_id: '2b87372b-3d0d-4dc0-832b-ae5863cd39e5',
        start_date: '2020-04-23T16:11:06.455000+00:00',
        technologies: ['java', 'typescript'],
      },
      entryList: [],
      isLoading: false,
      message: '',
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TimeClockComponent, ProjectListHoverComponent, FilterProjectPipe],
      providers: [
        AzureAdB2CService,
        { provide: ToastrService, useValue: toastrService },
        provideMockStore({ initialState: state }),
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    azureAdB2CService = TestBed.inject(AzureAdB2CService);
    injectedToastrService = TestBed.inject(ToastrService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('onInit checks if isLogin and gets the userName', () => {
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(true);
    spyOn(azureAdB2CService, 'getName').and.returnValue('Name');
    component.ngOnInit();
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
    expect(azureAdB2CService.getName).toHaveBeenCalled();
  });

  it('onInit does not get the name if isLogin false', () => {
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(false);
    spyOn(azureAdB2CService, 'getName').and.returnValue('Name');
    component.ngOnInit();
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
    expect(azureAdB2CService.getName).toHaveBeenCalledTimes(0);
  });

  it('clockOut dispatch a StopTimeEntryRunning action', () => {
    spyOn(store, 'dispatch');

    component.clockOut();

    expect(store.dispatch).toHaveBeenCalledWith(new StopTimeEntryRunning('id'));
  });
});
