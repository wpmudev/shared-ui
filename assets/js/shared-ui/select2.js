( function( $ ) {

	// Convert all select lists to fancy sui Select lists.
    if ( $( '.sui-color-accessible' )[0]) {
        $( '.sui-select2' ).SUIselect2({
			placeholder: function() {
				$( this ).data( 'placeholder' );
			},
            dropdownCssClass: 'sui-select-dropdown sui-color-accessible'
		});
		$( '.sui-search' ).SUIselect2({
			placeholder: function() {
				$( this ).data( 'placeholder' );
			},
			minimumInputLength: 2,
			maximumSelectionLength: 1,
            dropdownCssClass: 'sui-search-dropdown sui-color-accessible'
		});
		$( '.sui-variables' ).SUIselect2({
            dropdownCssClass: 'sui-variables-dropdown sui-color-accessible'
		});
    } else {
        $( '.sui-select2' ).SUIselect2({
			placeholder: function() {
				$( this ).data( 'placeholder' );
			},
            dropdownCssClass: 'sui-select-dropdown'
		});
		$( '.sui-search' ).SUIselect2({
			placeholder: function() {
				$( this ).data( 'placeholder' );
			},
			minimumInputLength: 2,
			maximumSelectionLength: 1,
            dropdownCssClass: 'sui-search-dropdown'
		});
		$( '.sui-variables' ).SUIselect2({
            dropdownCssClass: 'sui-variables-dropdown'
		});
    }

}( jQuery ) );
