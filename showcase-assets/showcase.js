( function( $ ) {

	var btns            = $( '.demo-icon' ),
		clipboard       = new ClipboardJS( '.demo-icon' ),
		navbutton       = $( '.sui-vertical-tab a' ),
		toggleAccordion = $( 'div.sui-accordion-item-header .sui-toggle, tr.sui-accordion-item .sui-toggle' ),
		demoPagFilter   = $( '#demo--open-pagination-filter' ),
		sideTabItem     = $( '#demo-side-tabs-options .sui-tab-item' )
		;

	// Offset scroll for showcase sidenav.
	function offsetAnchor() {
		if ( 0 !== location.hash.length ) {
			window.scrollTo( window.scrollX, window.scrollY - 60 );
		}
	}
	$( document ).on( 'click', '#adminmenu a[href^="#"], .demo-internal-link[href^="#"]', function( event ) {
		window.setTimeout( function() {
			offsetAnchor();
		}, 0 );
	});
	window.setTimeout( offsetAnchor, 0 );

	// Initialize highlight js for demo code blocks.
	$( '.demo-code-block .sui-code-snippet' ).each( function( i, block ) {
		hljs.highlightBlock( block );
	});

	$( '.demo-icons i' ).each( function( i, block ) {
		var classes = block.className.split( /\s+/ );
		var iconName = classes[0].replace( 'sui-icon-', '' );
		$( this ).wrap( '<div class="sui-col-md-3 sui-col-sm-4"><button role="button" data-clipboard-text="&lt;i class=&quot;sui-icon-' + iconName + '&quot; aria-hidden=&quot;true&quot;&gt;&lt;/i&gt;" class="demo-icon"></button></div>' ).after( '<span class="demo-icon-name"><span class="sui-screen-reader-text">Example of </span>' + iconName + '</span>' );
	});

	$( '.sui-date .sui-form-control' ).datepicker({
		beforeShow: function( input, inst ) {
			$( '#ui-datepicker-div' ).addClass( 'sui-calendar' );
		},
		'dateFormat': 'd MM yy'
	});

	clipboard.on( 'success', function( e ) {
		console.info( 'Copied:', e.text );
		showTooltip( e.trigger, 'Copied Icon!' );
		e.clearSelection();
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

	// Side navigation
	navbutton.on( 'click', function( e ) {
		currentNav( e.target );
		e.preventDefault();
		e.stopPropagation();
	});

	function currentNav( e ) {
		var navButton  = $( e ),
			navParent  = navButton.closest( '.sui-vertical-tabs' ),
			navWrapper = navButton.closest( '.sui-row-with-sidenav' ),
			navBox     = navWrapper.find( '> .sui-box' )
			;

		var navData = $( e ).data( 'tab' ),
			boxData = navWrapper.find( '.sui-box[data-tab="' + navData + '"]' )
			;

		navParent.find( 'li' ).removeClass( 'current' );
		navButton.parent().addClass( 'current' );

		navBox.hide();
		boxData.show();
	}

	// Accordion
	toggleAccordion.each( function() {

		var toggle       = $( this ),
			toggleInput  = toggle.find( 'input' )
			;

		// Disable item if toggle is unchecked on load.
		if ( toggleInput.is( ':checked' ) ) {
			toggle.closest( '.sui-accordion-item' ).removeClass( 'sui-accordion-item--disabled' );
		} else {
			toggle.closest( '.sui-accordion-item' ).addClass( 'sui-accordion-item--disabled' );
		}
	});

	toggleAccordion.on( 'click', function( e ) {
		toggleStatus( e.target );
	});

	function toggleStatus( e ) {
		var toggle       = $( e ),
			toggleId     = toggle.attr( 'id' ),
			toggleInput  = $( 'input#' + toggleId ),
			toggleParent = toggleInput.closest( '.sui-accordion-item' )
			;

		if ( toggleInput.is( ':checked' ) ) {
			toggleInput.attr( 'checked', 'checked' );
			toggleInput.checked = true;
			toggleParent.removeClass( 'sui-accordion-item--disabled' );
		} else {
			toggleInput.attr( 'checked', '' );
			toggleInput.removeAttr( 'checked' );
			toggleInput.checked = false;
			toggleParent.addClass( 'sui-accordion-item--disabled' );
			toggleParent.removeClass( 'sui-accordion-item--open' );
		}
	}

	// Pagination filter
	demoPagFilter.on( 'click', function( e ) {
		openFilter( e.target );
		e.preventDefault();
		e.stopPropagation();
	});

	function openFilter( e ) {
		var pagButton  = $( e ),
			pagWrapper = pagButton.closest( '.sui-pagination-wrap' ),
			pagFilter  = pagWrapper.next( '.sui-pagination-filter' )
			;

		pagButton.toggleClass( 'sui-active' );
		pagFilter.toggleClass( 'sui-open' );
	}

	// Side tabs
	// Demo "side tabs" using label
	sideTabItem.on( 'click', function( e ) {
		currentTab( e.target );
	});

	function currentTab( e ) {
		var tabItem   = $( e ),
			tabParent = tabItem.parent()
			;

		tabParent.find( '.sui-tab-item' ).removeClass( 'active' );
		tabItem.addClass( 'active' );
	}

}( jQuery ) );
