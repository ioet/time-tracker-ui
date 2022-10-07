import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export interface ErrorType {
  error: any;
  message?: string;
  isError?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StatusNetworkService {

  constructor(
    private toastrService: ToastrService
  ) { }

  showTypeToastrServiceAlert(dataError: ErrorType) {
    const { isError = false, message = 'The server is disconnected', error } = dataError;
    const effectiveTypenetwork = navigator.connection;

    if (effectiveTypenetwork.effectiveType === '2g') {
      this.toastrService.warning('Your request was not completed, your connection is slow');
      return
    }

    if (!isError) {
      this.toastrService.warning(message);
      return
    }

    const errorMessa = (error.error && error.error.message ? error.error.message :
      'There was an error in the server, your request was not completed');
    this.toastrService.error(errorMessa);

  }}
