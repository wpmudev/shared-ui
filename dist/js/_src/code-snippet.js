// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
( function( $, ClipboardJS, window, document, undefined ) {

    'use strict';

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variables rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'SUICodeSnippet',
        defaults   = {
            copyText: 'Copy',
            copiedText: 'Copied!'
        };

    // The actual plugin constructor
    function SUICodeSnippet( element, options ) {
        this.element = element;
        this.$element = $( this.element );


        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this._clipboardJs = null;
        this._clipboardId = '';
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend( SUICodeSnippet.prototype, {
        init: function() {
            var self   = this,
                button = '';

            // check if its already wrapped
            if ( 0 === this.$element.parent( 'sui-code-snippet-wrapper' ).length ) {

                // build markup
                this.$element.wrap( '<div class="sui-code-snippet-wrapper"></div>' );
                this._clipboardId = this.generateUniqueId();
                button            = '<button class="sui-button" id="sui-code-snippet-button-' + this._clipboardId + '" data-clipboard-target="#sui-code-snippet-' + this._clipboardId + '">' + this.settings.copyText + '</button>';
                this.$element.attr( 'id', 'sui-code-snippet-' + this._clipboardId ).after( button );
                this._clipboardJs = new ClipboardJS( '#sui-code-snippet-button-' + this._clipboardId );

                // attach events
                this._clipboardJs.on( 'success', function( e ) {
                    e.clearSelection();
                    self.showTooltip( e.trigger, self.settings.copiedText );
                });

                $( '#sui-code-snippet-button-' + this._clipboardId ).on( 'mouseleave.SUICodeSnippet', function() {
                    $( this ).removeClass( 'sui-tooltip' );
                    $( this ).removeAttr( 'aria-label' );
                    $( this ).removeAttr( 'data-tooltip' );
                });
            }
        },

        getClipboardJs: function() {
            return this._clipboardJs;
        },

        showTooltip: function( e, msg ) {
            $( e ).addClass( 'sui-tooltip' );
            $( e ).attr( 'aria-label', msg );
            $( e ).attr( 'data-tooltip', msg );
        },

        generateUniqueId: function() {

            // Math.random should be unique because of its seeding algorithm.
            // Convert it to base 36 (numbers + letters), and grab the first 9 characters
            // after the decimal.
            return '_' + Math.random().toString( 36 ).substr( 2, 9 );
        },

        destroy: function() {
            if ( null !== this._clipboardJs ) {
                this._clipboardJs.destroy();
                this.$element.attr( 'id', '' );
                this.$element.unwrap( '.sui-code-snippet-wrapper' );
                $( '#sui-code-snippet-button-' + this._clipboardId ).remove();
            }
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function( options ) {
        return this.each( function() {

            // instance of SUICodeSnippet can be called with $(element).data('SUICodeSnippet')
            if ( ! $.data( this, pluginName ) ) {
                $.data( this, pluginName, new SUICodeSnippet( this, options ) );
            }
        });
    };

}( jQuery, ClipboardJS, window, document ) );

( function( $ ) {

    // Enable strict mode.
    'use strict';

    // Define global SUI object if it doesn't exist.
    if ( 'object' !== typeof window.SUI ) {
        window.SUI = {};
    }

    SUI.suiCodeSnippet = function( ) {

        // Convert all code snippet.
        $( '.sui-2-3-26 .sui-code-snippet:not(.sui-no-copy)' ).each( function() {

            // backward compat of instantiate new accordion
            $( this ).SUICodeSnippet({});
        });
    };

    // wait document ready first
    $( document ).ready( function() {
        SUI.suiCodeSnippet();
    });

}( jQuery ) );
