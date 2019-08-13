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

	SUI.tabs = function( element ) {

		var tabs     = $( element ),
			tabList  = tabs.find( '> div[role="tablist"]' ),
			tabPanel = tabs.find( '> .sui-tabs-content' )
			;

		if ( ! tabList.length ) {
			return;
		}

		function getCurrentTab( el ) {

			var current = $( el ),
				allTabs = tabList.find( '> [role="tab"]' )
				;

			// Remove "active" class.
			allTabs.removeClass( 'active' );

			// Set false "aria-selected" attribute.
			allTabs.attr( 'aria-selected', false );

			// Make screenreader ignore item.
			allTabs.attr( 'tabindex', '-1' );

			// Set "active" class.
			current.addClass( 'active' );

			// Set true "aria-selected" attribute.
			current.attr( 'aria-selected', true );

			// Make screenreader to read item.
			current.removeAttr( 'tabindex' );

		}

		function getCurrentContent( el ) {

			var tabCurrent  = $( el ),
				tabControls = tabCurrent.attr( 'aria-controls' ),
				tabCurContent = tabPanel.find( '#' + tabControls ),
				tabAllContent = tabPanel.find( '> [role="tabpanel"]' )
				;

			// Remove "active" class.
			tabAllContent.removeClass( 'active' );

			// Add "hidden" attribute.
			tabAllContent.attr( 'hidden', true );

			// Add "active" class to current content.
			tabCurContent.addClass( 'active' );

			// Remove "hidden" attribute from current content.
			tabCurContent.attr( 'hidden', false );
			tabCurContent.removeAttr( 'hidden' );

		}

		function init() {

			var tab = tabList.find( '> [role="tab"]' );

			tab.on( 'click', function( e ) {

				// Get current tab.
				getCurrentTab( this );

				// Check if tabs have content.
				if ( tabPanel.length ) {

					// Get current tab content.
					getCurrentContent( this );
				}

				e.preventDefault();

			});
		}

		init();

		return this;

	};

    if ( 0 !== $( 'SUI_BODY_CLASS .sui-tabs' ).length ) {

		$( 'SUI_BODY_CLASS .sui-tabs' ).each( function() {

			var element = $( this );

			// Support tabs new markup.
			if ( 0 === element.find( 'div[data-tabs]' ).length ) {
				SUI.tabs( this );
			}
		});

		// Support legacy tabs.
		SUI.suiTabs();

		$( 'SUI_BODY_CLASS .sui-tabs-overflow__nav' ).each( function() {
			SUI.suiTabsNav( $( this ) );
		});
    }

}( jQuery ) );
