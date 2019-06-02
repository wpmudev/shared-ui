( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageAccordions = function( page ) {

		var body = $( 'body' );

		if ( page !== body.data( 'page' ) || page !== body.attr( 'data-page' ) ) {
			return;
		}

		function toggleStatus( element ) {

			var toggle       = $( element ),
				toggleId     = toggle.attr( 'id' ),
				toggleInput  = $( 'input#' + toggleId ),
				toggleParent = toggleInput.closest( '.sui-accordion-item' )
				;

			if ( toggleInput.is( ':checked' ) ) {

				toggleInput.attr( 'checked', 'checked' );
				toggleInput.checked = true;
				toggleParent.removeClass( 'sui-accordion-item--disabled' );

			} else {

				toggleInput.attr( 'checked', '' );
				toggleInput.removeAttr( 'checked' );
				toggleInput.checked = false;
				toggleParent.addClass( 'sui-accordion-item--disabled' );
				toggleParent.removeClass( 'sui-accordion-item--open' );

			}
		}

		function init() {

			var accordion = $( 'div.sui-accordion-item-header .sui-toggle, tr.sui-accordion-item .sui-toggle' );

			accordion.each( function() {

				var toggle       = $( this ),
					toggleInput  = toggle.find( 'input' )
					;

				// Disable item if toggle is unchecked on load.
				if ( toggleInput.is( ':checked' ) ) {
					toggle.closest( '.sui-accordion-item' ).removeClass( 'sui-accordion-item--disabled' );
				} else {
					toggle.closest( '.sui-accordion-item' ).addClass( 'sui-accordion-item--disabled' );
				}
			});

			accordion.on( 'click', function( e ) {
				toggleStatus( e.target );
			});

		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pageAccordions( 'accordions' );

	});

}( jQuery ) );
