( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it does not exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	SUI.openNotice = function( noticeId, noticeMessage, noticeIconClass = 'info', noticeAutoClose, noticeDismiss = false, noticeDismissTooltip ) {

		const noticeNode       = $( '#' + noticeId );
		const noticeContent    = noticeNode.find( '.sui-notice-content' );
		const noticeBoxMessage = noticeNode.find( '.sui-notice-message' );
		const nodeWrapper      = noticeNode.parent();

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

			if ( 'loader' === noticeIconClass ) {
				noticeIconClass = noticeIconClass + ' sui-loading'
			}

			let icon    = '<i class="sui-icon-' + noticeIconClass + ' sui-md sui-notice-icon" aria-hidden="true"></i>',
				content = '<p>' + noticeMessage + '</p>',
				dismiss = ''
				;

			// Check if dismiss notice is enabled.
			if ( true === noticeDismiss || 'true' === noticeDismiss ) {

				noticeNode.addClass( 'sui-notice-dismiss' );

				if ( null === typeof noticeDismissTooltip || undefined === typeof noticeDismissTooltip || 'undefined' === typeof noticeDismissTooltip ) {

					dismiss = '<div class="sui-notice-actions" data-notice-close="">' +
						'<button class="sui-button-icon">' +
							'<i class="sui-icon-check" aria-hidden="true"></i>' +
							'<span class="sui-screen-reader-text">Dismiss this notice</span>' +
						'</button>' +
					'</div>';
				} else {

					if ( '' !== noticeDismissTooltip ) {

						dismiss = '<div class="sui-notice-actions" data-notice-close="">' +
							'<div class="sui-tooltip" data-tooltip="' + noticeDismissTooltip + '">' +
								'<button class="sui-button-icon">' +
									'<i class="sui-icon-check" aria-hidden="true"></i>' +
									'<span class="sui-screen-reader-text">Dismiss this notice</span>' +
								'</button>' +
							'</div>' +
						'</div>';
					} else {

						dismiss = '<div class="sui-notice-actions" data-notice-close="">' +
							'<button class="sui-button-icon">' +
								'<i class="sui-icon-check" aria-hidden="true"></i>' +
								'<span class="sui-screen-reader-text">Dismiss this notice</span>' +
							'</button>' +
						'</div>';
					}
				}
			}

			// Clean-up notice node.
			noticeNode.removeClass( 'sui-notice-dismiss' ).empty();

			// Print notice content.
			noticeNode.html(
				'<div class="sui-notice-content">' +
					'<div class="sui-notice-message">' + icon + content + '</div>' +
					dismiss +
				'</div>'
			);
		}

		function floatNotice() {

			// Show notice.
			noticeNode.slideDown( 300 );

			// Dismiss notice.
			noticeNode.find( '[data-notice-close]' ).on( 'click', function(){
				SUI.closeNotice( this );
			} );

			// Auto-close after some time.
			if ( null === typeof noticeAutoClose || 'undefined' === typeof noticeAutoClose || '' === noticeAutoClose ) {
				setTimeout( () => noticeNode.slideUp( 300, function() {
					noticeNode.empty();
				}), 3300 );
			} else if ( 'off' === noticeAutoClose || 'false' === noticeAutoClose ) {
				// Do nothing.
			} else {
				setTimeout( () => noticeNode.slideUp( 300, function() {
					noticeNode.empty();
				}), ( parseInt( noticeAutoClose ) + 300 ) );
			}
		}

		function inlineNotice() {

			// Show notice.
			noticeNode.fadeIn( 300 );

			if ( null !== typeof noticeAutoClose || 'undefined' !== typeof noticeAutoClose || '' !== noticeAutoClose ) {
				setTimeout( () => noticeNode.fadeOut( 300, function() {
					noticeNode.find( '.sui-notice-message' ).empty();
				}), ( parseInt( noticeAutoClose ) + 300 ) );
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
				floatNotice();
			} else {
				inlineNotice();
			}
		}

		init();

		return this;

	};

	SUI.closeNotice = function( element ) {

		const self        = $( element );
		const noticeNode  = self.closest( '.sui-notice' );
		const nodeWrapper = noticeNode.parent();

		// Check if parent element is a notice.
		if ( ! noticeNode ) {
			throw new Error( 'No parent element found with "sui-notice" class.' );
		}

		function init() {

			if ( nodeWrapper.hasClass( 'sui-floating-notices' ) ) {

				noticeNode.slideUp( 300, function() {
					noticeNode.find( '.sui-notice-message' ).removeClass( 'sui-notice-dismiss' ).empty();
				});
			} else {
				noticeNode.fadeOut( 300, function() {
					noticeNode.find( '.sui-notice-message' ).removeClass( 'sui-notice-dismiss' ).empty();
				});
			}
		}

		init();

		return this;

	};

	SUI.notice = function() {

		function openNotice( button ) {

			button.on( 'click', function() {

				let button          = $( this ),
					noticeId        = button.attr( 'data-notice-open' ),
					noticeMessage   = button.attr( 'data-notice-message' ),
					noticeIcon      = button.attr( 'data-notice-icon' ),
					noticeAutoClose = button.attr( 'data-notice-autoclose' ),
					noticeDismiss   = button.attr( 'data-notice-dismiss' ),
					noticeTooltip   = button.attr( 'data-notice-dismiss-tooltip' )
					;

				SUI.openNotice( noticeId, noticeMessage, noticeIcon, noticeAutoClose, noticeDismiss, noticeTooltip );

			});
		}

		function closeNotice( button ) {

			button.on( 'click', function() {
				SUI.closeNotice( this );
			});
		}

		function init() {

			// Click an element to open a notice.
			const buttonOpen = $( '[data-notice-open]' );
			openNotice( buttonOpen );

			// Click an element to close notice.
			const buttonClose = $( '[data-notice-close]' );
			closeNotice( buttonClose );

		}

		init();

		return this;

	};

	SUI.notice();

}( jQuery ) );
