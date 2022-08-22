import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[appSlow]'
})

export class SlowDirective {

    constructor(public tpl: TemplateRef<any>) { }

}
