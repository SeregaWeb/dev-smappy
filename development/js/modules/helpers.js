/**
 * Fade Out method
 * @param el
 */
export function fadeOut(el){
	el.style.opacity = 1;

	(function fade() {
		if ((el.style.opacity -= .1) < 0) {
			el.style.display = "none";
		} else {
			requestAnimationFrame(fade);
		}
	})();
}



/**
 * Fade In method
 * @param el
 * @param display
 */
export function fadeIn(el, display){
	el.style.opacity = 0;
	el.style.display = display || "block";

	(function fade() {
		let val = parseFloat(el.style.opacity);
		if (!((val += .1) > 1)) {
			el.style.opacity = val;
			requestAnimationFrame(fade);
		}
	})();
}



/**
 *  Set equal height to selected elements calculated as bigger height
 * @param elementsSelector    - selector for searching elements
 * @returns elementsSelector
 */
export function equalHeights(elementsSelector) {

	let heights = [];
	let elementsSelectorArr = ( Array.isArray(elementsSelector) )
									? elementsSelector
									: [...document.querySelectorAll(elementsSelector)];

	elementsSelectorArr.forEach( (item) => {
		heights.push( item.offsetHeight );
	});

	let maxHeight = Math.max.apply(0, heights);

	elementsSelectorArr.forEach( (item) => {
		item.style.height = maxHeight+'px';
	});

	return elementsSelector;

}


/**
 * Set equal height to selected elements in row calculated as bigger height
 * @param elementsSelector - selector for searching elements
 * @param numItem_inrow    - Items amount that will be used for each equal height iteration
 * @returns elementsSelector
 */
export function equalHeights_inrow(elementsSelector, numItem_inrow) {

	const ELEMENTS_ARR = [...document.querySelectorAll(elementsSelector)];
	const EL_LENGTH    = ELEMENTS_ARR.length;

	for (let i = 0; i <= EL_LENGTH / numItem_inrow; i++) {
		let temp = ELEMENTS_ARR.slice(i * numItem_inrow, i * numItem_inrow + numItem_inrow);
		equalHeights(temp);
	}

	return elementsSelector;
}


/**
 * Get cookie value by it's name
 * @param cookieName
 * @returns {*}
 */
export function getCookieByName(cookieName) {
	let name          = cookieName + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca            = decodedCookie.split(';');

	for ( let i = 0; i <ca.length; i++ ) {
		let c = ca[i];

		while ( c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if ( c.indexOf(name) === 0 ) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}



/**
 * Trim all paragraph from unneeded space symbol
 */
export function trimParagraph(){
	[...document.querySelectorAll('p')].forEach( item => {
		item.innerHTML = item.innerHTML.trim();
	});
}



/**
 * Check if element in viewport
 * @param el
 * @returns {boolean}
 */
export function isInViewport(el) {

	if ( !el ) return false;

	const scroll    = window.scrollY || window.pageYOffset;
	const boundsTop = el.getBoundingClientRect().top + scroll;

	const viewport = {
		top   : scroll,
		bottom: scroll + window.innerHeight,
	};

	const bounds = {
		top   : boundsTop,
		bottom: boundsTop + el.clientHeight,
	};

	return ( bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom )
		|| ( bounds.top <= viewport.bottom && bounds.top >= viewport.top );

}



/**
 * Lazy load init
 */
export function lazyLoadInit(selector){
	return new LazyLoad({
		elements_selector: selector
		// ... more custom settings?
	});
}




/**
 * Debounce function
 * @param fn     - function that should be executed
 * @param time   - time delay
 * @returns {Function}
 */
export const debounce = (fn, time) => {
	let timeout;

	return function() {
		const functionCall = () => fn.apply(this, arguments);

		clearTimeout(timeout);
		timeout = setTimeout(functionCall, time);
	}
};