( function( $ ) {

	// Enable strict mode
	'use strict';

	// Define global SUI object if it doesn't exist
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	SUI.sideTabs = function( element ) {

		var $this 	   = $( element ),
			$label     = $this.parent( 'label' ),
			$data      = $this.data( 'tab-menu' ),
			$wrapper   = $this.closest( '.sui-side-tabs' ),
			$alllabels = $wrapper.find( '>.sui-tabs-menu .sui-tab-item' ),
			$allinputs = $alllabels.find( 'input' ),
			newContent
			;

		$this.on( 'click', function( e ) {
			$alllabels.removeClass( 'active' );
			$allinputs.attr( 'checked', false );
			$alllabels.attr( 'aria-selected', false );
			$wrapper.find( '> .sui-tabs-content > div[data-tab-content]' ).removeClass( 'active' );

			$label.addClass( 'active' );
			$this.attr( 'checked', true );
			$label.attr( 'aria-selected', true );

			newContent = $wrapper.find( '.sui-tabs-content div[data-tab-content="' + $data + '"]' );

			if ( newContent.length ) {
				newContent.addClass( 'active' );
			}
		});


	};


	$( 'SUI_BODY_CLASS .sui-side-tabs label.sui-tab-item input' ).each( function() {
		SUI.sideTabs( this );
	});

}( jQuery ) );