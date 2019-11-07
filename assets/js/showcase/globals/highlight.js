( function( $ ) {

	$( 'body' ).ready( function() {

		// Initialize highlight js for demo code blocks.
		$( '.demo-code-block .sui-code-snippet' ).each( function( i, block ) {
			hljs.highlightBlock( block );
		});

	});

}( jQuery ) );
