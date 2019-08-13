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

            setCallback( indexGroup, indexItem );
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

        return init( config );
    };

	SUI.suiTabsNav = function( $el ) {
		var tabs = $el.closest( '.sui-tabs' ).find( '[data-tabs]' ),
            leftButton = $el.find( '.sui-tabs-overflow__nav--left' ),
            rightButton = $el.find( '.sui-tabs-overflow__nav--right' );

        function overflowing() {
            if ( tabs[0].scrollWidth > tabs.width() ) {
                if ( 0 === tabs.scrollLeft() ) {
                    leftButton.addClass( 'sui-tabs-overflow__nav--hidden' );
                } else {
                    leftButton.removeClass( 'sui-tabs-overflow__nav--hidden' );
                }
                reachedEnd( 0 );
                return true;
            } else {
                leftButton.addClass( 'sui-tabs-overflow__nav--hidden' );
                rightButton.addClass( 'sui-tabs-overflow__nav--hidden' );
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
                rightButton.addClass( 'sui-tabs-overflow__nav--hidden' );
            } else {
                rightButton.removeClass( 'sui-tabs-overflow__nav--hidden' );
            }
        }

		leftButton.click( function() {
            rightButton.removeClass( 'sui-tabs-overflow__nav--hidden' );
            if ( 0 >= tabs.scrollLeft() - 150 ) {
                leftButton.addClass( 'sui-tabs-overflow__nav--hidden' );
            }
            tabs.animate({
                scrollLeft: '-=150'
            }, 400, function() {
            });
            return false;
        });
		rightButton.click( function() {
            leftButton.removeClass( 'sui-tabs-overflow__nav--hidden' );
            reachedEnd( 150 );
            tabs.animate({
                scrollLeft: '+=150'
            }, 400, function() {
            });

            return false;
        });


        $( window ).resize( function() {
            overflowing();
        });

        tabs.scroll( function() {
            overflowing();
        });
	};

	SUI.tabs = function() {

		var tablist = document.querySelectorAll( '[role="tablist"]' )[0],
			tabs,
			panels,
			i,
			t,
			p
			;

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

		function generateArrays() {
			tabs = document.querySelectorAll( '[role="tab"]' );
			panels = document.querySelectorAll( '[role="tabpanel"]' );
		};

		function addListeners( index ) {

			tabs[index].addEventListener( 'click', clickEventListener );
			tabs[index].addEventListener( 'keydown', keydownEventListener );
			tabs[index].addEventListener( 'keyup', keyupEventListener );

			// Build an array with all tabs (<buttons>s) in it.
			tabs[index].index = index;
		}

		// When a tab is clicked, activateTab is fired to activate it.
		function clickEventListener( event ) {
			var tab = event.target;
			activateTab( tab, false );
		}

		// Handle keydown on tabs.
		function keydownEventListener( event ) {

			var key = event.keyCode;

			switch ( key ) {

				case keys.end :

					event.preventDefault();

					// Actiavte last tab.
					focusLastTab();

					break;

				case keys.home :

					event.preventDefault();

					// Activate first tab.
					focusFirstTab();

					break;

				// Up and down are in keydown
				// because we need to prevent page scroll.
				case keys.up :
				case keys.down :
					determineOrientation( event );
					break;
			};
		}

		// Handle keyup on tabs.
		function keyupEventListener( event ) {

			var key = event.keyCode;

			switch ( key ) {

				case keys.left :
				case keys.right :
					determineOrientation( event );
					break;

				case keys.delete:
					determineDeletable( event );
					break;

				case keys.enter :
				case keys.space :
					activateTab( event );
					break;
			}
		}

		// When a "tablist" aria-orientation is set to vertical,
		// only up and down arrow should function.
		// In all other cases only left and right should function.
		function determineOrientation( event ) {

			var key      = event.keyCode,
				vertical = 'vertical' === tablist.getAttribute( 'aria-orientation' ),
				proceed  = false
				;

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
				switchTabOnArrowPress( event );
			}
		}

		// Either focus the next, previous, first, or last tab
		// depending on key pressed.
		function switchTabOnArrowPress( event ) {

			var pressed = event.keyCode;

			if ( direction[pressed]) {

				// eslint-disable-next-line vars-on-top
				var target = event.target;

				if ( undefined !== target.index ) {

					if ( tabs[target.index + direction[pressed] ]) {
						tabs[target.index + direction[pressed] ].focus();
					} else if ( keys.left === pressed || keys.up === pressed ) {
						focusLastTab();
					} else if ( keys.right === pressed || keys.down === pressed ) {
						focusFirstTab();
					}
				}
			}
		}

		// Activate any given tab panel.
		function activateTab( tab, setFocus ) {

			setFocus = setFocus || true;

			// Deactivate all other tabs.
			deactivateTabs();

			// Remove tabindex attribute.
			tab.removeAttribute( 'tabindex' );

			// Set the tab as selected.
			tab.setAttribute( 'aria-selected', true );

			// Add "active" class.
			tab.classList.add( 'active' );

			// Get the value of aria-controls (which is an ID).
			// eslint-disable-next-line vars-on-top
			var controls = tab.getAttribute( 'aria-controls' );

			// Remove hidden attribute from tab panel to make it visible.
			document.getElementById( controls ).removeAttribute( 'hidden' );
			document.getElementById( controls ).classList.add( 'active' );

			// Set focus when required.
			if ( setFocus ) {
				tab.focus();
			}
		}

		// Deactivate all tabs and tab panels.
		function deactivateTabs() {

			for ( t = 0; t < tabs.length; t++ ) {
				tabs[t].classList.remove( 'active' );
				tabs[t].setAttribute( 'tabindex', '-1' );
				tabs[t].setAttribute( 'aria-selected', 'false' );
			}

			for ( p = 0; p < panels.length; p++ ) {
				panels[p].classList.remove( 'active' );
				panels[p].setAttribute( 'hidden', 'hidden' );
			}
		}

		// Focus first tab.
		function focusFirstTab() {
			tabs[0].focus();
		}

		// Focus last tab.
		function focusLastTab() {
			tabs[tabs.length - 1].focus();
		}

		// Detect if a tab is deletable.
		function determineDeletable( event ) {

			target = event.target;

			if ( null !== target.getAttribute( 'data-deletable' ) ) {

				// Delete target tab
				deleteTab( event, target );

				// Update arrays related to tabs widget
				generateArrays();

				// Activate the closest tab to the one that was just deleted
				if ( 0 > target.index - 1 ) {
					activateTab( tabs[0]);
				} else {
					activateTab( tabs[target.index - 1]);
				}
			}
		}

		// Deletes a tab and its panel.
		function deleteTab( event ) {

			var target = event.target,
				panel  = document.getElementById( target.getAttribute( 'aria-controls' ) )
				;

			target.parentElement.removeChild( target );
			panel.parentElement.removeChild( panel );

		}

		generateArrays();

		for ( i = 0; i < tabs.length; ++i ) {
			addListeners( i );
		}

		return this;

	};

    if ( 0 !== $( 'SUI_BODY_CLASS .sui-tabs' ).length ) {

		// Support tabs new markup.
		SUI.tabs();

		// Support legacy tabs.
		SUI.suiTabs();

		$( 'SUI_BODY_CLASS .sui-tabs-overflow__nav' ).each( function() {
			SUI.suiTabsNav( $( this ) );
		});
    }

}( jQuery ) );
