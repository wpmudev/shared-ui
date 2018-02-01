( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	SUI.linkDropdown = function() {

		function closeAllDropdowns( $except ) {
			var $dropdowns = $( 'SUI_BODY_CLASS .sui-dropdown' );

			if ( $except ) {
				$dropdowns = $dropdowns.not( $except );
			}

			$dropdowns.removeClass( 'open' );
		}

		$( 'body' ).click( function( e ) {
			var $this = $( e.target ),
				$el = $this.closest( '.sui-dropdown' );

			if ( 0 == $el.length ) {
				closeAllDropdowns();
			} else if ( $this.is( 'a' ) ) {
				e.preventDefault();

				closeAllDropdowns( $el );

				$el.toggleClass( 'open' );
			}

		});

	};

	SUI.linkDropdown();

}( jQuery ) );
