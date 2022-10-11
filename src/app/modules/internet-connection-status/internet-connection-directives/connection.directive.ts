import { Directive, Attribute, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[appConnection]'
})

export class ConnectionDirective implements OnInit {
    constructor(
        @Attribute('slowSrc') private slowSrc,
        @Attribute('fastSrc') private fastSrc,
        @Attribute('offlineSrc') private offlineSrc,
        private host: ElementRef<HTMLImageElement>
    ) {
    }

    ngOnInit() {
        const { effectiveType } = navigator.connection;
        let networkStatus;
        if (/\fast-5g|3g|4g/.test(effectiveType)) {
            networkStatus = this.fastSrc;
        } else if (/\slow-2g|2g/.test(effectiveType))  {
            networkStatus = this.slowSrc;
        } else {
            networkStatus = this.offlineSrc;
        }

        this.host.nativeElement.setAttribute('src', networkStatus);
    }
}
