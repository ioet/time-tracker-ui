import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.get<ProjectType[]>(this.baseUrl, { params });
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
    return this.http.put(url, projectTypeData);
  }
}
