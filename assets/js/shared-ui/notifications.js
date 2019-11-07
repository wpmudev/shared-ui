( function( $ ) {

	// This will auto hide the top notice if the classes .sui-can-dismiss or .sui-cant-dismiss aren't present.
	$( 'SUI_BODY_CLASS .sui-notice-top:not(.sui-can-dismiss, .sui-cant-dismiss)' ).delay( 3000 ).slideUp( 'slow' );

	$( 'SUI_BODY_CLASS .sui-notice-dismiss' ).click( function( e ) {
		e.preventDefault();

        $( this ).parent().stop().slideUp( 'slow' );

		return false;
	});

}( jQuery ) );
