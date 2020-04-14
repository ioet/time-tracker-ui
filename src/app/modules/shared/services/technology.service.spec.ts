import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Technology } from '../../shared/models';
import { TechnologyService } from './technology.service';
import { KEY } from '../../../../environments/environment';

describe('TechnologyService', () => {
  let service: TechnologyService;
  let httpMock: HttpTestingController;

  const technologyList: Technology = { items: [{ name: 'java' }, { name: 'javascript' }] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TechnologyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', inject(
    [HttpClientTestingModule, TechnologyService],
    (httpClient: HttpClientTestingModule, apiService: TechnologyService) => {
      expect(apiService).toBeTruthy();
      expect(httpClient).toBeTruthy();
    }
  ));

  it('technologies are read using GET from url', () => {
    const technologyFoundSize = technologyList.items.length;
    const technologyName = 'java';
    service.getTechnologies(technologyName).subscribe((technologyInResponse) => {
      expect(technologyInResponse.items.length).toBe(technologyFoundSize);
    });
    const getTechnologiesRequest = httpMock.expectOne(
      `${service.baseUrl}&inname=${technologyName}&site=stackoverflow&key=${KEY}`
    );
    expect(getTechnologiesRequest.request.method).toBe('GET');
    getTechnologiesRequest.flush(technologyList);
  });
});
