( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	SUI.showHidePassword = function() {

		$( 'SUI_BODY_CLASS .sui-password-group' ).each( function() {
			var $this = $( this ),
				$input = $this.find( 'input[type="password"]' ),
				$button = $this.find( '.sui-password-toggle' );

			$button.on( 'click', function() {
				var $inputType = '',
					$repInput = '';

				$( this ).toggleClass( 'is-visible' );

				if ( $input.hasClass( 'is-visible' ) ) {
					$input.removeClass( 'is-visible' ).addClass( 'is-hidden' );
					$inputType = 'password';
					$button.find( '> .sui-screen-reader-text' ).text( 'Show Password' );
					$button.find( '> i' ).removeClass( 'sui-ico-eye-hide' ).addClass( 'sui-ico-eye' );
				} else {
					$input.removeClass( 'is-hidden' ).addClass( 'is-visible' );
					$inputType = 'text';
					$button.find( '> .sui-screen-reader-text' ).text( 'Hide Password' );
					$button.find( '> i' ).removeClass( 'sui-ico-eye' ).addClass( 'sui-ico-eye-hide' );
				}

				$repInput = $( '<input type=' + $inputType + ' />' )
					.attr( 'id', $input.attr( 'id' ) )
					.attr( 'name', $input.attr( 'name' ) )
					.attr( 'class', $input.attr( 'class' ) )
					.val( $input.val() )
					.insertBefore( $input );

				$input.remove();
				$input = $repInput;
				$input.focus();

			});

		});

	};

	SUI.showHidePassword();

}( jQuery ) );
