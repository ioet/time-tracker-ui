import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { ProjectType } from '../../../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ProjectTypeService {
  baseUrl = `${environment.timeTrackerApiUrl}/project-types`;

  constructor(private http: HttpClient) {}

  getProjectTypes(customerId: any): Observable<ProjectType[]> {
    const params = new HttpParams().set('customer_id', customerId.customerId);
    return this.http.get<ProjectType[]>(this.baseUrl, { params }).pipe(map((data: { status: any; }) => {
      console.log("Here will be return response code Ex :200", data.status)
      return data.status
        }));
  }

  createProjectType(projectTypeData): Observable<any> {
    return this.http.post(this.baseUrl, projectTypeData);
  }

  deleteProjectType(projectTypeId: string): Observable<any> {
    const url = `${this.baseUrl}/${projectTypeId}`;
    return this.http.delete(url);
  }

  updateProjectType(projectTypeData): Observable<any> {
    const url = `${this.baseUrl}/${projectTypeData.id}`;
    return this.http.put(url, projectTypeData) 
  }
}
