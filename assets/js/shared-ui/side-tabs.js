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
			$span     = $this.parent( 'label > span' ),
			$data      = $this.data( 'tab-menu' ),
			$wrapper   = $this.closest( '.sui-side-tabs' ),
			$alllabels = $wrapper.find( '>.sui-tabs-menu .sui-tab-item' ),
			$allinputs = $alllabels.find( 'input' ),
			newContent
			;

		$this.on('load', function(){
			$alllabels.attr( 'aria-selected',false );
			$alllabels.first.prop( 'aria-selected',true );
			$wrapper.find( '.sui-tabs-content>div[data-tab-content]' ).prop( 'aria-selected',false );
			$wrapper.find( '.sui-tabs-content>div[data-tab-content]' ).first.prop( 'aria-selected',true );
		})
		$this.on( 'click', function( e ) {

			$alllabels.removeClass( 'active' );
			$allinputs.removeProp( 'checked' );
			$wrapper.find( '.sui-tabs-content>div[data-tab-content]' ).removeClass( 'active' );
			$wrapper.find( '.sui-tabs-content>div[data-tab-content]' ).prop( 'aria-selected',false );
			$alllabels.attr( 'aria-selected',false );

			$label.addClass( 'active' );
			//This is to resolve the issue(SUI-125->https://incsub.atlassian.net/browse/SUI-125) To activate parent element while even clicking on span(icon)
			$span.parent().addClass('active');
			$this.prop( 'checked', true );
			$label.prop( 'aria-selected',true );
			
			newContent = $wrapper.find( '.sui-tabs-content div[data-tab-content="' + $data + '"]' );

			if ( newContent.length ) {
				newContent.addClass( 'active' );
				newContent.prop( 'aria-selected',true );
			}
		});

	};

	$( 'SUI_BODY_CLASS .sui-side-tabs label.sui-tab-item input' ).each( function() {
		SUI.sideTabs( this );
	});

}( jQuery ) );