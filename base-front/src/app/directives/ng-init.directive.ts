import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[ngInit]',
  exportAs: 'ngInit'
})
export class NgInitDirective {

  @Input() value: any = {};
  @Input() ngInit : any;
  
  ngOnInit() {
    if(this.ngInit) {
      this.ngInit();
    }
  }
}
