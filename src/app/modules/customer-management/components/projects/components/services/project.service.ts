import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { Project } from '../../../../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projects: Project[] = [];
  url = `${environment.timeTrackerApiUrl}/projects`;

  constructor(private http: HttpClient) {}

  getProjects(customerId: any): Observable<Project[]> {
    const params = new HttpParams().set('customer_id', customerId.customerId);
    return this.http.get<Project[]>(this.url, { params });
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }

  getRecentProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.url}/recent`);
  }

  createProject(projectData): Observable<any> {
    return this.http.post<Project[]>(this.url, projectData);
  }

  updateProject(projectData): Observable<any> {
    const { id } = projectData;
    return this.http.put(`${this.url}/${id}`, projectData);
  }

  deleteProject(projectId: string): Observable<any> {
    return this.http.delete(`${this.url}/${projectId}`);
  }
}
