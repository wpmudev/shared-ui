( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageBoxBasics = function( page ) {

		var body = $( 'body' ),
			page = 'showcase-page-' + page
			;

		if ( page !== body.attr( 'id' ) ) {
			return;
		}

		function getRandom( items ) {
			return items[ Math.floor( Math.random() * items.length ) ];
		}

		function insertBox( button, container ) {

			var button    = $( button ),
				container = $( container )
				;

			var box1 = '<div class="sui-box">' + $( '#sample-box-one' ).html() + '</div>',
				box2 = '<div class="sui-box">' + $( '#sample-box-two' ).html() + '</div>',
				box3 = '<div class="sui-box">' + $( '#sample-box-three' ).html() + '</div>',
				box4 = '<div class="sui-box">' + $( '#sample-box-four' ).html() + '</div>'
				;

			var box = [
				box1,
				box2,
				box3,
				box4
			];

			button.on( 'click', function( e ) {

				container.append( getRandom( box ) );

				e.stopPropagation();
				e.preventDefault();

			});
		}

		function init() {

			var button = $( '#add-sample-box' ),
				container = button.closest( 'div[data-tab="example"]' )
				;

			insertBox( button, container );

		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pageBoxBasics( 'box-basics' );

	});

}( jQuery ) );
