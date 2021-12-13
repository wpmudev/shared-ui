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
				'aria-selected': 'false',
				'active': 'false'
			});
			parent.find( 'li' ).removeClass( 'current' );
			button.parent().addClass( 'current' );
			button.attr({
				'tabindex': '0',
				'aria-selected': 'true',
				'active': 'true'
			});
			button.focus();

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

			// change content tab on arrow click
			$( '.sui-vertical-tabs' ).on( 'keydown', 'a', function( e ) {
				var prev = $( this ).parent().prev().find( 'a' );
				var next = $( this ).parent().next().find( 'a' );
				if ( 37 === e.keyCode || 38 === e.keyCode ) {
					if ( prev.length ) {
						prev.trigger( 'click' );
					}
				} else if ( 39 === e.keyCode || 40 === e.keyCode ) {
					if ( next.length ) {
						next.trigger( 'click' );
					}
				}
				e.preventDefault();
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
