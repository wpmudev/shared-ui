( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageIcons = function( page ) {

		var body = $( 'body' ),
			page = 'showcase-page-' + page
			;

		if ( page !== body.attr( 'id' ) ) {
			return;
		}

		function showTooltip( e, msg ) {
			$( e ).addClass( 'sui-tooltip' );
			$( e ).attr( 'aria-label', msg );
			$( e ).attr( 'data-tooltip', msg );
		}

		function createFilter( element ) {

			var list             = $( element ),
				categories       = [],
				uniqueCategories = []
				;

			// List all categories.
			list.find( 'span[data-filter]' ).each( function( i ) {
				categories[ i ] = $( this ).attr( 'data-filter' );
			});

			// Remove duplicated categories.
			$.each( categories, function( i, el ) {

				if ( -1 === $.inArray( el, uniqueCategories ) ) {
					uniqueCategories.push( el );
				}
			});

			if ( ! $.isEmptyObject( uniqueCategories ) ) {

				// Create wrapper.
				list.prepend( '<div class="icons-list-filter"></div>' );

				// Set "all" filter.
				list.find( '.icons-list-filter' ).append( '<button data-filter-show="all" disabled>All</button>' );

				$.each( uniqueCategories, function( i, el ) {
					list.find( '.icons-list-filter' ).append( '<button data-filter-show="' + el + '">' + el + '</button>' );
				});
			}
		}

		function createSearch( element ) {

			var list    = $( element ),
				filter  = list.find( '.icons-list-filter' ),
				wrapper = $( '<div class="icons-list-search"></div>' )
				;

			// Create wrapper.
			wrapper.insertAfter( filter );

			// Insert search field.
			list.find( '.icons-list-search' ).append(
				'<div class="sui-control-with-icon">' +
					'<span class="sui-icon-magnifying-glass-search" aria-hidden="true"></span>' +
					'<input type="text" placeholder="Filter icons" class="sui-form-control" data-search />' +
				'</div>'
			);

		}

		function createBlocks( element ) {

			var list = $( element );

			list.each( function() {

				var list = $( this ),
					icons = list.find( '[class*="sui-icon-"]' )
					;

				// Remove opacity once loaded.
				list.addClass( 'active' );

				// Wrap icons in a table
				icons.wrapAll( '<div class="icons-list-wrapper" />' );

				icons.each( function( i, block ) {

					var icon     = $( this ),
						classes  = block.className.split( /\s+/ ),
						iconName = classes[0].replace( 'sui-icon-', '' )
						;

					icon.replaceWith( '<div class="icon-item" data-filter="' + icon.data( 'filter' ) + '" data-search-name="' + iconName + '">' +
						'<div class="icon-item-field">' +
							'<p class="icon-item-title">' +
								'<span class="sui-icon-' + iconName + ' sui-lg" aria-hidden="true"></span>' +
								'<strong>' + iconName + '</strong>' +
							'</p>' +
							'<div class="sui-form-field">' +
								'<label class="sui-label">HTML</label>' +
								'<div class="sui-with-button sui-with-button-icon">' +
									'<input type="text" value="&lt;span class=&quot;sui-icon-' + iconName + '&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;" class="sui-form-control" readonly="readonly" />' +
									'<button role="button" class="sui-button-icon icon-item-code--html" data-clipboard-text="&lt;span class=&quot;sui-icon-' + iconName + '&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;">' +
										'<i aria-hidden="true" class="sui-icon-copy"></i>' +
										'<span class="sui-screen-reader-text">Copy HTML code</span>' +
									'</button>' +
								'</div>' +
							'</div>' +
							'<div class="sui-form-field">' +
								'<label class="sui-label">SCSS</label>' +
								'<div class="sui-with-button sui-with-button-icon">' +
									'<input type="text" value="@include icon(before, ' + iconName + ', true);" class="sui-form-control" readonly="readonly" />' +
									'<button role="button" class="sui-button-icon icon-item-code--scss" data-clipboard-text="@include icon(before, ' + iconName + ', true);">' +
										'<i aria-hidden="true" class="sui-icon-copy"></i>' +
										'<span class="sui-screen-reader-text">Copy HTML code</span>' +
									'</button>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' );
				});
			});
		}

		function filterBlocks( element ) {

			var list   = $( element ),
				icons  = list.find( '.icons-list-wrapper' ),
				filter = list.find( '.icons-list-filter button' )
				;

			filter.on( 'click', function( e ) {

				var button = $( this );

				if ( 'all' === button.data( 'filter-show' ) ) {
					icons.find( '.icon-item' ).show();
				} else {
					icons.find( '.icon-item' ).hide();
					icons.find( '.icon-item[data-filter="' + button.data( 'filter-show' ) + '"]' ).show();
				}

				filter.removeAttr( 'disabled' );
				button.attr( 'disabled', true );

				e.stopPropagation();
				e.preventDefault();

			});
		}

		function searchBlocks( element ) {

			var list   = $( element ),
				search = list.find( '.icons-list-search input[data-search]' )
				;

			search.on( 'keyup', function() {

				var searchValue = $( this ).val(),
					searchIcons = list.find( '.icons-list-wrapper .icon-item' )
					;

				if ( '' !== searchValue ) {

					// Hide all items.
					searchIcons.addClass( 'sui-hidden-important' );

					// Show searched item.
					list.find( '.icon-item[data-search-name*="' + searchValue.toLowerCase() + '"]' ).removeClass( 'sui-hidden-important' );

				} else {

					// Show all items.
					searchIcons.removeClass( 'sui-hidden-important' );
				}
			});
		}

		function notification() {

			let noticeId      = 'library-warning',
				noticeMessage = '<p>Icons have a new markup, review your project and make sure it matches the update. <strong>Have in mind this update is important for correct accessibility.</strong></p>',
				noticeOptions = {}
				;

			noticeOptions.type = 'warning';
			noticeOptions.dismiss = {};
			noticeOptions.dismiss.show = true;

			SUI.openNotice( noticeId, noticeMessage, noticeOptions );

		}

		function init() {

			var clipHtml = new ClipboardJS( '.icon-item-code--html' ),
				clipScss = new ClipboardJS( '.icon-item-code--scss' )
				;

			createFilter( body.find( '.icons-list' ) );
			createBlocks( body.find( '.icons-list' ) );
			createSearch( body.find( '.icons-list' ) );
			filterBlocks( body.find( '.icons-list' ) );
			searchBlocks( body.find( '.icons-list' ) );

			clipHtml.on( 'success', function( e ) {
				console.info( 'Copied:', e.text );
				showTooltip( e.trigger, 'HTML Copied' );
				e.clearSelection();
			});

			clipScss.on( 'success', function( e ) {
				console.info( 'Copied:', e.text );
				showTooltip( e.trigger, 'SCSS Copied' );
				e.clearSelection();
			});

			// Show a notification with changes done.
			notification();

		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pageIcons( 'icons' );

	});

}( jQuery ) );
