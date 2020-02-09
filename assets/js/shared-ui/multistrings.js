( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exists.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	SUI.multistrings = function() {

		function buildWrapper( textarea, uniqid ) {

			let parent      = textarea.parent(),
				label       = parent.find( '> .sui-label' ),
				description = parent.find( '> .sui-description' )
				;


			/**
			 * Build main wrapper for the whole multistring element.
			 */
			parent.wrap( '<div class="sui-multistrings-wrap"></div>' );

			/**
			 * Build ARIA-ready element.
			 */

			// Hide field.
			parent
				.addClass( 'sui-multistrings-aria' )
				.removeClass( 'sui-form-field' )
				;

			/**
			 * Build visual-ready element.
			 */

			// Build a new field.
			$( '<div class="sui-form-field sui-multistrings" aria-hidden="true" />' ).insertAfter( parent );

			let newParent = parent.next( '.sui-multistrings' );

			if ( label.length ) {

				newParent.append( label.clone() );

				if ( '' !== newParent.find( '.sui-label' ).attr( 'for' ) ) {
					newParent.find( '.sui-label' ).attr( 'for', newParent.find( '.sui-label' ).attr( 'for' ) + '-input-multistrings' );
				}

				if ( '' !== newParent.find( '.sui-label' ).attr( 'id' ) ) {
					newParent.find( '.sui-label' ).attr( 'id', newParent.find( '.sui-label' ).attr( 'id' ) + '-input-multistrings' );
				}
			}

			newParent.append( '<ul class="sui-multistrings-list" />' );

			if ( description.length ) {

				newParent.append( description.clone() );

				const $childDescription = newParent.find( '.sui-description' );

				if ( '' !== $childDescription.attr( 'id' ) ) {
					const newId = $childDescription.attr( 'id' ) + '-input-multistrings';
					$childDescription.attr( 'id', newId );
				}
			}
		}

		// function buildWrapper( textarea, uniqid ) {

		// 	let parent = textarea.parent();

		// 	let hasParent      = parent.hasClass( 'sui-form-field' );
		// 	let hasLabel       = 'undefined' !== typeof textarea.attr( 'data-field-label' ) && '' !== textarea.attr( 'data-field-label' );
		// 	let hasDescription = 'undefined' !== typeof textarea.attr( 'data-field-description' ) && '' !== textarea.attr( 'data-field-description' );

		// 	// Build main wrapper.
		// 	if ( ! hasParent ) {
		// 		textarea.wrap( '<div class="sui-form-field" />' );
		// 	}

		// 	// Get new parent.
		// 	parent = textarea.parent();

		// 	// Build textarea label.
		// 	if ( hasLabel ) {
		// 		parent.prepend(
		// 			'<label for="' + uniqid + '" id="' + uniqid + '-label" class="sui-label">' + textarea.attr( 'data-field-label' ) + '</label>'
		// 		);
		// 	} else {

		// 		hasLabel = parent.find( '.sui-label' );

		// 		if ( hasLabel.length ) {
		// 			hasLabel
		// 				.attr( 'for', uniqid )
		// 				.attr( 'id', uniqid + '-label' )
		// 				;
		// 		}
		// 	}

		// 	// Wrap textarea.
		// 	textarea.wrap( '<div class="sui-multistrings-wrap" />' );

		// 	// Build textarea description.
		// 	if ( hasDescription ) {
		// 		parent.append(
		// 			'<p id="' + uniqid + '-description" class="sui-description">' + textarea.attr( 'data-field-description' ) + '</p>'
		// 		);
		// 	} else {

		// 		hasDescription = parent.find( '.sui-description' );

		// 		if ( hasDescription.length ) {
		// 			hasDescription.attr( 'id', uniqid + '-description' );
		// 		}
		// 	}
		// }

		function buildInput( textarea, uniqid ) {

			let html            = '',
				placeholder     = '',
				ariaLabel       = '',
				ariaDescription = ''
				;

			if ( 'undefined' !== typeof textarea.attr( 'placeholder' ) && '' !== textarea.attr( 'placeholder' ) ) {
				placeholder = ' placeholder="' + textarea.attr( 'placeholder' ) + '"';
			}

			if ( 'undefinded' !== typeof textarea.attr( 'data-field-label' ) && '' !== textarea.attr( 'data-field-label' ) ) {
				ariaLabel = ' aria-labelledby="' + uniqid + '-label"';
				textarea.attr( 'aria-labelledby', uniqid + '-label' );
			} else {

				if ( textarea.closest( '.sui-form-field' ).find( '.sui-label' ).length ) {
					ariaLabel = ' aria-labelledby="' + uniqid + '-label"';
				}

				textarea.attr( 'aria-labelledby', uniqid + '-label' );

			}

			if ( 'undefinded' !== typeof textarea.attr( 'data-field-label' ) && '' !== textarea.attr( 'data-field-label' ) ) {
				ariaDescription = ' aria-describedby="' + uniqid + '-description"';
			} else {

				if ( textarea.closest( '.sui-form-field' ).find( '.sui-label' ).length ) {
					ariaDescription = ' aria-ariaDescription="' + uniqid + '-description"';
				}
			}

			html += '<li class="sui-multistrings-input">';

				html += '<input type="text" autocomplete="off"' + placeholder + ' id="' + uniqid + '"' + ariaLabel + ariaDescription + ' aria-autocomplete="none" />';

			html += '</li>';

			return html;

		}

		function buildItem( itemName ) {

			let html = '';

			html += '<li title="' + itemName + '">';

				html += '<i class="sui-icon-page sui-sm" aria-hidden="true"></i>';
				html += itemName;
				html += '<button class="sui-button-close">';
					html += '<i class="sui-icon-close" aria-hidden="true"></i>';
					html += '<span class="sui-screen-reader-text">Delete</span>';
				html += '</button>';

			html += '</li>';

			return html;

		}

		function bindRemoveTag( $mainWrapper ) {

			const $removeButtons = $mainWrapper.find( '.sui-multistrings-list .sui-button-close' );
			$removeButtons.off( 'click' ).on( 'click', removeTag );
		}

		function insertStringOnLoad( textarea, uniqid ) {

			let html   = '',
				$mainWrapper = textarea.closest( '.sui-multistrings-wrap' ),
				$entriesList = $mainWrapper.find( '.sui-multistrings-list' ),
				value  = textarea.val()
				;

			const removeForbidden = cleanTextarea( value );
			const splitStrings    = removeForbidden.split( /[\r\n]/gm );

			// Clean-up textarea value.
			textarea.val( removeForbidden );

			// Add currently available strings.
			if ( 0 !== removeForbidden.length ) {

				for ( let i = 0; i < splitStrings.length; i++ ) {
					html += buildItem( splitStrings[i]);
				}
			}

			// Build input to insert strings.
			html += buildInput( textarea, uniqid );

			$entriesList.append( html );

			bindRemoveTag( $mainWrapper );
		}

		function handleInsertTags( $mainWrapper ) {

			const $tagInput = $mainWrapper.find( '.sui-multistrings-input input' );

			$tagInput.on( 'keydown', function( e ) {

				const textarea = $mainWrapper.find( 'textarea.sui-multistrings' ),
					isEnter   = ( 13 === e.keyCode ),
					isSpace   = ( 32 === e.keyCode ),
					isComma   = ( 188 === e.keyCode );

				// Do nothing on space or comma.
				if ( isSpace || isComma ) {
					e.preventDefault();
					return;
				}

				let input    = $( this ),
					oldValue = textarea.val(),
					newValue = input.val();

				// Get rid of empty spaces, new lines, and commas from the newly entered value.
				const newTrim = newValue.replace( /[\r\n,\s]+/gm, '' );

				// If there's no value to add, don't insert any new value.
				if ( 0 !== newTrim.length ) {

					if ( isEnter ) {

						const newTextareaValue = oldValue.length ? `${ oldValue }\n${ newTrim }` : newTrim;

						// Print new value on textarea.
						textarea.val( newTextareaValue );

						// Print new value on the list.
						const html = buildItem( newTrim );
						$( html ).insertBefore( $mainWrapper.find( '.sui-multistrings-input' ) );

						// Clear input value.
						input.val( '' );

						// Bid the event to remove the tags.
						bindRemoveTag( $mainWrapper );

					} else {
						input.val( newTrim );
					}

				} else {
					input.val( '' );
				}

			});
		}

		function handleTextareaChange( $mainWrapper ) {

			const textarea = $mainWrapper.find( 'textarea.sui-multistrings' );

			let oldValue = textarea.val(),
				delayTimer;

			textarea.on( 'keydown', function( e ) {

				const isSpace   = ( 32 === e.keyCode ),
					isComma   = ( 188 === e.keyCode );

				// Do nothing on space or comma.
				if ( isSpace || isComma ) {
					e.preventDefault();
					return;
				}

			}).on( 'keyup change', function( e ) {

				if ( delayTimer ) {
					clearTimeout( delayTimer );
				}

				// Don't process the input right away. Wait until the user stopped typing (1 sec).
				delayTimer = setTimeout( function() {
					const currentValue = textarea.val();

					// Nothing has changed, do nothing.
					if ( currentValue === oldValue ) {
						return;
					}

					// Clear up the content.
					const cleanedCurrentValue = cleanTextarea( currentValue );

					// Set the current value as the old one for future iterations.
					textarea.val( cleanedCurrentValue );
					oldValue = cleanedCurrentValue;

					let textboxValues = textarea.val().split( /[\r\n\s]+/gm ).filter( el => el.length ),
						tags = $mainWrapper.find( '.sui-multistrings-list li:not(.sui-multistrings-input)' ),
						tagsTitles = [];

					for ( let tag of tags ) {
						tagsTitles.push( $( tag ).attr( 'title' ) );
					}

					const areEqual = compareArrays( textboxValues, tagsTitles );

					// The existing elements changed, update the existing tags.
					if ( ! areEqual ) {

						$mainWrapper.find( '.sui-multistrings-list li:not(.sui-multistrings-input)' ).remove();

						for ( let value of textboxValues ) {

							if ( value.length ) {

								// Print new value on the list.
								const html = buildItem( value );
								$( html ).insertBefore( $mainWrapper.find( '.sui-multistrings-input' ) );
							}
						}

						// Bind the event to remove the tags.
						bindRemoveTag( $mainWrapper );
					}

				}, 1000 );

			});
		}

		function compareArrays( firstArray, secondArray ) {

			if ( ! Array.isArray( firstArray ) || ! Array.isArray( secondArray ) ) {
				return false;
			}

			if ( firstArray.length !== secondArray.length ) {
				return false;
			}

			return firstArray.every( ( value, index ) => {
				return value === secondArray[ index ];
			});
		}

		function cleanTextarea( string ) {

			let clearedString = string.replace( /[^\S\r\n]+|[,]+|((\r\n|\n|\r)$)|^\s*$/gm, '' );

			// Avoid removing the last newline if it existed.
			const endsInNewline = string.match( /\n$/ );
			if ( endsInNewline ) {
				clearedString += '\n';
			}
			return clearedString;
		}

		function removeTag( e ) {

			const $removeButton = $( e.currentTarget ),
				$tag = $removeButton.closest( 'li' );

			const $hiddenTextarea = $removeButton.closest( '.sui-multistrings-wrap' ).find( 'textarea.sui-multistrings' ),
				textareaValue = $hiddenTextarea.val(),
				removedTag = $tag.attr( 'title' ),
				escapedRemovedTag = removedTag.replace( /[-\/\\^$*+?.()|[\]{}]/g, '\\$&' ),
				regex = new RegExp( `^${ escapedRemovedTag }\\s|^${ escapedRemovedTag }$`, 'm' ),
				newTextareaValue = textareaValue.replace( regex, '' );

			// Remove the string from the hidden textarea.
			$hiddenTextarea.val( newTextareaValue );
			$hiddenTextarea.trigger( 'change' );

			// Remove the tag the close button belongs to.
			$tag.remove();
		}

		function init() {

			let multistrings = $( '.sui-multistrings' );

			if ( 0 !== multistrings.length ) {

				multistrings.each( function() {

					multistrings = $( this );

					let uniqueId = '';

					const hasUniqueId = 'undefined' !== typeof multistrings.attr( 'id' ) && '' !== multistrings.attr( 'id' );
					const isTextarea  = multistrings.is( 'textarea' );
					const isWrapped   = multistrings.parent().hasClass( 'sui-form-field' );

					if ( ! hasUniqueId ) {
						throw new Error( 'Multistrings field require an ID attribute.' );
					} else {
						uniqueId = multistrings.attr( 'id' ) + '-strings';
					}

					if ( ! isTextarea ) {
						throw new Error( 'Multistrings field with id="' + multistrings.attr( 'id' ) + '" needs to be "textarea".' );
					}

					if ( ! isWrapped ) {
						throw new Error( 'Multistrings field needs to be wrapped inside "sui-form-field" div.' );
					}

					buildWrapper( multistrings, uniqueId );
					insertStringOnLoad( multistrings, uniqueId );

					const $mainWrapper = multistrings.closest( '.sui-multistrings-wrap' );
					handleInsertTags( $mainWrapper );
					handleTextareaChange( $mainWrapper );

				});
			}
		}

		init();

		return this;

	};

	// SUI.multistrings = function() {

	// 	let multistrings = $( '[data-multistrings]' );

	// 	function hideTextarea( element ) {

	// 		element
	// 			.addClass( 'sui-screen-reader-text' ) // Hide element for sighted users, but allow screenreader to interact with it.
	// 			.css({ display: '' }) // Remove hidden styles (if exists).
	// 			;
	// 	}

	// 	function wrapTextarea( element ) {

	// 		if ( ! element.parent().hasClass( 'sui-form-field' ) ) {
	// 			element.wrap( '<div class="sui-form-field"></div>' );
	// 		}
	// 	}

	// 	function buildItem( itemName ) {

	// 		let html = '';

	// 		html += '<li title="' + itemName + '">';
	// 			html += '<i class="sui-icon-page sui-sm" aria-hidden="true"></i>';
	// 			html += itemName;
	// 			html += '<button>';
	// 				html += '<i class="sui-icon-close" aria-hidden="true"></i>';
	// 				html += '<span class="sui-screen-reader-text">Delete</span>';
	// 			html += '</button>';
	// 		html += '</li>';

	// 		return html;

	// 	}

	// 	function buildInput( textarea ) {

	// 		let html, uniqueid;

	// 		html = '';

	// 		if ( 'undefined' !== typeof textarea.attr( 'id' ) || '' !== textarea.attr( 'id' ) ) {
	// 			uniqueid = textarea.attr( 'id' ) + '-input';
	// 		}

	// 		html += '<li class="sui-multistrings-input">';
	// 			html += '<label for="' + uniqueid + '" id="' + uniqueid + '-label" class="sui-screen-reader-text">Enter string value</label>';
	// 			html += '<input id="' + uniqueid + '" type="text" autocomplete="off" aria-labelledby="' + uniqueid + '-label" />';
	// 		html += '</li>';

	// 		return html;

	// 	}

	// 	function buildElement( element ) {

	// 		// Define HTML content.
	// 		let html  = '',
	// 			value = element.val(),
	// 			list,
	// 			input
	// 			;

	// 		html += '<ul class="sui-multistrings" aria-hidden="true">';

	// 			// Insert current available strings.
	// 			if ( 0 !== value.replace( /^\s+|\s+$/g, '' ).length ) {

	// 				let lines = value.replace( /^\s*[\r\n]/gm, '' ).trim().split( /[\r\n,\s]+/gm );

	// 				for ( let i = 0; i < lines.length; i++ ) {
	// 					let title = lines[i];
	// 					html += buildItem( title );
	// 				}
	// 			}

	// 			// Input field to new string.
	// 			html += buildInput( element );

	// 		html += '</ul>';

	// 		$( html ).insertAfter( element );

	// 		list  = element.next( '.sui-multistrings' );
	// 		input = list.find( '.sui-multistrings-input input' );

	// 		insertString( input, element );
	// 		removeString( input, element );

	// 	}

	// 	function insertString( input, element ) {
	// 		stringInput( input, element );
	// 		stringTextarea( input, element );
	// 	}

	// 	function stringInput( input, element ) {

	// 		let itemMarkup, curValue, curTrim, newValue, newTrim, lastItem;

	// 		/**
	// 		 * Insert a new string via input.
	// 		 */
	// 		input.on( 'keyup', function( e ) {

	// 			input = $( this );

	// 			lastItem = input.parent( 'li' );
	// 			curValue = element.val();
	// 			newValue = input.val();

	// 			// Remove "comma" or "space" when inserted.
	// 			if ( 32 === e.keyCode || 188 === e.keyCode ) {
	// 				newValue = input.val().slice( 0, -1 );
	// 				window.alert( e.keyCode );
	// 			}

	// 			curTrim = curValue.replace( /^\s*[\r\n]/gm, '' ).trim().split( /[\r\n,\s]+/gm );
	// 			newTrim = newValue.replace( /^\s*[\r\n]/gm, '' ).trim().split( /[\r\n,\s]+/gm );

	// 			/**
	// 			 * Detect if clicked on "enter" key to insert content.
	// 			 */
	// 			if ( 13 === e.keyCode ) {

	// 				// Check on empty spaces.
	// 				if ( 0 !== newValue.replace( /^\s+|\s+$/g, '' ).length ) {

	// 					// Print new value on textarea.
	// 					element.val( curTrim + ',' + newTrim );

	// 					// Print new value on the list.
	// 					$( itemMarkup ).insertBefore( lastItem );

	// 					// Clear input value.
	// 					input.val( '' );

	// 				} else {

	// 					// Empty input value when isolated "comma" or "space" has been inserted.
	// 					if ( 32 === e.keyCode || 188 === e.keyCode ) {
	// 						input.val( '' );
	// 					}
	// 				}
	// 			}
	// 		});
	// 	}

	// 	function stringTextarea( input, element ) {

	// 		let itemMarkup, newValue, trimValue, lastItem;

	// 		element.on( 'keyup', function( e ) {

	// 			element   = $( this );
	// 			newValue  = element.val();
	// 			trimValue = newValue.replace( /^\s*[\r\n]/gm, '' ).trim().split( /[\r\n,\s]+/gm );

	// 			/**
	// 			 * Detect if clicked on "enter" key to insert content.
	// 			 */
	// 			if ( 13 === e.keyCode ) {
	// 				window.alert( trimValue ); // TESTING...
	// 			}
	// 		});
	// 	}

	// 	function removeString( input, element ) {

	// 		/**
	// 		 * Detect if clicked on "backspace" key and input
	// 		 * is empty, if that's the case remove previous item.
	// 		 */
	// 		input.on( 'keydown', function( e ) {

	// 			input = $( this );

	// 			let value  = input.val(),
	// 				parent = input.parent(),
	// 				item   = parent.prev( 'li' )
	// 				;

	// 			if ( 8 === e.keyCode ) {

	// 				if ( 0 === value.replace( /^\s+|\s+$/g, '' ).length ) {

	// 					// Add last item added value to input.
	// 					input.val( item.attr( 'title' ) );

	// 					// Remove last item added value from textarea.
	// 					element.val( element.val().replace( item.attr( 'title' ), '' ) );

	// 					// Remove last item added from list.
	// 					item.remove();
	// 				}
	// 			}
	// 		});
	// 	}

	// 	function init() {

	// 		multistrings.each( function() {

	// 			multistrings = $( this );

	// 			if ( ! multistrings.is( 'textarea' ) ) {
	// 				throw new Error( 'Multistring with id="' + multistrings.attr( 'id' ) + '" needs to be "textarea".' );
	// 			}

	// 			if ( true === multistrings.attr( 'data-multistrings' ) || 'true' === multistrings.attr( 'data-multistrings' ) ) {
	// 				hideTextarea( multistrings );
	// 				wrapTextarea( multistrings );
	// 				buildElement( multistrings );
	// 			}
	// 		});
	// 	}

	// 	init();

	// 	return this;

	// };

	SUI.multistrings();

}( jQuery ) );
