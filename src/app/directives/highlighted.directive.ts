import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlighted]'
})
export class HighlightedDirective {

  constructor( private el: ElementRef ) {
    console.log('Directiva llamada!');
   }

   @Input('appHighlighted') nuevoColor: string;

   @HostListener('mouseenter') mouseEntro() {
    this.resaltar( this.nuevoColor || 'red' );
   }

   @HostListener('mouseleave') mouseSalio() {
    this.resaltar( null );
   }

   private resaltar( color: string ) {
    this.el.nativeElement.style.color = color;
   }

}
