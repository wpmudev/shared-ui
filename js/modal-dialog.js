( function() {

	// Enable strict mode.
    'use strict';

    if ( 'object' !== typeof window.SUI ) {
        window.SUI = {};
	}

	/**
	 * @namespace aria
	 */
	let aria = aria || {};

	// REF: Key codes.
	aria.KeyCode = {
		BACKSPACE: 8,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		SPACE: 32,
		PAGE_UP: 33,
		PAGE_DOWN: 34,
		END: 35,
		HOME: 36,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		DELETE: 46
	};

	aria.Utils = aria.Utils || {};

	// UTILS: Remove function.
	aria.Utils.remove = function( item ) {

		if ( item.remove && 'function' === typeof item.remove ) {
			return item.remove();
		}

		if (
			item.parentNode &&
			item.parentNode.removeChild &&
			'function' === typeof item.parentNode.removeChild
		) {
			return item.parentNode.removeChild( item );
		}

		return false;

	};

	// UTILS: Verify if element can be focused.
	aria.Utils.isFocusable = function( element ) {

		if (
			0 < element.tabIndex ||
			( 0 === element.tabIndex && null !== element.getAttribute( 'tabIndex' ) )
		) {
			return true;
		}

		if ( element.disabled ) {
			return false;
		}

		switch ( element.nodeName ) {

			case 'A' :
				return !! element.href && 'ignore' != element.rel;

			case 'INPUT' :
				return 'hidden' != element.type && 'file' != element.type;

			case 'BUTTON' :
			case 'SELECT' :
			case 'TEXTAREA' :
				return true;

			default :
				return false;
		}
	};

	/**
	 * Simulate a click event.
	 * @public
	 * @param {Element} element the element to simulate a click on
	 */
	aria.Utils.simulateClick = function( element ) {

		// Create our event (with options)
		let evt = new MouseEvent( 'click', {
			bubbles: true,
			cancelable: true,
			view: window
		});

		// If cancelled, don't dispatch our event
		let canceled = ! element.dispatchEvent( evt );

	};

	// When util functions move focus around, set this true so
	// the focus listener can ignore the events.
	aria.Utils.IgnoreUtilFocusChanges = false;
	aria.Utils.dialogOpenClass = 'sui-has-modal';

	/**
	 * @desc Set focus on descendant nodes until the first
	 * focusable element is found.
	 *
	 * @param element
	 * DOM node for which to find the first focusable descendant.
	 *
	 * @returns
	 * true if a focusable element is found and focus is set.
	 */
	aria.Utils.focusFirstDescendant = function( element ) {

		for ( let i = 0; i < element.childNodes.length; i++ ) {
			let child = element.childNodes[i];

			if ( aria.Utils.attemptFocus( child ) || aria.Utils.focusFirstDescendant( child ) ) {
				return true;
			}
		}

		return false;

	}; // end focusFirstDescendant

	/**
	 * @desc Find the last descendant node that is focusable.
	 *
	 * @param element
	 * DOM node for which to find the last focusable descendant.
	 *
	 * @returns
	 * true if a focusable element is found and focus is set.
	 */
	aria.Utils.focusLastDescendant = function( element ) {

		for ( let i = element.childNodes.length - 1; 0 <= i; i-- ) {

			let child = element.childNodes[i];

			if ( aria.Utils.attemptFocus( child ) || aria.Utils.focusLastDescendant( child ) ) {
				return true;
			}
		}

		return false;

	}; // end focusLastDescendant

	/**
	 * @desc Set Attempt to set focus on the current node.
	 *
	 * @param element
	 * The node to attempt to focus on.
	 *
	 * @returns
	 * true if element is focused.
	 */
	aria.Utils.attemptFocus = function( element ) {

		if ( ! aria.Utils.isFocusable( element ) ) {
			return false;
		}

		aria.Utils.IgnoreUtilFocusChanges = true;

		try {
			element.focus();
		} catch ( e ) {

			// Done.
		}

		aria.Utils.IgnoreUtilFocusChanges = false;

		return (
			document.activeElement === element
		);
	}; // end attemptFocus

	// Modals can open modals. Keep track of them with this array.
	aria.OpenDialogList = aria.OpenDialogList || new Array( 0 );

	/**
	 * @returns the last opened dialog (the current dialog)
	 */
	aria.getCurrentDialog = function() {

		if ( aria.OpenDialogList && aria.OpenDialogList.length ) {
			return aria.OpenDialogList[aria.OpenDialogList.length - 1];
		}
	};

	aria.closeCurrentDialog = function() {

		let currentDialog = aria.getCurrentDialog();

		if ( currentDialog ) {
			currentDialog.close();
			return true;
		}

		return false;
	};

	aria.handleEscape = function( event ) {

		let key = event.which || event.keyCode;

		if ( key === aria.KeyCode.ESC && aria.closeCurrentDialog() ) {
			event.stopPropagation();
		}
	};

	/**
	 * @constructor
	 * @desc Dialog object providing modal focus management.
	 *
	 * Assumptions: The element serving as the dialog container is present in the
	 * DOM and hidden. The dialog container has role='dialog'.
	 *
	 * @param dialogId
	 * The ID of the element serving as the dialog container.
	 *
	 * @param focusAfterClosed
	 * Either the DOM node or the ID of the DOM node to focus when the
	 * dialog closes.
	 *
	 * @param focusFirst
	 * Optional parameter containing either the DOM node or the ID of the
	 * DOM node to focus when the dialog opens. If not specified, the
	 * first focusable element in the dialog will receive focus.
	 *
	 * @param hasOverlayMask
	 * Optional boolean parameter that when is set to "true" will enable
	 * a clickable overlay mask. This mask will fire close modal function
	 * when you click on it.
	 *
	 * @param isCloseOnEsc
	 * Default: true
	 * Optional boolean parameter that when it's set to "true", it will enable closing the
	 * dialog with the Esc key.
	 *
	 * @param isAnimated
	 * Default: true
	 * Optional boolean parameter that when it's set to "true", it will enable animation in dialog box.
	 */
	aria.Dialog = function( dialogId, focusAfterClosed, focusFirst, hasOverlayMask, isCloseOnEsc = true, isAnimated = true ) {

		this.dialogNode = document.getElementById( dialogId );

		if ( null === this.dialogNode ) {
			throw new Error( 'No element found with id="' + dialogId + '".' );
		}

		let validRoles = [ 'dialog', 'alertdialog' ];
		let isDialog = ( this.dialogNode.getAttribute( 'role' ) || '' )
			.trim()
			.split( /\s+/g )
			.some( function( token ) {
				return validRoles.some( function( role ) {
					return token === role;
				});
			});

		if ( ! isDialog ) {
			throw new Error(
				'Dialog() requires a DOM element with ARIA role of dialog or alertdialog.'
			);
		}

		this.isCloseOnEsc = isCloseOnEsc;

		// Trigger the 'open' event at the beginning of the opening process.
		// After validating the modal's attributes.
		const openEvent = new Event( 'open' );
		this.dialogNode.dispatchEvent( openEvent );

		// Wrap in an individual backdrop element if one doesn't exist
		// Native <dialog> elements use the ::backdrop pseudo-element, which
		// works similarly.
		let backdropClass = 'sui-modal';

		if ( this.dialogNode.parentNode.classList.contains( backdropClass ) ) {
			this.backdropNode = this.dialogNode.parentNode;
		} else {
			this.backdropNode = document.createElement( 'div' );
			this.backdropNode.className = backdropClass;
			this.backdropNode.setAttribute( 'data-markup', 'new' );
			this.dialogNode.parentNode.insertBefore( this.backdropNode, this.dialogNodev );
			this.backdropNode.appendChild( this.dialogNode );
		}

		this.backdropNode.classList.add( 'sui-active' );

		// Disable scroll on the body element
		document.body.parentNode.classList.add( aria.Utils.dialogOpenClass );

		if ( 'string' === typeof focusAfterClosed ) {
			this.focusAfterClosed = document.getElementById( focusAfterClosed );
		} else if ( 'object' === typeof focusAfterClosed ) {
			this.focusAfterClosed = focusAfterClosed;
		} else {
			throw new Error( 'the focusAfterClosed parameter is required for the aria.Dialog constructor.' );
		}

		if ( 'string' === typeof focusFirst ) {
			this.focusFirst = document.getElementById( focusFirst );
		} else if ( 'object' === typeof focusFirst ) {
			this.focusFirst = focusFirst;
		} else {
			this.focusFirst = null;
		}

		// Bracket the dialog node with two invisible, focusable nodes.
		// While this dialog is open, we use these to make sure that focus never
		// leaves the document even if dialogNode is the first or last node.
		let preDiv = document.createElement( 'div' );
		this.preNode = this.dialogNode.parentNode.insertBefore( preDiv, this.dialogNode );
		this.preNode.tabIndex = 0;

		if ( 'boolean' === typeof hasOverlayMask && true === hasOverlayMask ) {
			this.preNode.classList.add( 'sui-modal-overlay' );
			this.preNode.onclick = function() {
				aria.getCurrentDialog().close();
			};
		}

		let postDiv = document.createElement( 'div' );
		this.postNode = this.dialogNode.parentNode.insertBefore( postDiv, this.dialogNode.nextSibling );
		this.postNode.tabIndex = 0;

		// If this modal is opening on top of one that is already open,
		// get rid of the document focus listener of the open dialog.
		if ( 0 < aria.OpenDialogList.length ) {
			aria.getCurrentDialog().removeListeners();
		}

		this.addListeners();
		aria.OpenDialogList.push( this );

		// If isAnimated is set true then modal box will animate.
		if ( isAnimated ) {
			this.dialogNode.classList.add( 'sui-content-fade-in' ); // make visible
			this.dialogNode.classList.remove( 'sui-content-fade-out' );
		} else {
			this.dialogNode.classList.remove( 'sui-content-fade-in' );
			this.dialogNode.classList.remove( 'sui-content-fade-out' );
		}

		if ( this.focusFirst ) {
			this.focusFirst.focus();
		} else {
			aria.Utils.focusFirstDescendant( this.dialogNode );
		}

		this.lastFocus = document.activeElement;

		// Trigger the 'afteropen' event at the end of the opening process.
		const afterOpenEvent = new Event( 'afterOpen' );
		this.dialogNode.dispatchEvent( afterOpenEvent );

	}; // end Dialog constructor.

	/**
	 * @desc Hides the current top dialog, removes listeners of the top dialog,
	 * restore listeners of a parent dialog if one was open under the one that
	 * just closed, and sets focus on the element specified for focusAfterClosed.
	 *
	 * @param isAnimated
	 * Default: true
	 * Optional boolean parameter that when it's set to "true", it will enable animation in dialog box.
	 */
	aria.Dialog.prototype.close = function( isAnimated = true ) {

		let self = this;

		// Trigger the 'close' event at the beginning of the closing process.
		const closeEvent = new Event( 'close' );
		this.dialogNode.dispatchEvent( closeEvent );

		aria.OpenDialogList.pop();
		this.removeListeners();

		this.preNode.parentNode.removeChild( this.preNode );
		this.postNode.parentNode.removeChild( this.postNode );

		// If isAnimated is set true then modal box will animate.
		if ( isAnimated ) {
			this.dialogNode.classList.add( 'sui-content-fade-out' );
			this.dialogNode.classList.remove( 'sui-content-fade-in' );
		} else {
			this.dialogNode.classList.remove( 'sui-content-fade-in' );
			this.dialogNode.classList.remove( 'sui-content-fade-out' );
		}

		this.focusAfterClosed.focus();

		setTimeout( function() {
			self.backdropNode.classList.remove( 'sui-active' );
		}, 300 );

		setTimeout( function() {

			let slides = self.dialogNode.querySelectorAll( '.sui-modal-slide' );

			if ( 0 < slides.length ) {

				// Hide all slides.
				for ( let i = 0; i < slides.length; i++ ) {
					slides[i].setAttribute( 'disabled', true );
					slides[i].classList.remove( 'sui-loaded' );
					slides[i].classList.remove( 'sui-active' );
					slides[i].setAttribute( 'tabindex', '-1' );
					slides[i].setAttribute( 'aria-hidden', true );
				}

				// Change modal size.
				if ( slides[0].hasAttribute( 'data-modal-size' ) ) {

					let newDialogSize = slides[0].getAttribute( 'data-modal-size' );

					switch ( newDialogSize ) {
						case 'sm':
						case 'small':
							newDialogSize = 'sm';
							break;

						case 'md':
						case 'med':
						case 'medium':
							newDialogSize = 'md';
							break;

						case 'lg':
						case 'large':
							newDialogSize = 'lg';
							break;

						case 'xl':
						case 'extralarge':
						case 'extraLarge':
						case 'extra-large':
							newDialogSize = 'xl';
							break;

						default:
							newDialogSize = undefined;
					}

					if ( undefined !== newDialogSize ) {

						// Remove others sizes from dialog to prevent any conflicts with styles.
						self.dialogNode.parentNode.classList.remove( 'sui-modal-sm' );
						self.dialogNode.parentNode.classList.remove( 'sui-modal-md' );
						self.dialogNode.parentNode.classList.remove( 'sui-modal-lg' );
						self.dialogNode.parentNode.classList.remove( 'sui-modal-xl' );

						// Apply the new size to dialog.
						self.dialogNode.parentNode.classList.add( 'sui-modal-' + newDialogSize );
					}
				}

				// Show first slide.
				slides[0].classList.add( 'sui-active' );
				slides[0].classList.add( 'sui-loaded' );
				slides[0].removeAttribute( 'disabled' );
				slides[0].removeAttribute( 'tabindex' );
				slides[0].removeAttribute( 'aria-hidden' );

				// Change modal label.
				if ( slides[0].hasAttribute( 'data-modal-labelledby' ) ) {

					let newDialogLabel, getDialogLabel;

					newDialogLabel = '';
					getDialogLabel = slides[0].getAttribute( 'data-modal-labelledby' );

					if ( '' !== getDialogLabel || undefined !== getDialogLabel ) {
						newDialogLabel = getDialogLabel;
					}

					self.dialogNode.setAttribute( 'aria-labelledby', newDialogLabel );

				}

				// Change modal description.
				if ( slides[0].hasAttribute( 'data-modal-describedby' ) ) {

					let newDialogDesc, getDialogDesc;

					newDialogDesc = '';
					getDialogDesc = slides[0].getAttribute( 'data-modal-describedby' );

					if ( '' !== getDialogDesc || undefined !== getDialogDesc ) {
						newDialogDesc = getDialogDesc;
					}

					self.dialogNode.setAttribute( 'aria-describedby', newDialogDesc );

				}
			}
		}, 350 );

		// If a dialog was open underneath this one, restore its listeners.
		if ( 0 < aria.OpenDialogList.length ) {
			aria.getCurrentDialog().addListeners();
		} else {
			document.body.parentNode.classList.remove( aria.Utils.dialogOpenClass );
		}

		// Trigger the 'afterclose' event at the end of the closing process.
		const afterCloseEvent = new Event( 'afterClose' );
		this.dialogNode.dispatchEvent( afterCloseEvent );

	}; // end close.

	/**
	 * @desc Hides the current dialog and replaces it with another.
	 *
	 * @param newDialogId
	 * ID of the dialog that will replace the currently open top dialog.
	 *
	 * @param newFocusAfterClosed
	 * Optional ID or DOM node specifying where to place focus when the new dialog closes.
	 * If not specified, focus will be placed on the element specified by the dialog being replaced.
	 *
	 * @param newFocusFirst
	 * Optional ID or DOM node specifying where to place focus in the new dialog when it opens.
	 * If not specified, the first focusable element will receive focus.
	 *
	 * @param hasOverlayMask
	 * Optional boolean parameter that when is set to "true" will enable a clickable overlay
	 * mask to the new opened dialog. This mask will fire close dialog function when you click it.
	 *
	 * @param isCloseOnEsc
	 * Default: true
	 * Optional boolean parameter that when it's set to "true", it will enable closing the
	 * dialog with the Esc key.
	 *
	 * @param isAnimated
	 * Default: true
	 * Optional boolean parameter that when it's set to "true", it will enable animation in dialog box.
	 */
	aria.Dialog.prototype.replace = function( newDialogId, newFocusAfterClosed, newFocusFirst, hasOverlayMask, isCloseOnEsc = true, isAnimated = true ) {

		let self = this;

		aria.OpenDialogList.pop();
		this.removeListeners();

		aria.Utils.remove( this.preNode );
		aria.Utils.remove( this.postNode );

		// If isAnimated is set true then modal box will animate.
		if ( isAnimated ) {
			this.dialogNode.classList.add( 'sui-content-fade-in' ); // make visible
			this.dialogNode.classList.remove( 'sui-content-fade-out' );
		} else {
			this.dialogNode.classList.remove( 'sui-content-fade-in' );
			this.dialogNode.classList.remove( 'sui-content-fade-out' );
		}

		this.backdropNode.classList.remove( 'sui-active' );

		setTimeout( function() {

			let slides = self.dialogNode.querySelectorAll( '.sui-modal-slide' );

			if ( 0 < slides.length ) {

				// Hide all slides.
				for ( let i = 0; i < slides.length; i++ ) {
					slides[i].setAttribute( 'disabled', true );
					slides[i].classList.remove( 'sui-loaded' );
					slides[i].classList.remove( 'sui-active' );
					slides[i].setAttribute( 'tabindex', '-1' );
					slides[i].setAttribute( 'aria-hidden', true );
				}

				// Change modal size.
				if ( slides[0].hasAttribute( 'data-modal-size' ) ) {

					let newDialogSize = slides[0].getAttribute( 'data-modal-size' );

					switch ( newDialogSize ) {
						case 'sm':
						case 'small':
							newDialogSize = 'sm';
							break;

						case 'md':
						case 'med':
						case 'medium':
							newDialogSize = 'md';
							break;

						case 'lg':
						case 'large':
							newDialogSize = 'lg';
							break;

						case 'xl':
						case 'extralarge':
						case 'extraLarge':
						case 'extra-large':
							newDialogSize = 'xl';
							break;

						default:
							newDialogSize = undefined;
					}

					if ( undefined !== newDialogSize ) {

						// Remove others sizes from dialog to prevent any conflicts with styles.
						self.dialogNode.parentNode.classList.remove( 'sui-modal-sm' );
						self.dialogNode.parentNode.classList.remove( 'sui-modal-md' );
						self.dialogNode.parentNode.classList.remove( 'sui-modal-lg' );
						self.dialogNode.parentNode.classList.remove( 'sui-modal-xl' );

						// Apply the new size to dialog.
						self.dialogNode.parentNode.classList.add( 'sui-modal-' + newDialogSize );
					}
				}

				// Show first slide.
				slides[0].classList.add( 'sui-active' );
				slides[0].classList.add( 'sui-loaded' );
				slides[0].removeAttribute( 'disabled' );
				slides[0].removeAttribute( 'tabindex' );
				slides[0].removeAttribute( 'aria-hidden' );

				// Change modal label.
				if ( slides[0].hasAttribute( 'data-modal-labelledby' ) ) {

					let newDialogLabel, getDialogLabel;

					newDialogLabel = '';
					getDialogLabel = slides[0].getAttribute( 'data-modal-labelledby' );

					if ( '' !== getDialogLabel || undefined !== getDialogLabel ) {
						newDialogLabel = getDialogLabel;
					}

					self.dialogNode.setAttribute( 'aria-labelledby', newDialogLabel );

				}

				// Change modal description.
				if ( slides[0].hasAttribute( 'data-modal-describedby' ) ) {

					let newDialogDesc, getDialogDesc;

					newDialogDesc = '';
					getDialogDesc = slides[0].getAttribute( 'data-modal-describedby' );

					if ( '' !== getDialogDesc || undefined !== getDialogDesc ) {
						newDialogDesc = getDialogDesc;
					}

					self.dialogNode.setAttribute( 'aria-describedby', newDialogDesc );

				}
			}
		}, 350 );

		let focusAfterClosed = newFocusAfterClosed || this.focusAfterClosed;
		let dialog = new aria.Dialog( newDialogId, focusAfterClosed, newFocusFirst, hasOverlayMask, isCloseOnEsc, isAnimated );

	}; // end replace

	/**
	 * @desc Uses the same dialog to display different content that will slide to show.
	 *
	 * @param newSlideId
	 * ID of the slide that will replace the currently active slide content.
	 *
	 * @param newSlideFocus
	 * Optional ID or DOM node specifying where to place focus in the new slide when it shows.
	 * If not specified, the first focusable element will receive focus.
	 *
	 * @param newSlideEntrance
	 * Determine if the new slide will show up from "left" or "right" of the screen.
	 * If not specified, the slide entrance animation will be "fade in".
	 */
	aria.Dialog.prototype.slide = function( newSlideId, newSlideFocus, newSlideEntrance ) {

		let animation     = 'sui-fadein',
			currentDialog = aria.getCurrentDialog(),
			getAllSlides  = this.dialogNode.querySelectorAll( '.sui-modal-slide' ),
			getNewSlide   = document.getElementById( newSlideId )
			;

		switch ( newSlideEntrance ) {
			case 'back':
			case 'left':
				animation = 'sui-fadein-left';
				break;

			case 'next':
			case 'right':
				animation = 'sui-fadein-right';
				break;

			default:
				animation = 'sui-fadein';
				break;
		}

		// Hide all slides.
		for ( let i = 0; i < getAllSlides.length; i++ ) {
			getAllSlides[i].setAttribute( 'disabled', true );
			getAllSlides[i].classList.remove( 'sui-loaded' );
			getAllSlides[i].classList.remove( 'sui-active' );
			getAllSlides[i].setAttribute( 'tabindex', '-1' );
			getAllSlides[i].setAttribute( 'aria-hidden', true );
		}

		// Change modal size.
		if ( getNewSlide.hasAttribute( 'data-modal-size' ) ) {

			let newDialogSize = getNewSlide.getAttribute( 'data-modal-size' );

			switch ( newDialogSize ) {
				case 'sm':
				case 'small':
					newDialogSize = 'sm';
					break;

				case 'md':
				case 'med':
				case 'medium':
					newDialogSize = 'md';
					break;

				case 'lg':
				case 'large':
					newDialogSize = 'lg';
					break;

				case 'xl':
				case 'extralarge':
				case 'extraLarge':
				case 'extra-large':
					newDialogSize = 'xl';
					break;

				default:
					newDialogSize = undefined;
			}

			if ( undefined !== newDialogSize ) {

				// Remove others sizes from dialog to prevent any conflicts with styles.
				this.dialogNode.parentNode.classList.remove( 'sui-modal-sm' );
				this.dialogNode.parentNode.classList.remove( 'sui-modal-md' );
				this.dialogNode.parentNode.classList.remove( 'sui-modal-lg' );
				this.dialogNode.parentNode.classList.remove( 'sui-modal-xl' );

				// Apply the new size to dialog.
				this.dialogNode.parentNode.classList.add( 'sui-modal-' + newDialogSize );
			}
		}

		// Change modal label.
		if ( getNewSlide.hasAttribute( 'data-modal-labelledby' ) ) {

			let newDialogLabel, getDialogLabel;

			newDialogLabel = '';
			getDialogLabel = getNewSlide.getAttribute( 'data-modal-labelledby' );

			if ( '' !== getDialogLabel || undefined !== getDialogLabel ) {
				newDialogLabel = getDialogLabel;
			}

			this.dialogNode.setAttribute( 'aria-labelledby', newDialogLabel );

		}

		// Change modal description.
		if ( getNewSlide.hasAttribute( 'data-modal-describedby' ) ) {

			let newDialogDesc, getDialogDesc;

			newDialogDesc = '';
			getDialogDesc = getNewSlide.getAttribute( 'data-modal-describedby' );

			if ( '' !== getDialogDesc || undefined !== getDialogDesc ) {
				newDialogDesc = getDialogDesc;
			}

			this.dialogNode.setAttribute( 'aria-describedby', newDialogDesc );

		}

		// Show new slide.
		getNewSlide.classList.add( 'sui-active' );
		getNewSlide.classList.add( animation );
		getNewSlide.removeAttribute( 'tabindex' );
		getNewSlide.removeAttribute( 'aria-hidden' );

		setTimeout( function() {
			getNewSlide.classList.add( 'sui-loaded' );
			getNewSlide.classList.remove( animation );
			getNewSlide.removeAttribute( 'disabled' );
		}, 600 );

		if ( 'string' === typeof newSlideFocus ) {
			this.newSlideFocus = document.getElementById( newSlideFocus );
		} else if ( 'object' === typeof newSlideFocus ) {
			this.newSlideFocus = newSlideFocus;
		} else {
			this.newSlideFocus = null;
		}

		if ( this.newSlideFocus ) {
			this.newSlideFocus.focus();
		} else {
			aria.Utils.focusFirstDescendant( this.dialogNode );
		}

	}; // end slide.

	aria.Dialog.prototype.addListeners = function() {
		document.addEventListener( 'focus', this.trapFocus, true );

		if ( this.isCloseOnEsc ) {
			this.dialogNode.addEventListener( 'keyup', aria.handleEscape );
		}

	}; // end addListeners.

	aria.Dialog.prototype.removeListeners = function() {
		document.removeEventListener( 'focus', this.trapFocus, true );
	}; // end removeListeners.

	aria.Dialog.prototype.trapFocus = function( event ) {
		const { parentElement } = event.target;

		if ( aria.Utils.IgnoreUtilFocusChanges || ( parentElement && parentElement.classList.contains( 'wp-link-input' ) ) ) {
			return;
		}

		let currentDialog = aria.getCurrentDialog();

		if ( currentDialog.dialogNode.contains( event.target ) ) {
			currentDialog.lastFocus = event.target;
		} else {

			aria.Utils.focusFirstDescendant( currentDialog.dialogNode );

			if ( currentDialog.lastFocus == document.activeElement ) {
				aria.Utils.focusLastDescendant( currentDialog.dialogNode );
			}

			currentDialog.lastFocus = document.activeElement;
		}
	}; // end trapFocus.

	SUI.openModal = function( dialogId, focusAfterClosed, focusFirst, dialogOverlay, isCloseOnEsc = true, isAnimated ) {
		let dialog = new aria.Dialog( dialogId, focusAfterClosed, focusFirst, dialogOverlay, isCloseOnEsc, isAnimated );
	}; // end openModal.

	SUI.closeModal = function( isAnimated ) {
		let topDialog = aria.getCurrentDialog();
		topDialog.close( isAnimated );
	}; // end closeDialog.

	SUI.replaceModal = function( newDialogId, newFocusAfterClosed, newFocusFirst, hasOverlayMask, isCloseOnEsc = true, isAnimated  ) {

		let topDialog = aria.getCurrentDialog();

		/**
		 * BUG #1:
		 * When validating document.activeElement it always returns "false" but
		 * even when "false" on Chrome function is fired correctly while on Firefox
		 * and Safari this validation prevents function to be fired on click.
		 *
		 * if ( topDialog.dialogNode.contains( document.activeElement ) ) { ... }
		 */
		topDialog.replace( newDialogId, newFocusAfterClosed, newFocusFirst, hasOverlayMask, isCloseOnEsc, isAnimated );

	}; // end replaceModal.

	SUI.slideModal = function( newSlideId, newSlideFocus, newSlideEntrance ) {

		let topDialog = aria.getCurrentDialog();

		topDialog.slide( newSlideId, newSlideFocus, newSlideEntrance );

	}; // end slideModal.

}() );

