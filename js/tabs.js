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


    if ( 0 !== $( 'SUI_BODY_CLASS .sui-tabs' ).length ) {
        SUI.suiTabs();
    }

}( jQuery ) );
