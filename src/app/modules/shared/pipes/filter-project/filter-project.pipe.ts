import { Pipe, PipeTransform } from '@angular/core';
import { Project } from 'src/app/modules/shared/models/project.model';

@Pipe({
  name: 'filterProject'
})
export class FilterProjectPipe implements PipeTransform {

  transform(value: Project[] = [], arg: string): string[] {

    const restultProjects = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < value.length; i++) {
      if (value[i].name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        if (arg.length < 1) {
          restultProjects.push(value[i]);
        } else if (value[i].status === 'Active') {
          restultProjects.push(value[i]);
        }
      }
    }
    console.log(restultProjects.length);
    return restultProjects;
  }

}
