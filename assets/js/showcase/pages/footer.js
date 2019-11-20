( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageFooter = function( page ) {

		var body = $( 'body' ),
			page = 'showcase-page-' + page
			;

		if ( page !== body.attr( 'id' ) ) {
			return;
		}

		function sampleReset() {

			var footer = body.find( 'footer' );

			footer.hide();
			footer.removeAttr( 'tabindex' );
			footer.attr( 'aria-hidden', 'true' );

		}

		function sampleFocus( element ) {

			var sample = $( element );

			sample.removeAttr( 'aria-hidden' );
			sample.show();
			sample.attr( 'tabindex', '-1' );
			sample.focus();

		}

		function sampleShow( elButton, elSample ) {

			var button = $( elButton ),
				sample = $( elSample )
				;

			button.on( 'click', function( e ) {

				// Hide other samples
				sampleReset();

				// Show sample
				sampleFocus( sample );

			});
		}

		function init() {

			var btnPro   = body.find( '#preview-footer--pro' ),
				btnFree  = body.find( '#preview-footer--free' ),
				btnCross = body.find( '#preview-footer--cross' )
				;

			var tplPro   = body.find( '#sample-footer--pro' ),
				tplFree  = body.find( '#sample-footer--free' ),
				tplCross = body.find( '#sample-footer--cross' )
				;

			sampleShow( btnPro, tplPro );
			sampleShow( btnFree, tplFree );
			sampleShow( btnCross, tplCross );

		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pageFooter( 'footer' );

	});

}( jQuery ) );
