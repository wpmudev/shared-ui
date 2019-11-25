( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageToggles = function( page ) {

		var body = $( 'body' ),
			page = 'showcase-page-' + page
			;

		if ( page !== body.attr( 'id' ) ) {
			return;
		}

		function showSettings( element ) {

			const settings = $( '#' + element.attr( 'aria-controls' ) );

			element.on( 'change', function() {

				if ( element.is( ':checked' ) ) {
					settings.show();
				} else {
					settings.hide();
				}
			});
		}

		function init() {

			const toggles = $( '.sui-toggle input[type="checkbox"]' );

			toggles.each( function() {

				let toggle = $( this );

				if ( undefined !== toggle.attr( 'aria-controls' ) ) {
					showSettings( toggle );
				}
			});

		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pageToggles( 'toggles' );

	});

}( jQuery ) );
