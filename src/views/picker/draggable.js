let isDragging = false;
import Vue from 'vue';

const supportTouch = !Vue.prototype.$isServer && 'ontouchstart' in window;

export default function(element, options) {
	const moveFn = function(event) {
		if (options.drag) {
			let param = supportTouch ? event.changedTouches[0] || event.touches[0] : event;
			let touchEvent = supportTouch ? event : '';
			options.drag(param, touchEvent);
		}
	};

	const endFn = function(event) {
		if (!supportTouch) {
			document.removeEventListener('mousemove', moveFn);
			document.removeEventListener('mouseup', endFn);
		}
		document.onselectstart = null;
		document.ondragstart = null;

		isDragging = false;

		if (options.end) {
			let param = supportTouch ? event.changedTouches[0] || event.touches[0] : event;
			let touchEvent = supportTouch ? event : '';
			options.end(param, touchEvent);
		}
	};

	element.addEventListener(supportTouch ? 'touchstart' : 'mousedown', function(event) {
		if (isDragging) return;
		document.onselectstart = function() { return false; };
		document.ondragstart = function() { return false; };

		if (!supportTouch) {
			document.addEventListener('mousemove', moveFn);
			document.addEventListener('mouseup', endFn);
		}
		isDragging = true;

		if (options.start) {
			// event.preventDefault();
			let param = supportTouch ? event.changedTouches[0] || event.touches[0] : event;
			let touchEvent = supportTouch ? event : '';
			options.start(param, touchEvent);
		}
	});

	if (supportTouch) {
		element.addEventListener('touchmove', moveFn);
		element.addEventListener('touchend', endFn);
		element.addEventListener('touchcancel', endFn);
	}
}