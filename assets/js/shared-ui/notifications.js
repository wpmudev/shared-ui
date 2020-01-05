( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it does not exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	SUI.openNotice = function( noticeId, noticeMessage, noticeIconClass = 'info', noticeAutoClose ) {

		const noticeNode    = $( '#' + noticeId );
		const noticeContent = noticeNode.find( '.sui-notice-content' );
		const noticeActions = noticeNode.find( '.sui-notice-actions' );
		const nodeWrapper   = noticeNode.parent();

		// Check if element ID exists.
		if ( null === typeof noticeNode || 'undefined' === typeof noticeNode ) {
			throw new Error( 'No element found with id="' + noticeId + '".' );
		}

		// Check if element has correct attribute.
		if ( 'alert' !== noticeNode.attr( 'role' ) ) {
			throw new Error( 'Notice requires a DOM element with ARIA role of alert.' );
		}

		// Check if notice message is empty.
		if ( null === typeof noticeMessage || 'undefined' === typeof noticeMessage || '' === noticeMessage ) {
			throw new Error( 'Notice requires a message to print.' );
		}

		function printContent() {

			if ( 'undefined' === typeof noticeIconClass || '' === noticeIconClass ) {
				noticeIconClass = 'info';
			}

			let icon    = '<i class="sui-icon-' + noticeIconClass + ' sui-md sui-notice-icon" aria-hidden="true"></i>',
				content = '<p>' + noticeMessage + '</p>'
				;

			noticeNode.removeAttr( 'aria-hidden' );

			if ( noticeContent.length ) {
				noticeContent.empty();
				noticeContent.html( icon + content );
			} else {
				noticeNode.prepend( '<div class="sui-notice-content">' + icon + content + '</div>' );
			}
		}

		function showFloatSimple() {

			noticeNode.slideDown( 500 );

			/**
			 * Always auto-close notice when floating.
			 */
			if ( null === typeof noticeAutoClose || 'undefined' === typeof noticeAutoClose || '' === noticeAutoClose ) {
				setTimeout( () => noticeNode.slideUp( 500, function() {
					$( this ).attr( 'aria-hidden', true );
				}), 3500 );
			} else if ( 'off' === noticeAutoClose ) {
				// Do nothing.
			} else {

				if ( noticeAutoClose > 500 ) {
					setTimeout( () => noticeNode.slideUp( 500, function() {
						$( this ).attr( 'aria-hidden', true );
					}), parseInt( noticeAutoClose ) + 500 );
				} else {
					setTimeout( () => noticeNode.slideUp( 500, function() {
						$( this ).attr( 'aria-hidden', true );
					}), 3500 );
				}
			}
		}

		function showFloatActions() {

			noticeNode.slideDown( 500, function() {
				$( this ).removeAttr( 'style' ).addClass( 'sui-active' );
			});

			/**
			 * Always auto-close notice when floating.
			 */
			if ( null === typeof noticeAutoClose || 'undefined' === typeof noticeAutoClose || '' === noticeAutoClose ) {

				setTimeout( () => noticeNode.slideUp( 500, function() {
					$( this ).removeClass( 'sui-active' ).attr( 'aria-hidden', true );
				}), 3500 );
			} else if ( 'off' === noticeAutoClose ) {
				// Do nothing.
			} else {

				if ( noticeAutoClose > 500 ) {

					setTimeout( () => noticeNode.slideUp( 500, function() {
						$( this ).removeClass( 'sui-active' ).attr( 'aria-hidden', true );
					}), parseInt( noticeAutoClose ) + 500 );
				} else {

					setTimeout( () => noticeNode.slideUp( 500, function() {
						$( this ).removeClass( 'sui-active' ).attr( 'aria-hidden', true );
					}), 3500 );
				}
			}
		}

		function init() {

			/**
			 * Print notice content.
			 */
			printContent();

			/**
			 * When notice should float, it needs to be wrapped inside:
			 * <div class="sui-floating-notices"></div>
			 *
			 * IMPORTANT: This wrapper goes before "sui-wrap" closing tag
			 * and after modals markup.
			 */
			if ( nodeWrapper.hasClass( 'sui-floating-notices' ) ) {

				if ( noticeActions.length ) {
					showFloatActions();
				} else {
					showFloatSimple();
				}
			}

		}

		init();

		return this;

	};
}( jQuery ) );






