import { Directive, ElementRef , Input, OnInit } from '@angular/core'

@Directive({
    selector: "[fix-at-top]"
})
export class FixAtTop implements OnInit {  
	width: number;
	top: any;
	scrollerEl: HTMLElement;
	addClass: string = 'fixed-at-top'
	@Input() topDistance: number;
    constructor(
        private el: ElementRef
    ) {}

    ngOnInit() {
    	this.top = (this.topDistance ? this.topDistance : 0);
    	this.width  = this.el.nativeElement.offsetWidth;
    	this.scrollerEl = this.el.nativeElement.ownerDocument.scrollingElement;
    	this.watchScroll();
    }

    watchScroll() {
    	window.addEventListener("scroll", (e) => {
    		// let _top = (this.el.nativeElement.getBoundingClientRect().top);
    		let _top = this.scrollerEl.scrollTop;
    		if(_top >= this.top) {
    			this.el.nativeElement.style.position = 'fixed';
    			this.el.nativeElement.style.width = this.width + 'px';
    			this.el.nativeElement.style.top = this.top + 'px';
    			this.el.nativeElement.classList.add(this.addClass);
    		} else if(_top < this.top) {
    			this.el.nativeElement.style.position = 'initial';
    			this.el.nativeElement.style.width = 'initial';
    			this.el.nativeElement.style.top = 'initial';
    			this.el.nativeElement.classList.remove(this.addClass);
    		}
    	});
    }

}