( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	/**
	 * @namespace aria
	 */
	let aria = aria || {};

	aria.Utils = aria.Utils || {};

	// Find out element's tag name.
	aria.Utils.hasTag = function( el, tag ) {

		if ( el.tagName === tag ) {
			return true;
		}

		return false;

	};

	// Find out if element has an ID assigned.
	aria.Utils.hasId = function( el ) {

		if ( 'undefined' !== typeof el.id && '' !== el.id ) {
			return true;
		}

		return false;

	};

	/**
	 * @constructor
	 * @desc Collapsible dropdown list providing modal focus management.
	 *
	 * @param element
	 * Get's the main element from where Select is going to be built.
	 */
	SUI.Select = ( element ) => {

		const select = $( element );

		let container, listbox, value, button;

		// Stop function when excecuted on a non "select" element.
		if ( ! aria.Utils.hasTag( element, 'SELECT' ) ) {
			return;
		}

		// Show error when "select" doesn't have an ID.
		if ( ! aria.Utils.hasId( element ) ) {
			throw new Error( 'Select element require an ID to work properly.' );
		}

		// Add the DOM elements to style the select list.
		aria.Utils.createElement = () => {

			// Wrap select element.
			select.wrap( '<div class="sui-select" />' );

			// Hide select element.
			select.addClass( 'sui-screen-reader-text' );

			// Define main container.
			container = select.parent();

			// Define selector button.
			button = $( '<button class="sui-select-button"><span class="sui-icon-chevron-down" aria-hidden="true"></span></button>' ).appendTo( container );

			// Define button value.
			value = $( '<span class="sui-select-value">&nbsp;</span>' ).prependTo( button );

			// Define listbox.
			listbox = $( '<ul role="listbox" tabindex="-1" id="' + select.attr( 'id' ) + '-listbox" class="sui-select-listbox">' ).appendTo( container );

		};

		// When changing selection using JS, you need to trigger a 'sui:change' event
		// eg: $('select').val('4').trigger('sui:change')
		aria.Utils.selectChange = () => {

			select.on( 'sui:change', function() {

				// We need to re-populate listbox items to handle dynamic select options added via JS/ajax.
				aria.Utils.populateList();

			});
		};

		// Add all the options to the new DOM elements.
		aria.Utils.populateList = () => {

			let children = select.children();

			// Make sure listbox is empty.
			listbox.empty();

			children.each( function( index ) {

				let option = $( this ),
					listitem,
					itemid = select.attr( 'id' ) + '-item-',
					label
					;

				// Check if item is an "option".
				if ( aria.Utils.hasTag( children[index], 'OPTION' ) ) {

					// Create item.
					listitem = $( '<li role="option" class="sui-select-listitem"></li>' ).appendTo( listbox );
					listitem.text( option.text() );

					// Set item an unique id.
					if ( 'undefined' !== typeof option.attr( 'value' ) ) {
						listitem.attr( 'id', itemid + option.attr( 'value' ) );
					} else {
						listitem.attr( 'id', itemid + index );
					}

					// Disable item.
					if ( option.is( ':disabled' ) ) {
						listitem.addClass( 'sui-disabled' );
						listitem.attr( 'aria-disabled', true );
					}
				} else {

					if ( aria.Utils.hasTag( children[index], 'OPTGROUP' ) ) {
						window.console.log( 'optgroup' );
					}
				}
			});
		};

		// Checks the option value for a link.
		aria.Utils.handleValue = () => {

			let val = select[0].value;

			// If option is link, navigate to it.
			if ( val.match( '^https?:\/\/|#' ) ) {
				window.location.href = val;
			}
		};

		// Toggle the dropdown state between open/closed.
		aria.Utils.stateToggle = () => {

			// Check if select is disabled.
			if ( container.find( 'select' ).is( ':disabled' ) ) {
				return;
			}

			// Check if container is already active (opened).
			if ( ! container.hasClass( 'sui-active' ) ) {
				aria.Utils.stateOpen();
			} else {
				aria.Utils.stateClose();
			}
		};

		// Close the dropdown list.
		aria.Utils.stateClose = ( item ) => {

			if ( ! item ) {
				item = container;
			}

			// Remove "active" class to container.
			item.removeClass( 'sui-active' );

			// FIX: Make sure closed accordion table row closes.
			item.closest( 'tr' ).removeClass( 'select-open' );

		};

		// Open the dropdown list.
		aria.Utils.stateOpen = () => {

			$( 'div.sui-select.sui-active' ).each( function() {
				stateClose( $( this ) );
			});

			// Add "active" class to container.
			container.addClass( 'sui-active' );

			// FIX: Make sure closed accordion table row remains open.
			container.closest( 'tr' ).addClass( 'select-open' );

		};

		aria.Utils.placeholder = () => {

			if ( 'undefined' !== typeof select.attr( 'data-placeholder' ) ) {
				select.prepend( '<option value=""></option>' ).val( select.attr( 'data-placeholder' ) );
				value.text( select.attr( 'data-placeholder' ) );
				value.addClass( 'sui-select-placeholder' );
			}
		};

		// Visually mark the specified option as "selected".
		aria.Utils.selectItem = ( option ) => {};

		function init() {
			aria.Utils.createElement();
			aria.Utils.populateList();
			aria.Utils.placeholder();
			aria.Utils.selectChange();
		}

		init();

		return this;

	};

	// Execute function on load.
	$( 'SUI_BODY_CLASS .sui-select:not([multiple])' ).each( function() {
		SUI.Select( this );
	});

}( jQuery ) );

