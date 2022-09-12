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

  checkTypeError(dataError: ErrorType){
      const { isError = false, message = 'The server is disconnected', error} = dataError; 
      const effectiveTypenetwork = navigator.connection;
      if(effectiveTypenetwork.effectiveType === '2g'){
        this.toastrService.warning('Your request was not completed, your connection is slow');
      }else{
        if(isError){
          const errorMessa =  error.error && error.error.message? error.error.message: 'There is an error with the server, your request have not be completed';
          this.toastrService.error(errorMessa);
        }else{
          this.toastrService.warning(message);
        }
      }
  }
}
