import { TestBed } from '@angular/core/testing';
import { catchError } from 'rxjs/operators';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { StatusNetworkService } from './status-network.service';

export interface ErrorType {
  error: any;
  message?: string;
  isError?: boolean;
}
describe('StatusNetworkService', () => {
  let service: StatusNetworkService;
  const toastrServiceStub = {
    error: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { },
    warning: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastrService, {
        provide: ToastrService, useValue: toastrServiceStub
      }]
    });
    service = TestBed.inject(StatusNetworkService);
  });

  it('showTypeToastrServiceAlert is error', () => {
    const errorType: ErrorType = {error: catchError, message: 'The server is disconnected', isError: true};
    spyOn(toastrServiceStub, 'error');
    service.showTypeToastrServiceAlert(errorType);
    expect(toastrServiceStub.error).toHaveBeenCalled();
  });

  it('showTypeToastrServiceAlert is warning with message', () => {
    const errorType: ErrorType = {error: catchError, message: 'The server is disconnected', isError: false};
    spyOn(toastrServiceStub, 'warning');
    service.showTypeToastrServiceAlert(errorType);
    expect(toastrServiceStub.warning).toHaveBeenCalled();
  });

  it('showTypeToastrServiceAlert is warning without message', () => {
    const errorType: ErrorType = {error: catchError, isError: false};
    spyOn(toastrServiceStub, 'warning');
    service.showTypeToastrServiceAlert(errorType);
    expect(toastrServiceStub.warning).toHaveBeenCalled();
  });
});
