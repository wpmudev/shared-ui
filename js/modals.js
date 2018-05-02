( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	document.addEventListener( 'DOMContentLoaded', function() {
		var mainEl = $( '.sui-wrap' );
		SUI.dialogs = {};

		// Init the dialog elements.
		$( '.sui-dialog' ).each( function() {
			SUI.dialogs[this.id] = new A11yDialog( this, mainEl );
		});

	});

}( jQuery ) );
