( function( $ ) {

	// This will auto hide the top notice if the classes .sui-can-dismiss or .sui-cant-dismiss aren't present.
	$( '.sui-2-3-26 .sui-notice-top:not(.sui-can-dismiss, .sui-cant-dismiss)' ).delay( 3000 ).slideUp( 'slow' );

	$( '.sui-2-3-26 .sui-notice-dismiss' ).click( function( e ) {
		e.preventDefault();

        $( this ).parent().stop().slideUp( 'slow' );

		return false;
	});

}( jQuery ) );
