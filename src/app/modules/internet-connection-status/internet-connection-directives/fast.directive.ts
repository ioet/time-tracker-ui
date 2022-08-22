import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[appFast]'
})

export class FastDirective {

    constructor(public tpl: TemplateRef<any>) { }

}
