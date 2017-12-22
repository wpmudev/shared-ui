(function ($) {

	$('.sui-notice-top:not(.sui-cant-dismiss)').delay(3000).slideUp('slow');
	$( '.sui-notice-dismiss' ).click( function( e ) {
		e.preventDefault();
		$(this).parent( '.sui-notice' ).stop().slideUp('slow');
		return false;
	});




}(jQuery));
