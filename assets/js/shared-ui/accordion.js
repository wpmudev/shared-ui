( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Create the defaults once
	var pluginName = 'SUIAccordion',
		defaults = {};

	// The actual plugin constructor
	function SUIAccordion( element, options ) {
		this.element = element;
		this.$element = $( this.element );

		this.settings = $.extend({}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend( SUIAccordion.prototype, {

		init: function() {

			var self = this;

			this.$element.on( 'click', 'div.sui-accordion-item-header, tr.sui-accordion-item', function( event ) {

				var getItem       = $( this ).closest( '.sui-accordion-item' ),
					getContent    = getItem.nextUntil( '.sui-accordion-item' ).filter( '.sui-accordion-item-content' ),
					getParent     = getItem.closest( '.sui-accordion' ),
					getChart      = getItem.find( '.sui-chartjs-animated' )
					;

				var clickedTarget = $( event.target );

				var flexHeader = $( this ),
					flexItem   = flexHeader.parent(),
					flexChart  = flexItem.find( '.sui-chartjs-animated' ),
					flexParent = flexItem.parent()
					;

				var tableItem    = $( this ),
					tableContent = tableItem.nextUntil( '.sui-accordion-item' ).filter( '.sui-accordion-item-content' )
					;

				if ( clickedTarget.closest( '.sui-accordion-item-action' ).length ) {
					return true;
				}

				// CHECK: Flexbox
				if ( flexHeader.hasClass( 'sui-accordion-item-header' ) ) {

					if ( flexItem.hasClass( 'sui-accordion-item--disabled' ) ) {
						flexItem.removeClass( 'sui-accordion-item--open' );
					} else {

						if ( flexItem.hasClass( 'sui-accordion-item--open' ) ) {
							flexItem.removeClass( 'sui-accordion-item--open' );
						} else {
							flexItem.addClass( 'sui-accordion-item--open' );
						}
					}

					// CHECK: Accordion Blocks
					if ( flexParent.hasClass( 'sui-accordion-block' ) && ( 0 !== flexChart.length ) ) {

						flexItem.find( '.sui-accordion-item-data' ).addClass( 'sui-onload' );
						flexChart.removeClass( 'sui-chartjs-loaded' );

						if ( flexItem.hasClass( 'sui-accordion-item--open' ) ) {

							setTimeout( function() {
								flexItem.find( '.sui-accordion-item-data' ).removeClass( 'sui-onload' );
								flexChart.addClass( 'sui-chartjs-loaded' );
							}, 1200 );
						}
					}
				}

				// CHECK: Table
				if ( tableItem.hasClass( 'sui-accordion-item' ) ) {

					if ( tableItem.hasClass( 'sui-accordion-item--disabled' ) ) {
						tableContent.removeClass( 'sui-accordion-item--open' );
					} else {

						if ( tableItem.hasClass( 'sui-accordion-item--open' ) ) {
							tableItem.removeClass( 'sui-accordion-item--open' );
							tableContent.removeClass( 'sui-accordion-item--open' );
						} else {
							tableItem.addClass( 'sui-accordion-item--open' );
							tableContent.addClass( 'sui-accordion-item--open' );
						}
					}
				}

				event.stopPropagation();

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

	if ( 0 !== $( 'SUI_BODY_CLASS .sui-accordion' ).length ) {

		$( 'SUI_BODY_CLASS .sui-accordion' ).each( function() {
			SUI.suiAccordion( this );
		});
	}

}( jQuery ) );
