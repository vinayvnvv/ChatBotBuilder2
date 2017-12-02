import { Component, ElementRef } from '@angular/core';

@Component({
  selector: "sub-loader",
  template: `
  <div class="sub-loader" style="margin-top:31px;">
      <div class="spin spinner-2 border-top-primary border-right-primary border-bottom-primary"></div>
      <div class="title">{{title}}</div>
  </div>
      
  `
})

export class SubLoaderComponent {
   public title;
   constructor(
            private elRef: ElementRef
    ) {  }

  ngOnInit() {
     var t = this.elRef.nativeElement.attributes.getNamedItem("loader-title");
     if(t) this.title = t.value;
     else this.title = "Loading";
  }

}
