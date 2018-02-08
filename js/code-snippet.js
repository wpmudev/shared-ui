( function( $ ) {

	$( 'SUI_BODY_CLASS .sui-code-snippet:not(.sui-no-copy)' ).each( function( i ) {
		var id = 'sui-code-snippet-' + i,
			button = '<button class="sui-button" data-clipboard-target="#' + id + '">Copy</button>';

		$( this ).wrap( '<div class="sui-code-snippet-wrapper"></div>' );
		$( this ).attr( 'id', id ).after( button );
	});

	$( document ).ready( function() {
		var btns = $( '[data-clipboard-target]' );
		var clipboard = new ClipboardJS( '[data-clipboard-target]' );

		if ( btns.length ) {

			clipboard.on( 'success', function( e ) {
				e.clearSelection();
				showTooltip( e.trigger, 'Copied!' );
			});

			btns.mouseleave( function() {
				$( this ).removeClass( 'sui-tooltip' );
				$( this ).removeAttr( 'aria-label' );
				$( this ).removeAttr( 'data-tooltip' );
			});

			function showTooltip( e, msg ) {
				$( e ).addClass( 'sui-tooltip' );
				$( e ).attr( 'aria-label', msg );
				$( e ).attr( 'data-tooltip', msg );
			}

		}

	});

}( jQuery ) );
