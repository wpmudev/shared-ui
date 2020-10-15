( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.previewSelect = ( el ) => {

		var component = $( el ),
			options   = component.find( '.showcase-component-options' ),
			option    = options.find( 'input' ),
			select    = component.find( 'select' )
			;

		function changeWidth() {

			var option = options.find( '[data-option="width"] input' );

			if ( options.find( '[data-option="width"]' ).length ) {

				option.on( 'click', function() {

					var option = $( this );

					select.each( function() {

						var select = $( this );

						if ( 'custom' === option.val() ) {
							select.attr( 'data-width', '200px' );
						} else {
							select.removeAttr( 'data-width' );
						}
					});

				});

			}
		}

		function changeHeight() {

			var option = options.find( '[data-option="height"] input' );

			if ( options.find( '[data-option="height"]' ).length ) {

				option.on( 'click', function() {

					var option = $( this );

					select.each( function() {

						var select = $( this );

						if ( 'small' === option.val() ) {
							select.addClass( 'sui-select-sm' );
						} else {
							select.removeClass( 'sui-select-sm' );
						}
					});

				});

			}
		}

		function changeAssistiveText() {

			var option = options.find( '[data-option="assistive-text"] input' );

			if ( options.find( '[data-option="assistive-text"]' ).length ) {

				option.on( 'click', function() {

					var option = $( this );

					select.each( function() {

						var select = $( this ),
							field  = select.parent();

						var helper = '<p id="' + select.attr( 'id' ) + '-helper" class="sui-description">Helper message</p>',
							error  = '<p id="' + select.attr( 'id' ) + '-error" class="sui-error-message">Error message</p>';

						field.removeClass( 'sui-form-field-error' );
						field.find( '.sui-description' ).remove();
						field.find( '.sui-error-message' ).remove();

						if ( 'helper' === option.val() ) {
							field.append( helper );
						} else if ( 'error' === option.val() ) {
							field.append( error );
							field.addClass( 'sui-form-field-error' );
						} else if ( 'error-helper' === option.val() ) {
							field.append( error );
							field.find( '.sui-error-message' ).css( 'margin-bottom', 0 );
							field.append( helper );
							field.addClass( 'sui-form-field-error' );
						}
					});

				});

			}
		}

		function changePlaceholder() {

			var option = options.find( '.single-select-option--placeholder' );

			if ( option.length ) {

				option.on( 'click', function() {

					var option = $( this );

					select.each( function() {

						var select = $( this );

						// Copy select options.
						var selectOptions = select.children().clone();

						if ( option.is( ':checked' ) ) {

							select.attr( 'data-placeholder', 'Placeholder' );

							if ( '' !== select.find( 'option:first' ).val() ) {
								select
									.empty() // Empty select options.
									.append( '<option></option>' ) // Add empty option to select.
									.append( selectOptions ) // Paste original options to select.
									;
							}
						} else {
							select
								.removeAttr( 'data-placeholder' ) // Remove placeholder attribute.
								.find( 'option' )
								.filter( function() {
									return ! this.value || 0 === $.trim( this.value ).length; // Find empty option.
								})
								.remove() // Remove empty option.
								;
						}
					});
				});

			}
		}

		function changeSearch() {

			var option = options.find( '.single-select-option--search' );

			if ( option.length ) {

				option.on( 'click', function() {

					var option = $( this );

					select.each( function() {

						var select = $( this );

						if ( option.is( ':checked' ) ) {
							select.attr( 'data-search', 'true' );
						} else {
							select.removeAttr( 'data-search' );
						}
					});
				});

			}
		}

		function markup( el ) {

			var container = ( el.closest( '.sui-tab-content' ).length ) ? el.closest( '.sui-tab-content' ) : component,
				code      = container.find( '.showcase-component-code pre' );

			// Remove unnecessary attributes.
			el.removeAttr( 'tabindex' );
			el.removeAttr( 'aria-hidden' );

			// Get component code.
			code.text( el.parent( '.sui-form-field' )[0].outerHTML );
			code.text().trim().replace( /(?:(?:\r\n|\r|\n)\s*){3}/gm, '' );

			// Initialize highlight js for demo code blocks.
			code.each( function( i, block ) {
				hljs.highlightBlock( block );
			});

		}

		function init() {

			changeWidth();
			changeHeight();
			changePlaceholder();
			changeAssistiveText();
			changeSearch();

			// Re-build select.
			option.on( 'click', function() {

				select.each( function() {

					var select = $( this );

					// Destroy.
					select.SUIselect2( 'destroy' );

					// Get sample markup.
					markup( select );

					// Initialize.
					if ( 'icon' === select.attr( 'data-theme' ) ) {
						SUI.select.initIcon( select );
					} else if ( 'color' === select.attr( 'data-theme' ) ) {
						SUI.select.initColor( select );
					} else if ( 'search' === select.attr( 'data-theme' ) ) {
						SUI.select.initSearch( select );
					} else {
						SUI.select.init( select );
					}
				});
			});
		}

		init();

		return this;

	};

	DEMO.pageSelect = ( page ) => {

		var body = $( 'body' ),
			page = 'showcase-page-' + page
			;

		if ( page !== body.attr( 'id' ) ) {
			return;
		}

		function init() {

			// DEMO: Single Select.
			DEMO.previewSelect( '#component-single-select' );

			// DEMO: Multi Select.
			DEMO.previewSelect( '#component-multi-select' );

			// DEMO: Smart Search.
			DEMO.previewSelect( '#component-smart-select' );

		}

		init();

		return this;

	};

	// Call function on load.
	DEMO.pageSelect( 'select' );

}( jQuery ) );
