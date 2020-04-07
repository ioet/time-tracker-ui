import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { Project } from '../../shared/models';

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
      tenant_id: 'b95385bd-d0f4-4823-b874-af9421c14c8e',
    });
  }

  updateProject(projectData): Observable<any> {
    const { id } = projectData;
    return this.http.put(`${this.url}/${id}`, projectData);
  }
}
