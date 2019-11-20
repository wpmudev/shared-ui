// This file is to be used for fixing up issues with IE11.

( function( $ ) {

    var colorpickers = $( '.sui-colorpicker-wrap' );

    // If IE11 remove SUI colorpicker styles.
    if ( !! navigator.userAgent.match( /Trident\/7\./ ) && colorpickers[0]) {
        colorpickers.find( '.sui-colorpicker' ).hide();
        colorpickers.removeClass( 'sui-colorpicker-wrap' );
    }

}( jQuery ) );
