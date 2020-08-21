( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	SUI.select = function( el ) {

		var select = $( el ),
			wrapper,
			button,
			listbox,
			value
			;

		// Check if element is "select".
		if ( ! select.is( 'select' ) ) {
			return;
		}

		// Check if element doesn't have an ID assigned.
		if ( '' === select.attr( 'id' ) || null === select.attr( 'id' ) ) {
			throw new Error( 'Select element requires an ID to work correctly.' );
		}

		// Add the DOM elements to style the select list.
		function setupElement() {

			// Wrap "select" element.
			select.wrap( '<div class="sui-select" />' );

			// Visually hide "select" element.
			select.addClass( 'sui-screen-reader-text' );

			// Get wrapper element.
			wrapper = select.parent();

			// Set handler button.
			button = $( '<button type="button" class="sui-select-button" aria-haspopup="listbox" aria-labelledby=""><span class="sui-icon-chevron-down sui-sm"></span></button>' ).appendTo( wrapper );

			// Set listbox markup.
			listbox = $( '<ul tabindex="-1" role="listbox" id="" class="sui-select-listbox" aria-labelledby="" aria-activedescendant=""></ul>' ).appendTo( wrapper );

			// Get "select" current value.
			value = $( '<span class="sui-select-value">&nbsp;</span>' ).prependTo( button );

		}

		// When changing selection using JS, you need to trigger a 'sui:change' event
		// eg: $('select').val('4').trigger('sui:change')
		function handleSelectionChange() {

			select.on( 'sui:change', function() {

				// We need to re-populateList to handle dynamic select options added via JS/ajax.
				populateList();

				listbox.find( 'li' ).on( 'click', function onItemClick( ev ) {
					var option = $( ev.target );
					selectItem( option, false, option.data( 'color' ) );
					handleValue();
				});

			});
		}

		// Add the DOM elements to style the list item.
		function setupItemList( option, listbox, index ) {

			var listitem = $( '<li role="option" class="sui-select-listitem"></li>' ).appendTo( listbox );

			// Check if "option" has a value.
			if ( '' !== option.val() || null !== option.val() ) {
				listitem.attr( 'id', select.attr( 'id' ) + '-option-' + option.val() );
			} else {
				listitem.attr( 'id', select.attr( 'id' ) + '-option-' + index );
			}

			// Check if "option" is disabled.
			if ( option.is( ':disabled' ) ) {
				listitem.addClass( 'sui-disabled' ); // Add disabled styles.
				listitem.attr( 'aria-disabled', 'true' ); // Disable for screen readers.
			}

			// Check if "option" is selected.
			if ( option.val() === select.val() ) {
				selectItem( option, true, option.data( 'color' ) );
			}
		}

		// Add all the options to the new DOM elements.
		function populateList() {

			var children = select.children();

			listbox.empty();

			children.each( function( index ) {

				var option = $( this ),
					listgroup,
					label
					;

				// Check if element is an "option".
				if ( 'OPTION' === option.prop( 'tagName' ) ) {
					setupItemList( option, listbox, index );
				} else {

					// Check if element is an "optgroup".
					if ( 'OPTGROUP' === option.prop( 'tagName' ) ) {

						listgroup = $( '<li class="sui-select-listitem-group"></li>' ).appendTo( listbox );
						label     = $( '<span></span>' ).text( option.prop( 'label' ) );

						label.appenTo( listgroup );
						$( '<ul></ul>' ).appendTo( listgroup );

						// Re-select listbox.
						listbox = listgroup.find( 'ul' );

						option.find( 'option' ).each( function( index ) {
							setupItemList( $( this ), listbox, index );
						});
					}
				}
			});
		}

		// Checks the option value for a link.
		function handleValue() {
			var val = select[0].value;

			// If option is link, navigate to it.
			if ( val.match( '^https?:\/\/|#' ) ) {
				window.location.href = val;
			}
		}

		// Toggle the dropdown state between open/closed.
		function stateToggle() {

			if ( wrapper.find( 'select' ).is( ':disabled' ) ) {
				return;
			}

			if ( ! wrapper.hasClass( 'sui-active' ) ) {
				stateOpen();
			} else {
				stateClose();
			}
		}

		// Close the dropdown list.
		function stateClose( item ) {

			if ( ! item ) {
				item = wrapper;
			}

			item.removeClass( 'sui-active' );
			// item.closest( 'tr' ).removeClass( 'select-open' );
			// item.find( '.list-value' ).removeAttr( 'aria-expanded' );

		}

		// Open the dropdown list.
		function stateOpen() {

			// $( '.select-container.active' ).each( function() {
			// 	stateClose( $( this ) );
			// });

			wrapper.addClass( 'sui-active' );
			// wrapper.closest( 'tr' ).addClass( 'select-open' );
			// wrapper.find( '.list-value' ).attr( 'aria-expanded', true );
		}

		// Visually mark the specified option as "selected".
		function selectItem( option, isInit, optionColor ) {

			isInit = 'undefined' === typeof isInit ? false : isInit;

			// Assign option value.
			value.text( option.text() );

			// if ( undefined !== optionColor && '' !== optionColor ) {
			// 	value.html( '<span style="background-color: ' + optionColor + '" data-color="' + optionColor + '"></span>' + opt.text() );
			// } else {
			// 	value.text( opt.text() );
			// }

			// $( '.current', items ).removeAttr( 'aria-selected' );
			// $( '.current', items ).removeClass( 'current' );

			// opt.addClass( 'current' );
			// opt.attr( 'aria-selected', true );
			// items.attr( 'aria-activedescendant', opt.attr( 'id' ) );

			// Close dropdown list.
			stateClose();

			// Update select list value.
			select.val( option.data( 'value' ) );

			if ( ! isInit ) {
				select.trigger( 'change' );
			}
		}

		// Element constructor.
		function init() {

			var selectId;

			setupElement();
			populateList();
			handleSelectionChange();

			listbox.find( 'li' ).not( '.sui-select-listitem-group > span' ).on( 'click', function onItemClick( ev ) {
				var option = $( ev.target );
				selectItem( option, false, option.data( 'color' ) );
				handleValue();
			});

			button.on( 'click', stateToggle );
			value.on( 'click', stateToggle );
			select.on( 'focus', stateOpen );

			// $( document ).click( function onOutsideClick( ev ) {

			// 	var jq = $( ev.target ),
			// 		selectId;

			// 	if ( jq.closest( '.select-container' ).length ) {
			// 		return;
			// 	}

			// 	if ( jq.is( 'label' ) && jq.attr( 'for' ) ) {
			// 		selectId = jq.attr( 'for' );

			// 		if ( $( 'select#' + selectId ).length ) {
			// 			return;
			// 		}
			// 	}

			// 	stateClose();
			// });

			// selectId = select.attr( 'id' );

			// if ( selectId ) {
			// 	$( 'label[for="' + selectId + '"]' ).on( 'click', stateOpen );
			// }

			// select.addClass( 'sui-styled' );

		}

		init();

		return this;

	};

	// Convert all select lists to fancy sui Select lists.
	$( 'SUI_BODY_CLASS .sui-select:not([multiple])' ).each( function() {
		SUI.select( this );
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