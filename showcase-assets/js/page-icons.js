( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageIcons = function( page ) {

		var body = $( 'body' );

		if ( page !== body.data( 'page' ) || page !== body.attr( 'data-page' ) ) {
			return;
		}

		function showTooltip( e, msg ) {
			$( e ).addClass( 'sui-tooltip' );
			$( e ).attr( 'aria-label', msg );
			$( e ).attr( 'data-tooltip', msg );
		}

		function createTable( element ) {

			var list = $( element );

			list.each( function() {

				var list  = $( this ),
					icons = list.find( 'i' )
					;

				// Wrap icons in a table
				icons.wrapAll( '<table class="sui-table table-icons">' +
					'<tbody></tbody>' +
				'</table>' );

				// Add table header
				icons.closest( '.table-icons' ).prepend( '<thead><tr>' +
					'<th>Icons</th>' +
					'<th>SCSS</th>' +
					'<th>HTML</th>' +
				'</tr></thead>' );

				// List each icon in a row
				icons.each( function( i, block ) {

					var classes  = block.className.split( /\s+/ ),
						iconName = classes[0].replace( 'sui-icon-', '' )
						;

					$( this ).replaceWith( '<tr>' +
						'<th><i class="sui-icon-' + iconName + '" aria-hidden="true"></i>' + iconName + '</th>' +
						'<td><button role="button" class="demo-icon-code" data-clipboard-text="@include icon(before, ' + iconName + ', true);">@include icon(before, ' + iconName + ', true);</button></td>' +
						'<td><button role="button" class="demo-icon-code" data-clipboard-text="&lt;i class=&quot;sui-icon-' + iconName + '&quot; aria-hidden=&quot;true&quot;&gt;&lt;/i&gt;">&lt;i class=&quot;sui-icon-' + iconName + '&quot; aria-hidden=&quot;true&quot;&gt;&lt;/i&gt;</button></td>' +
					'</tr>' );

				});
			});
		}

		function init() {

			var clipboard = new ClipboardJS( '.demo-icon-code' );

			createTable( body.find( '.list-of-icons' ) );

			clipboard.on( 'success', function( e ) {
				console.info( 'Copied:', e.text );
				showTooltip( e.trigger, 'Copied Icon!' );
				e.clearSelection();
			});

		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pageIcons( 'icons' );

	});

}( jQuery ) );
