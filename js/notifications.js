(function ($) {

	$( '.sui-notice-dismiss' ).click( function( e ) {
		e.preventDefault();
		$(this).parent( '.sui-notice' ).slideUp('slow');
	});


}(jQuery));
