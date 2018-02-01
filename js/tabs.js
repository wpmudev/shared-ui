( function( $ ) {

	suiTabs = function( el ) {
		var jq = $( el ).closest( '.sui-tabs' );

		if ( ! jq.length ) {
			return;
		}

		// Resize the tab-area after short delay.
		function resizeArea() {
			window.setTimeout( resizeAreaHandler, 20 );
		}

		// Resize the tab area to match the current tab.
		function resizeAreaHandler() {
			var current = jq.find( '.sui-tab > input:checked' ).parent(),
				content = current.find( '.sui-tab-content' );

			jq.height( content.outerHeight() + current.outerHeight() - 6 );
		}

		// Updates the URL hash to keep tab open during page refresh
		function updateHash() {
			var current = jq.find( '.sui-tab > input:checked' );

			jq.find( '.sui-tab label.active' ).removeClass( 'active' );
			current.parent().find( 'label' ).addClass( 'active' );

			resizeArea();
		}

		// Open the tab that is specified in window URL hash
		function switchTab() {
			var curTab,
				route = window.location.hash.replace( /[^\w-_]/g, '' );

			if ( route ) {
				curTab = jq.find( 'input#' + route );

				if ( curTab.parent().find( 'label' ).length ) {
					jq.find( '.sui-tab label.active' ).removeClass( 'active' );
					curTab.parent().find( 'label' ).addClass( 'active' );

					if ( curTab.length && ! curTab.prop( 'checked' ) ) {
						curTab.prop( 'checked', true );

						scrollWindow();
					}

				}

			}

		}

		// Scroll the window to top of the tab list.
		function scrollWindow() {
			resizeArea();

			$( 'html, body' ).scrollTop(
				jq.offset().top -
				parseInt( $( 'html' ).css( 'paddingTop' ) ) -
				20
			);
		}

		// Constructor.
		function init() {
			var current = jq.find( '.sui-tab > input:checked' );

			jq.on( 'click', '.sui-tab > input[type=radio]', updateHash );
			$( window ).on( 'hashchange', switchTab );
			current.parent().find( 'label' ).addClass( 'active' );

			resizeArea();
			switchTab();
		}

		init();

		$( window ).resize( function() {
			resizeArea();
		});

		return this;
	};

	// Initialize all tab-areas.
	$( 'SUI_BODY_CLASS .sui-tabs' ).each( function() {
		suiTabs( this );
	});

}( jQuery ) );
