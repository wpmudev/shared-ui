( function( $ ) {

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	SUI.select = {};

	SUI.select.formatIcon = ( data, container ) => {

		let markup, border;

		const label = data.text;
		const icon  = $( data.element ).attr( 'data-icon' );
		const color = $( data.element ).attr( 'data-color' );

		if ( ! data.id ) {
			return label; // optgroup.
		}

		if ( 'undefined' !== typeof icon ) {
			markup = '<span class="sui-icon-' + icon.toLowerCase() + ' sui-md" aria-hidden="true"></span> ' + label;
		} else {
			markup = label;
		}

		return markup;

	};

	SUI.select.formatIconSelection = ( data, container ) => {

		let markup;

		const label = data.text;

		markup = label;

		return markup;

	};

	SUI.select.formatColor = ( data, container ) => {

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

	SUI.select.formatColorSelection = ( data, container ) => {

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

	SUI.select.formatVars = ( data, container ) => {

		let markup;

		const label = data.text;

		if ( ! data.id ) {
			return label; // optgroup.
		}

		markup = label;

		return markup;

	};

	SUI.select.formatVarsSelection = ( data, container ) => {

		let markup;

		const label = data.text;

		markup = label;

		return markup;

	};

	$( '.sui-select' ).each( function() {

		let select       = $( this ),
			getParent    = select.closest( '.sui-modal-content' ),
			getParentId  = getParent.attr( 'id' ),
			selectParent = ( getParent.length ) ? $( '#' + getParentId ) : $( document.body ),
			hasSearch    = ( 'true' === select.attr( 'data-search' ) ) ? 0 : -1;

		if ( 'icon' === select.data( 'theme' ) ) {

			select.SUIselect({
				dropdownParent: selectParent,
				templateResult: SUI.select.formatIcon,
				templateSelection: SUI.select.formatIconSelection,
				escapeMarkup: function( markup ) {
					return markup;
				},
				minimumResultsForSearch: hasSearch
			});
		} else if ( 'color' === select.data( 'theme' ) ) {

			select.SUIselect({
				dropdownParent: selectParent,
				templateResult: SUI.select.formatColor,
				templateSelection: SUI.select.formatColorSelection,
				escapeMarkup: function( markup ) {
					return markup;
				},
				minimumResultsForSearch: hasSearch
			});
		} else if ( 'search' === select.data( 'theme' ) ) {

			select.SUIselect({
				dropdownParent: selectParent,
				minimumInputLength: 2,
				maximumSelectionLength: 1
			});
		} else {

			select.SUIselect({
				dropdownParent: selectParent,
				templateResult: SUI.select.formatVars,
				templateSelection: SUI.select.formatVarsSelection,
				escapeMarkup: function( markup ) {
					return markup;
				},
				minimumResultsForSearch: hasSearch
			});
		}
	});
}( jQuery ) );
