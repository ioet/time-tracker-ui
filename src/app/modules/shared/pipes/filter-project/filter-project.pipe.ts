import { Pipe, PipeTransform } from '@angular/core';
import { Project } from 'src/app/modules/shared/models/project.model';

@Pipe({
  name: 'filterProject',
})
export class FilterProjectPipe implements PipeTransform {
  transform(value: Project[], arg: string): Project[] {
    const restultProjects = [];
    for (const project of value) {
      if (project.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        restultProjects.push(project);
      }
    }
    return restultProjects;
  }
}
