// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
( function( $, window, document, undefined ) {

    'use strict';

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variables rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'SUIAccordion',
        defaults = {};

    // The actual plugin constructor
    function SUIAccordion( element, options ) {
        this.element = element;
        this.$element = $( this.element );


        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend( SUIAccordion.prototype, {
        init: function() {

            // namespaced event
            this.$element.on( 'click.sui.accordion', '.sui-accordion-item', function( event ) {

                var getParentItem = $( this ).closest( '.sui-accordion-item' ),
                    getNextAdditionalContentRow = getParentItem.nextUntil( '.sui-accordion-item' ).filter( '.sui-accordion-item-content' );

                getNextAdditionalContentRow.toggleClass( 'sui-accordion-item--open' );

                if ( getNextAdditionalContentRow.hasClass( 'sui-accordion-item--open' ) ) {
                    getParentItem.addClass( 'sui-accordion-item--open' );
                } else {
                    getParentItem.removeClass( 'sui-accordion-item--open' );
                }

            });
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function( options ) {
        return this.each( function() {

            // instance of SUIAccordion can be called with $(element).data('SUIAccordion')
            if ( ! $.data( this, pluginName ) ) {
                $.data( this, pluginName, new SUIAccordion( this, options ) );
            }
        });
    };

}( jQuery, window, document ) );

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
            accordionTable.SUIAccordion({});
        }

        init();

        return this;
    };

    // wait document ready first
    $( document ).ready( function() {

        // Convert all accordions.
        $( '.sui-2-2-10 .sui-accordion' ).each( function() {

            // backward compat of instantiate new accordion
            SUI.suiAccordion( this );
        });
    });

}( jQuery ) );
