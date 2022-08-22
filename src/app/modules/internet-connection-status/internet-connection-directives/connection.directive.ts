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
        let src;
        if (/\fast-5g|3g|4g/.test(effectiveType)) {
            src = this.fastSrc;
        }else if (/\slow-2g|2g/.test(effectiveType))  {
            src = this.slowSrc;
        }else {
            src = this.offlineSrc;
        }
        this.host.nativeElement.setAttribute('src', src);
    }

}
