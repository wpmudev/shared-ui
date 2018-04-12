( function( $ ) {

    // Enable strict mode.
    'use strict';

    // Define global SUI object if it doesn't exist.
    if ( 'object' !== typeof window.SUI ) {
        window.SUI = {};
    }

    SUI.suiAccordion = function( el ) {
        var accordionTable = $( el );

        function init() {
            accordionTable.on( 'click', '.sui-accordion-item', function() {

                var getParentItem = $( this ).closest( '.sui-accordion-item' ),
                    getNextAdditionalContentRow = getParentItem.nextUntil( '.sui-accordion-item' );

                getNextAdditionalContentRow.toggleClass( 'sui-accordion-item--open' );

                if ( getNextAdditionalContentRow.hasClass( 'sui-accordion-item--open' ) ) {
                    getParentItem.addClass( 'sui-accordion-item--open' );
                } else {
                    getParentItem.removeClass( 'sui-accordion-item--open' );
                }

            });
        }

        init();

        return this;
    };

    // Convert all accordions.
    $( 'SUI_BODY_CLASS .sui-accordion' ).each( function() {
        SUI.suiAccordion( this );
    });
}( jQuery ) );
