( function( $ ) {

	$( 'body' ).ready( function() {

		let body     = $( 'body' ),
			suiWrap   = body.find( '.sui-wrap' ),
			btnRtl   = $( '#wp-admin-bar-rtl-language a[role="button"]' ),
			btnColor = $( '#wp-admin-bar-color-accessibility a[role="button"]' )
			;

		function activateRTL( element ) {

			element.on( 'click', function( e ) {

				let button  = $( this ),
					styles  = $( '#wordpress-styles' ),
					hrefcss = styles.attr( 'href' ),
					newcss  = hrefcss.replace( 'wordpress', 'wordpress-rtl' ),
					oldcss  = hrefcss.replace( 'wordpress-rtl', 'wordpress' )
					;

				const isButtonActive = button.hasClass( 'active' );
				const isBodyActive   = ( 0 < $( 'body[dir]' ).length && 'rtl' === body.attr( 'dir' ) );

				if ( isButtonActive && isBodyActive ) {
					body.removeClass( 'rtl' );
					body.removeAttr( 'dir' );
					styles.attr( 'href', oldcss );
					button.removeClass( 'active' );
					button.attr( 'title', 'Activate right-to-left language support' );
				} else {
					body.addClass( 'rtl' );
					body.attr( 'dir', 'rtl' );
					styles.attr( 'href', newcss );
					button.addClass( 'active' );
					button.attr( 'title', 'Deactivate right-to-left language support' );
				}

				e.preventDefault();

			});
		}

		activateRTL( btnRtl );

		function activateColor( element ) {

			element.on( 'click', function( e ) {

				let button = $( this );

				const isButtonActive  = button.hasClass( 'active' );
				const isWrapColorized = suiWrap.hasClass( 'sui-color-accessible' );

				if ( isButtonActive && isWrapColorized ) {
					button.removeClass( 'active' );
					button.attr( 'title', 'Activate color accessibility' );
					suiWrap.removeClass( 'sui-color-accessible' );
					body.removeClass( 'sui-select-accessible' );
				} else {
					button.addClass( 'active' );
					button.attr( 'title', 'Deactivate color accessibility' );
					suiWrap.addClass( 'sui-color-accessible' );
					body.addClass( 'sui-select-accessible' );
				}

				e.preventDefault();

			});
		}

		activateColor( btnColor );

	});

}( jQuery ) );
