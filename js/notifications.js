(function ($) {

	$( '.sui-notice-dismiss' ).click( function( e ) {
		e.preventDefault();
		$(this).parent( '.sui-notice' ).slideUp('slow');
	});


	$('.sui-notice-top:not(.sui-cant-dismiss)').delay(3000).slideUp('slow');


}(jQuery));
