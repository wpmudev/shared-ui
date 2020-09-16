( function( $ ) {

	let formatOption = ( data, container ) => {

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

	let formatOptionSelection = ( data, container ) => {

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

	// Convert all select lists to fancy sui Select lists.
    if ( $( '.sui-color-accessible' )[0]) {
        $( '.sui-select' ).SUIselect2({
            dropdownCssClass: 'sui-select-dropdown sui-color-accessible'
		});
		$( '.sui-search' ).SUIselect2({
			minimumInputLength: 2,
			maximumSelectionLength: 1,
            dropdownCssClass: 'sui-search-dropdown sui-color-accessible'
		});
		$( '.sui-variables' ).SUIselect2({
            dropdownCssClass: 'sui-variables-dropdown sui-color-accessible'
		});
    } else {
        $( '.sui-select' ).SUIselect2({
			dropdownCssClass: 'sui-select-dropdown sui-wrap',
			templateResult: formatOption,
			templateSelection: formatOptionSelection,
			escapeMarkup: function( markup ) {
				return markup;
			}
		});
		$( '.sui-search' ).SUIselect2({
			minimumInputLength: 2,
			maximumSelectionLength: 1,
            dropdownCssClass: 'sui-search-dropdown'
		});
		$( '.sui-variables' ).SUIselect2({
            dropdownCssClass: 'sui-variables-dropdown'
		});
    }

}( jQuery ) );
