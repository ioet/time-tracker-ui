import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserInfoService } from './user-info.service';
import { LoginService } from '../../login/services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('UserInfoService', () => {
  let service: UserInfoService;
  const userTest = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiVW5rbm93biBOYW1lIiwiZW1haWwiOiJleGFtcGxlQG1haWwuY29tIiwicm9sZXMiOltdLCJncm91cHMiOlsiZmFrZS1hZG1pbiIsImZha2UtdGVzdGVyIl0sImlkIjoiZHVtbXlfaWRfbG9hZCIsInRlbmFudF9pZCI6ImR1bW15X3RlbmFudF9pZF9sb2FkIiwiZGVsZXRlZCI6IiJ9.kTlan9Ea0uYVAPdVNmcJ11IQ1t8zRCOnEQckqpx2O9w';
  const helper = new JwtHelperService();
  const getUserInfo = () => {
    return helper.decodeToken(userTest);
  };

  const mockLoginService = {
    getLocalStorage: () => {
      return userTest;
    },
    isValidToken: () => {
      return of(true);
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      providers: [{ provide : LoginService, useValue: mockLoginService}],
    });
    service = TestBed.inject(UserInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const params = [
    { groupName: 'fake-admin', expectedValue: true },
    { groupName: 'fake-owner', expectedValue: false },
  ];

  params.map((param) => {
    it(`given group ${param.groupName} and groups [${getUserInfo().groups.toString()}], isMemberOf() should return ${
      param.expectedValue
    }`, () => {
      service.isMemberOf(param.groupName).subscribe((value) => {
        if (param.groupName === 'fake-admin') {
          expect(value).toEqual(true);
        } else {
          expect(value).toEqual(false);
        }
      });
    });
  });

  it('should return true if is Admin', () => {
      service.isMemberOf('fake-admin').subscribe((value) => {
        expect(value).toEqual(true);
      });
  });

  it('should call isAdmin user', () => {
    spyOn(service, 'isMemberOf').withArgs('time-tracker-admin').and.returnValue(of(true));
    service.isAdmin().subscribe((value) => {
        expect(value).toEqual(true);
      });
  });

  it('should call isTester user', () => {
    spyOn(service, 'isMemberOf').withArgs('time-tracker-tester').and.returnValue(of(true));
    service.isTester().subscribe((value) => {
        expect(value).toEqual(true);
      });
  });

});
