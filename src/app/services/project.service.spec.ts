import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProjectService);
  });


  it('should create', inject([HttpClientTestingModule, ProjectService],
    (httpClient: HttpClientTestingModule, apiService: ProjectService) => {
      expect(apiService).toBeTruthy();
      expect(httpClient).toBeTruthy();
  }));

});
