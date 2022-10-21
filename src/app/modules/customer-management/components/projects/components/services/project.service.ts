import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { EnvironmentType } from '../../../../../../../environments/enum';
import { Project } from '../../../../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projects: Project[] = [];
  url = `${environment.timeTrackerApiUrl}/projects`;
  isDevelopmentOrProd = environment.production === EnvironmentType.TT_DEV || environment.production === EnvironmentType.TT_PROD;

  constructor(private http: HttpClient) {}

  getProjects(customerId: any): Observable<Project[]> {
    const params = new HttpParams().set('customer_id', customerId.customerId);
    return this.http.get<Project[]>(this.url, { params, withCredentials: true });
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url, { withCredentials: true });
  }

  getRecentProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.url}/recent`, { withCredentials: true });
  }

  createProject(projectData): Observable<any> {
    return this.http.post<Project[]>(this.url, projectData, { withCredentials: true });
  }

  updateProject(projectData): Observable<any> {
    const { id } = projectData;
    if (this.isDevelopmentOrProd) {
      if (projectData.status === 'active') {
        projectData.status = 1;
      }
    }
    return this.http.put(`${this.url}/${id}`, projectData, { withCredentials: true });
  }

  deleteProject(projectId: string): Observable<any> {
    return this.isDevelopmentOrProd
      ? this.http.put(`${this.url}/${projectId}`, { status: 0 })
      : this.http.delete(`${this.url}/${projectId}`, { withCredentials: true });
  }
}
