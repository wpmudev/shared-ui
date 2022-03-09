( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageInsertVariables = function( page ) {

		var body = $( 'body' ),
			page = 'showcase-page-' + page
			;

		if ( page !== body.attr( 'id' ) ) {
			return;
		}

		function insertVariables( element ) {

			element = $( element );

			element.on( 'change', function() {

				let select  = $( this ),
					wrapper = select.closest( '.sui-insert-variables' ),
					input   = wrapper.find( 'input, textarea' )
					;

				// If the select is empty, remove the input value
				if ( ! select.val() ) {
					return;
				}

				input.val( input.val() + select.val() );
			}).on( 'select2:opening', function() {

				let select = $( this );

				select.val( null ).trigger( 'change' );
			});
		}

		function init() {

			insertVariables( '#demo-select-input-options' );
			insertVariables( '#demo-select-textarea-options' );
			insertVariables( '#demo-select2-options' );
		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pageInsertVariables( 'insert-variables' );

	});
}( jQuery ) );
