import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Project[] = [];
  url = 'assets/project.json';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }
}
