

(function() {

	function initSticky() {
		document.body.onscroll = stickyPerform;


		function stickyPerform(ref) {
			var top = document.body.scrollTop;
			var stickies = document.querySelectorAll('[stick-from-top]');
			//console.log(stickies)
			for(var i=0;i<stickies.length;i++) {
				if( ((document.body.scrollTop -  stickies[i].offsetTop) > 0 ) &&
                	stickies[i].getAttribute("sticked") != 'true'
                	) {

                   stickies[i].setAttribute("sticked", true)
                   stickies[i].setAttribute("sticked-top", stickies[i].offsetTop)
                   stickies[i].style.minWidth = stickies[i].offsetWidth;
                   stickies[i].style.position = "fixed";
                   stickies[i].style.left = stickies[i].offsetLeft;
                   stickies[i].style.top = stickies[i].getAttribute("stick-from-top");
                   
                } else if((document.body.scrollTop -  stickies[i].getAttribute("sticked-top")) < 0)  {
                   stickies[i].setAttribute("sticked", false)
                   stickies[i].style.position = "relative";
                   stickies[i].style.left = "auto";
                }

			}
		}

	}	






    //init after DOM load
	document.addEventListener('DOMContentLoaded', initSticky , false);

}) ();

 