import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';



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

  // getProject(projectId): Observable<Project> {
  //   return this.http.get<Project>(this.url).pipe(
  //     filter((project: Project) => project.id === projectId)[0]
  //   );
  // }

}
