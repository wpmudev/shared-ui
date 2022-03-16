( function( $ ) {

    // Enable strict mode.
    'use strict';

    // Define global SUI object if it doesn't exist.
    if ( 'object' !== typeof window.SUI ) {
        window.SUI = {};
    }

	SUI.sideNavigation = function( config ) {

		var tablist = $( '.sui-sidenav' );
		var data = config;

		// For easy reference.
		var keys = {
			end: 35,
			home: 36,
			left: 37,
			up: 38,
			right: 39,
			down: 40,
			delete: 46,
			enter: 13,
			space: 32
		};

		// Add or substract depending on key pressed.
		var direction = {
			37: -1,
			38: -1,
			39: 1,
			40: 1
		};

		// Prevent function from running if tablist does not exist.
		if ( ! tablist.length ) {
			return;
		}

		// Deactivate all tabs and tab panels.
		function deactivateTabs( tabs, panels ) {

			tabs.removeClass( 'current' );
			tabs.attr( 'tabindex', '-1' );
			tabs.attr( 'aria-selected', false );

			panels.hide();
			panels.prop( 'hidden', true );

		}

		// Activate current tab panel.
		function activateTab( tab ) {

			var tabs  = $( tab ).closest( '[role="navigation"]' ).find( 'button' ),
				panels   = $( tab ).closest( '.sui-row-with-sidenav' ).find( '[role="tabpanel"]' ),
				controls = $( tab ).attr( 'aria-controls' ),
				panel    = $( '#' + controls )
				;

			deactivateTabs( tabs, panels );

			$( tab ).addClass( 'current' );
			$( tab ).removeAttr( 'tabindex' );
			$( tab ).attr( 'aria-selected', true );

			panel.show();
			panel.prop( 'hidden', false );

		}

		// When a "tablist" aria-orientation is set to vertical,
		// only up and down arrow should function.
		// In all other cases only left and right should function.
		function determineOrientation( event, index ) {

			var key      = event.keyCode || event.which,
				proceed  = false
				;

				if ( keys.up === key || keys.down === key ) {
					event.preventDefault();
					proceed = true;
				} else if ( keys.left === key || keys.right === key ) {
					proceed = true;
				}

			if ( true === proceed ) {
				switchTabOnArrowPress( event, index );
			}
		}

		// Either focus the next, previous, first, or last tab
		// depending on key pressed.
		function switchTabOnArrowPress( event, index ) {

			var pressed, target, tabs;

			pressed = event.keyCode || event.which;

			if ( direction[pressed]) {

				target = event.target;
				tabs   = $( target ).closest( '[role="tablist"]' ).find( '> [role="tab"]' );

				if ( undefined !== index ) {

					if ( tabs[index + direction[pressed] ]) {
						tabs[index + direction[pressed] ].focus();
					} else if ( keys.left === pressed || keys.up === pressed ) {
						tabs[tabs.length - 1].focus();
					} else if ( keys.right === pressed || keys.down === pressed ) {
						tabs[0].focus();
					}
				}
			}
		}

		// Callback function.
		function setCallback( currentTab ) {

			var tab      = $( currentTab ),
				controls = tab.attr( 'aria-controls' ),
				panel    = $( '#' + controls )
				;

			if ( 'function' === typeof data.callback ) {
				data.callback( tab, panel );
			}
		}

		// When a tab is clicked, activateTab is fired to activate it.
		function clickEventListener( event ) {

			var tab = event.target;

			activateTab( tab );

			if ( undefined !== data && 'undefined' !== data ) {
				setCallback( tab );
			}

			event.preventDefault();
			event.stopPropagation();

		}

		function keydownEventListener( event, index ) {

			var key = event.keyCode || event.which;

			switch ( key ) {

				case keys.end:
				case keys.home:
					event.preventDefault();
					break;

				// Up and down are in keydown
				// because we need to prevent page scroll.
				case keys.up:
				case keys.down:
					determineOrientation( event, index );
					break;
			}
		}

		function keyupEventListener( event, index, tablist ) {

			var key = event.keyCode || event.which;

			switch ( key ) {

				case keys.left :
				case keys.right :
					determineOrientation( event, index, tablist );
					break;

				case keys.enter :
				case keys.space :
					activateTab( event );
					break;
			}
		}

		function init() {

			var tabgroup = tablist.closest( '.sui-row-with-sidenav' );
            var suiselect = tablist.find( '.sui-select' );

			// Run the function for each group of tabs to prevent conflicts
			// when having child tabs.
			tabgroup.each( function() {
				var tabs, index;

				tabgroup = $( this );
				tablist  = tabgroup.find( '[role="tablist"]' );
				tabs     = tablist.find( '[role="tab"]' );

				// Trigger events on click.
				tabs.on( 'click', function( e ) {
					clickEventListener( e );

				// Trigger events when pressing key.
				}).on( 'keydown', function( e ) {
					index = $( this ).index();
					keydownEventListener( e, index );

				// Trigger events when releasing key.
				}).on( 'keyup', function( e ) {
					index = $( this ).index();
					keyupEventListener( e, index );
				});
			});

            // sui select nav onselect change.
            suiselect.each( function() {
                $( this ).on( 'change', function() {
					var btnId = $( '#' + $( this ).val() );
					btnId.trigger( 'click' );
                });
            });
		}

		init();

		return this;

	};

    if ( 0 !== $( 'SUI_BODY_CLASS .sui-row-with-sidenav' ).length ) {

		SUI.sideNavigation();

    }

}( jQuery ) );
