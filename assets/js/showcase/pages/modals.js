( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageModals = function( page ) {

		page = 'showcase-page-' + page;

		const body = $( 'body' );

		if ( page !== body.attr( 'id' ) ) {
			return;
		}

		/**
		 * Modal: HubSpot Integration
		 *
		 * Show or hide extra content depending on checkbox being
		 * turned on or off. Also, reset all options when clicking
		 * on "activate" button.
		 */
		function demoHubspotIntegration() {

			const checkbox = $( '#demo-dialog--sample-hubspot-ticket-toggle' );
			const activate = $( '#demo-dialog--sample-hubspot-ticket-activate' );

			checkbox.on( 'click', function() {

				var checkbox = $( this ),
					suiBox   = checkbox.closest( '.sui-box' ),
					content  = suiBox.find( '.sui-box-body' ),
					footer   = suiBox.find( '.sui-box-footer' )
					;

				// Check if toggle is checked.
				if ( checkbox.is( ':checked' ) ) {
					content.removeClass( 'sui-hidden' );
					content.removeAttr( 'aria-hidden' );
					content.removeAttr( 'tabindex' );
					footer.removeClass( 'sui-spacing-top--30' );

				// Check if toggle is un-checked.
				} else {
					content.addClass( 'sui-hidden' );
					content.attr( 'aria-hidden', true );
					content.attr( 'tabindex', '-1' );
					footer.addClass( 'sui-spacing-top--30' );
				}
			});

			activate.on( 'click', function() {

				var self   = this,
					button = $( this ),
					suiBox = button.closest( '.sui-box' )
					;

				button.addClass( 'sui-button-onload' );
				suiBox.find( 'input, textarea, select, button' ).attr( 'disabled', true );

				setTimeout( function() {
					SUI.closeModal( self );
				}, 1000 );

				setTimeout( function() {
					button.removeClass( 'sui-button-onload' );
					suiBox.find( 'input, textarea, select, button' ).attr( 'disabled', false );
					suiBox.find( 'input, textarea, select, button' ).removeAttr( 'disabled' );
				}, 1500 );
			});
		}

		/**
		 * Modal: Hummingbird On Board
		 *
		 * Run demo for performance test and close modal at the end.
		 */
		function demoHummingbirdOnBoard() {

			const activate = $( '#demo-dialog--sample-hummingbird-test' );

			activate.on( 'click', function() {

				var self     = this,
					button   = $( this ),
					suiBox   = button.closest( '.sui-box' ),
					boxTitle = suiBox.find( '.sui-box-title' ),
					boxSkip  = suiBox.find( '.sui-box-header button' ),
					boxMsg   = suiBox.find( '#demo-dialog--sample-hummingbird-message' ),
					boxPrg   = suiBox.find( '#demo-dialog--sample-hummingbird-progress' )
					;

				var newTitle = 'Test in progress...',
					oldTitle = 'Get Started'
					;

				// Assign new title.
				boxTitle.text( newTitle );

				// Disable "skip" button.
				boxSkip.attr( 'disabled', true );

				// Hide message.
				boxMsg
					.attr( 'aria-hidden', true )
					.attr( 'tabindex', '-1' )
					.addClass( 'sui-hidden' )
					;

				// Show progress.
				boxPrg
					.removeAttr( 'aria-hidden' )
					.removeAttr( 'tabindex' )
					.removeClass( 'sui-hidden' )
					;

				setTimeout( function() {
					boxPrg.find( '.sui-progress-text span' ).text( '40%' );
					boxPrg.find( '.sui-progress-bar span' ).css({ 'width': '40%' });
					boxPrg.find( '.sui-progress-state span' ).text( 'Testing performance' );
				}, 800 );

				setTimeout( function() {
					boxPrg.find( '.sui-progress-text span' ).text( '80%' );
					boxPrg.find( '.sui-progress-bar span' ).css({ 'width': '80%' });
				}, 1600 );

				setTimeout( function() {
					boxPrg.find( '.sui-progress-text span' ).text( '100%' );
					boxPrg.find( '.sui-progress-bar span' ).css({ 'width': '100%' });
					boxPrg.find( '.sui-progress-state span' ).text( 'Test completed' );
				}, 2000 );

				setTimeout( function() {
					SUI.closeModal( self );
				}, 2800 );

				setTimeout( function() {

					// Assign old title.
					boxTitle.text( oldTitle );

					// Enable "skip" button.
					boxSkip.removeAttr( 'disabled' );

					// Show message.
					boxMsg
						.removeAttr( 'aria-hidden' )
						.removeAttr( 'tabindex' )
						.removeClass( 'sui-hidden' )
						;

					// Hide progress.
					boxPrg
						.attr( 'aria-hidden', true )
						.attr( 'tabindex', '-1' )
						.addClass( 'sui-hidden' )
						;

					// Reset progress values.
					boxPrg.find( '.sui-progress-text span' ).text( '0%' );
					boxPrg.find( '.sui-progress-bar span' ).css({ 'width': '0%' });
					boxPrg.find( '.sui-progress-state span' ).empty();

				}, 3200 );

			});
		}

		/**
		 * Modal: Beehive On Board
		 *
		 * Run demo for beehive on board modal with demo for quick connection,
		 * skip this action, etc.
		 */
		function demoBeehiveOnBoard() {

			$( '#demo-dialog--sample-beehive-onboard-google-access-connect' ).on( 'click', function() {

				var button = $( this ),
					input  = $( '#demo-dialog--sample-beehive-onboard-google-access' ),
					auth   = $( '#demo-dialog--sample-beehive-onboard-google-access-auth' )
					;

				// Hide "Connect with Google" button.
				button.addClass( 'sui-hidden' );

				// Add incorrect authorization code.
				input.val( '4br7skqeyXJgga7AqOStCyNC' );

				// Click authorization button.
				auth.trigger( 'click' );

			});

			$( '#demo-dialog--sample-beehive-onboard-google-access-auth' ).on( 'click', function( e ) {

				var button = $( this ),
					input  = $( '#demo-dialog--sample-beehive-onboard-google-access' ),
					field  = input.closest( '.sui-form-field' ),
					notice = $( '#demo-dialog--sample-beehive-onboard-google-access-notice' ),
					gconct = $( '#demo-dialog--sample-beehive-onboard-google-access-connect' )
					;

				var errorWrong = '<p>It appears the access code you used was invalid. Please get your access code again by clicking the “Connect with Google” button below and pasting it again. If you run into further issues you can <a href="https://premium.wpmudev.org/" target="_blank" rel="nofollow">contact our Support</a> team for help.</p>';

				// Add loading state to button.
				button.attr( 'disabled', true );
				button.addClass( 'sui-button-onload' );

				setTimeout( function() {

					// Wrong code.
					if ( '' === input.val() || '4br7skqeyXJgga7AqOStCyNC' === input.val() ) {

						// Show error message.
						notice.html( errorWrong );
						notice.show();

						// Add error class.
						field.addClass( 'sui-form-field-error' );

						// Focus input.
						input.focus();

					// Right code.
					} else {

						// Remove error message.
						notice.empty();
						notice.hide();

						// Remove error class.
						field.removeClass( 'sui-form-field-error' );

						// Show "Connect with Google" button.
						gconct.removeClass( 'sui-hidden' );

						// Move to next slide.
						SUI.slideModal(
							'demo-dialog--sample-beehive-onboard-slide-2', // newSlideId
							'', // slideNewFocus
							'next' // newSlideEntrance
						);
					}

					// Remove button loading state.
					button.removeAttr( 'disabled' );
					button.removeClass( 'sui-button-onload' );

				}, 1000 );

				e.preventDefault();

			});

			$( '#demo-dialog--sample-beehive-onboard-api-auth' ).on( 'click', function( e ) {

				var button   = $( this ),
					clientId = $( '#demo-dialog--sample-beehive-onboard-api-id' ),
					clientSe = $( '#demo-dialog--sample-beehive-onboard-api-secret' )
					;

				var errorId     = 'Please input valid Client ID',
					errorSecret = 'Please input valid Client Secret'
					;

				// Add loading state to button.
				button.attr( 'disabled', true );
				button.addClass( 'sui-button-onload' );

				setTimeout( function() {

					// Right code.
					if ( '' !== clientId.val() && '' !== clientSe.val() ) {

						clientId.closest( '.sui-form-field' ).removeClass( 'sui-form-field-error' );
						clientId.closest( '.sui-form-field' ).find( '.sui-error-message' ).empty();
						clientId.closest( '.sui-form-field' ).find( '.sui-error-message' ).addClass( 'sui-hidden' );

						clientSe.closest( '.sui-form-field' ).removeClass( 'sui-form-field-error' );
						clientSe.closest( '.sui-form-field' ).find( '.sui-error-message' ).empty();
						clientSe.closest( '.sui-form-field' ).find( '.sui-error-message' ).addClass( 'sui-hidden' );

						// Move to next slide.
						SUI.slideModal(
							'demo-dialog--sample-beehive-onboard-slide-2', // newSlideId
							'demo-dialog--sample-beehive-onboard-profile', // slideNewFocus
							'next' // newSlideEntrance
						);

					// Empty code.
					} else {

						// Error class for "Client Id".
						if ( '' === clientId.val() ) {
							clientId.closest( '.sui-form-field' ).addClass( 'sui-form-field-error' );
							clientId.closest( '.sui-form-field' ).find( '.sui-error-message' ).text( errorId );
							clientId.closest( '.sui-form-field' ).find( '.sui-error-message' ).removeClass( 'sui-hidden' );
						} else {
							clientId.closest( '.sui-form-field' ).removeClass( 'sui-form-field-error' );
							clientId.closest( '.sui-form-field' ).find( '.sui-error-message' ).empty();
							clientId.closest( '.sui-form-field' ).find( '.sui-error-message' ).addClass( 'sui-hidden' );
						}

						// Error class for "Client Secret".
						if ( '' === clientSe.val() ) {
							clientSe.closest( '.sui-form-field' ).addClass( 'sui-form-field-error' );
							clientSe.closest( '.sui-form-field' ).find( '.sui-error-message' ).text( errorSecret );
							clientSe.closest( '.sui-form-field' ).find( '.sui-error-message' ).removeClass( 'sui-hidden' );
						} else {
							clientSe.closest( '.sui-form-field' ).removeClass( 'sui-form-field-error' );
							clientSe.closest( '.sui-form-field' ).find( '.sui-error-message' ).empty();
							clientSe.closest( '.sui-form-field' ).find( '.sui-error-message' ).addClass( 'sui-hidden' );
						}

						// Focus error field.
						if (
							( '' === clientId.val() && '' === clientSe.val() ) ||
							( '' === clientId.val() && '' !== clientSe.val() )
						) {
							clientId.focus();
						} else if ( '' !== clientId.val() && '' === clientSe.val() ) {
							clientSe.focus();
						}
					}

					// Remove button loading state.
					button.removeAttr( 'disabled' );
					button.removeClass( 'sui-button-onload' );

				}, 1000 );

				e.preventDefault();

			});

			$( '#demo-dialog--sample-beehive-onboard-tracking' ).on( 'click', function() {

				SUI.replaceModal(
					'demo-dialog--sample-beehive-tracking',
					'demo-dialog--sample-beehive-onboard-trigger-button',
					'demo-dialog--sample-beehive-tracking-input',
					false
				);

			});

			$( '#demo-dialog--sample-beehive-tracking-input' ).on( 'change focus focusin focusout blur keyup keydown', function( e ) {

				var input  = $( this ),
					error  = $( '#demo-dialog--sample-beehive-tracking-error' ),
					box    = input.closest( '.sui-box' ),
					body   = box.find( '.sui-box-body' ),
					footer = box.find( '.sui-box-footer' )
					;

				if ( '' === input.val() ) {
					body.addClass( 'sui-spacing-bottom--50' );
					footer.hide();
					footer.attr( 'hidden', true );
				} else {

					// Right code.
					if ( 14 === input.val().length ) {

						error.hide();
						error.attr( 'hidden', true );
						error.text( 'Tracking code added is valid. Please, click save code button below to continue.' );
						error.closest( '.sui-form-field' ).removeClass( 'sui-form-field-error' );

						footer.find( 'button' ).removeAttr( 'disabled' );

					// Wrong code.
					} else {

						error.closest( '.sui-form-field' ).addClass( 'sui-form-field-error' );
						error.text( 'Please input valid tracking code' );
						error.removeAttr( 'hidden' );
						error.show();

						footer.find( 'button' ).stop( true, true );
						footer.find( 'button' ).attr( 'disabled', true );

					}

					body.removeClass( 'sui-spacing-bottom--50' );
					footer.show();
					footer.removeAttr( 'hidden' );
				}

				e.stopPropagation();

			});

			$( '#demo-dialog--sample-beehive-tracking-save' ).on( 'click', function( e ) {

				var button = $( this );

				button.addClass( 'sui-button-onload' );
				button.attr( 'disabled', true );

				setTimeout( function() {

					button.removeAttr( 'disabled' );
					button.removeClass( 'sui-button-onload' );

					SUI.replaceModal(
						'demo-dialog--sample-beehive-onboard', // newModalId
						'demo-dialog--sample-beehive-onboard-trigger-button', // newFocusAfterClosed
						'demo-dialog--sample-beehive-onboard-profile', // newFocusFirst
						false // hasOverlayMask
					);

					SUI.slideModal(
						'demo-dialog--sample-beehive-onboard-slide-2', // newSlideId
						'demo-dialog--sample-beehive-onboard-profile' // slideNewFocus
					);

				}, 1000 );

				e.preventDefault();

			});

			$( '#demo-dialog--sample-beehive-onboard-profile-setup' ).on( 'click', function( e ) {

				var self = $( this );

				SUI.replaceModal(
					'demo-dialog--sample-beehive-setup', // newModalId
					'demo-dialog--sample-beehive-onboard-trigger-button', // newFocusAfterClosed
					'demo-dialog--sample-beehive-setup', // newFocusFirst
					false // hasOverlayMask
				);

				setTimeout( function() {
					SUI.closeModal();
				}, 1500 );

				e.preventDefault();

			});

			$( '.demo-dialog--sample-beehive-onboard-reset' ).on( 'click', function( e ) {

				var button = $( this ),
					modal  = button.closest( '.sui-modal-content' )
					;

				modal.find( '.demo-modal-button-google' ).removeClass( 'sui-hidden' );
				modal.find( '.sui-form-field' ).removeClass( 'sui-form-field-error' );
				modal.find( '.sui-error-message' ).addClass( 'sui-hidden' );
				modal.find( 'input, textarea' ).val( '' );
				modal.find( '.sui-button' ).stop( true, true );
				modal.find( '.sui-button' ).removeClass( 'sui-button-onload' );
				modal.find( '.sui-button' ).removeAttr( 'disabled' );
				modal.closest( '.sui-box-body' ).find( '[role="alert"]' ).hide();
				modal.closest( '.sui-box-body' ).find( '[role="alert"]' ).empty();

				SUI.closeModal();

			});

			SUI.tabs({
				callback: function( tab, panel ) {

					if ( panel.closest( '.sui-modal-content' ).is( '#demo-dialog--sample-beehive-onboard' ) ) {
						panel.find( '.demo-modal-button-google' ).removeClass( 'sui-hidden' );
						panel.find( '.sui-form-field' ).removeClass( 'sui-form-field-error' );
						panel.find( '.sui-error-message' ).addClass( 'sui-hidden' );
						panel.find( 'input, textarea' ).val( '' );
						panel.find( '.sui-button' ).stop( true, true );
						panel.find( '.sui-button' ).removeClass( 'sui-button-onload' );
						panel.find( '.sui-button' ).removeAttr( 'disabled' );
						panel.closest( '.sui-box-body' ).find( '[role="alert"]' ).hide();
						panel.closest( '.sui-box-body' ).find( '[role="alert"]' ).empty();
					}

				}
			});
		}

		function init() {

			demoHubspotIntegration();
			demoHummingbirdOnBoard();
			demoBeehiveOnBoard();

		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pageModals( 'modals' );

	});

}( jQuery ) );
