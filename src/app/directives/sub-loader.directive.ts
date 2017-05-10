import { Component, ElementRef } from '@angular/core';

@Component({
  selector: "sub-loader",
  template: `
  <div class="cs-loader" style="top:50px">
      <div class="cs-loader-inner">
        <label>  ●</label>
        <label>  ●</label>
        <label>  ●</label>
        <label>  ●</label>
        <label>  ●</label>
        <label>  ●</label>
      </div>
      <div class="title">{{title}}</div>
  </div>
      
  `
})

export class SubLoaderComponent {
   private title;
   constructor(
            private elRef: ElementRef
    ) {  }

  ngOnInit() {
     var t = this.elRef.nativeElement.attributes.getNamedItem("loader-title");
     if(t) this.title = t.value;
     else this.title = "Loading";
  }

}