/**
( function( $ ) {

    // Enable strict mode.
    'use strict';

    // Define global SUI object if it doesn't exist.
    if ( 'object' !== typeof window.SUI ) {
        window.SUI = {};
    }

    SUI.suiSelect = function( el ) {
		var jq = $( el ),
			wrap, handle, list, value, items;

		if ( ! jq.is( 'select' ) ) {
			return;
		}

		if ( jq.closest( '.select-container' ).length || jq.data( 'select2' ) || jq.is( '.sui-select' ) || jq.is( '.sui-search' ) || jq.is( '.sui-variables' ) || jq.is( '.none-sui' ) ) {
			return;
		}

		// Add the DOM elements to style the select list.
		function setupElement() {

			// Wrap select
			jq.wrap( '<div class="select-container">' );

			// Hide select
			jq.attr( 'aria-hidden', true );
			jq.attr( 'hidden', true );
			jq.hide();

			wrap = jq.parent();

			handle = $( '<span class="dropdown-handle" aria-hidden="true"><i class="sui-icon-chevron-down"></i></span>' ).prependTo( wrap );
			list = $( '<div class="select-list-container"></div>' ).appendTo( wrap );
			value = $( '<button type="button" class="list-value" aria-haspopup="listbox">&nbsp;</button>' ).appendTo( list );
			items = $( '<ul tabindex="-1" role="listbox" class="list-results"></ul>' ).appendTo( list );

			wrap.addClass( jq.attr( 'class' ) );

			value.attr( 'id', jq.attr( 'id' ) + '-button' );
			value.attr( 'aria-labelledby', jq.attr( 'aria-labelledby' ) + ' ' + value.attr( 'id' ) );

			items.attr( 'id', jq.attr( 'id' ) + '-list' );
			items.attr( 'aria-labelledby', jq.attr( 'aria-labelledby' ) );

		}

		// When changing selection using JS, you need to trigger a 'sui:change' event
		// eg: $('select').val('4').trigger('sui:change')
		function handleSelectionChange() {

			jq.on( 'sui:change', function() {

				// We need to re-populateList to handle dynamic select options added via JS/ajax.
				populateList();

				items.find( 'li' ).not( '.optgroup-label' ).on( 'click', function onItemClick( ev ) {
					var opt = $( ev.target );
					selectItem( opt, false, opt.data( 'color' ) );
					handleValue();
				});
			});
		}

		// Add all the options to the new DOM elements.
		function populateList() {
            var children = jq.children();
			items.empty();
            children.each( function() {
                var opt = $( this ),
                    item,
					optgroup = $( this ),
                    optGroupItem,
                    $label;
                if ( 'OPTION' == $( this ).prop ( 'tagName' ) ) {

					item = $( '<li></li>' ).appendTo( items );
					item.attr( 'role', 'option' );

					if ( opt.data( 'content' ) ) {
						item.addClass( 'sui-element-flex' );
						item.html( '<span>' + opt.text() + '</span><span>' + opt.data( 'content' ) + '</span>' );
					} else if ( opt.data( 'icon' ) ) {
						item.html( '<i class="sui-icon-' + opt.data( 'icon' ) + '" aria-hidden="true"></i> ' + opt.text() );
					} else if ( opt.data( 'color' ) ) {
						item.html( '<span style="background-color: ' + opt.data( 'color' ) + '" data-color="' + opt.data( 'color' ) + '" aria-hidden="true"></span>' + opt.text() );
					} else {
						item.text( opt.text() );
					}

					if ( opt.is( ':disabled' ) ) {
						item.addClass( 'sui-disabled' );
					}

					items.attr( 'aria-activedescendant', jq.attr( 'id' ) + '-option-' + opt.val() );
					item.attr( 'id', jq.attr( 'id' ) + '-option-' + opt.val() );

					item.data( 'value', opt.val() );
					item.data( 'color', opt.data( 'color' ) );

                    if ( opt.val() == jq.val() ) {
                        selectItem( item, true, opt.data( 'color' ) );
                    }
                } else {
                    optGroupItem = $( '<ul></ul>' ).appendTo( items );
                    $label = $( '<li class="optgroup-label"></li>' ).text( optgroup.prop( 'label' ) );

                    optGroupItem.html( $label );
                    optGroupItem.addClass( 'optgroup' );

                    optgroup.find( 'option' ).each( function onPopulateLoop() {
                        var opt = $( this ),
                            item;
                        item = $( '<li></li>' ).appendTo( optGroupItem );
                        item.text( opt.text() );
                        item.data( 'value', opt.val() );

                        if ( opt.val() == jq.val() ) {
                            selectItem( item );
                        }
                    });
                }

            });
		}

		// Checks the option value for a link.
		function handleValue() {
			var val = jq[0].value;

			// If option is link, navigate to it.
			if ( val.match( '^https?:\/\/|#' ) ) {
				window.location.href = val;
			}
		}

		// Toggle the dropdown state between open/closed.
		function stateToggle() {
			if ( wrap.find( 'select' ).is( ':disabled' ) ) {
				return;
			}
			if ( ! wrap.hasClass( 'active' ) ) {
				stateOpen();
			} else {
				stateClose();
			}
		}

		// Close the dropdown list.
		function stateClose( item ) {
			if ( ! item ) {
				item = wrap;
			}

			item.removeClass( 'active' );
			item.closest( 'tr' ).removeClass( 'select-open' );
			item.find( '.list-value' ).removeAttr( 'aria-expanded' );
		}

		// Open the dropdown list.
		function stateOpen() {
			$( '.select-container.active' ).each( function() {
				stateClose( $( this ) );
			});

			wrap.addClass( 'active' );
			wrap.closest( 'tr' ).addClass( 'select-open' );
			wrap.find( '.list-value' ).attr( 'aria-expanded', true );
		}

		// Visually mark the specified option as "selected".
		function selectItem( opt, isInit, optColor ) {

			isInit = 'undefined' === typeof isInit ? false : isInit;

			if ( undefined !== optColor && '' !== optColor ) {
				value.html( '<span style="background-color: ' + optColor + '" data-color="' + optColor + '"></span>' + opt.text() );
			} else {
				value.text( opt.text() );
			}

			$( '.current', items ).removeAttr( 'aria-selected' );
			$( '.current', items ).removeClass( 'current' );
			opt.addClass( 'current' );
			opt.attr( 'aria-selected', true );
			items.attr( 'aria-activedescendant', opt.attr( 'id' ) );
			stateClose();

			// Also update the select list value.
			jq.val( opt.data( 'value' ) );

			if ( ! isInit ) {
				jq.trigger( 'change' );
			}

		}

		// Element constructor.
		function init() {
			var selectId;

			setupElement();
			populateList();
			handleSelectionChange();

			items.find( 'li' ).not( '.optgroup-label' ).on( 'click', function onItemClick( ev ) {
				var opt = $( ev.target );
				selectItem( opt, false, opt.data( 'color' ) );
				handleValue();
			});

			handle.on( 'click', stateToggle );
			value.on( 'click', stateToggle );
			jq.on( 'focus', stateOpen );

			$( document ).click( function onOutsideClick( ev ) {
				var jq = $( ev.target ),
					selectId;

				if ( jq.closest( '.select-container' ).length ) {
					return;
				}

				if ( jq.is( 'label' ) && jq.attr( 'for' ) ) {
					selectId = jq.attr( 'for' );

					if ( $( 'select#' + selectId ).length ) {
						return;
					}
				}

				stateClose();
			});

			selectId = jq.attr( 'id' );

			if ( selectId ) {
				$( 'label[for=' + selectId + ']' ).on( 'click', stateOpen );
			}

			jq.addClass( 'sui-styled' );
		}

		init();

		return this;
	};

	// Convert all select lists to fancy sui Select lists.
	$( 'SUI_BODY_CLASS select:not([multiple])' ).each( function() {
		SUI.suiSelect( this );
	});

}( jQuery ) );
*/
