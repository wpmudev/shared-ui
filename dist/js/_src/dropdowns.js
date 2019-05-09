( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	SUI.linkDropdown = function() {

		function closeAllDropdowns( $except ) {

			var $dropdowns = $( '.sui-2-3-26 .sui-dropdown' );

			if ( $except ) {
				$dropdowns = $dropdowns.not( $except );
			}

			$dropdowns.removeClass( 'open' );

		}

		$( 'body' ).on( 'click', '.sui-dropdown-anchor', function( e ) {

			var $button = $( this ),
				$parent = $button.parent();

			closeAllDropdowns( $parent );

			if ( $parent.hasClass( 'sui-dropdown' ) ) {
				$parent.toggleClass( 'open' );
			}

			e.preventDefault();

		});

		$( 'body' ).mouseup( function( e ) {

			var $anchor = $( '.sui-2-3-26 .sui-dropdown-anchor' );

			if ( ( ! $anchor.is( e.target ) ) && ( 0 === $anchor.has( e.target ).length ) ) {
				closeAllDropdowns();
			}

		});

	};

	SUI.linkDropdown();

}( jQuery ) );
