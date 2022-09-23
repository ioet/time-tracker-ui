// import { Injectable } from '@angular/core';
// import { Interface } from 'readline';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';

// import { environment } from '../../../environments/environment';
// import { EnvironmentType } from '../../../environments/enum';
// import { Project } from '../shared/models';

// @Injectable({
//   providedIn: 'root'
// })
// export abstract class ServicesManagementService {
//   url = `${environment.timeTrackerApiUrl}/projects`;
//   isDevelopmentOrProd = environment.production === EnvironmentType.TT_DEV || environment.production === EnvironmentType.TT_PROD;

//   constructor(private http: HttpClient) { }

//   protected getAll(interfaceModel: any): Observable<Interface> {
//     return this.http.get<interfaceModel[]>(this.url);
//   }

// }
