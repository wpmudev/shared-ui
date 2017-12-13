(function ($) {

	console.log('this is form.js');

}(jQuery));

(function ($) {

	$( '.sui-notice-dismiss' ).click( function( e ) {
		e.preventDefault();
		$(this).parent( '.sui-notice' ).slideUp('slow');
	});


}(jQuery));

(function ($) {

	console.log('this is test-component.js');

}(jQuery));
