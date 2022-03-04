;( function( $ ) {

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	SUI.select = {};

	SUI.select.formatIcon = ( data, container ) => {

		let markup;

		const label = data.text;
		const icon  = $( data.element ).attr( 'data-icon' );

		if ( ! data.id ) {
			return label; // optgroup.
		}

		if ( 'undefined' !== typeof icon ) {
			markup = '<span class="sui-icon-' + icon.toLowerCase() + '" aria-hidden="true"></span> ' + label;
		} else {
			markup = label;
		}

		return markup;

	};

	SUI.select.formatIconSelection = ( data, container ) => {

		let markup;

		const label = data.text;
		const icon  = $( data.element ).attr( 'data-icon' );

		if ( 'undefined' !== typeof icon ) {
			markup = '<span class="sui-icon-' + icon.toLowerCase() + '" aria-hidden="true"></span> ' + label;
		} else {
			markup = label;
		}

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

				case '#FAFAFA' :
				case '#F8F8F8' :
				case '#F2F2F2' :
					border = '#333';
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

				case '#FAFAFA' :
				case '#F8F8F8' :
				case '#F2F2F2' :
					border = '#333';
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

		const label   = data.text;
		const content = $( data.element ).val();

		if ( ! data.id ) {
			return label; // optgroup.
		}

		if ( 'undefined' !== typeof content ) {
			markup = '<span class="sui-variable-name">' + label + '</span><span class="sui-variable-value">' + content + '</span> ';
		} else {
			markup = label;
		}

		return markup;

	};

	SUI.select.formatVarsSelection = ( data, container ) => {

		let markup;

		const label = data.text;

		markup  = '<span class="sui-icon-plus-circle sui-md" aria-hidden="true"></span>';
		markup += '<span class="sui-screen-reader-text">' + label + '</span>';

		return markup;

	};

	SUI.select.init = ( select ) => {

		let getParent    = select.closest( '.sui-modal-content' ),
			getParentId  = getParent.attr( 'id' ),
			selectParent = ( getParent.length ) ? $( '#' + getParentId ) : $( 'SUI_BODY_CLASS' ),
			hasSearch    = ( 'true' === select.attr( 'data-search' ) ) ? 0 : -1,
			isSmall      = select.hasClass( 'sui-select-sm' ) ? 'sui-select-dropdown-sm' : '';

		select.SUIselect2({
			dropdownParent: selectParent,
			minimumResultsForSearch: hasSearch,
			dropdownCssClass: isSmall
		});
	};

	SUI.select.initIcon = ( select ) => {

		let getParent    = select.closest( '.sui-modal-content' ),
			getParentId  = getParent.attr( 'id' ),
			selectParent = ( getParent.length ) ? $( '#' + getParentId ) : $( 'SUI_BODY_CLASS' ),
			hasSearch    = ( 'true' === select.attr( 'data-search' ) ) ? 0 : -1,
			isSmall      = select.hasClass( 'sui-select-sm' ) ? 'sui-select-dropdown-sm' : '';

		select.SUIselect2({
			dropdownParent: selectParent,
			templateResult: SUI.select.formatIcon,
			templateSelection: SUI.select.formatIconSelection,
			escapeMarkup: function( markup ) {
				return markup;
			},
			minimumResultsForSearch: hasSearch,
			dropdownCssClass: isSmall
		});
	};

	SUI.select.initColor = ( select ) => {

		let getParent    = select.closest( '.sui-modal-content' ),
			getParentId  = getParent.attr( 'id' ),
			selectParent = ( getParent.length ) ? $( '#' + getParentId ) : $( 'SUI_BODY_CLASS' ),
			hasSearch    = ( 'true' === select.attr( 'data-search' ) ) ? 0 : -1,
			isSmall      = select.hasClass( 'sui-select-sm' ) ? 'sui-select-dropdown-sm' : '';

		select.SUIselect2({
			dropdownParent: selectParent,
			templateResult: SUI.select.formatColor,
			templateSelection: SUI.select.formatColorSelection,
			escapeMarkup: function( markup ) {
				return markup;
			},
			minimumResultsForSearch: hasSearch,
			dropdownCssClass: isSmall
		});
	};

	SUI.select.initSearch = ( select ) => {

		let getParent    = select.closest( '.sui-modal-content' ),
			getParentId  = getParent.attr( 'id' ),
			selectParent = ( getParent.length ) ? $( '#' + getParentId ) : $( 'SUI_BODY_CLASS' ),
			isSmall      = select.hasClass( 'sui-select-sm' ) ? 'sui-select-dropdown-sm' : '';

		select.SUIselect2({
			dropdownParent: selectParent,
			minimumInputLength: 2,
			maximumSelectionLength: 1,
			dropdownCssClass: isSmall
		});
	};

	SUI.select.initVars = ( select ) => {

		let getParent    = select.closest( '.sui-modal-content' ),
			getParentId  = getParent.attr( 'id' ),
			selectParent = ( getParent.length ) ? $( '#' + getParentId ) : $( 'SUI_BODY_CLASS' ),
			hasSearch    = ( 'true' === select.attr( 'data-search' ) ) ? 0 : -1;

		select.SUIselect2({
			theme: 'vars',
			dropdownParent: selectParent,
			templateResult: SUI.select.formatVars,
			templateSelection: SUI.select.formatVarsSelection,
			escapeMarkup: function( markup ) {
				return markup;
			},
			minimumResultsForSearch: hasSearch
		});
	};

	$( '.sui-select' ).each( function() {

		let select = $( this );

		if ( 'icon' === select.data( 'theme' ) ) {
			SUI.select.initIcon( select );
		} else if ( 'color' === select.data( 'theme' ) ) {
			SUI.select.initColor( select );
		} else if ( 'search' === select.data( 'theme' ) ) {
			SUI.select.initSearch( select );
		} else {
			SUI.select.init( select );
		}
	});

	$( '.sui-variables' ).each( function() {

		let select = $( this );

		SUI.select.initVars( select );

	});
}( jQuery ) );
