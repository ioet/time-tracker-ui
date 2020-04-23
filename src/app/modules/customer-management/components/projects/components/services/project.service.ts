import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { Project } from '../../../../../shared/models';
import { AzureAdB2CService } from '../../../../../login/services/azure.ad.b2c.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projects: Project[] = [];
  url = `${environment.timeTrackerApiUrl}/projects`;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }

  createProject(projectData): Observable<any> {
    return this.http.post<Project[]>(this.url, {
      ...projectData,
      customer_id: 'b6e6a2f1-ce5c-49b3-8649-d154b4f3c305',
    });
  }

  updateProject(projectData): Observable<any> {
    const { id } = projectData;
    return this.http.put(`${this.url}/${id}`, projectData);
  }

  deleteProject(projectId: string): Observable<any> {
    return this.http.delete(`${this.url}/${projectId}`);
  }
}