// ( function() {

// 	// Enable strict mode.
// 	'use strict';

// 	// Define global SUI object if it does not exist.
// 	if ( 'object' !== typeof window.SUI ) {
//         window.SUI = {};
// 	}

// 	/**
// 	 * @namespace aria
// 	 */
// 	var aria = aria || {};

// 	aria.Utils = aria.Utils || {};

// 	aria.Utils.slideUp = function( target, duration = 500 ) {

// 		target.style.transitionProperty = 'height, margin, padding';
// 		target.style.transitionDuration = duration + 'ms';
// 		target.style.boxSizing = 'border-box';
// 		target.style.height = target.offsetHeight + 'px';
// 		target.offsetHeight;
// 		target.style.overflow = 'hidden';
// 		target.style.height = 0;
// 		target.style.paddingTop = 0;
// 		target.style.paddingBottom = 0;
// 		target.style.marginTop = 0;
// 		target.style.marginBottom = 0;

// 		window.setTimeout( () => {
// 			target.classList.remove( 'sui-active' );
// 			target.style.removeProperty( 'height' );
// 			target.style.removeProperty( 'padding-top' );
// 			target.style.removeProperty( 'padding-bottom' );
// 			target.style.removeProperty( 'margin-top' );
// 			target.style.removeProperty( 'margin-bottom' );
// 			target.style.removeProperty( 'overflow' );
// 			target.style.removeProperty( 'transition-duration' );
// 			target.style.removeProperty( 'transition-property' );
// 		}, duration );
// 	};

// 	aria.Utils.slideDown = function( target, duration = 500 ) {

// 		if ( ! target.classList.contains( 'sui-active' ) ) {
// 			target.classList.add( 'sui-active' );
// 		}

// 		let height = target.offsetHeight;
// 		target.style.overflow = 'hidden';
// 		target.style.height = 0;
// 		target.style.paddingTop = 0;
// 		target.style.paddingBottom = 0;
// 		target.style.marginTop = 0;
// 		target.style.marginBottom = 0;
// 		target.offsetHeight;
// 		target.style.boxSizing = 'border-box';
// 		target.style.transitionProperty = 'height, margin, padding';
// 		target.style.transitionDuration = duration + 'ms';
// 		target.style.height = height + 'px';
// 		target.style.removeProperty( 'padding-top' );
// 		target.style.removeProperty( 'padding-bottom' );
// 		target.style.removeProperty( 'margin-top' );
// 		target.style.removeProperty( 'margin-bottom' );

// 		window.setTimeout( () => {
// 			target.style.removeProperty( 'height' );
// 			target.style.removeProperty( 'overflow' );
// 			target.style.removeProperty( 'transition-duration' );
// 			target.style.removeProperty( 'transition-property' );
// 		}, duration );
// 	};

// 	aria.Utils.slideToggle = function( target, duration = 500 ) {

// 		if ( 'none' === window.getComputedStyle( target ).display ) {
// 			return slideDown( target, duration );
// 		} else {
// 			return slideUp( target, duration );
// 		}
// 	};

// 	aria.Utils.findAncestor = function( el, cls ) {
// 		while ( ( el = el.parentElement ) && ! el.classList.contains( cls ) );
// 		return el;
// 	};

// 	/**
// 	 * @constructor
// 	 * @desc Notice object providing notifications management.
// 	 *
// 	 * Assumptions:
// 	 *
// 	 * @param noticeId
// 	 *
// 	 * @param noticeMessage
// 	 *
// 	 * @param noticeIconClass
// 	 */
// 	aria.Notice = function( noticeId, noticeMessage, noticeIconClass = 'info', noticeAutoClose ) {

// 		const self = this;

// 		self.noticeNode = document.getElementById( noticeId );

// 		if ( 'undefined' === typeof noticeIconClass || '' === noticeIconClass ) {
// 			noticeIconClass = 'info';
// 		}

// 		// Check if element ID exists.
// 		if ( null === self.noticeNode || 'undefined' === typeof self.noticeNode ) {
// 			throw new Error( 'No element found with id="' + noticeId + '".' );
// 		}

// 		let validRoles = [ 'alert' ],
// 			isNotice   = ( self.noticeNode.getAttribute( 'role' ) || '' )
// 				.trim()
// 				.split( /\s+/g )
// 				.some( function( token ) {
// 					return validRoles.some( function( role ) {
// 						return token === role;
// 					});
// 				});

