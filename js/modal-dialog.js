( function() {

	// Enable strict mode.
    'use strict';

    if ( 'object' !== typeof window.SUI ) {
        window.SUI = {};
	}

	/**
	 * @namespace aria
	 */
	var aria = aria || {};

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
		DELETE: 46,
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
			return item.parentNode.removeChild(item);
		}

		return false;

	};

	// UTILS: Verify if element can be focused.
	aria.Utils.isFocusable = function( element ) {

		if (
			0 < element.tabIndex ||
			( element.tabIndex === 0 && null !== element.getAttribute( 'tabIndex' ) )
		) {
			return true;
		}

		if ( element.disabled ) {
			return false;
		}

		switch ( element.nodeName ) {

			case 'A' :
				return !! element.href && element.rel != 'ignore';

			case 'INPUT' :
				return element.type != 'hidden' && element.type != 'file';

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
		var evt = new MouseEvent( 'click', {
			bubbles: true,
			cancelable: true,
			view: window
		});

		// If cancelled, don't dispatch our event
		var canceled = ! element.dispatchEvent( evt );

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

		for ( var i = 0; i < element.childNodes.length; i++ ) {
			var child = element.childNodes[i];

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

		for ( var i = element.childNodes.length - 1; i >= 0; i-- ) {

			var child = element.childNodes[i];

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
		} catch( e ) {
			// Done.
		}

		aria.Utils.IgnoreUtilFocusChanges = false;

		return (
			document.activeElement === element
		);
	}; // end attemptFocus

	// Modals can open modals. Keep track of them with this array.
	aria.OpenDialogList = aria.OpenDialogList || new Array(0);

	/**
	 * @returns the last opened dialog (the current dialog)
	 */
	aria.getCurrentDialog = function() {

		if ( aria.OpenDialogList && aria.OpenDialogList.length ) {
			return aria.OpenDialogList[aria.OpenDialogList.length - 1];
		}
	};

	aria.closeCurrentDialog = function() {

		var currentDialog = aria.getCurrentDialog();

		if ( currentDialog ) {
			currentDialog.close();
			return true;
		}

		return false;
	};

	aria.handleEscape = function( event ) {

		var key = event.which || event.keyCode;

		if ( key === aria.Utils.ESC && aria.closeCurrentDialog() ) {
			event.stopPropagation();
		}
	};

	document.addEventListener( 'keyup', aria.handleEscape );

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
	 */
	aria.Dialog = function( dialogId, focusAfterClosed, focusFirst ) {

		this.dialogNode = document.getElementById( dialogId );

		if ( null === this.dialogNode ) {
			throw new Error( 'No element found with id="' + dialogId + '".' );
		}

		var validRoles = [ 'dialog', 'alertdialog' ];
		var isDialog = ( this.dialogNode.getAttribute( 'role' ) || '' )
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

		// Wrap in an individual backdrop element if one doesn't exist
		// Native <dialog> elements use the ::backdrop pseudo-element, which
		// works similarly.
		var backdropClass = 'sui-modal';

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
		var preDiv = document.createElement( 'div' );
		this.preNode = this.dialogNode.parentNode.insertBefore( preDiv, this.dialogNode );
		this.preNode.tabIndex = 0;

		var postDiv = document.createElement( 'div' );
		this.postNode = this.dialogNode.parentNode.insertBefore( postDiv, this.dialogNode.nextSibling );
		this.postNode.tabIndex = 0;

		// If this modal is opening on top of one that is already open,
		// get rid of the document focus listener of the open dialog.
		if ( 0 < aria.OpenDialogList.length ) {
			aria.getCurrentDialog().removeListeners();
		}

		this.addListeners();
		aria.OpenDialogList.push( this );
		this.clearDialog();
		this.dialogNode.classList.add( 'sui-content-fade-in' ); // make visible
		this.dialogNode.classList.remove( 'sui-content-fade-out' );

		if ( this.focusFirst ) {
			this.focusFirst.focus();
		} else {
			aria.Utils.focusFirstDescendant( this.dialogNode );
		}

		this.lastFocus = document.activeElement;

	}; // end Dialog constructor

	aria.Dialog.prototype.clearDialog = function() {

		Array.prototype.map.call(
			this.dialogNode.querySelectorAll( 'input' ),
			function( input ) {
				input.value = '';
			}
		);
	};

	/**
	 * @desc Hides the current top dialog, removes listeners of the top dialog,
	 * restore listeners of a parent dialog if one was open under the one that
	 * just closed, and sets focus on the element specified for focusAfterClosed.
	 */
	aria.Dialog.prototype.close = function() {

		var self = this;

		aria.OpenDialogList.pop();
		this.removeListeners();

		this.preNode.parentNode.removeChild( this.preNode );
		this.postNode.parentNode.removeChild( this.postNode );

		this.dialogNode.classList.add( 'sui-content-fade-out' );
		this.dialogNode.classList.remove( 'sui-content-fade-in' );

		this.focusAfterClosed.focus();

		setTimeout( function() {
			self.backdropNode.classList.remove( 'sui-active' );
		}, 300 );

		// If a dialog was open underneath this one, restore its listeners.
		if ( 0 < aria.OpenDialogList.length ) {
			aria.getCurrentDialog().addListeners();
		} else {
			document.body.parentNode.classList.remove( aria.Utils.dialogOpenClass );
		}
	}; // end close

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
	 */
	aria.Dialog.prototype.replace = function( newDialogId, newFocusAfterClosed, newFocusFirst ) {

		var closedDialog = aria.getCurrentDialog();

		aria.OpenDialogList.pop();
		this.removeListeners();

		aria.Utils.remove( this.preNode );
		aria.Utils.remove( this.postNode );

		this.dialogNode.classList.remove( 'sui-content-fade-in' );
		this.backdropNode.classList.remove( 'sui-active' );

		var focusAfterClosed = newFocusAfterClosed || this.focusAfterClosed;
		var dialog = new aria.Dialog( newDialogId, focusAfterClosed, newFocusFirst );

	}; // end replace

	/**
	 * @desc
	 *
	 * @param newSlideId
	 *
	 * @param newFocusFirst
	 */
	aria.Dialog.prototype.slide = function( newSlideId, newFocusFirst ) {

		var currentDialog = aria.getCurrentDialog(),
			getAllSlides  = this.dialogNode.querySelectorAll( '.sui-modal-slide' ),
			getNewSlide   = document.getElementById( newSlideId )
			;

		// Hide all slides.
		for ( var i = 0; i < getAllSlides.length; i++ ) {
			getAllSlides[i].classList.add( 'sui-hidden' );
			getAllSlides[i].setAttribute( 'tabindex', '-1' );
			getAllSlides[i].setAttribute( 'aria-hidden', true );
		}

		// Show new slide.
		getNewSlide.classList.remove( 'sui-hidden' );
		getNewSlide.removeAttribute( 'tabindex' );
		getNewSlide.removeAttribute( 'aria-hidden' );

		if ( 'string' === typeof newFocusFirst ) {
			this.newFocusFirst = document.getElementById( newFocusFirst );
		} else if ( 'object' === typeof newFocusFirst ) {
			this.newFocusFirst = newFocusFirst;
		} else {
			this.newFocusFirst = null;
		}

		if ( this.newFocusFirst ) {
			this.newFocusFirst.focus();
		} else {
			aria.Utils.focusFirstDescendant( this.dialogNode );
		}

	}; // end slide

	aria.Dialog.prototype.addListeners = function() {
		document.addEventListener( 'focus', this.trapFocus, true );
	}; // end addListeners

	aria.Dialog.prototype.removeListeners = function() {
		document.removeEventListener( 'focus', this.trapFocus, true );
	}; // end removeListeners

	aria.Dialog.prototype.trapFocus = function( event ) {

		if ( aria.Utils.IgnoreUtilFocusChanges ) {
			return;
		}

		var currentDialog = aria.getCurrentDialog();

		if ( currentDialog.dialogNode.contains( event.target ) ) {
			currentDialog.lastFocus = event.target;
		} else {

			aria.Utils.focusFirstDescendant( currentDialog.dialogNode );

			if ( currentDialog.lastFocus == document.activeElement ) {
				aria.Utils.focusLastDescendant( currentDialog.dialogNode );
			}

			currentDialog.lastFocus = document.activeElement;
		}
	}; // end trapFocus

	SUI.openModal = function( dialogId, focusAfterClosed, focusFirst ) {
		var dialog = new aria.Dialog( dialogId, focusAfterClosed, focusFirst );
	};

	SUI.closeModal = function( closeButton ) {

		var topDialog = aria.getCurrentDialog();

		if ( topDialog.dialogNode.contains( closeButton ) ) {
			topDialog.close();
		}
	}; // end closeDialog

	SUI.closeMask = function( overlayMask ) {

		var getDialogElement = overlayMask.parentNode.querySelector( '.sui-modal-content > div' );

		getDialogElement.addEventListener( 'click', function() {
			SUI.closeModal( this );
		});

		aria.Utils.simulateClick( getDialogElement );

	}; // end overlayModal

	SUI.replaceModal = function( newDialogId, newFocusAfterClosed, newFocusFirst ) {

		var topDialog = aria.getCurrentDialog();

		if ( topDialog.dialogNode.contains( document.activeElement ) ) {
			topDialog.replace( newDialogId, newFocusAfterClosed, newFocusFirst );
		}
	}; // end replaceModal

	SUI.slideModal = function( newSlideId, newFocusFirst ) {

		var topDialog = aria.getCurrentDialog();

		topDialog.slide( newSlideId, newFocusFirst );

	}; // end slideModal

}() );

