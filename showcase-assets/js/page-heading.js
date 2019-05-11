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
				if ( btnReset.is( ':hidden' ) ) {
					btnReset.show();
				}

				// Hide this button
				$( this ).hide();

			});
		}

		function sampleRight( element ) {}

		function button_reset() {}

		function init() {

			var btnReset = $( '#sample-base' ),
				btnLeft  = $( '#sample-left' ),
				btnRight = $( '#sample-right' )
				;

			sampleLeft( btnLeft );
		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		var header   = $( '.sui-header' ),
			title    = header.find( '.sui-header-title' ),
			btnReset = $( '#sample-base' ),
			btnLeft  = $( '#sample-left' ),
			btnRight = $( '#sample-right' )
			;

		var markupLeft = '<div class="sui-actions-left">' +
			'<label class="sui-tag sui-tag-purple">Sample Tag</label>' +
		'</div>';

		var markupRight = '<div class="sui-actions-right">' +
			'<button id="no-action" class="sui-button sui-button-blue">' +
				'Sample Button' +
			'</button>' +
		'</div>';

		// BUTTON: Left
		btnLeft.on( 'click', function() {

			// Insert this markup
			if ( 0 === header.find( '.sui-actions-left' ).length ) {
				$( markupLeft ).insertAfter( title );
			}

			// Unfocus other elements
			header.removeAttr( 'tabindex' );
			header.find( '.sui-actions-right' ).removeAttr( 'tabindex' );

			// Focus this element
			header.find( '.sui-actions-left' ).attr( 'tabindex', '-1' );
			header.find( '.sui-actions-left' ).focus();

			// Show reset button
			if ( btnReset.is( ':hidden' ) ) {
				btnReset.show();
			}

			// Hide this button
			$( this ).hide();

		});

		// BUTTON: Right
		btnRight.on( 'click', function() {

			// Insert this markup
			if ( 0 === header.find( '.sui-actions-right' ).length ) {
				header.append( markupRight );
			}

			// Unfocus other elements
			header.removeAttr( 'tabindex' );
			header.find( '.sui-actions-left' ).removeAttr( 'tabindex' );

			// Focus this element
			header.find( '.sui-actions-right' ).attr( 'tabindex', '-1' );
			header.find( '.sui-actions-right' ).focus();

			// Show reset button
			if ( btnReset.is( ':hidden' ) ) {
				btnReset.show();
			}

			// Hide this button
			$( this ).hide();

		});

		// BUTTON: Reset
		btnReset.on( 'click', function() {

			// Remove sample elements
			header.find( '.sui-actions-left' ).remove();
			header.find( '.sui-actions-right' ).remove();

			header.attr( 'tabindex', '-1' );
			header.focus();

			// Show preview buttons
			btnLeft.show();
			btnRight.show();

			// Hide reset button
			$( this ).hide();

		});
	});

}( jQuery ) );