// 		if ( ! isNotice ) {
// 			throw new Error( 'Notice() requires a DOM element with ARIA role of alert.' );
// 		}

// 		// Prevent duplicated content.
// 		let hasContent = self.noticeNode.querySelectorAll( '.sui-notice-content' );

// 		if ( 0 < hasContent.length ) {

// 			for ( var i = 0; i < hasContent.length; i++ ) {
// 				hasContent[i].parentNode.removeChild( hasContent[i] );
// 			}
// 		}

// 		// Create notice content markup.
// 		self.noticeContent = document.createElement( 'div' );
// 		self.noticeContent.className = 'sui-notice-content';
// 		self.noticeContent.innerHTML = '';

// 		// Check if message is defined.
// 		if ( 'undefined' === typeof noticeMessage ) {
// 			throw new Error( 'Notice() requires a message to print.' );

// 		// Print message if exists.
// 		} else {

// 			// Print notice icon.
// 			self.noticeContent.innerHTML += '<i class="sui-notice-icon sui-icon-' + noticeIconClass + ' sui-md" aria-hidden="true"></i>';

// 			// Print notice message.
// 			self.noticeContent.innerHTML += '<p>' + noticeMessage + '</p>';

// 		}

// 		// Print notice content.
// 		self.noticeNode.prepend( self.noticeContent );

// 		/**
// 		 * When notice should float, it needs to be wrapped inside:
// 		 * <div class="sui-floating-notices"></div>
// 		 *
// 		 * IMPORTANT: This wrapper goes before "sui-wrap" closing tag
// 		 * and after modals markup.
// 		 */
// 		let floatingClass = 'sui-floating-notices';

// 		if ( self.noticeNode.parentNode.classList.contains( floatingClass ) ) {

// 			// Show notice animation.
// 			aria.Utils.slideDown( self.noticeNode );

// 			/**
// 			 * Always auto-close notice when floating.
// 			 */
// 			if ( 'undefined' === typeof noticeAutoClose ) {
// 				setTimeout( () => aria.Utils.slideUp( self.noticeNode ), 3500 );
// 			} else if ( 'off' === noticeAutoClose || 'never' === noticeAutoClose || 'false' === noticeAutoClose ) {
// 				// Do nothing.
// 			} else {

// 				if ( noticeAutoClose > 0 ) {
// 					setTimeout( () => aria.Utils.slideUp( self.noticeNode ), ( parseInt( noticeAutoClose ) + 500 ) );
// 				} else {
// 					setTimeout( () => aria.Utils.slideUp( self.noticeNode ), 3500 );
// 				}
// 			}
// 		} else {

// 			if ( 'undefined' !== typeof noticeAutoClose && noticeAutoClose > 0 ) {
// 				setTimeout( () => aria.Utils.slideUp( self.noticeNode ), ( parseInt( noticeAutoClose ) + 500 ) );
// 			}
// 		}
// 	};

// 	SUI.openNotice = function( noticeId, noticeMessage, noticeIconClass, noticeAutoClose ) {
// 		const notice = new aria.Notice( noticeId, noticeMessage, noticeIconClass, noticeAutoClose );
// 	};

// 	SUI.closeNotice = function( closeButton ) {

// 		closeButton.click( function() {
// 			window.alert( 'test' );
// 		});
// 	};
// }() );

( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it does not exist.
	if ( 'object' !== typeof window.SUI ) {
        window.SUI = {};
	}

	SUI.notice = function() {

		function openNotice( button ) {

			button.on( 'click', function() {

				let button          = $( this ),
					noticeId        = button.attr( 'data-notice-open' ),
					noticeMessage   = button.attr( 'data-notice-message' ),
					noticeIcon      = button.attr( 'data-notice-icon' ),
					noticeAutoClose = button.attr( 'data-notice-autoclose' )
					;

				SUI.openNotice( noticeId, noticeMessage, noticeIcon, noticeAutoClose );

			});
		}

		function init() {

			// Click an element to open a notice.
			const buttonOpen = $( '[data-notice-open]' );
			openNotice( buttonOpen );

			// Click an element to close notice.
			// const buttonClose = $( '[data-notice-close]' );
			// SUI.closeNotice( buttonClose );

		}

		init();

		return this;

	};

	SUI.notice();

}( jQuery ) );
