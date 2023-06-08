( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageTimePicker = function( page ) {

		var body = $( 'body' ),
			page = 'showcase-page-' + page
			;

		if ( page !== body.attr( 'id' ) ) {
			return;
		}

		function timePicker( element ) {

			element = $( element );

			element.clockTimePicker({
				duration: true,
				precision: 1,
				vibrate: true,
				required: true,
				alwaysSelectHoursFirst: true

			});
		}

		function init() {

			timePicker( '#time-simple-default' );
			timePicker( '#time-simple-error' );

		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pageTimePicker( 'timepicker' );

	});

}( jQuery ) );
