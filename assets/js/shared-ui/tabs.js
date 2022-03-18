( function( $ ) {

    // Enable strict mode.
    'use strict';

    // Define global SUI object if it doesn't exist.
    if ( 'object' !== typeof window.SUI ) {
        window.SUI = {};
    }

    SUI.suiTabs = function( config ) {

        var data;
        var types = [ 'tab', 'pane' ];
        var type;
        var groups = [];
        var activeGroups = [];
        var activeChildren = [];
        var activeItems = [];
        var indexGroup;
        var indexItem;
        var memory = [];

        function init( options ) {
            var groupIndex;
            var tabItems;
            var itemIndex;
            var hashId;
            data = options;
            setDefaults();

            groups.tab = document.querySelectorAll( data.tabGroup );
            groups.pane = document.querySelectorAll( data.paneGroup );

            for ( groupIndex = 0; groupIndex < groups.tab.length; groupIndex++ ) {
                tabItems = groups.tab[groupIndex].children;

                for ( itemIndex = 0; itemIndex < tabItems.length; itemIndex++ ) {
                    tabItems[itemIndex].addEventListener( 'click', onClick.bind( this, groupIndex, itemIndex ), false );

                    indexGroup = groupIndex;
                    indexItem = itemIndex;

                    if ( window.location.hash ) {
                        hashId = window.location.hash.replace( /[^\w-_]/g, '' );

                        if ( hashId === tabItems[itemIndex].id ) {
                            setNodes( groupIndex, itemIndex );
                        }
                    }
                }

            }
        }

        function onClick( groupIndex, itemIndex ) {
            setNodes( groupIndex, itemIndex );

            setCallback();
        }

        function setNodes( groupIndex, itemIndex ) {
            var i;
            indexGroup = groupIndex;
            indexItem = itemIndex;

            for ( i = 0; i < types.length; i++ ) {
                type = types[i];

                setActiveGroup();
                setActiveChildren();
                setActiveItems();
                putActiveClass();
            }

            memory[groupIndex] = [];
            memory[groupIndex][itemIndex] = true;

        }

        function putActiveClass() {
            var i;
            for ( i = 0; i < activeChildren[type].length; i++ ) {
                activeChildren[type][i].classList.remove( data[type + 'Active']);
            }

            activeItems[type].classList.add( data[type + 'Active']);
        }

        function setDefaults() {
            var i;
            for ( i = 0; i < types.length; i++ ) {
                type = types[i];

                setOption( type + 'Group', '[data-' + type + 's]' );
                setOption( type + 'Active', 'active' );
            }
        }

        function setOption( key, value ) {
            data = data || [];
            data[key] = data[key] || value;
        }

        function setActiveGroup() {
            activeGroups[type] = groups[type][indexGroup];
        }

        function setActiveChildren() {
            activeChildren[type] = activeGroups[type].children;
        }

        function setActiveItems() {
            activeItems[type] = activeChildren[type][indexItem];
        }

        function setCallback() {
            if ( 'function' === typeof data.callback ) {
                data.callback( activeItems.tab, activeItems.pane );
            }
        }

        init( config );

		return;
    };

	SUI.tabsOverflow = function( $el ) {

		var tabs = $el.closest( '.sui-tabs' ).find( '[data-tabs], [role="tablist"]' ),
            leftButton = $el.find( '.sui-tabs-navigation--left' ),
            rightButton = $el.find( '.sui-tabs-navigation--right' );

        function overflowing() {
            if ( tabs[0].scrollWidth > tabs.width() ) {
                if ( 0 === tabs.scrollLeft() ) {
                    leftButton.addClass( 'sui-tabs-navigation--hidden' );
                } else {
                    leftButton.removeClass( 'sui-tabs-navigation--hidden' );
                }
                reachedEnd( 0 );
                return true;
            } else {
                leftButton.addClass( 'sui-tabs-navigation--hidden' );
                rightButton.addClass( 'sui-tabs-navigation--hidden' );
                return false;
            }
        }
        overflowing();

        function reachedEnd( offset ) {
            var newScrollLeft,
                width,
                scrollWidth;
            newScrollLeft = tabs.scrollLeft() + offset;
            width = tabs.outerWidth();
            scrollWidth = tabs.get( 0 ).scrollWidth;

            if ( scrollWidth - newScrollLeft <= width ) {
                rightButton.addClass( 'sui-tabs-navigation--hidden' );
            } else {
                rightButton.removeClass( 'sui-tabs-navigation--hidden' );
            }
        }

		leftButton.on( 'click', function() {
            rightButton.removeClass( 'sui-tabs-navigation--hidden' );
            if ( 0 >= tabs.scrollLeft() - 150 ) {
                leftButton.addClass( 'sui-tabs-navigation--hidden' );
            }
            tabs.animate({
                scrollLeft: '-=150'
            }, 400, function() {
            });
            return false;
        });
		rightButton.on( 'click', function() {
            leftButton.removeClass( 'sui-tabs-navigation--hidden' );
            reachedEnd( 150 );
            tabs.animate({
                scrollLeft: '+=150'
            }, 400, function() {
            });

            return false;
        });


        $( window ).on( 'resize', function() {
            overflowing();
        });

        tabs.on( 'scroll', function() {
            overflowing();
        });
	};

	SUI.tabs = function( config ) {

		var tablist = $( '.sui-tabs > div[role="tablist"]' );
		var data    = config;

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
		function deactivateTabs( tabs, panels, inputs ) {

			tabs.removeClass( 'active' );
			tabs.attr( 'tabindex', '-1' );
			tabs.attr( 'aria-selected', false );

			inputs.prop( 'checked', false );

			panels.removeClass( 'active' );
			panels.prop( 'hidden', true );

		}

		// Activate current tab panel.
		function activateTab( tab ) {

			var tabs     = $( tab ).closest( '[role="tablist"]' ).find( '[role="tab"]' ),
				inputs   = $( tab ).closest( '[role="tablist"]' ).find( 'input[type="radio"]' ),
				panels   = $( tab ).closest( '.sui-tabs' ).find( '> .sui-tabs-content > [role="tabpanel"]' ),
				controls = $( tab ).attr( 'aria-controls' ),
				input    = $( tab ).next( 'input[type="radio"]' ),
				panel    = $( '#' + controls )
				;

			deactivateTabs( tabs, panels, inputs );

			$( tab ).addClass( 'active' );
			$( tab ).removeAttr( 'tabindex' );
			$( tab ).attr( 'aria-selected', true );

			input.prop( 'checked', true );

			panel.addClass( 'active' );
			panel.prop( 'hidden', false );

		}

		// When a "tablist" aria-orientation is set to vertical,
		// only up and down arrow should function.
		// In all other cases only left and right should function.
		function determineOrientation( event, index, tablist ) {

			var key      = event.keyCode || event.which,
				vertical = 'vertical' === $( tablist ).attr( 'aria-orientation' ),
				proceed  = false
				;

			// Check if aria orientation is set to vertical.
			if ( vertical ) {

				if ( keys.up === key || keys.down === key ) {
					event.preventDefault();
					proceed = true;
				}
			} else {

				if ( keys.left === key || keys.right === key ) {
					proceed = true;
				}
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

		function keydownEventListener( event, index, tablist ) {

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
					determineOrientation( event, index, tablist );
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

			var tabgroup = tablist.closest( '.sui-tabs' );

			// Run the function for each group of tabs to prevent conflicts
			// when having child tabs.
			tabgroup.each( function() {

				var tabs, index;

				tabgroup = $( this );
				tablist  = tabgroup.find( '> [role="tablist"]' );
				tabs     = tablist.find( '> [role="tab"]' );

				// Trigger events on click.
				tabs.on( 'click', function( e ) {
					clickEventListener( e );

				// Trigger events when pressing key.
				}).on( 'keydown', function( e ) {
					index = $( this ).index();
					keydownEventListener( e, index, tablist );

				// Trigger events when releasing key.
				}).on( 'keyup', function( e ) {
					index = $( this ).index();
					keyupEventListener( e, index, tablist );
				});
			});
		}

		init();

		return this;

	};

    if ( 0 !== $( 'SUI_BODY_CLASS .sui-tabs' ).length ) {

		// Support tabs new markup.
		SUI.tabs();

		// Support legacy tabs.
		SUI.suiTabs();

		$( 'SUI_BODY_CLASS .sui-tabs-navigation' ).each( function() {
			SUI.tabsOverflow( $( this ) );
		});
    }

}( jQuery ) );
