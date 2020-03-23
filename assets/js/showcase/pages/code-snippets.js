( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageCodeSnippetsNotices = function( page ) {

		var body = $( 'body' ),
			page = 'showcase-page-' + page
			;

		if ( page !== body.attr( 'id' ) ) {
			return;
		}

		function init() {

			let noticeId      = 'library-warning',
				noticeMessage = '<p><strong>SUI 2.8.0</strong> stopped including <strong>Clipboard.js</strong> as part of its library but this element still supports it. Please read documentation on how to proceed with your plugin.</p>',
				noticeOptions = {}
				;

			noticeOptions.type = 'warning';
			noticeOptions.dismiss = {};
			noticeOptions.dismiss.show = true;

			SUI.openNotice( noticeId, noticeMessage, noticeOptions );

		}

		init();

		return this;

	};

	$( window ).on( 'load', function() {

		DEMO.pageCodeSnippetsNotices( 'code-snippets' );

	});

}( jQuery ) );
