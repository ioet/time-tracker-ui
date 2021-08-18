import { updateProjectStorage, getProjectsOnStorage } from './project-storage.util';
import { Project } from '../models/project.model';

describe('Project Storage', () => {

  let storageProjects: Project[];
  let projectsIdentifier: string;
  let serverProjects: Project[];

  beforeEach(() => {
    projectsIdentifier = 'projectsSelected';

    storageProjects = [
      {
        customer: {
          name: 'ioet Inc. (was E&Y)',
        },
        id: 'f3630e59-9408-497e-945b-848112bd5a44',
        name: 'Time Tracker',
        customer_id: '20c96c4d-5e26-4426-a704-8bdd98c83319',
        status: 'active',
      }
    ];

    serverProjects = [
      {
        customer: {
          name: 'ioet Inc. (was E&Y)',
        },
        id: 'f3630e59-9408-497e-945b-848112bd5a44',
        name: 'Time Tracker',
        customer_id: '20c96c4d-5e26-4426-a704-8bdd98c83319',
        status: 'active',
      },
      {
        customer: {
          name: 'No Matter Name',
        },
        id: 'no-matter-id',
        name: 'Warby Parker',
        customer_id: 'no-matter-id',
        status: 'active',
      }
    ];

  });

  it('If exists projects in localStorage and the server returns the same project, should keep the same localStorage variables', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storageProjects));
    spyOn(localStorage, 'setItem');

    updateProjectStorage(serverProjects);

    expect(localStorage.setItem).toHaveBeenCalledWith(projectsIdentifier, JSON.stringify(storageProjects));
  });

  it('If exists projects in localStorage and the server does not return that project, should update the localStorage variable', () => {
    serverProjects.shift();
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storageProjects));
    spyOn(localStorage, 'setItem');

    updateProjectStorage(serverProjects);

    expect(localStorage.setItem).toHaveBeenCalledWith(projectsIdentifier, JSON.stringify([]));
  });

  it('If Server projects is empty, should not update the localStorage', () => {
    serverProjects = [];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storageProjects));
    spyOn(localStorage, 'setItem');

    updateProjectStorage(serverProjects);

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('If variables does not exists on localStorage, getProjectsOnStorage should return undefined', () => {
    projectsIdentifier = 'no-matter-identifier';
    spyOn(localStorage, 'getItem').and.returnValue(undefined);

    const projects = getProjectsOnStorage(projectsIdentifier);

    expect(projects).toBeUndefined();
  });

  it('If variables not exists on localStorage, getProjectsOnStorage should return an array of Projects', () => {
    const storageProjectsString = JSON.stringify(storageProjects);
    spyOn(localStorage, 'getItem').and.returnValue(storageProjectsString);

    const projects = getProjectsOnStorage(projectsIdentifier);

    expect(projects).toEqual(JSON.parse(storageProjectsString));
  });
});

