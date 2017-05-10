

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
                   stickies[i].style.display = 'flex';
                   stickies[i].style.width = stickies[i].offsetWidth + "px";
                   stickies[i].style.left = stickies[i].offsetLeft;
                   stickies[i].style.top = stickies[i].getAttribute("stick-from-top");
                   stickies[i].style.position = "fixed";
                   stickies[i].classList.add('sticked');
                   
                } else if((document.body.scrollTop -  stickies[i].getAttribute("sticked-top")) < 0)  {
                   stickies[i].setAttribute("sticked", false)
                   stickies[i].style.position = "relative";
                   stickies[i].style.left = "auto";
                   stickies[i].style.width = "auto";
                   stickies[i].style.display = 'block';
                   stickies[i].classList.remove('sticked');
                }

			}
		}

	}	






    //init after DOM load
	document.addEventListener('DOMContentLoaded', initSticky , false);

}) ();

 