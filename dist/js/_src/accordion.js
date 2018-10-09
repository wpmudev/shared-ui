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
			var self = this;

			// namespaced event
			this.$element.on( 'click.sui.accordion', 'div.sui-accordion-item-header, tr.sui-accordion-item', function( event ) {

				var getItem       = $( this ).closest( '.sui-accordion-item' ),
					getContent    = getItem.nextUntil( '.sui-accordion-item' ).filter( '.sui-accordion-item-content' ),
					getParent     = getItem.closest( '.sui-accordion' ),
					clickedTarget = $( event.target ),
					getChart      = getItem.find( '.sui-chartjs-animated' )
					;

				if ( clickedTarget.closest( '.sui-accordion-item-action' ).length ) {
					return true;
				}

				if ( getParent.hasClass( 'sui-table' ) ) {

					if ( ! getItem.hasClass( 'sui-accordion-item--disabled' ) ) {
						getContent.toggleClass( 'sui-accordion-item--open' );

						if ( getContent.hasClass( 'sui-accordion-item--open' ) ) {
							getItem.addClass( 'sui-accordion-item--open' );
						} else {
							getItem.removeClass( 'sui-accordion-item--open' );
						}
					}
				} else {

					if ( ! getItem.hasClass( 'sui-accordion-item--disabled' ) ) {
						getItem.toggleClass( 'sui-accordion-item--open' );
					}
				}

				if ( getParent.hasClass( 'sui-accordion-block' ) && ( 0 !== getChart.length ) ) {

					getItem.find( '.sui-accordion-item-data' ).addClass( 'sui-onload' );
					getChart.removeClass( 'sui-chartjs-loaded' );

					if ( getItem.hasClass( 'sui-accordion-item--open' ) ) {

						setTimeout( function() {

							getItem.find( '.sui-accordion-item-data' ).removeClass( 'sui-onload' );
							getChart.addClass( 'sui-chartjs-loaded' );

						}, 1200 );

					}
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

	if ( 0 !== $( '.sui-2-3-6 .sui-accordion' ).length ) {

		$( '.sui-2-3-6 .sui-accordion' ).each( function() {
			SUI.suiAccordion( this );
		});
	}

}( jQuery ) );
