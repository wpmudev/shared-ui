( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageHeading = function( page ) {

		var body = $( 'body' );

		if ( page !== body.data( 'page' ) || page !== body.attr( 'data-page' ) ) {
			return;
		}

		function sampleLeft( element ) {

			var button = $( element ),
				header = $( '.sui-header' ),
				title  = header.find( '.sui-header-title' )
				;

			var markup = '<div class="sui-actions-left">' +
				'<label class="sui-tag sui-tag-purple">Sample Tag</label>' +
			'</div>';

			button.on( 'click', function() {

				// Insert this markup
				if ( 0 === header.find( '.sui-actions-left' ).length ) {
					$( markup ).insertAfter( title );
				}

				// Unfocus other elements
				header.removeAttr( 'tabindex' );
				header.find( '.sui-actions-right' ).removeAttr( 'tabindex' );

				// Focus this element
				header.find( '.sui-actions-left' ).attr( 'tabindex', '-1' );
				header.find( '.sui-actions-left' ).focus();

				// Show reset button
				if ( $( '#sample-base' ).is( ':hidden' ) ) {
					$( '#sample-base' ).show();
				}

				// Hide this button
				$( this ).hide();

			});
		}

		function sampleRight( element ) {

			var button = $( element ),
				header = $( '.sui-header' )
				;

			var markup = '<div class="sui-actions-right">' +
				'<button id="no-action" class="sui-button sui-button-blue">' +
					'Sample Button' +
				'</button>' +
			'</div>';

			button.on( 'click', function() {

				// Insert this markup
				if ( 0 === header.find( '.sui-actions-right' ).length ) {
					header.append( markup );
				}

				// Unfocus other elements
				header.removeAttr( 'tabindex' );
				header.find( '.sui-actions-left' ).removeAttr( 'tabindex' );

				// Focus this element
				header.find( '.sui-actions-right' ).attr( 'tabindex', '-1' );
				header.find( '.sui-actions-right' ).focus();

				// Show reset button
				if ( $( '#sample-base' ).is( ':hidden' ) ) {
					$( '#sample-base' ).show();
				}

				// Hide this button
				$( this ).hide();

			});
		}

		function sampleReset( element ) {

			var button   = $( element ),
				header   = $( '.sui-header' )
				;

			button.on( 'click', function() {

				// Remove sample elements
				header.find( '.sui-actions-left' ).remove();
				header.find( '.sui-actions-right' ).remove();

				// Focus header
				header.attr( 'tabindex', '-1' );
				header.focus();

				// Show preview buttons
				$( '#sample-left' ).show();
				$( '#sample-right' ).show();

				// Hide reset button
				$( this ).hide();

			});
		}

		function init() {

			var btnReset = $( '#sample-base' ),
				btnLeft  = $( '#sample-left' ),
				btnRight = $( '#sample-right' )
				;

			sampleLeft( btnLeft );
			sampleRight( btnRight );
			sampleReset( btnReset );

		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pageHeading( 'heading' );

	});

}( jQuery ) );
