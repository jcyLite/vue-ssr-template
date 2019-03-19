import './css/photoswipe.css';
import './css/default-skin/default-skin.css';
import PhoneSwipe from './index.vue';
var PhotoSwipe = require('./js/photoswipe.min.js');
var PhotoSwipeUI_Default = require('./js/photoswipe-ui-default.min.js');
var $=require('jquery')
function openPhotoSwipe(index,tkValues) {
	var index=index;
	var items=[];
	tkValues.forEach(item=>{
		items.push({
			src:item,
			w:500,
			h:500
		})
	})
	// define options (if needed)
	var options = {
		loop: false,
		closeOnScroll: false,
		// history & focus options are disabled on CodePen        
		history: true,
		focus: true,
		index:index,
		showAnimationDuration: true,
		hideAnimationDuration: true
	};

	var gallery = new PhotoSwipe(
		document.querySelectorAll('.pswp')[0],
		PhotoSwipeUI_Default, 
		items, 
		options
	);
	gallery.init();
};

export {
	openPhotoSwipe,
	PhoneSwipe
};