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

		function singleSelect( select ) {

			let option, hasPlaceholder, hasSearch, selectOptions;

			select = $( select );

			const container = $( '#component-single-select' );
			const options   = container.find( '.showcase-component-options' );

			const fieldStates      = options.find( '[data-option="states"]' );
			const fieldPlaceholder = options.find( '#single-select-option--placeholder' );
			const fieldSearch      = options.find( '#single-select-option--search' );

			let format = '',
				formatSelection = '';

			if ( 'icon' === select.attr( 'data-theme' ) ) {
				format = SUI.select.formatIcon;
				formatSelection = SUI.select.formatIconSelection;
			} else if ( 'color' === select.attr( 'data-theme' ) ) {
				format = SUI.select.formatColor;
				formatSelection = SUI.select.formatColorSelection;
			}

			let isSmall = false;

			if ( select.hasClass( 'sui-select-sm' ) ) {
				isSmall = true;
			}

			// OPTIONS: States.
			fieldStates.find( 'input' ).on( 'click', function() {

				option = $( this );

				// Add "disabled" attribute.
				if ( 'disabled' === option.val() ) {
					select.attr( 'disabled', true );
				} else {
					select.removeAttr( 'disabled' );
				}

				// Add "error" class.
				if ( 'error' === option.val() ) {
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

			// OPTIONS: Placeholder.
			fieldPlaceholder.on( 'click', function() {

				option    = $( this );
				hasSearch = ( fieldSearch.is( ':checked' ) ) ? true : false;

				if ( option.is( ':checked' ) ) {

					// Copy select options.
					selectOptions = select.children().clone();

					select
						.attr( 'data-placeholder', 'Placeholder' ) // Add placeholder attribute.
						.empty() // Empty select options.
						.append( '<option></option>' ) // Add empty option to select.
						.append( selectOptions ) // Paste original options to select.
						;

					// Destroy SUIselect.
					select.SUIselect( 'destroy' );

					// Init SUIselect.
					if ( true === hasSearch ) {

						if ( '' !== format ) {

							if ( true === isSmall ) {

								select.SUIselect({
									dropdownCssClass: 'sui-dropdown-sm',
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							} else {

								select.SUIselect({
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							}
						} else {

							if ( true === isSmall ) {
								select.SUIselect({
									dropdownCssClass: 'sui-dropdown-sm'
								});
							} else {
								select.SUIselect();
							}
						}
					} else {

						if ( '' !== format ) {

							if ( true === isSmall ) {

								select.SUIselect({
									minimumResultsForSearch: Infinity,
									dropdownCssClass: 'sui-dropdown-sm',
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							} else {

								select.SUIselect({
									minimumResultsForSearch: Infinity,
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							}
						} else {

							if ( true === isSmall ) {
								select.SUIselect({
									minimumResultsForSearch: Infinity,
									dropdownCssClass: 'sui-dropdown-sm'
								});
							} else {
								select.SUIselect({
									minimumResultsForSearch: Infinity
								});
							}
						}
					}
				} else {

					select
						.removeAttr( 'data-placeholder' ) // Remove placeholder attribute.
						.find( 'option' )
						.filter( function() {
							return ! this.value || 0 === $.trim( this.value ).length;
						})
						.remove()
						;

					// Destroy SUIselect.
					select.SUIselect( 'destroy' );

					// Init SUIselect.
					if ( true === hasSearch ) {

						if ( '' !== format ) {

							if ( isSmall ) {

								select.SUIselect({
									dropdownCssClass: 'sui-dropdown-sm',
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							} else {

								select.SUIselect({
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							}
						} else {

							if ( isSmall ) {
								select.SUIselect({
									dropdownCssClass: 'sui-dropdown-sm'
								});
							} else {
								select.SUIselect();
							}
						}
					} else {

						if ( '' !== format ) {

							if ( true === isSmall ) {

								select.SUIselect({
									minimumResultsForSearch: Infinity,
									dropdownCssClass: 'sui-dropdown-sm',
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							} else {

								select.SUIselect({
									minimumResultsForSearch: Infinity,
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							}
						} else {

							if ( isSmall ) {
								select.SUIselect({
									minimumResultsForSearch: Infinity,
									dropdownCssClass: 'sui-dropdown-sm'
								});
							} else {
								select.SUIselect({
									minimumResultsForSearch: Infinity
								});
							}
						}
					}
				}
			});

			// OPTIONS: Search List.
			fieldSearch.on( 'click', function() {

				option         = $( this );
				hasPlaceholder = ( fieldPlaceholder.is( ':checked' ) ) ? true : false;

				if ( option.is( ':checked' ) ) {

					if ( true === hasPlaceholder ) {

						// Copy select options.
						selectOptions = select.children().clone();

						select
							.attr( 'data-placeholder', 'Placeholder' ) // Add placeholder attribute.
							.empty() // Empty select options.
							.append( '<option></option>' ) // Add empty option to select.
							.append( selectOptions ) // Paste original options to select.
							;

					} else {

						select
							.removeAttr( 'data-placeholder' ) // Remove placeholder attribute.
							.find( 'option' )
							.filter( function() {
								return ! this.value || 0 === $.trim( this.value ).length;
							})
							.remove()
							;

					}

					// Destroy SUIselect.
					select.SUIselect( 'destroy' );

					if ( '' !== format ) {

						if ( true === isSmall ) {

							select.SUIselect({
								dropdownCssClass: 'sui-dropdown-sm',
								templateResult: format,
								templateSelection: formatSelection,
								escapeMarkup: function( markup ) {
									return markup;
								}
							});
						} else {

							select.SUIselect({
								templateResult: format,
								templateSelection: formatSelection,
								escapeMarkup: function( markup ) {
									return markup;
								}
							});
						}
					} else {

						if ( true === isSmall ) {
							select.SUIselect({
								dropdownCssClass: 'sui-dropdown-sm'
							});
						} else {
							select.SUIselect();
						}
					}
				} else {

					if ( true === hasPlaceholder ) {

						// Copy select options.
						selectOptions = select.children().clone();

						select
							.attr( 'data-placeholder', 'Placeholder' ) // Add placeholder attribute.
							.empty() // Empty select options.
							.append( '<option></option>' ) // Add empty option to select.
							.append( selectOptions ) // Paste original options to select.
							;

					} else {

						select
							.removeAttr( 'data-placeholder' ) // Remove placeholder attribute.
							.find( 'option' )
							.filter( function() {
								return ! this.value || 0 === $.trim( this.value ).length;
							})
							.remove()
							;

					}

					// Destroy SUIselect.
					select.SUIselect( 'destroy' );

					if ( '' !== format ) {

						if ( true === isSmall ) {

							select.SUIselect({
								minimumResultsForSearch: Infinity,
								dropdownCssClass: 'sui-dropdown-sm',
								templateResult: format,
								templateSelection: formatSelection,
								escapeMarkup: function( markup ) {
									return markup;
								}
							});
						} else {

							select.SUIselect({
								minimumResultsForSearch: Infinity,
								templateResult: format,
								templateSelection: formatSelection,
								escapeMarkup: function( markup ) {
									return markup;
								}
							});
						}
					} else {

						if ( true === isSmall ) {
							select.SUIselect({
								minimumResultsForSearch: Infinity,
								dropdownCssClass: 'sui-dropdown-sm'
							});
						} else {
							select.SUIselect({
								minimumResultsForSearch: Infinity
							});
						}
					}
				}
			});
		}

		function singleSelectIcon( select ) {

			let option, hasPlaceholder, hasSearch, selectOptions;

			select = $( select );

			const container = $( '#component-single-select-icon' );
			const options   = container.find( '.showcase-component-options' );

			const fieldStates      = options.find( '[data-option="states"]' );
			const fieldPlaceholder = options.find( '#single-select-icon-option--placeholder' );
			const fieldSearch      = options.find( '#single-select-icon-option--search' );

			let format = '',
				formatSelection = '';

			if ( 'icon' === select.attr( 'data-theme' ) ) {
				format = SUI.select.formatIcon;
				formatSelection = SUI.select.formatIconSelection;
			} else if ( 'color' === select.attr( 'data-theme' ) ) {
				format = SUI.select.formatColor;
				formatSelection = SUI.select.formatColorSelection;
			}

			let isSmall = false;

			if ( select.hasClass( 'sui-select-sm' ) ) {
				isSmall = true;
			}

			// OPTIONS: States.
			fieldStates.find( 'input' ).on( 'click', function() {

				option = $( this );

				// Add "disabled" attribute.
				if ( 'disabled' === option.val() ) {
					select.attr( 'disabled', true );
				} else {
					select.removeAttr( 'disabled' );
				}

				// Add "error" class.
				if ( 'error' === option.val() ) {
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

			// OPTIONS: Placeholder.
			fieldPlaceholder.on( 'click', function() {

				option    = $( this );
				hasSearch = ( fieldSearch.is( ':checked' ) ) ? true : false;

				if ( option.is( ':checked' ) ) {

					// Copy select options.
					selectOptions = select.children().clone();

					select
						.attr( 'data-placeholder', 'Placeholder' ) // Add placeholder attribute.
						.empty() // Empty select options.
						.append( '<option></option>' ) // Add empty option to select.
						.append( selectOptions ) // Paste original options to select.
						;

					// Destroy SUIselect.
					select.SUIselect( 'destroy' );

					// Init SUIselect.
					if ( true === hasSearch ) {

						if ( '' !== format ) {

							if ( true === isSmall ) {

								select.SUIselect({
									dropdownCssClass: 'sui-dropdown-sm',
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							} else {

								select.SUIselect({
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							}
						} else {

							if ( true === isSmall ) {
								select.SUIselect({
									dropdownCssClass: 'sui-dropdown-sm'
								});
							} else {
								select.SUIselect();
							}
						}
					} else {

						if ( '' !== format ) {

							if ( true === isSmall ) {

								select.SUIselect({
									minimumResultsForSearch: Infinity,
									dropdownCssClass: 'sui-dropdown-sm',
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							} else {

								select.SUIselect({
									minimumResultsForSearch: Infinity,
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							}
						} else {

							if ( true === isSmall ) {
								select.SUIselect({
									minimumResultsForSearch: Infinity,
									dropdownCssClass: 'sui-dropdown-sm'
								});
							} else {
								select.SUIselect({
									minimumResultsForSearch: Infinity
								});
							}
						}
					}
				} else {

					select
						.removeAttr( 'data-placeholder' ) // Remove placeholder attribute.
						.find( 'option' )
						.filter( function() {
							return ! this.value || 0 === $.trim( this.value ).length;
						})
						.remove()
						;

					// Destroy SUIselect.
					select.SUIselect( 'destroy' );

					// Init SUIselect.
					if ( true === hasSearch ) {

						if ( '' !== format ) {

							if ( isSmall ) {

								select.SUIselect({
									dropdownCssClass: 'sui-dropdown-sm',
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							} else {

								select.SUIselect({
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							}
						} else {

							if ( isSmall ) {
								select.SUIselect({
									dropdownCssClass: 'sui-dropdown-sm'
								});
							} else {
								select.SUIselect();
							}
						}
					} else {

						if ( '' !== format ) {

							if ( true === isSmall ) {

								select.SUIselect({
									minimumResultsForSearch: Infinity,
									dropdownCssClass: 'sui-dropdown-sm',
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							} else {

								select.SUIselect({
									minimumResultsForSearch: Infinity,
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							}
						} else {

							if ( isSmall ) {
								select.SUIselect({
									minimumResultsForSearch: Infinity,
									dropdownCssClass: 'sui-dropdown-sm'
								});
							} else {
								select.SUIselect({
									minimumResultsForSearch: Infinity
								});
							}
						}
					}
				}
			});

			// OPTIONS: Search List.
			fieldSearch.on( 'click', function() {

				option         = $( this );
				hasPlaceholder = ( fieldPlaceholder.is( ':checked' ) ) ? true : false;

				if ( option.is( ':checked' ) ) {

					if ( true === hasPlaceholder ) {

						// Copy select options.
						selectOptions = select.children().clone();

						select
							.attr( 'data-placeholder', 'Placeholder' ) // Add placeholder attribute.
							.empty() // Empty select options.
							.append( '<option></option>' ) // Add empty option to select.
							.append( selectOptions ) // Paste original options to select.
							;

					} else {

						select
							.removeAttr( 'data-placeholder' ) // Remove placeholder attribute.
							.find( 'option' )
							.filter( function() {
								return ! this.value || 0 === $.trim( this.value ).length;
							})
							.remove()
							;

					}

					// Destroy SUIselect.
					select.SUIselect( 'destroy' );

					if ( '' !== format ) {

						if ( true === isSmall ) {

							select.SUIselect({
								dropdownCssClass: 'sui-dropdown-sm',
								templateResult: format,
								templateSelection: formatSelection,
								escapeMarkup: function( markup ) {
									return markup;
								}
							});
						} else {

							select.SUIselect({
								templateResult: format,
								templateSelection: formatSelection,
								escapeMarkup: function( markup ) {
									return markup;
								}
							});
						}
					} else {

						if ( true === isSmall ) {
							select.SUIselect({
								dropdownCssClass: 'sui-dropdown-sm'
							});
						} else {
							select.SUIselect();
						}
					}
				} else {

					if ( true === hasPlaceholder ) {

						// Copy select options.
						selectOptions = select.children().clone();

						select
							.attr( 'data-placeholder', 'Placeholder' ) // Add placeholder attribute.
							.empty() // Empty select options.
							.append( '<option></option>' ) // Add empty option to select.
							.append( selectOptions ) // Paste original options to select.
							;

					} else {

						select
							.removeAttr( 'data-placeholder' ) // Remove placeholder attribute.
							.find( 'option' )
							.filter( function() {
								return ! this.value || 0 === $.trim( this.value ).length;
							})
							.remove()
							;

					}

					// Destroy SUIselect.
					select.SUIselect( 'destroy' );

					if ( '' !== format ) {

						if ( true === isSmall ) {

							select.SUIselect({
								minimumResultsForSearch: Infinity,
								dropdownCssClass: 'sui-dropdown-sm',
								templateResult: format,
								templateSelection: formatSelection,
								escapeMarkup: function( markup ) {
									return markup;
								}
							});
						} else {

							select.SUIselect({
								minimumResultsForSearch: Infinity,
								templateResult: format,
								templateSelection: formatSelection,
								escapeMarkup: function( markup ) {
									return markup;
								}
							});
						}
					} else {

						if ( true === isSmall ) {
							select.SUIselect({
								minimumResultsForSearch: Infinity,
								dropdownCssClass: 'sui-dropdown-sm'
							});
						} else {
							select.SUIselect({
								minimumResultsForSearch: Infinity
							});
						}
					}
				}
			});
		}

		function singleSelectColor( select ) {

			let option, hasPlaceholder, hasSearch, selectOptions;

			select = $( select );

			const container = $( '#component-single-select-color' );
			const options   = container.find( '.showcase-component-options' );

			const fieldStates      = options.find( '[data-option="states"]' );
			const fieldPlaceholder = options.find( '#single-select-color-option--placeholder' );
			const fieldSearch      = options.find( '#single-select-color-option--search' );

			let format = '',
				formatSelection = '';

			if ( 'icon' === select.attr( 'data-theme' ) ) {
				format = SUI.select.formatIcon;
				formatSelection = SUI.select.formatIconSelection;
			} else if ( 'color' === select.attr( 'data-theme' ) ) {
				format = SUI.select.formatColor;
				formatSelection = SUI.select.formatColorSelection;
			}

			let isSmall = false;

			if ( select.hasClass( 'sui-select-sm' ) ) {
				isSmall = true;
			}

			// OPTIONS: States.
			fieldStates.find( 'input' ).on( 'click', function() {

				option = $( this );

				// Add "disabled" attribute.
				if ( 'disabled' === option.val() ) {
					select.attr( 'disabled', true );
				} else {
					select.removeAttr( 'disabled' );
				}

				// Add "error" class.
				if ( 'error' === option.val() ) {
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

			// OPTIONS: Placeholder.
			fieldPlaceholder.on( 'click', function() {

				option    = $( this );
				hasSearch = ( fieldSearch.is( ':checked' ) ) ? true : false;

				if ( option.is( ':checked' ) ) {

					// Copy select options.
					selectOptions = select.children().clone();

					select
						.attr( 'data-placeholder', 'Placeholder' ) // Add placeholder attribute.
						.empty() // Empty select options.
						.append( '<option></option>' ) // Add empty option to select.
						.append( selectOptions ) // Paste original options to select.
						;

					// Destroy SUIselect.
					select.SUIselect( 'destroy' );

					// Init SUIselect.
					if ( true === hasSearch ) {

						if ( '' !== format ) {

							if ( true === isSmall ) {

								select.SUIselect({
									dropdownCssClass: 'sui-dropdown-sm',
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							} else {

								select.SUIselect({
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							}
						} else {

							if ( true === isSmall ) {
								select.SUIselect({
									dropdownCssClass: 'sui-dropdown-sm'
								});
							} else {
								select.SUIselect();
							}
						}
					} else {

						if ( '' !== format ) {

							if ( true === isSmall ) {

								select.SUIselect({
									minimumResultsForSearch: Infinity,
									dropdownCssClass: 'sui-dropdown-sm',
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							} else {

								select.SUIselect({
									minimumResultsForSearch: Infinity,
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							}
						} else {

							if ( true === isSmall ) {
								select.SUIselect({
									minimumResultsForSearch: Infinity,
									dropdownCssClass: 'sui-dropdown-sm'
								});
							} else {
								select.SUIselect({
									minimumResultsForSearch: Infinity
								});
							}
						}
					}
				} else {

					select
						.removeAttr( 'data-placeholder' ) // Remove placeholder attribute.
						.find( 'option' )
						.filter( function() {
							return ! this.value || 0 === $.trim( this.value ).length;
						})
						.remove()
						;

					// Destroy SUIselect.
					select.SUIselect( 'destroy' );

					// Init SUIselect.
					if ( true === hasSearch ) {

						if ( '' !== format ) {

							if ( isSmall ) {

								select.SUIselect({
									dropdownCssClass: 'sui-dropdown-sm',
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							} else {

								select.SUIselect({
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							}
						} else {

							if ( isSmall ) {
								select.SUIselect({
									dropdownCssClass: 'sui-dropdown-sm'
								});
							} else {
								select.SUIselect();
							}
						}
					} else {

						if ( '' !== format ) {

							if ( true === isSmall ) {

								select.SUIselect({
									minimumResultsForSearch: Infinity,
									dropdownCssClass: 'sui-dropdown-sm',
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							} else {

								select.SUIselect({
									minimumResultsForSearch: Infinity,
									templateResult: format,
									templateSelection: formatSelection,
									escapeMarkup: function( markup ) {
										return markup;
									}
								});
							}
						} else {

							if ( isSmall ) {
								select.SUIselect({
									minimumResultsForSearch: Infinity,
									dropdownCssClass: 'sui-dropdown-sm'
								});
							} else {
								select.SUIselect({
									minimumResultsForSearch: Infinity
								});
							}
						}
					}
				}
			});

			// OPTIONS: Search List.
			fieldSearch.on( 'click', function() {

				option         = $( this );
				hasPlaceholder = ( fieldPlaceholder.is( ':checked' ) ) ? true : false;

				if ( option.is( ':checked' ) ) {

					if ( true === hasPlaceholder ) {

						// Copy select options.
						selectOptions = select.children().clone();

						select
							.attr( 'data-placeholder', 'Placeholder' ) // Add placeholder attribute.
							.empty() // Empty select options.
							.append( '<option></option>' ) // Add empty option to select.
							.append( selectOptions ) // Paste original options to select.
							;

					} else {

						select
							.removeAttr( 'data-placeholder' ) // Remove placeholder attribute.
							.find( 'option' )
							.filter( function() {
								return ! this.value || 0 === $.trim( this.value ).length;
							})
							.remove()
							;

					}

					// Destroy SUIselect.
					select.SUIselect( 'destroy' );

					if ( '' !== format ) {

						if ( true === isSmall ) {

							select.SUIselect({
								dropdownCssClass: 'sui-dropdown-sm',
								templateResult: format,
								templateSelection: formatSelection,
								escapeMarkup: function( markup ) {
									return markup;
								}
							});
						} else {

							select.SUIselect({
								templateResult: format,
								templateSelection: formatSelection,
								escapeMarkup: function( markup ) {
									return markup;
								}
							});
						}
					} else {

						if ( true === isSmall ) {
							select.SUIselect({
								dropdownCssClass: 'sui-dropdown-sm'
							});
						} else {
							select.SUIselect();
						}
					}
				} else {

					if ( true === hasPlaceholder ) {

						// Copy select options.
						selectOptions = select.children().clone();

						select
							.attr( 'data-placeholder', 'Placeholder' ) // Add placeholder attribute.
							.empty() // Empty select options.
							.append( '<option></option>' ) // Add empty option to select.
							.append( selectOptions ) // Paste original options to select.
							;

					} else {

						select
							.removeAttr( 'data-placeholder' ) // Remove placeholder attribute.
							.find( 'option' )
							.filter( function() {
								return ! this.value || 0 === $.trim( this.value ).length;
							})
							.remove()
							;

					}

					// Destroy SUIselect.
					select.SUIselect( 'destroy' );

					if ( '' !== format ) {

						if ( true === isSmall ) {

							select.SUIselect({
								minimumResultsForSearch: Infinity,
								dropdownCssClass: 'sui-dropdown-sm',
								templateResult: format,
								templateSelection: formatSelection,
								escapeMarkup: function( markup ) {
									return markup;
								}
							});
						} else {

							select.SUIselect({
								minimumResultsForSearch: Infinity,
								templateResult: format,
								templateSelection: formatSelection,
								escapeMarkup: function( markup ) {
									return markup;
								}
							});
						}
					} else {

						if ( true === isSmall ) {
							select.SUIselect({
								minimumResultsForSearch: Infinity,
								dropdownCssClass: 'sui-dropdown-sm'
							});
						} else {
							select.SUIselect({
								minimumResultsForSearch: Infinity
							});
						}
					}
				}
			});
		}

		function init() {

			// DEMO: Single Select.
			singleSelect( '#single-select-demo' );
			singleSelectIcon( '#single-select-icon-demo' );
			singleSelectColor( '#single-select-color-demo' );

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
