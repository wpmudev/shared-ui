( function( $ ) {

	$( 'body' ).ready( function() {

		let body     = $( 'body' ),
			suiWrap   = body.find( '.sui-wrap' ),
			btnRtl   = $( '#wp-lang-mode--rtl' ),
			btnColor = $( '#wp-accessibility-mode--color' )
			;

		btnRtl.on( 'click', function() {

			let button = $( this );

			if ( button.hasClass( 'active' ) ) {

				button.removeClass( 'active' );
				body.removeAttr( 'dir' );

			} else {

				button.addClass( 'active' );
				body.attr( 'dir', 'rtl' );

			}
		});

		btnColor.on( 'click', function() {

			let button = $( this );

			if ( button.hasClass( 'active' ) ) {

				button.removeClass( 'active' );
				suiWrap.removeClass( 'sui-color-accessible' );

			} else {

				button.addClass( 'active' );

				if ( 0 !== suiWrap.length ) {
					suiWrap.addClass( 'sui-color-accessible' );
				}
			}
		});

	});

}( jQuery ) );