( function( $ ) {

	SUI.modalDialog = function() {

		function init() {

			var button, buttonOpen, buttonClose, buttonReplace, buttonSlide, overlayMask, modalId, closeFocus, newFocus;

			buttonOpen    = $( '[data-modal-open]' );
			buttonClose   = $( '[data-modal-close]' );
			buttonReplace = $( '[data-modal-replace]' );
			buttonSlide   = $( '[data-modal-slide]' );
			overlayMask   = $( '.sui-modal-overlay' );

			if ( '' !== buttonOpen.data( 'modal-open' ) ) {

				buttonOpen.on( 'click', function( e ) {

					button  = $( e.target );
					modalId = button.data( 'modal-open' );

					SUI.openModal( modalId, this );

					e.preventDefault();

				});
			}

			if ( '' !== buttonReplace.data( 'modal-replace' ) ) {

				buttonReplace.on( 'click', function( e ) {

					button  = $( e.target );
					modalId = $( this ).data( 'modal-replace' );
					closeFocus = $( this ).data( 'modal-close-focus' );
					newFocus = $( this ).data( 'modal-open-focus' );

					if ( '' === closeFocus ) {
						closeFocus = undefined;
					}

					if ( '' === newFocus ) {
						newFocus = undefined;
					}

					if ( undefined !== modalId && '' !== modalId ) {

						SUI.replaceModal( modalId, closeFocus, newFocus );
					}

					e.preventDefault();

				});
			}

			if ( '' !== buttonSlide.data( 'modal-slide' ) ) {

				buttonSlide.on( 'click', function( e ) {

					button  = $( e.target );
					modalId = $( this ).data( 'modal-slide' );
					newFocus = $( this ).data( 'modal-slide-focus' );

					if ( undefined !== modalId && '' !== modalId ) {

						if ( '' !== newFocus ) {
							SUI.slideModal( modalId, newFocus );
						} else {
							SUI.slideModal( modalId );
						}
					}
				});
			}

			buttonClose.on( 'click', function( e ) {
				SUI.closeModal( this );
				e.preventDefault();
			});

			overlayMask.on( 'click', function( e ) {
				SUI.closeMask( this );
				e.preventDefault();
			});
		}

		init();

		return this;
	};

	SUI.modalDialog();

}( jQuery ) );
