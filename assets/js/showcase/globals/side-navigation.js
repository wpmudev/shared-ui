( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.sideNavigation = function( element, selection ) {

		var button = $( element );
		var select = $( selection );

		function current( el ) {

			var button  = $( el ),
				parent  = button.closest( '.sui-vertical-tabs' ),
				wrapper = button.closest( '.sui-row-with-sidenav' ),
				content = wrapper.find( '> div[data-tab]' ),
				select = wrapper.find( '.sui-select' )
				;

			var dataNav = button.data( 'tab' ),
				dataBox = wrapper.find( 'div[data-tab="' + dataNav + '"]' )
				;

			if ( select.length ) {
				select.attr( 'selected', false );
				select.find( 'option[value="' + dataNav + '"]' ).prop( 'selected', true );
				select.trigger( 'change.select2' );
			}

			parent.find( 'li' ).removeClass( 'current' );
			button.parent().addClass( 'current' );

			content.hide();
			dataBox.show();

		}

		function init() {

			button.on( 'click', function( e ) {
				current( e.target );

				e.preventDefault();
				e.stopPropagation();

			});

			select.on( 'change', function( e ) {
				var elem  = $( this ),
					data = elem.find( ':selected' ).val(),
					wrapper = elem.closest( '.sui-row-with-sidenav' ),
					parent = wrapper.find( '.sui-vertical-tabs' ),
					button = parent.find( '[data-tab="' + data + '"]' );

				current( button );

				e.preventDefault();
				e.stopPropagation();

			});
		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		var button = $( '.sui-vertical-tab a' );
		var selection = $( '.sui-sidenav-settings .sui-select' );

		DEMO.sideNavigation( button, selection );

	});

}( jQuery ) );
