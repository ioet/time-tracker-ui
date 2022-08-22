import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[appOffline]'
})

export class OfflineDirective {

    constructor(public tpl: TemplateRef<any>) { }

}
