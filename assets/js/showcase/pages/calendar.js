( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageCalendar = function( page ) {

		var body = $( 'body' ),
			page = 'showcase-page-' + page
			;

		if ( page !== body.attr( 'id' ) ) {
			return;
		}

		function init() {

			$( '.sui-date input' ).datepicker({
				beforeShow: function( input, inst ) {
					$( '#ui-datepicker-div' ).addClass( 'sui-calendar' );
				},
				'dateFormat': 'd MM yy'
			});

		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pageCalendar( 'calendar' );

	});

}( jQuery ) );
