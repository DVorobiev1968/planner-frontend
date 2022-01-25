import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[sticky]'
})
export class StickyDirective {

//   constructor(private _element: ElementRef, private _window: WindowRef) {
//     console.log('debug');
//    }
//
//   @HostListener('window:scroll', ['$event'])
//   handleScrollEvent(e) {
//       if (this._window.nativeWindow.pageYOffset > 100) {
//           this._element.nativeElement.classList.add('stick');
//       } else {
//           this._element.nativeElement.classList.remove('stick');
//       }
//   }

}
