import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProject'
})
export class FilterProjectPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const restultProjects = [];
    for ( const projects of value ) {
      if ( projects.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
        restultProjects.push(projects);
      }
    }
    return restultProjects;
  }
}
