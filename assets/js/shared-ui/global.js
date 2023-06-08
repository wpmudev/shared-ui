;( function( $ ) {

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

    // Global function to escape script tags.
	SUI.escapeJS = ( string ) => {

        // Create a temporary <div> element using jQuery and set the HTML content.
        var div = $( '<div>' ).html( string );

        // Get the text content of the <div> element and remove script tags
        var text = div.text().replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '' );

        // Return the escaped text
        return text;
    };

}( jQuery ) );
