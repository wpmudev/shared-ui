( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	document.addEventListener( 'DOMContentLoaded', function() {
		var mainEl = $( '.sui-wrap' );
		if ( undefined === SUI.dialogs ) {
			SUI.dialogs = {};
		}

		// Init the dialog elements.
		$( '.sui-2-4-1 .sui-dialog' ).each( function() {
			if ( ! SUI.dialogs.hasOwnProperty( this.id ) ) {
				SUI.dialogs[this.id] = new A11yDialog( this, mainEl );
			}
		});

	});

}( jQuery ) );
