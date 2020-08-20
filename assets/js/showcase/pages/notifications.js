( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageNotifications = function( page ) {

		var body = $( 'body' ),
			page = 'showcase-page-' + page
			;

		if ( page !== body.attr( 'id' ) ) {
			return;
		}

		function getRandom( items ) {
			return items[ Math.floor( Math.random() * items.length ) ];
		}

		function randomColor( element ) {

			element.on( 'click', function() {

				const button = $( this ),
					notice = button.closest( '.sui-notice' ),
					colors = [
						'default',
						'blue',
						'green',
						'yellow',
						'purple',
						'red'
					];

				const randomColor = getRandom( colors );

				// Remove all color classes for notices.
				notice.removeClass();

				// Print notice new class.
				notice.addClass( 'sui-notice sui-notice-' + randomColor );

				// Remove all classes.
				button.removeClass();

				// Print new class.
				button.addClass( 'sui-button sui-button-' + randomColor );

			});
		}

		function init() {
			randomColor( $( '#demo-multiline-random-button' ) );
		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pageNotifications( 'notifications' );

	});

}( jQuery ) );