import { Project } from '../models/project.model';
import { PROJECTS_KEY_FOR_LOCAL_STORAGE } from '../../../../environments/environment';

const projectsKey = PROJECTS_KEY_FOR_LOCAL_STORAGE;

export function updateProjectStorage(serverProjects: Project[]): void {
  const storageProjects: Project[] = getProjectsOnStorage(projectsKey);
  const isServerProjectsNotEmpty = serverProjects && serverProjects.length !== 0;
  const updatedStorageProjects: Project[] = [];

  if (serverProjects && isServerProjectsNotEmpty && storageProjects) {
    storageProjects.forEach((storageProject: Project) => {
      const project = serverProjects.find((serverProject) => serverProject.id === storageProject.id);

      if (project) {
        updatedStorageProjects.push(project);
      }
    });

    const projectsForLocalStorage = JSON.stringify(updatedStorageProjects);
    localStorage.setItem(projectsKey, projectsForLocalStorage);
  }
}

export function getProjectsOnStorage(projectsIdentifier: string): Project[] {
  const projectsInsideLocalStorage: string = localStorage.getItem(projectsIdentifier);
  return projectsInsideLocalStorage && JSON.parse(projectsInsideLocalStorage);
}


