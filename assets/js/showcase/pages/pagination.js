( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pagePagination = function( page ) {

		var body = $( 'body' ),
			page = 'showcase-page-' + page
			;

		if ( page !== body.attr( 'id' ) ) {
			return;
		}

		function openFilter( e ) {

			var pagButton  = $( e ),
				pagWrapper = pagButton.closest( '.sui-pagination-wrap' ),
				pageFilter  = pagWrapper.next( '.sui-pagination-filter' )
				;

			pagButton.toggleClass( 'sui-active' );
			pageFilter.toggleClass( 'sui-open' );

		}

		function init() {

			var demoPagFilter = $( '.sui-pagination-open-filter' );

			demoPagFilter.on( 'click', function( e ) {
				openFilter( e.target );
				e.preventDefault();
				e.stopPropagation();
			});
		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pagePagination( 'pagination' );

	});

}( jQuery ) );
