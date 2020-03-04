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
	 * @param noticeId
	 *
	 * @param noticeMessage
	 *
	 * @param noticeOptions
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
		 * @desc Declare default styling options for notifications.
		 */
		utils.options = [{}];

		utils.options[0].type             = 'default';
		utils.options[0].icon             = 'info';
		utils.options[0].dismiss          = false;
		utils.options[0].dismissLabel     = 'Close this notice';
		utils.options[0].dismissTooltip   = '';
		utils.options[0].autoclose        = false;
		utils.options[0].autocloseTimeout = 0;

		/**
		 * @desc Verify if property is an array.
		 */
		utils.isArray = ( obj ) => {

			if ( ( null !== obj || 'undefined' !== obj ) && $.isArray( obj ) ) {
				return true;
			}

			return false;

		};

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
		 * @desc Verify if property exists.
		 */
		utils.propExists = ( arr, prop ) => {

			if ( ( null !== typeof prop || 'undefined' !== typeof prop ) && arr.hasOwnProperty( prop ) ) {
				return true;
			}

			return false;

		};

		/**
		 * @desc Grab property from object.
		 */
		utils.getProperty = ( prop ) => {

			const defOptions = utils.options;
			const newOptions = noticeOptions;

			// Check if default option exists.
			if ( true === utils.propExists( defOptions[0], prop ) ) {

				// Check if new options exist in array to overwrite default one.
				if ( true === utils.isArray( newOptions ) ) {

					// Check if default option property can be overwritten.
					if ( true === utils.propExists( newOptions[0], prop ) && true === utils.propExists( defOptions[0], prop ) ) {
						defOptions[0][prop] = newOptions[0][prop];
					}
				}

				return defOptions[0][prop];

			}
		};

		/**
		 * @desc Build notice dismiss.
		 */
		utils.buildDismiss = () => {

			let html = '';

			if ( true === utils.getProperty( 'dismiss' ) ) {

				html += '<div class="sui-notice-actions">';

					if ( '' !== utils.getProperty( 'dismissTooltip' ) ) {
						html += '<div class="sui-tooltip" data-tooltip="' + utils.getProperty( 'dismissTooltip' ) + '">';
					}

						html += '<button class="sui-button-icon">';

							html += '<i class="sui-icon-check" aria-hidden="true"></i>';

							if ( '' !== utils.getProperty( 'dismissLabel' ) ) {
								html += '<span class="sui-screen-reader-text">' + utils.getProperty( 'dismissLabel' ) + '</span>';
							}

						html += '</button>';

					if ( '' !== utils.getProperty( 'dismissTooltip' ) ) {
						html += '</div>';
					}

				html += '</div>';

			}

			return html;
		};

		/**
		 * @desc Build notice icon.
		 */
		utils.buildIcon = () => {

			let html = '';
			let load = '';

			if ( null !== typeof utils.getProperty( 'icon' ) || '' !== utils.getProperty( 'icon' ) ) {

				if ( 'loader' === utils.getProperty( 'icon' ) ) {
					load = ' sui-loading';
				}

				html += '<i class="sui-notice-icon sui-icon-' + utils.getProperty( 'icon' ) + ' sui-md' + load + '" aria-hidden="true"></i>';

			}

			return html;

		};

		/**
		 * @desc Build notice message.
		 */
		utils.buildMessage = () => {

			let html = '';

			html += '<div class="sui-notice-message">';

				html += utils.buildIcon();
				html += noticeMessage;

			html += '</div>';

			return html;

		};

		/**
		 * @desc Build notice markup.
		 */
		utils.buildNotice = () => {

			let html = '';

			html += '<div class="sui-notice-content">';
				html += utils.buildMessage();
				html += utils.buildDismiss();
			html += '</div>';

			return html;

		};

		/**
		 * @desc Show floating notice.
		 */
		utils.float = ( timeout = 300 ) => {

			noticeNode.removeAttr( 'tabindex' );

			// Check if element is already visible.
			if ( noticeNode.is( ':visible' ) ) {

				// Close notice.
				noticeNode.slideUp( timeout );

				// Show notice.
				noticeNode.slideDown( timeout );

			} else {

				// Show notice.
				noticeNode.slideDown( timeout );

			}

			// Load after notice show animation stops.
			setTimeout( () => {

				// Check if notice can dismiss.
				if ( true === utils.getProperty( 'dismiss' ) ) {

					// Focus dismiss button.
					noticeNode.find( '.sui-notice-actions button' ).focus();

					// Dismiss button.
					// TODO: Add here function that will trigger closing action after clicking on dismiss button.
				}

				// Autoclose non-dimissible notices.
				if ( true !== utils.getProperty( 'dismiss' ) ) {

					// Check if autoclose is enabled.
					if ( true === utils.getProperty( 'autoclose' ) ) {
						// TODO: Add here function that will trigger closing action after specific amount of time.
					}
				}
			}, timeout );
		};

		 /**
		  * @desc Show inline notice.
		  */
		utils.inline = ( timeout = 300 ) => {};

		/**
		 * @desc Initialize function.
		 */
		let init = () => {

			/**
			 * Create notification content.
			 */
			noticeNode.html( utils.buildNotice() );

			/**
			 * When notice should float, it needs to be wrapped inside:
			 * <div class="sui-floating-notices"></div>
			 *
			 * IMPORTANT: This wrapper goes before "sui-wrap" closing tag
			 * and after modals markup.
			 */
			if ( nodeWrapper.hasClass( 'sui-floating-notices' ) ) {
				utils.float();
			} else {
				utils.inline();
			}

		};

		init();

		return this;

	};

	SUI.closeNotice = () => {};

	SUI.notice = () => {};

	SUI.notice();

}( jQuery ) );