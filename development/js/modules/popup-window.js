import {fadeIn, fadeOut} from './helpers';

export default class Popup {
	constructor() {
		this.body = document.querySelector('body');
		this.html = document.querySelector('html');
	}



	/**
	 * Force Close All opened popup window
	 */
	forceCloseAllPopup() {
		[...document.querySelectorAll('.popup')].forEach( (item) => {
			fadeOut( item );
		});

		this.body.classList.remove('popup-opened');
		this.html.classList.remove('popup-opened');
	}



	/**
	 * Open selected popup window
	 * @param popupSelector - css selector of popup that should be opened
	 * @param timeOut - ms
	 */
	openOnePopup(popupSelector = null, timeOut = 1000) {
		setTimeout( () => {
			this.body.classList.add('popup-opened');
			this.html.classList.add('popup-opened');

			fadeIn(document.querySelector(popupSelector));
		}, timeOut);
	}



	/**
	 * Opening popup window
	 */
	openPopup() {

		this.body.addEventListener('click', (event) => {

			if ( ![...event.target.classList].includes('js-open-popup-activator') ) {
				return false;
			}

			event.preventDefault();

			let el_href = ( event.target.nodeName === 'A' )
								? event.target.getAttribute('href')
								: event.target.dataset.href;

			const POPUP_ELEMENT    = document.querySelector(el_href);
			//const POPUP_FORM_INPUT = POPUP_ELEMENT.querySelector('form input[type="text"]');

			this.body.classList.add('popup-opened');
			this.html.classList.add('popup-opened');

			fadeIn( POPUP_ELEMENT );

			//POPUP_FORM_INPUT && POPUP_FORM_INPUT.focus();
		});

	}



	/**
	 * Closing popup window
	 */
	closePopup() {
		this.body.addEventListener('click', (event) => {

			// Check if user click on close element
			if ( ![...event.target.classList].includes('js-popup-close') ) {
				return false;
			}

			const POPUP_ELEMENTS = document.querySelectorAll('.popup');
			event.preventDefault();

			this.body.classList.remove('popup-opened');
			this.html.classList.remove('popup-opened');

			[...POPUP_ELEMENTS].forEach( (item) => {
				fadeOut( item );
			});

		});


		// Checking ESC button for closing opened popup window
		document.addEventListener('keydown', (event) => {
			if( event.keyCode === 27 ) {
				const POPUP_ELEMENTS = document.querySelectorAll('.popup');

				this.body.classList.remove('popup-opened');
				this.html.classList.remove('popup-opened');

				[...POPUP_ELEMENTS].forEach( (item) => {
					fadeOut( item );
				});
			}
		});
	}

	init() {
		this.openPopup();
		this.closePopup();
	}
}
