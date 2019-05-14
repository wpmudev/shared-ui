( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageIcons = function( page ) {

		var body = $( 'body' );

		if ( page !== body.data( 'page' ) || page !== body.attr( 'data-page' ) ) {
			return;
		}

		function showTooltip( e, msg ) {
			$( e ).addClass( 'sui-tooltip' );
			$( e ).attr( 'aria-label', msg );
			$( e ).attr( 'data-tooltip', msg );
		}

		function init() {

			var clipboard = new ClipboardJS( '.demo-icon-code' );

			clipboard.on( 'success', function( e ) {
				console.info( 'Copied:', e.text );
				showTooltip( e.trigger, 'Copied Icon!' );
				e.clearSelection();
			});

		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pageFooter( 'icons' );

	});

}( jQuery ) );
