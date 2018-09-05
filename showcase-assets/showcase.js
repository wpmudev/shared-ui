( function( $ ) {

	var btns            = $( '.demo-icon' ),
		clipboard       = new ClipboardJS( '.demo-icon' ),
		navbutton       = $( '.sui-vertical-tab a' )
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

}( jQuery ) );
