( function( $ ) {

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	// Load SUIselect2 function.
	SUI.loadSelect = SUI.loadSelect || true;

	let formatIcon = ( data, container ) => {

		let markup, border;

		const label = data.text;
		const icon  = $( data.element ).attr( 'data-icon' );
		const color = $( data.element ).attr( 'data-color' );

		if ( ! data.id ) {
			return label; // optgroup.
		}

		if ( 'undefined' !== typeof icon ) {
			markup = '<span class="sui-icon-' + icon.toLowerCase() + '" aria-hidden="true"></span> ' + label;
		} else if ( 'undefined' !== typeof color ) {

			switch ( color ) {

				case '#FFF' :
				case 'white' :
				case '#FFFFFF' :
					border = '#000';
					break;

				default :
					border = color;
					break;
			}

			markup = '<span class="sui-color" style="border-color: ' + border + '; background-color: ' + color + ';" aria-hidden="true"></span> ' + label;
		} else {
			markup = label;
		}

		return markup;

	};

	let formatIconSelection = ( data, container ) => {

		let markup;

		const label = data.text;

		markup = label;

		return markup;

	};

	let formatColor = ( data, container ) => {

		let markup, border;

		const label = data.text;
		const color = $( data.element ).attr( 'data-color' );

		if ( ! data.id ) {
			return label; // optgroup.
		}

		if ( 'undefined' !== typeof color ) {

			switch ( color ) {

				case '#FFF' :
				case 'white' :
				case '#FFFFFF' :
					border = '#000';
					break;

				default :
					border = color;
					break;
			}

			markup = '<span class="sui-color" style="border-color: ' + border + '; background-color: ' + color + ';" aria-hidden="true"></span> ' + label;
		} else {
			markup = label;
		}

		return markup;

	};

	let formatColorSelection = ( data, container ) => {

		let markup;

		const label = data.text;
		const color = $( data.element ).attr( 'data-color' );

		if ( 'undefined' !== typeof color ) {

			switch ( color ) {

				case '#FFF' :
				case 'white' :
				case '#FFFFFF' :
					border = '#000';
					break;

				default :
					border = color;
					break;
			}

			markup = '<span class="sui-color" style="border-color: ' + border + '; background-color: ' + color + ';" aria-hidden="true"></span> ' + label;
		} else {
			markup = label;
		}

		return markup;

	};

	let formatVars = ( data, container ) => {

		let markup;

		const label = data.text;

		if ( ! data.id ) {
			return label; // optgroup.
		}

		markup = label;

		return markup;

	};

	let formatVarsSelection = ( data, container ) => {

		let markup;

		const label = data.text;

		markup = label;

		return markup;

	};

	if ( SUI.loadSelect ) {

		// Default.
		$( '.sui-select:not([data-search="true"]):not([data-theme])' ).SUIselect2({
			minimumResultsForSearch: Infinity
		});

		// Default + search input.
		$( '.sui-select[data-search="true"]:not([data-theme])' ).SUIselect2();

		// Select with icons.
		$( '.sui-select[data-theme="icon"]:not([data-search="true"])' ).SUIselect2({
			templateResult: formatIcon,
			templateSelection: formatIconSelection,
			escapeMarkup: function( markup ) {
				return markup;
			},
			minimumResultsForSearch: Infinity
		});

		// Select with icons + search input.
		$( '.sui-select[data-theme="icon"][data-search="true"]' ).SUIselect2({
			templateResult: formatIcon,
			templateSelection: formatIconSelection,
			escapeMarkup: function( markup ) {
				return markup;
			}
		});

		// Select with colors.
		$( '.sui-select[data-theme="color"]:not([data-search="true"])' ).SUIselect2({
			templateResult: formatColor,
			templateSelection: formatColorSelection,
			escapeMarkup: function( markup ) {
				return markup;
			},
			minimumResultsForSearch: Infinity
		});

		// Select with colors + search input.
		$( '.sui-select[data-theme="color"][data-search="true"]' ).SUIselect2({
			templateResult: formatColor,
			templateSelection: formatColorSelection,
			escapeMarkup: function( markup ) {
				return markup;
			}
		});

		// Insert variables.
		$( '.sui-select[data-theme="vars"]:not([data-search="true"])' ).SUIselect2({
			templateResult: formatVars,
			templateSelection: formatVarsSelection,
			escapeMarkup: function( markup ) {
				return markup;
			},
			minimumResultsForSearch: Infinity
		});

		// Insert variables.
		$( '.sui-select[data-theme="vars"][data-search="true"]' ).SUIselect2({
			templateResult: formatVars,
			templateSelection: formatVarsSelection,
			escapeMarkup: function( markup ) {
				return markup;
			}
		});

		// Smart search.
		$( '.sui-select[data-theme="search"]' ).SUIselect2({
			minimumInputLength: 2,
			maximumSelectionLength: 1
		});
	}

	// Convert all select lists to fancy sui Select lists.
    // if ( $( '.sui-color-accessible' )[0]) {

    //     $( '.sui-select' ).SUIselect2({
    //         dropdownCssClass: 'sui-select-dropdown sui-color-accessible'
	// 	});

	// 	$( '.sui-search' ).SUIselect2({
	// 		minimumInputLength: 2,
	// 		maximumSelectionLength: 1,
    //         dropdownCssClass: 'sui-search-dropdown sui-color-accessible'
	// 	});

	// 	$( '.sui-variables' ).SUIselect2({
    //         dropdownCssClass: 'sui-variables-dropdown sui-color-accessible'
	// 	});
    // } else {

    //     $( '.sui-select' ).SUIselect2({
	// 		templateResult: formatOption,
	// 		templateSelection: formatOptionSelection,
	// 		escapeMarkup: function( markup ) {
	// 			return markup;
	// 		}
	// 	});

	// 	$( '.sui-search' ).SUIselect2({
	// 		minimumInputLength: 2,
	// 		maximumSelectionLength: 1,
    //         dropdownCssClass: 'sui-search-dropdown'
	// 	});

	// 	$( '.sui-variables' ).SUIselect2({
    //         dropdownCssClass: 'sui-variables-dropdown'
	// 	});
    // }

}( jQuery ) );
