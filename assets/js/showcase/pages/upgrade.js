( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageUpgrade = function( page ) {

		var body = $( 'body' ),
			page = 'showcase-page-' + page
			;

		if ( page !== body.attr( 'id' ) ) {
			return;
		}

		function hide() {

			var div = $( 'div[data-show]' );

			div.hide();
			div.attr( 'aria-hidden', 'true' );
			div.removeAttr( 'tabindex' );

		}

		function show( element ) {

			var div = $( 'div[data-show="' + element + '"]' );

			div.show();
			div.removeAttr( 'aria-hidden' );
			div.attr( 'tabindex', '-1' );
			div.focus();

		}

		function button( element ) {

			var button  = $( element );

			button.on( 'click', function() {
				hide();
				show( $( this ).data( 'show' ) );
				console.log( 'click' );
			});
		}

		function init() {

			var btnPreview = body.find( '#show-preview' ),
				btnDocs    = body.find( '#documentation' )
				;

			button( btnPreview );
			button( btnDocs );

		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pageUpgrade( 'upgrade' );

	});

}( jQuery ) );
