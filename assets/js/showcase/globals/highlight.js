( function( $ ) {

	$( 'body' ).ready( function() {

		// Initialize highlight js for demo code blocks.
		$( '.demo-code-block .sui-code-snippet' ).each( function( i, block ) {
			hljs.highlightBlock( block );
		});

		$( '.showcase-component' ).each( function() {

			var self = $( this );

			if ( 150 < self.find( '.sui-code-snippet' ).outerHeight( true ) ) {

				self.find( '.showcase-component-code--more' ).on( 'click', function() {

					if ( self.find( '.showcase-component-code' ).hasClass( 'open' ) ) {
						self.find( '.showcase-component-code' ).removeClass( 'open' );
						self.find( '.showcase-component-code--more' ).html(
							'Show More' +
							'<span class="sui-icon-chevron-down" aria-hidden="true"></span>'
						);
					} else {
						self.find( '.showcase-component-code' ).addClass( 'open' );
						self.find( '.showcase-component-code--more' ).html(
							'Show Less' +
							'<span class="sui-icon-chevron-up" aria-hidden="true"></span>'
						);
					}
				});
			} else {
				self.find( '.showcase-component-code--more' ).hide();
			}
		});
	});

}( jQuery ) );