( function( $ ) {

	// Enable strict mode.
    'use strict';

    if ( 'object' !== typeof window.SUI ) {
        window.SUI = {};
	}

	SUI.modalDialog = function() {

		function init() {

			let button, buttonOpen, buttonClose, buttonReplace, buttonSlide, overlayMask, modalId, slideId, closeFocus, newFocus, animation, isAnimated;

			buttonOpen    = $( '[data-modal-open]' );
			buttonClose   = $( '[data-modal-close]' );
			buttonReplace = $( '[data-modal-replace]' );
			buttonSlide   = $( '[data-modal-slide]' );
			overlayMask   = $( '.sui-modal-overlay' );

			buttonOpen.on( 'click', function( e ) {

				button      = $( this );
				modalId     = button.attr( 'data-modal-open' );
				closeFocus  = button.attr( 'data-modal-close-focus' );
				newFocus    = button.attr( 'data-modal-open-focus' );
				overlayMask = button.attr( 'data-modal-mask' );
				isAnimated = button.attr( 'data-modal-animated' );

				let isCloseOnEsc = 'false' === button.attr( 'data-esc-close' ) ? false : true;

				if ( typeof undefined === typeof closeFocus || false === closeFocus || '' === closeFocus ) {
					closeFocus = this;
				}

				if ( typeof undefined === typeof newFocus || false === newFocus || '' === newFocus ) {
					newFocus = undefined;
				}

				if ( typeof undefined !== typeof overlayMask && false !== overlayMask && 'true' === overlayMask ) {
					overlayMask = true;
				} else {
					overlayMask = false;
				}

				if ( typeof undefined !== typeof isAnimated && false !== isAnimated && 'false' === isAnimated ) {
					isAnimated = false;
				} else {
					isAnimated = true;
				}

				if ( typeof undefined !== typeof modalId && false !== modalId && '' !== modalId ) {
					SUI.openModal( modalId, closeFocus, newFocus, overlayMask, isCloseOnEsc, isAnimated );
				}

				e.preventDefault();

			});

			buttonReplace.on( 'click', function( e ) {

				button      = $( this );
				modalId     = button.attr( 'data-modal-replace' );
				closeFocus  = button.attr( 'data-modal-close-focus' );
				newFocus    = button.attr( 'data-modal-open-focus' );
				overlayMask = button.attr( 'data-modal-replace-mask' );

				let isCloseOnEsc = 'false' === button.attr( 'data-esc-close' ) ? false : true;

				if ( typeof undefined === typeof closeFocus || false === closeFocus || '' === closeFocus ) {
					closeFocus = undefined;
				}

				if ( typeof undefined === typeof newFocus || false === newFocus || '' === newFocus ) {
					newFocus = undefined;
				}

				if ( typeof undefined !== typeof overlayMask && false !== overlayMask && 'true' === overlayMask ) {
					overlayMask = true;
				} else {
					overlayMask = false;
				}

				if ( typeof undefined !== typeof modalId && false !== modalId && '' !== modalId ) {
					SUI.replaceModal( modalId, closeFocus, newFocus, overlayMask, isCloseOnEsc, isAnimated );
				}

				e.preventDefault();

			});

			buttonSlide.on( 'click', function( e ) {

				button    = $( this );
				slideId   = button.attr( 'data-modal-slide' );
				newFocus  = button.attr( 'data-modal-slide-focus' );
				animation = button.attr( 'data-modal-slide-intro' );

				if ( typeof undefined === typeof newFocus || false === newFocus || '' === newFocus ) {
					newFocus = undefined;
				}

				if ( typeof undefined === typeof animation || false === animation || '' === animation ) {
					animation = '';
				}

				if ( typeof undefined !== typeof slideId && false !== slideId && '' !== slideId ) {
					SUI.slideModal( slideId, newFocus, animation );
				}

				e.preventDefault();

			});

			buttonClose.on( 'click', function( e ) {
				SUI.closeModal( isAnimated );
				e.preventDefault();
			});
		}

		init();

		return this;
	};

	SUI.modalDialog();

}( jQuery ) );
