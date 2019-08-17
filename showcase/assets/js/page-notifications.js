( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageNotifications = function( page ) {

		var body = $( 'body' );

		if ( page !== body.data( 'page' ) || page !== body.attr( 'data-page' ) ) {
			return;
		}

		function noticeHide( el ) {

			$( el ).slideUp( 'slow' );

		}

		function noticeShow( el ) {

			var delay       = 1000,
				noticeCur   = $( el ),
				noticeTop   = $( '.sui-notice-top' ),
				noticeFloat = $( '.sui-notice-floating' ),
				noticeAll   = $( '.sui-notice-top, .sui-notice-floating' )
				;

			if ( ! noticeTop.is( ':visible' ) && ! noticeFloat.is( ':visible' ) ) {
				delay = 0;
			}

			noticeHide( noticeAll );

			setTimeout( function() {
				noticeCur.slideDown( 'slow' );
			}, delay );
		}

		function init() {

			var btnNoticeTop   = $( '#show-notice-top' ),
				btnNoticeFloat = $( '#show-notice-float' )
				;

			var noticeTop   = $( '.sui-notice-top' ),
				noticeFloat = $( '.sui-notice-floating' )
				;

			btnNoticeTop.on( 'click', function() {
				noticeShow( noticeTop );
			});

			btnNoticeFloat.on( 'click', function() {
				noticeShow( noticeFloat );
			});
		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pageNotifications( 'notifications' );

	});

}( jQuery ) );
