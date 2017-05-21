import { Directive, ElementRef , Input, OnInit } from '@angular/core'

@Directive({
    selector: "[auto-tag]"
})

export class AutoTag implements OnInit {
    @Input("autoTagValue") private tagValue: any;   
    constructor(
        private el: ElementRef
    ) {
        

    //    window["appendText"] = function(e, value, index) {
    //         var a = e.path[3].children["0"].value;
    //         a = a.slice(0, index-1) +  a.slice(index);
    //         var output = [a.slice(0, index), value, a.slice(index)].join('');
    //         //  output = output.slice(0, index) + output.slice(index + 1);
    //         e.path[3].children["0"].value = output;

    //    }

    //    el.nativeElement.onkeyup = function(e: any) {
    //        console.log(this.selectionStart)
    //        if(e.keyCode == 50) {
    //            console.log("triggerd @s");
    //            let a = ["vinay", "bv"];
    //            let t = `<div auto-list>
    //                        <div onclick="appendText(event, 'vinay' , '`+ this.selectionStart + `')">Vinay</div>
    //                        <div>yadav</div>
    //                     </div> `;

    //         var node = document.createElement("div");        
    //         node.setAttribute("auto-tag-content", "")         // Create a <li> node
    //         node.setAttribute("onclick", "this.remove()");
    //         node.innerHTML = t; 


    //           el.nativeElement.parentElement.appendChild(node)  ;        
    //        } else {
    //            if(e.keyCode == 16) return;
    //            var els = document.querySelectorAll("[auto-tag-content]");
    //            for ( var i=0;i<els.length; i++) {
    //                els[i].remove();
    //            }
    //        }
    //    }

    }

    ngOnInit() {


        console.log(this.tagValue)


         window["appendText"] = function(e, value, index) {
            var a = e.path[3].children["0"].value;
            a = a.slice(0, index-1) +  a.slice(index);
            var output = [a.slice(0, index), value, a.slice(index)].join('');
            //  output = output.slice(0, index) + output.slice(index + 1);
            e.path[3].children["0"].value = output;

       }

      this.el.nativeElement.onkeyup = (e: any)  => {
           console.log(e.target.selectionStart)
           if(e.keyCode == 50) {
               console.log("triggerd @s");
               let a = ["vinay", "bv"];
               let t = `<div auto-list>
                           <div onclick="appendText(event, 'vinay' , '`+ e.target.selectionStart + `')">Vinay</div>
                           <div>yadav</div>
                        </div> `;

            var node = document.createElement("div");        
            node.setAttribute("auto-tag-content", "")         // Create a <li> node
            node.setAttribute("onclick", "this.remove()");
            node.innerHTML = t; 


     this.el.nativeElement.parentElement.appendChild(node)  ;        
           } else {
               if(e.keyCode == 16) return;
               var els = document.querySelectorAll("[auto-tag-content]");
               for ( var i=0;i<els.length; i++) {
                   els[i].remove();
               }
           }
       }





    }

       

}