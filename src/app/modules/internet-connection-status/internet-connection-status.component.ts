import { Component, OnInit, ContentChild, Attribute, OnDestroy} from '@angular/core';
import { FastDirective} from '../../modules/internet-connection-status/internet-connection-directives/fast.directive';
import { SlowDirective} from '../../modules/internet-connection-status/internet-connection-directives/slow.directive';
import { OfflineDirective} from '../../modules/internet-connection-status/internet-connection-directives/offline.directive';
import { Observable, of, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

type Connection = {
  effectiveType: string;
};

declare global {
  interface Navigator {
    connection: {
      effectiveType: string;
      addEventListener: (a: any, b: any) => {};
      removeEventListener: (a: any, b: any) => {};
    };
  }
}


@Component({
  selector: 'app-internet-connection-status',
  templateUrl: './internet-connection-status.component.html',
  styleUrls: ['./internet-connection-status.component.scss']
})
export class InternetConnectionStatusComponent implements OnInit {
  isFast = true;
  connectionType: string;
  networkType: string;
  @ContentChild(FastDirective) fast: FastDirective;
  @ContentChild(SlowDirective) slow: SlowDirective;
  @ContentChild(OfflineDirective) offline: OfflineDirective;

  private subscription: Subscription;

  constructor(@Attribute('listen') private withChanges: boolean, private toastrService: ToastrService) {
  }

  connection$ = new Observable((observer) => {
    const { effectiveType } = navigator.connection;
    observer.next(effectiveType);

    const onConnectionChange = () => {
      this.networkType = navigator.connection.effectiveType;
      observer.next(this.networkType);
    };

    navigator.connection.addEventListener('change', onConnectionChange);

    return () => {
      navigator.connection.removeEventListener('change', onConnectionChange);
      observer.complete();
    };
  });

  ngOnInit(){
    // $scope, $http
    // $scope.isLoading = function () {
    //   return $http.pendingRequests.length !== 0;
    // };
    const connection = navigator.connection;
    console.log('navigator component', connection);
    if (!connection || !connection.effectiveType) {
      return;
    }

    this.subscription = this.connection$
      .pipe(take(this.withChanges ? Number.POSITIVE_INFINITY : 1))
      .subscribe((effectiveType: string) => {

        this.connectionType = effectiveType;

        if (/\fast-5g|3g|4g/.test(effectiveType)){
          this.isFast = true;
        }else if (/\slow-2g|2g/.test(effectiveType)) {
            this.toastrService.warning('Caution your connection is slow');
            this.isFast = false;
        } else {
          this.toastrService.error('You are offline');
          this.isFast = false;
        }
      });
  }

}
