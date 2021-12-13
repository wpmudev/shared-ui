( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.sideNavigation = function( element ) {

		var button = $( element );

		function current( el ) {

			var button  = $( el ),
				parent  = button.closest( '.sui-vertical-tabs' ),
				wrapper = button.closest( '.sui-row-with-sidenav' ),
				content = wrapper.find( '> div[data-tab]' )
				;

			var dataNav = button.data( 'tab' ),
				dataBox = wrapper.find( 'div[data-tab="' + dataNav + '"]' )
				;

			parent.find( 'li a' ).attr({
				'tabindex': '-1',
				'aria-selected': 'false'
			});
			parent.find( 'li' ).removeClass( 'current' );
			button.parent().addClass( 'current' );
			button.attr({
				'tabindex': '0',
				'aria-selected': 'true'
			});

			content.attr({ 'aria-hidden': 'true' });
			content.hide();
			dataBox.attr({ 'aria-hidden': 'false' });
			dataBox.show();

		}

		function init() {

			button.on( 'click', function( e ) {

				current( e.target );

				e.preventDefault();
				e.stopPropagation();

			});
		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		var button = $( '.sui-vertical-tab a' );

		DEMO.sideNavigation( button );

	});

}( jQuery ) );
