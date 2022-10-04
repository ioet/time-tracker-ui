import { ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { INFO_SAVED_SUCCESSFULLY } from '../messages';


export class Functions {
    constructor(
        private toastrService: ToastrService
    ) { }

    getValue2<Actions>(value: Action) {
        const actions: Action;
        ofType(actions.ActivityManagementActionTypes.UPDATE_ACTIVITY),
            map((action: actions.UpdateActivity) => action.payload),
            mergeMap((activity) =>
                this.activityService.updateActivity(activity).pipe(
                    map((activityData) => {
                        this.toastrService.success(INFO_SAVED_SUCCESSFULLY);
                        return new actions.UpdateActivitySuccess(activityData);
                    }),
                    catchError((error) => {
                        this.toastrService.error(error.error.message);
                        return of(new actions.UpdateActivityFail(error));
                    })
                )
            )
        return value;
    }
}
