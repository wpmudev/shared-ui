( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it does not exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	/**
	 * @desc Notifications function to show when alert.
	 *
	 * Assumptions: The element serving as the alert container is present in the
	 * DOM and hidden. The alert container has role='alert'.
	 *
	 * @param noticeId
	 * The ID of the element serving as the alert container.
	 *
	 * @param noticeMessage
	 * The content to be printed when the alert shows up. It accepts HTML.
	 *
	 * @param noticeOptions
	 * An object with different paramethers to modify the alert appearance.
	 */
	SUI.openNotice = ( noticeId, noticeMessage, noticeOptions ) => {

		// Get notification node by ID.
		const noticeNode  = $( '#' + noticeId );
		const nodeWrapper = noticeNode.parent();

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

		let utils = utils || {};

		/**
		 * @desc Allowed types for notification.
		 */
		utils.allowedNotices = [
			'info',
			'blue',
			'green',
			'success',
			'yellow',
			'warning',
			'red',
			'error',
			'purple',
			'upsell',
		];

		/**
		 * @desc Verify if property is an array.
		 */
		utils.isObject = ( obj ) => {

			if ( ( null !== obj || 'undefined' !== obj ) && $.isPlainObject( obj ) ) {
				return true;
			}

			return false;

		};

		/**
		 * @desc Deep merge two objects.
		 * Watch out for infinite recursion on circular references.
		 */
		utils.deepMerge = ( target, ...sources ) => {
			if ( ! sources.length ) {
				return target;
			}

			const source = sources.shift();

			if ( utils.isObject( target ) && utils.isObject( source ) ) {

				for ( const key in source ) {

					if ( utils.isObject( source[ key ]) ) {

						if ( ! target[ key ]) {
							Object.assign( target, { [key]: {} });
						}
						utils.deepMerge( target[key], source[ key ]);

					} else {
						Object.assign( target, { [key]: source[ key ] });
					}
				}
			}

			return utils.deepMerge( target, ...sources );
		};

		/**
		 * @desc Declare default styling options for notifications.
		 */
		utils.setProperties = ( incomingOptions = {}) => {

			utils.options = [];

			const defaults = {
				type: 'default',
				icon: 'info',
				dismiss: {
					show: false,
					label: 'Close this notice',
					tooltip: '',
				},
				autoclose: {
					show: true,
					timeout: 3000,
				},
			};

			utils.options[0] = utils.deepMerge( defaults, incomingOptions );
		};

		utils.setProperties( noticeOptions );

		/**
		 * @desc Build notice dismiss.
		 */
		utils.buildDismiss = () => {

			let html = '';

			const dismiss = utils.options[0].dismiss;

			if ( true === dismiss.show ) {

				html = document.createElement( 'div' );
				html.className = 'sui-notice-actions';

					let innerHTML = '';

					if ( '' !== dismiss.tooltip ) {

						if ( nodeWrapper.hasClass( 'sui-floating-notices' ) ) {
							innerHTML += '<div class="sui-tooltip sui-tooltip-bottom" data-tooltip="' + dismiss.tooltip + '">';
						} else {
							innerHTML += '<div class="sui-tooltip" data-tooltip="' + dismiss.tooltip + '">';
						}
					}

						innerHTML += '<button class="sui-button-icon">';

							innerHTML += '<span class="sui-icon-check" aria-hidden="true"></span>';

							if ( '' !== dismiss.label ) {
								innerHTML += '<span class="sui-screen-reader-text">' + dismiss.label + '</span>';
							}

						innerHTML += '</button>';

					if ( '' !== dismiss.tooltip ) {
						innerHTML += '</div>';
					}

				html.innerHTML = innerHTML;

			}

			return html;
		};

		/**
		 * @desc Build notice icon.
		 */
		utils.buildIcon = () => {

			let html = '';

			const icon = utils.options[0].icon;

			if ( '' !== icon || 'undefined' !== typeof icon || null !== typeof icon ) {

				html = document.createElement( 'span' );
				html.className += 'sui-notice-icon sui-icon-' + icon + ' sui-md';
				html.setAttribute( 'aria-hidden', true );

				if ( 'loader' === icon ) {
					html.classList.add( 'sui-loading' );
				}
			}

			return html;

		};

		/**
		 * @desc Build notice message.
		 */
		utils.buildMessage = () => {

			const html = document.createElement( 'div' );

			html.className = 'sui-notice-message';

			html.innerHTML = noticeMessage;
			html.prepend( utils.buildIcon() );

			return html;
		};

		/**
		 * @desc Build notice markup.
		 */
		utils.buildNotice = () => {

			const html = document.createElement( 'div' );
			html.className = 'sui-notice-content';

			html.append( utils.buildMessage(), utils.buildDismiss() );

			return html;

		};

		/**
		 * @desc Show notification message.
		 */
		utils.showNotice = ( animation, timeout = 300 ) => {

			const type      = utils.options[0].type;
			const dismiss   = utils.options[0].dismiss;
			const autoclose = utils.options[0].autoclose;

			// Add active class.
			noticeNode.addClass( 'sui-active' );

			// Check for allowed notification types.
			$.each( utils.allowedNotices, function( key, value ) {

				if ( value === type ) {
					noticeNode.addClass( 'sui-notice-' + value );
				}
			});

			// Remove tabindex.
			noticeNode.removeAttr( 'tabindex' );

			// Print notification message.
			noticeNode.html( utils.buildNotice() );

			// Show animation.
			if ( 'slide' === animation ) {

				noticeNode.slideDown( timeout, () => {

					// Check if dismiss button enabled.
					if ( true === dismiss.show ) {

						// Focus dismiss button.
						noticeNode.find( '.sui-notice-actions button' ).trigger( 'focus' );

						// Dismiss button.
						noticeNode.find( '.sui-notice-actions button' ).on( 'click', function() {
							SUI.closeNotice( noticeId );
						});
					} else {

						// Check if notice auto-closes.
						if ( true === autoclose.show ) {
							setTimeout( () => SUI.closeNotice( noticeId ), parseInt( autoclose.timeout ) );
						}
					}
				});
			} else if ( 'fade' === animation ) {

				noticeNode.fadeIn( timeout, () => {

					// Check if dismiss button enabled.
					if ( true === dismiss.show ) {

						// Focus dismiss button.
						noticeNode.find( '.sui-notice-actions button' ).trigger( 'focus' );

						// Dismiss button.
						noticeNode.find( '.sui-notice-actions button' ).on( 'click', function() {
							SUI.closeNotice( noticeId );
						});
					} else {

						// Check if notice auto-closes.
						if ( true === autoclose.show ) {
							setTimeout( () => SUI.closeNotice( noticeId ), parseInt( autoclose.timeout ) );
						}
					}
				});
			} else {

				noticeNode.show( timeout, () => {

					// Check if dismiss button enabled.
					if ( true === dismiss.show ) {

						// Focus dismiss button.
						noticeNode.find( '.sui-notice-actions button' ).trigger( 'focus' );

						// Dismiss button.
						noticeNode.find( '.sui-notice-actions button' ).on( 'click', function() {
							SUI.closeNotice( noticeId );
						});
					} else {

						// Check if notice auto-closes.
						if ( true === autoclose.show ) {
							setTimeout( () => SUI.closeNotice( noticeId ), parseInt( autoclose.timeout ) );
						}
					}
				});
			}
		};

		/**
		 * @desc Open notification message.
		 */
		utils.openNotice = ( animation, timeout = 300 ) => {

			if ( noticeNode.hasClass( 'sui-active' ) ) {

				if ( 'slide' === animation ) {

					noticeNode.slideUp( timeout, () => {
						utils.showNotice( 'slide', timeout );
					});
				} else if ( 'fade' === animation ) {

					noticeNode.fadeOut( timeout, () => {
						utils.showNotice( 'fade', timeout );
					});
				} else {

					noticeNode.hide( timeout, () => {
						utils.showNotice( null, timeout );
					});
				}
			} else {

				// Show notice.
				utils.showNotice( animation, timeout );
			}
		};

		/**
		 * @desc Initialize function.
		 */
		let init = () => {

			/**
			 * When notice should float, it needs to be wrapped inside:
			 * <div class="sui-floating-notices"></div>
			 *
			 * IMPORTANT: This wrapper goes before "sui-wrap" closing tag
			 * and after modals markup.
			 */
			if ( nodeWrapper.hasClass( 'sui-floating-notices' ) ) {
				utils.openNotice( 'slide' );
			} else {
				utils.openNotice( 'fade' );
			}
		};

		init();

		return this;

	};

	/**
	 * @desc Close and clear the alert.
	 *
	 * Assumptions: The element that will trigger this function is part of alert content.
	 *
	 * @param noticeId
	 * The ID of the element serving as the alert container.
	 *
	 */
	SUI.closeNotice = ( noticeId ) => {

		// Get notification node by ID.
		const noticeNode  = $( '#' + noticeId );
		const nodeWrapper = noticeNode.parent();

		// Check if element ID exists.
		if ( null === typeof noticeNode || 'undefined' === typeof noticeNode ) {
			throw new Error( 'No element found with id="' + noticeId + '".' );
		}

		let utils = utils || {};

		/**
		 * @desc Allowed types for notification.
		 */
		utils.allowedNotices = [
			'info',
			'blue',
			'green',
			'success',
			'yellow',
			'warning',
			'red',
			'error',
			'purple',
			'upsell',
		];

		/**
		 * @desc Destroy notification.
		 */
		utils.hideNotice = () => {

			// Remove active class.
			noticeNode.removeClass( 'sui-active' );

			// Remove styling classes.
			$.each( utils.allowedNotices, function( key, value ) {
				noticeNode.removeClass( 'sui-notice-' + value );
			});

			// Prevent TAB key from accessing the element.
			noticeNode.attr( 'tabindex', '-1' );

			// Remove all content from notification.
			noticeNode.empty();

		};

		/**
		 * @desc Close notification message.
		 */
		utils.closeNotice = ( animation, timeout = 300 ) => {

			// Close animation.
			if ( 'slide' === animation ) {
				noticeNode.slideUp( timeout, () => utils.hideNotice() );
			} else if ( 'fade' === animation ) {
				noticeNode.fadeOut( timeout, () => utils.hideNotice() );
			} else {
				noticeNode.hide( timeout, () => utils.hideNotice() );
			}
		};

		/**
		 * @desc Initialize function.
		 */
		let init = () => {

			/**
			 * When notice should float, it needs to be wrapped inside:
			 * <div class="sui-floating-notices"></div>
			 *
			 * IMPORTANT: This wrapper goes before "sui-wrap" closing tag
			 * and after modals markup.
			 */
			if ( nodeWrapper.hasClass( 'sui-floating-notices' ) ) {
				utils.closeNotice( 'slide' );
			} else {
				utils.closeNotice( 'fade' );
			}
		};

		init();

		return this;

	};

	/**
	 * @desc Trigger open and close alert notification functions through element attributes.
	 *
	 * Assumptions: Elements in charge of triggering the actions will be a button or a non-hyperlink element.
	 *
	 */
	SUI.notice = () => {

		let notice = notice || {};

		notice.Utils = notice.Utils || {};

		/**
		 * @desc Click an element to open a notification.
		 */
		notice.Utils.Open = ( element ) => {

			element.on( 'click', function() {

				self = $( this );

				// Define main variables for open function.
				let noticeId      = self.attr( 'data-notice-open' );
				let noticeMessage = '';
				let noticeOptions = {};

				// Define index to use on for loops.
				let i;

				// Define maximum number of paragraphs.
				let numbLines = 4;

				// Check if `data-notice-message` exists.
				if ( self.is( '[data-notice-message]' ) && '' !== self.attr( 'data-notice-message' ) ) {

					noticeMessage += self.attr( 'data-notice-message' );

				// If `data-notice-message` doesn't exists, look for `data-notice-paragraph-[i]` attributes.
				} else {

					for ( i = 0; i < numbLines; i++ ) {

						let index = i + 1;
						let paragraph = 'data-notice-paragraph-' + index;

						if ( self.is( '[' + paragraph + ']' ) && '' !== self.attr( paragraph ) ) {
							noticeMessage += '<p>' + self.attr( paragraph ) + '</p>';
						}
					}
				}

				// Check if `data-notice-type` exists.
				if ( self.is( '[data-notice-type]' ) && '' !== self.attr( 'data-notice-dismiss-type' ) ) {
					noticeOptions.type = self.attr( 'data-notice-type' );
				}

				// Check if `data-notice-icon` exists.
				if ( self.is( '[data-notice-icon]' ) ) {
					noticeOptions.icon = self.attr( 'data-notice-icon' );
				}

				// Check if `data-notice-dismiss` exists.
				if ( self.is( '[data-notice-dismiss]' ) ) {

					noticeOptions.dismiss = {};

					if ( 'true' === self.attr( 'data-notice-dismiss' ) ) {
						noticeOptions.dismiss.show = true;
					} else if ( 'false' === self.attr( 'data-notice-dismiss' ) ) {
						noticeOptions.dismiss.show = false;
					}
				}

				// Check if `data-notice-dismiss-label` exists.
				if ( self.is( '[data-notice-dismiss-label]' ) && '' !== self.attr( 'data-notice-dismiss-label' ) ) {
					noticeOptions.dismiss.label = self.attr( 'data-notice-dismiss-label' );
				}

				// Check if `data-notice-dismiss-label` exists.
				if ( self.is( '[data-notice-dismiss-tooltip]' ) && '' !== self.attr( 'data-notice-dismiss-tooltip' ) ) {
					noticeOptions.dismiss.tooltip = self.attr( 'data-notice-dismiss-tooltip' );
				}

				// Check if `data-notice-autoclose` exists.
				if ( self.is( '[data-notice-autoclose]' ) ) {

					noticeOptions.autoclose = {};

					if ( 'true' === self.attr( 'data-notice-autoclose' ) ) {
						noticeOptions.autoclose.show = true;
					} else if ( 'false' === self.attr( 'data-notice-autoclose' ) ) {
						noticeOptions.autoclose.show = false;
					}
				}

				// Check if `data-notice-autoclose-timeout` exists.
				if ( self.is( '[data-notice-autoclose-timeout]' ) ) {

					noticeOptions.autoclose = noticeOptions.autoclose || {};
					noticeOptions.autoclose.timeout = parseInt( self.attr( 'data-notice-autoclose-timeout' ) );

				}

				SUI.openNotice( noticeId, noticeMessage, noticeOptions );

			});
		};

		/**
		 * @desc Close a notification.
		 */
		notice.Utils.Close = ( element ) => {

			element.on( 'click', function() {

				self = $( this );

				let noticeId;

				if ( self.is( '[data-notice-close]' ) ) {

					noticeId = self.closest( '.sui-notice' ).attr( 'id' );

					if ( '' !== self.attr( '[data-notice-close]' ) ) {
						noticeId = self.attr( 'data-notice-close' );
					}

					SUI.closeNotice( noticeId );

				}
			});
		};

		let init = () => {

			// Open a notification.
			const btnOpen = $( '[data-notice-open]' );
			notice.Utils.Open( btnOpen );

			// Close a notification.
			const btnClose = $( '[data-notice-close]' );
			notice.Utils.Close( btnClose );

		};

		init();

		return this;

	};

	SUI.notice();

}( jQuery ) );