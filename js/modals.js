( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	document.addEventListener( 'DOMContentLoaded', function() {
		var mainEl = $( '.sui-wrap' );

		// Init the dialog elements.
		$( '.sui-dialog' ).each( function() {
			new A11yDialog( this, mainEl );
		});

	});

}( jQuery ) );
