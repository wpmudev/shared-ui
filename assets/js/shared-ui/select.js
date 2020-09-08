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

	// Key codes.
	aria.KeyCode = {
		BACKSPACE: 8,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		SPACE: 32,
		PAGE_UP: 33,
		PAGE_DOWN: 34,
		END: 35,
		HOME: 36,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		DELETE: 46
	};

	aria.Utils = aria.Utils || {};

	// Find out element's tag name.
	aria.Utils.hasTag = ( el, tag ) => {

		if ( el.tagName === tag ) {
			return true;
		}

		return false;

	};

	// Find out if element has an ID assigned.
	aria.Utils.hasId = ( el ) => {

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
		let createElement = () => {

			// Wrap select element.
			select.wrap( '<div class="sui-select" />' );

			// Hide select element.
			select.addClass( 'sui-screen-reader-text' );
			select.removeClass( 'sui-select' );

			// Define main container.
			container = select.parent();

			// Define selector button.
			button = $( '<button class="sui-select-button" aria-haspopup="listbox" aria-labelledby="' + select.attr( 'id' ) + '-label ' + select.attr( 'id' ) + '-button-label"><span class="sui-icon-chevron-down" aria-hidden="true"></span></button>' ).appendTo( container );

			// Define button value.
			value = $( '<span id="' + select.attr( 'id' ) + '-button-label" class="sui-select-value">&nbsp;</span>' ).prependTo( button );

			// Define listbox.
			listbox = $( '<ul role="listbox" tabindex="0" id="' + select.attr( 'id' ) + '-listbox" class="sui-select-listbox" aria-labelledby="' + select.attr( 'id' ) + '-label" aria-activedescendant=""></ul>' ).appendTo( container );

		};

		// When changing selection using JS, you need to trigger a 'sui:change' event
		// eg: $('select').val('4').trigger('sui:change')
		let changeSelection = () => {

			select.on( 'sui:change', function() {

				// We need to re-populate listbox items to handle dynamic select options added via JS/ajax.
				populateList();

				listbox.find( 'li.sui-select-listitem' ).on( 'click', function( ev ) {

					const option = $( ev.target );

					selectItem( option, option.attr( 'data-color' ), false );
					handleValue();

				});
			});
		};

		let createItem = ( option, box, index, isinit ) => {

			const itemid   = select.attr( 'id' ) + '-item-';
			const listitem = $( '<li role="option" class="sui-select-listitem"></li>' ).appendTo( box );

			// Set "isinit" default value to "false".
			isinit = ( 'undefined' === typeof isinit ) ? false : isinit;

			// Set item an unique id.
			listitem.attr( 'id', itemid + index );

			// Set item value.
			listitem.data( 'value', option.val() );

			// Set item name value.
			if ( 'undefined' !== typeof option.attr( 'data-icon' ) ) {

				listitem.addClass( 'sui-listitem-with-icon' );
				listitem.html( '<span class="sui-icon-' + option.data( 'icon' ) + '" aria-hidden="true"></span>' + option.text() );

				if ( 'undefined' !== typeof select.attr( 'data-icon-size' ) ) {

					switch ( select.data( 'icon-size' ) ) {

						case 'sm':
						case 'small':
							listitem.find( '[class*="sui-icon-"]' ).addClass( 'sui-sm' );
							break;

						case 'md':
						case 'medium':
							listitem.find( '[class*="sui-icon-"]' ).addClass( 'sui-md' );
							break;

						case 'lg':
						case 'large':
							listitem.find( '[class*="sui-icon-"]' ).addClass( 'sui-lg' );
							break;

						case 'xl':
						case 'extralarge':
						case 'extra-large':
							listitem.find( '[class*="sui-icon-"]' ).addClass( 'sui-xl' );
							break;

					}
				}
			} else if ( 'undefined' !== typeof option.attr( 'data-color' ) ) {

				listitem.addClass( 'sui-listitem-with-color' );
				listitem.html( '<span style="background-color: ' + option.data( 'color' ) + '" aria-hidden="true"></span>' + option.text() );

				switch ( option.data( 'color' ) ) {

					case '#FFF':
					case 'white':
					case '#FFFFFF':
						listitem.find( 'span' ).css({
							borderColor: '#2C2E2F'
						});
						break;

					default:
						listitem.find( 'span' ).css({
							borderColor: option.data( 'color' )
						});
						break;
				}
			} else {
				listitem.text( option.text() );
			}

			// Disable item.
			if ( option.is( ':disabled' ) ) {
				listitem.addClass( 'sui-disabled' );
				listitem.attr( 'aria-disabled', true );
			}

			if ( 'undefined' !== typeof select.attr( 'placeholder' ) ) {
				placeholder();
			} else {

				if ( option.val() === select.val() ) {
					selectItem( listitem, option.attr( 'data-color' ), isinit );
				}
			}
		};

		// Add all the options to the new DOM elements.
		let populateList = () => {

			const children = select.children();

			// Make sure listbox is empty.
			listbox.empty();

			children.each( function( index ) {

				const idx = index;
				const option = $( this );
				const child = children[idx];

				let listgroup, grouplabel;

				// Check if item is an "option".
				if ( aria.Utils.hasTag( child, 'OPTION' ) ) {

					createItem( option, listbox, index, true );

				} else {

					if ( aria.Utils.hasTag( child, 'OPTGROUP' ) ) {

						listgroup = $( '<li class="sui-select-listgroup"></li>' ).appendTo( listbox );

						// Add group label.
						if ( 'undefined' !== typeof option.prop( 'label' ) ) {
							grouplabel = $( '<span class="sui-listgroup-label"></span>' ).appendTo( listgroup );
							grouplabel.text( option.prop( 'label' ) );
						}

						listgroup = $( '<ul></ul>' ).appendTo( listgroup );

						option.find( 'option' ).each( function( index ) {

							const option = $( this );

							createItem( option, listgroup, index + '-group-' + idx );

						});

					}
				}
			});
		};

		// Checks the option value for a link.
		let handleValue = () => {

			let val = select[0].value;

			// If option is link, navigate to it.
			if ( val.match( '^https?:\/\/|#' ) ) {
				window.location.href = val;
			}
		};

		// Toggle the dropdown state between open/closed.
		let stateToggle = () => {

			// Check if select is disabled.
			if ( container.find( 'select' ).is( ':disabled' ) ) {
				return;
			}

			// Check if container is already active (opened).
			if ( ! container.hasClass( 'sui-active' ) ) {
				stateOpen();
			} else {
				stateClose();
			}
		};

		// Close the dropdown list.
		let stateClose = ( item ) => {

			if ( ! item ) {
				item = container;
			}

			// Remove "active" class to container.
			item.removeClass( 'sui-active' );

			// Remove "expanded" attribute from button.
			button.removeAttr( 'aria-expanded' );

			// FIX: Make sure closed accordion table row closes.
			item.closest( 'tr' ).removeClass( 'select-open' );
		};

		// Open the dropdown list.
		let stateOpen = () => {

			$( 'div.sui-select.sui-active' ).each( function() {
				stateClose( $( this ) );
			});

			// Add "active" class to container.
			container.addClass( 'sui-active' );

			// Add "expanded" attribute to button.
			button.attr( 'aria-expanded', true );

			// FIX: Make sure closed accordion table row remains open.
			container.closest( 'tr' ).addClass( 'select-open' );

		};

		// Set placeholder when exists.
		let placeholder = () => {

			// Add an empty option to select.
			select.prepend( '<option value=""></option>' ).val( '' );
			select.val( '' );

			// Add placeholder text to select button.
			value.text( select.attr( 'placeholder' ) );
			button.addClass( 'sui-select-placeholder' );

		};

		// Visually mark the specified option as "selected".
		let selectItem = ( option, color, isinit ) => {

			isinit = ( 'undefined' === typeof isinit ) ? false : isinit;

			if ( 'undefined' !== typeof color ) {
				value.html( '<span style="background-color: ' + color + '" data-color="' + color + '"></span>' + option.text() );
			} else {
				value.text( option.text() );
			}

			// Remove placeholder class from button.
			button.removeClass( 'sui-select-placeholder' );

			$( '.sui-active', listbox ).removeAttr( 'aria-selected' );
			$( '.sui-active', listbox ).removeClass( 'sui-active' );

			option.addClass( 'sui-active' );
			option.attr( 'aria-selected', true );

			listbox.attr( 'aria-activedescendant', option.attr( 'id' ) );

			stateClose();

			// Also update the select list value.
			select.val( option.data( 'value' ) );

			if ( ! isinit ) {
				select.trigger( 'change' );
				button.focus();
			}
		};

		// Initializer.
		let init = () => {

			createElement();
			populateList();
			changeSelection();

			listbox.find( 'li.sui-select-listitem' ).on( 'click', function onItemClick( ev ) {

				let option = $( ev.target );

				selectItem( option, option.data( 'color' ), false );
				handleValue();

			});

			button.on( 'click', function() {
				stateToggle();
			});

			$( document ).click( function onOutsideClick( ev ) {

				let element = $( ev.target );

				if ( element.closest( 'div.sui-select' ).length ) {
					return;
				}

				stateClose();

			});
		};

		init();

		return this;

	};

	// Execute function on load.
	$( 'SUI_BODY_CLASS .sui-select:not([multiple])' ).each( function() {
		SUI.Select( this );
	});

}( jQuery ) );
