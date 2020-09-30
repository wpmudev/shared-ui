( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageSelect = ( page ) => {

		var body = $( 'body' ),
			page = 'showcase-page-' + page
			;

		if ( page !== body.attr( 'id' ) ) {
			return;
		}

		function singleSelect( select ) {

			var container = select.closest( '.showcase-component' ),
				options   = container.find( '.showcase-component-options' ),
				option    = options.find( 'fieldset' ),
				searchbar
				;

			option.each( function() {

				self = $( this );

				if ( 'states' === $( this ).data( 'option' ) ) {

					option = $( this ).find( 'input[type="radio"]' );

					option.on( 'click', function() {

						if ( 'disabled' === $( this ).val() ) {
							select.attr( 'disabled', true );
						} else {
							select.attr( 'disabled', false );
							select.removeAttr( 'disabled' );
						}

						if ( 'error' === $( this ).val() ) {
							select.closest( '.sui-form-field' ).addClass( 'sui-form-field-error' );
							select.closest( '.sui-form-field' ).find( '.sui-error-message' ).removeAttr( 'hidden' );
							select.closest( '.sui-form-field' ).find( '.sui-error-message' ).removeClass( 'sui-hidden' );
							select.closest( '.sui-form-field' ).find( '.sui-error-message' ).text( 'This field is required. Please, pick an option before continuing.' );
						} else {
							select.closest( '.sui-form-field' ).removeClass( 'sui-form-field-error' );
							select.closest( '.sui-form-field' ).find( '.sui-error-message' ).attr( 'hidden' );
							select.closest( '.sui-form-field' ).find( '.sui-error-message' ).addClass( 'sui-hidden' );
							select.closest( '.sui-form-field' ).find( '.sui-error-message' ).empty();
						}
					});
				}

				if ( 'options' === $( this ).data( 'option' ) ) {

					option = $( this ).find( 'input[type="checkbox"]' );

					option.on( 'click', function() {

						searchbar = ( self.find( '#single-select-option--search' ).is( ':checked' ) ) ? true : false;

						let format = '',
							formatSelection = '';

						if ( 'icon' === select.attr( 'data-theme' ) ) {
							format = SUI.select.formatIcon;
							formatSelection = SUI.select.formatIconSelection;
						} else if ( 'color' === select.attr( 'data-theme' ) ) {
							format = SUI.select.formatColor;
							formatSelection = SUI.select.formatColorSelection;
						}

						if ( $( this ).is( ':checked' ) ) {

							// Add placeholder.
							if ( 'placeholder' === $( this ).val() ) {

								options = select.children().clone();

								select
									.attr( 'data-placeholder', 'Select Option' )
									.empty()
									.append( '<option></option>' )
									.append( options )
									;

								if ( searchbar ) {

									select
										.SUIselect( 'destroy' )
										.SUIselect({
											templateResult: format,
											templateSelection: formatSelection,
											escapeMarkup: function( markup ) {
												return markup;
											}
										})
										;
								} else {

									select
										.SUIselect( 'destroy' )
										.SUIselect({
											minimumResultsForSearch: -1,
											templateResult: format,
											templateSelection: formatSelection,
											escapeMarkup: function( markup ) {
												return markup;
											}
										})
										;
								}
							}

							// Add search bar.
							if ( 'search' === $( this ).val() ) {

								select
									.SUIselect( 'destroy' )
									.SUIselect({
										templateResult: format,
										templateSelection: formatSelection,
										escapeMarkup: function( markup ) {
											return markup;
										}
									})
									;
							}
						} else {

							// Remove placeholder.
							if ( 'placeholder' === $( this ).val() ) {

								select
									.removeAttr( 'data-placeholder' )
									.find( 'option' )
									.filter( function() {
										return ! this.value || 0 === $.trim( this.value ).length;
									})
									.remove()
									;

								if ( searchbar ) {

									select
										.SUIselect( 'destroy' )
										.SUIselect({
											templateResult: format,
											templateSelection: formatSelection,
											escapeMarkup: function( markup ) {
												return markup;
											}
										})
										;
								} else {

									select
										.SUIselect( 'destroy' )
										.SUIselect({
											minimumResultsForSearch: -1,
											templateResult: format,
											templateSelection: formatSelection,
											escapeMarkup: function( markup ) {
												return markup;
											}
										})
										;
								}
							}

							// Remove search bar.
							if ( 'search' === $( this ).val() ) {

								select
									.SUIselect( 'destroy' )
									.SUIselect({
										minimumResultsForSearch: -1,
										templateResult: format,
										templateSelection: formatSelection,
										escapeMarkup: function( markup ) {
											return markup;
										}
									})
									;
							}
						}
					});
				}
			});
		}

		function multiSelect( select ) {

			var container = select.closest( '.showcase-component' ),
				options   = container.find( '.showcase-component-options' ),
				option    = options.find( 'fieldset' )
				;

			option.each( function() {

				self = $( this );

				if ( 'states' === $( this ).data( 'option' ) ) {

					option = $( this ).find( 'input[type="radio"]' );

					option.on( 'click', function() {

						if ( 'disabled' === $( this ).val() ) {
							select.attr( 'disabled', true );
						} else {
							select.attr( 'disabled', false );
							select.removeAttr( 'disabled' );
						}

						if ( 'error' === $( this ).val() ) {
							select.closest( '.sui-form-field' ).addClass( 'sui-form-field-error' );
							select.closest( '.sui-form-field' ).find( '.sui-error-message' ).removeAttr( 'hidden' );
							select.closest( '.sui-form-field' ).find( '.sui-error-message' ).removeClass( 'sui-hidden' );
							select.closest( '.sui-form-field' ).find( '.sui-error-message' ).text( 'This field is required. Please, pick an option before continuing.' );
						} else {
							select.closest( '.sui-form-field' ).removeClass( 'sui-form-field-error' );
							select.closest( '.sui-form-field' ).find( '.sui-error-message' ).attr( 'hidden' );
							select.closest( '.sui-form-field' ).find( '.sui-error-message' ).addClass( 'sui-hidden' );
							select.closest( '.sui-form-field' ).find( '.sui-error-message' ).empty();
						}
					});
				}

				if ( 'options' === $( this ).data( 'option' ) ) {

					option = $( this ).find( 'input[type="checkbox"]' );

					option.on( 'click', function() {

						if ( $( this ).is( ':checked' ) ) {

							// Add placeholder.
							if ( 'placeholder' === $( this ).val() ) {

								options = select.children().clone();

								select
									.attr( 'data-placeholder', 'Select Option' )
									.empty()
									.append( '<option></option>' )
									.append( options )
									;

								select
									.SUIselect( 'destroy' )
									.SUIselect()
									;
							}
						} else {

							// Remove placeholder.
							if ( 'placeholder' === $( this ).val() ) {

								select
									.removeAttr( 'data-placeholder' )
									.find( 'option' )
									.filter( function() {
										return ! this.value || 0 === $.trim( this.value ).length;
									})
									.remove()
									;

								select
									.SUIselect( 'destroy' )
									.SUIselect()
									;
							}
						}
					});
				}
			});
		}

		function smartSearch( select ) {

			var container = select.closest( '.showcase-component' ),
				options   = container.find( '.showcase-component-options' ),
				option    = options.find( 'fieldset' )
				;

			option.each( function() {

				self = $( this );

				if ( 'states' === $( this ).data( 'option' ) ) {

					option = $( this ).find( 'input[type="radio"]' );

					option.on( 'click', function() {

						if ( 'disabled' === $( this ).val() ) {
							select.attr( 'disabled', true );
						} else {
							select.attr( 'disabled', false );
							select.removeAttr( 'disabled' );
						}

						if ( 'error' === $( this ).val() ) {
							select.closest( '.sui-form-field' ).addClass( 'sui-form-field-error' );
							select.closest( '.sui-form-field' ).find( '.sui-error-message' ).removeAttr( 'hidden' );
							select.closest( '.sui-form-field' ).find( '.sui-error-message' ).removeClass( 'sui-hidden' );
							select.closest( '.sui-form-field' ).find( '.sui-error-message' ).text( 'This field is required. Please, pick an option before continuing.' );
						} else {
							select.closest( '.sui-form-field' ).removeClass( 'sui-form-field-error' );
							select.closest( '.sui-form-field' ).find( '.sui-error-message' ).attr( 'hidden' );
							select.closest( '.sui-form-field' ).find( '.sui-error-message' ).addClass( 'sui-hidden' );
							select.closest( '.sui-form-field' ).find( '.sui-error-message' ).empty();
						}
					});
				}

				if ( 'options' === $( this ).data( 'option' ) ) {

					option = $( this ).find( 'input[type="checkbox"]' );

					option.on( 'click', function() {

						if ( $( this ).is( ':checked' ) ) {

							// Add placeholder.
							if ( 'placeholder' === $( this ).val() ) {

								options = select.children().clone();

								select
									.attr( 'data-placeholder', 'Select Option' )
									.empty()
									.append( '<option></option>' )
									.append( options )
									;

								select
									.SUIselect( 'destroy' )
									.SUIselect({
										minimumInputLength: 2,
										maximumSelectionLength: 1
									})
									;
							}
						} else {

							// Remove placeholder.
							if ( 'placeholder' === $( this ).val() ) {

								select
									.removeAttr( 'data-placeholder' )
									.find( 'option' )
									.filter( function() {
										return ! this.value || 0 === $.trim( this.value ).length;
									})
									.remove()
									;

								select
									.SUIselect( 'destroy' )
									.SUIselect({
										minimumInputLength: 2,
										maximumSelectionLength: 1
									})
									;
							}
						}
					});
				}
			});
		}

		function init() {

			// DEMO: Single Select.
			singleSelect( $( '#single-select-demo' ) );
			singleSelect( $( '#single-select-icon-demo' ) );
			singleSelect( $( '#single-select-color-demo' ) );

			// DEMO: Multi Select.
			multiSelect( $( '#multi-select-demo' ) );

			// DEMO: Smart Search.
			smartSearch( $( '#smart-search-demo' ) );

		}

		init();

		return this;

	};

	// Call function on load.
	DEMO.pageSelect( 'select' );

}( jQuery ) );
