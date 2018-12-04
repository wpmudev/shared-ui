( function( $ ) {

	// Convert all select lists to fancy sui Select lists.
    if ( $( '.sui-color-accessible' )[0]) {
        $( '.sui-select' ).SUIselect2({
            dropdownCssClass: 'sui-select-dropdown sui-color-accessible'
        });
        $( '.sui-variables' ).SUIselect2({
            dropdownCssClass: 'sui-variables-dropdown sui-color-accessible'
        });
    } else {
        $( '.sui-select' ).SUIselect2({
            dropdownCssClass: 'sui-select-dropdown'
        });
        $( '.sui-variables' ).SUIselect2({
            dropdownCssClass: 'sui-variables-dropdown'
        });
    }

}( jQuery ) );
