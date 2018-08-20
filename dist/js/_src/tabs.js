( function( $ ) {

    // Enable strict mode.
    'use strict';

    // Define global SUI object if it doesn't exist.
    if ( 'object' !== typeof window.SUI ) {
        window.SUI = {};
    }

    SUI.suiTabs = function( options ) {
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
            var itemIndex;
            var groupIndex;
            var tabItems;
            data = options;
            setDefaults();
            setMemory();

            groups.tab = document.querySelectorAll( data.tabGroup );
            groups.pane = document.querySelectorAll( data.paneGroup );

            for ( groupIndex = 0; groupIndex < groups.tab.length; groupIndex++ ) {
                tabItems = groups.tab[groupIndex].children;

                for ( itemIndex = 0; itemIndex < tabItems.length; itemIndex++ ) {
                    tabItems[itemIndex].addEventListener( 'click', onClick.bind( this, groupIndex, itemIndex ), false );

                    indexGroup = groupIndex;
                    indexItem = itemIndex;

                    if ( ! hasMemory() ) {
                        continue;
                    }
                    setNodes( groupIndex, itemIndex );
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

            localStorage.setItem( 'tabbis', JSON.stringify( memory ) );
        }

        function hasMemory() {
            if ( 'undefined' === typeof memory ) {
                return;
            }
            if  ( 'undefined' === typeof memory[indexGroup]) {
                return;
            }
            if ( 'undefined' === typeof memory[indexGroup][indexItem]) {
                return;
            }
            if ( true !== memory[indexGroup][indexItem]) {
                return;
            }
            return true;
        }

        function setMemory() {
            if ( null === localStorage.getItem( 'tabbis' ) ) {
                return;
            }
            if ( 0 === localStorage.getItem( 'tabbis' ).length ) {
                return;
            }

            memory = Object.values( JSON.parse( localStorage.getItem( 'tabbis' ) ) );
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

        function reset() {
            var groupIndex;
            var itemIndex;
            for ( groupIndex = 0;  groupIndex < groups.tab.length; groupIndex++ ) {
                tabItems = groups.tab[groupIndex].children;
                paneItems = groups.pane[groupIndex].children;

                for ( itemIndex = 0; itemIndex < tabItems.length; itemIndex++ ) {
                    tabItems[itemIndex].classList.remove( data['tab-active']);
                    paneItems[itemIndex].classList.remove( data['pane-active']);
                }
            }
            localStorage.removeItem( 'tabbis' );
        }

        init( options );
    };

    if ( 0 !== $( '.sui-2-2-10 .sui-tabs' ).length ) {
        SUI.suiTabs();
    }

}( jQuery ) );
