( function( $ ) {

	$( 'SUI_BODY_CLASS .sui-notice-top:not(.sui-cant-dismiss)' ).delay( 3000 ).slideUp( 'slow' );

	$( 'SUI_BODY_CLASS .sui-notice-dismiss' ).click( function( e ) {
		e.preventDefault();

		$( this ).parent( '.sui-notice' ).stop().slideUp( 'slow' );

		return false;
	});

}( jQuery ) );
