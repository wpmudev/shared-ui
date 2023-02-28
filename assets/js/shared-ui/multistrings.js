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
			$( '<div class="sui-form-field sui-multistrings" tabindex="-1" aria-hidden="true" />' ).insertAfter( parent );

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

		function bindFocus( $mainWrapper ) {

			const $listWrapper = $mainWrapper.find( '.sui-multistrings' );

			$listWrapper.on( 'click', function( e ) {
				const $this = $( e.target );

				if ( 'sui-multistrings-list' !== $this.attr( 'class' ) ) {
					return;
				}

				$listWrapper.find( '.sui-multistrings-input input' ).trigger( 'focus' );
			});

			const $input = $listWrapper.find( '.sui-multistrings-input input' ),
				$textarea = $mainWrapper.find( 'textarea' ),
				$stringList = $mainWrapper.find( '.sui-multistrings-list' );

			const addSuiFocus = $element => {

				$element.on( 'focus', () => {
					$stringList.addClass( 'sui-focus' );
					$element.off( 'blur' ).on( 'blur', function() {
						$stringList.removeClass( 'sui-focus' );
					});
				});
			};

			addSuiFocus( $input );
			addSuiFocus( $textarea );
		}

		function buildInput( textarea, uniqid ) {

			let html            = '',
				placeholder     = '',
				ariaLabel       = '',
				ariaDescription = ''
				;

			const dataPlaceholder = textarea.attr( 'placeholder' );
			const dataLabel = textarea.attr( 'data-field-label' );

			if ( 'undefined' !== typeof dataPlaceholder && '' !== dataPlaceholder ) {
				placeholder = ' placeholder="' + dataPlaceholder + '"';
			}

			if ( 'undefined' !== typeof dataLabel && '' !== dataLabel ) {
				ariaLabel = ' aria-labelledby="' + uniqid + '-label"';
				textarea.attr( 'aria-labelledby', uniqid + '-label' );
			} else {

				if ( textarea.closest( '.sui-form-field' ).find( '.sui-label' ).length ) {
					ariaLabel = ' aria-labelledby="' + uniqid + '-label"';
				}

				textarea.attr( 'aria-labelledby', uniqid + '-label' );

			}

			if ( 'undefined' !== typeof dataLabel && '' !== dataLabel ) {
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

				html += '<span class="sui-icon-page sui-sm" aria-hidden="true"></span>';
				html += itemName;
				html += '<button class="sui-button-close">';
					html += '<span class="sui-icon-close" aria-hidden="true"></span>';
					html += '<span class="sui-screen-reader-text">Delete</span>';
				html += '</button>';

			html += '</li>';

			return html;

		}

		function bindRemoveTag( $mainWrapper ) {

			const $removeButtons = $mainWrapper.find( '.sui-multistrings-list .sui-button-close' );
			$removeButtons.off( 'click' ).on( 'click', removeTag );
		}

		function insertStringOnLoad( textarea, uniqid, disallowedCharsArray ) {

			let html   = '',
				$mainWrapper = textarea.closest( '.sui-multistrings-wrap' ),
				$entriesList = $mainWrapper.find( '.sui-multistrings-list' ),
				forbiddenRemoved = cleanTextarea( textarea.val(), disallowedCharsArray, true );

			// Split lines for inserting the tags and cleaning the new textarea value.
			const splitStrings = forbiddenRemoved.split( /[\r\n]/gm ),
				cleanStringsArray = [];

			// Insert the tags and add clean values to the cleanStringsArray.
			for ( let i = 0; i < splitStrings.length; i++ ) {
				const stringLine = splitStrings[i].trim();
				if ( 0 === stringLine.length ) {
					continue;
				}
				html += buildItem( stringLine );
				cleanStringsArray.push( stringLine );
			}

			// Clean-up textarea value with the cleanStringsArray joined by newlines.
			const newTextareaValue = cleanStringsArray.join( '\n' );
			textarea.val( newTextareaValue );

			// Build input to insert strings.
			html += buildInput( textarea, uniqid );

			$entriesList.append( html );

			bindRemoveTag( $mainWrapper );
		}

		function getDisallowedChars( $mainWrapper ) {
			const $textarea = $mainWrapper.find( 'textarea.sui-multistrings' ),
				disallowedCharsArray = [];

			let customDisallowedKeys = $textarea.data( 'disallowedKeys' );

			if ( customDisallowedKeys ) {

				if ( 'number' === typeof customDisallowedKeys ) {
					customDisallowedKeys = customDisallowedKeys.toString();
				}

				// Make an array from the user defined keys.
				const customKeysArray = customDisallowedKeys.split( ',' );

				for ( let key of customKeysArray ) {

					// Convert to integer.
					const intKey = parseInt( key, 10 );

					// And filter out any NaN.
					if ( ! isNaN( intKey ) ) {

						// Convert ascii code to character.
						disallowedCharsArray.push( String.fromCharCode( intKey ) );
					}
				}
			}

			return disallowedCharsArray;
		}

		function getRegexPatternForDisallowedChars( disallowedCharsArray ) {

			// Regex for removing the disallowed keys from the inserted strings.
			const escapeRegExp = string => string.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' ),
				disallowedPattern = escapeRegExp( disallowedCharsArray.join( '' ) );

			return disallowedPattern;
		}

		function handleInsertTags( $mainWrapper, disallowedCharsArray ) {

			const $tagInput = $mainWrapper.find( '.sui-multistrings-input input' ),
				$textarea = $mainWrapper.find( 'textarea.sui-multistrings' ),
				disallowedString = getRegexPatternForDisallowedChars( disallowedCharsArray ),
				regex = new RegExp( `[\r\n${disallowedString}]`, 'gm' );

			// Sanitize the values on keydown.
			$tagInput.on( 'keydown', function( e ) {

				// Do nothing if the key is from the disallowed ones.
				if ( disallowedCharsArray.includes( e.key ) ) {
					e.preventDefault();
					return;
				}

				let input    = $( this ),
					oldValue = $textarea.val(),
					newValue = input.val();

				// Sanitize value.
				newValue = newValue.replace( /</g, '&lt;' );
				newValue = DOMPurify.sanitize( newValue );

				// Get rid of new lines, commas, and any chars passed by the admin from the newly entered value.
				const newTrim = newValue.replace( regex, '' ),
					isEnter   = ( 13 === e.keyCode );

				if ( isEnter ) {
					e.preventDefault();
					e.stopPropagation();
				}

				// If there's no value to add, don't insert any new value.
				if ( 0 !== newTrim.length && 0 !== newTrim.trim().length ) {

					if ( isEnter ) {
						const newTextareaValue = oldValue.length ? `${ oldValue }\n${ newTrim }` : newTrim;

						// Print new value on textarea.
						$textarea.val( newTextareaValue );

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

		function handleTextareaChange( $mainWrapper, disallowedCharsArray ) {

			const textarea = $mainWrapper.find( 'textarea.sui-multistrings' );

			let oldValue = textarea.val(),
				isTabTrapped = true;

			// Keep tab trapped when focusing on the textarea.
			textarea.on( 'focus', () => isTabTrapped = true );

			textarea.on( 'keydown', function( e ) {

				// Do nothing if the key is from the disallowed ones.
				if ( disallowedCharsArray.includes( e.key ) ) {
					e.preventDefault();
					return;
				}

				// If it's tab...
				if ( 9 === e.keyCode ) {

					// Add a new line if it's trapped.
					if ( isTabTrapped ) {
						e.preventDefault();

						let start = this.selectionStart,
							end = this.selectionEnd;

						// Insert a new line where the caret is.
						$( this ).val( $( this ).val().substring( 0, start ) +
							'\n' +
							$( this ).val().substring( end ) );

						// Put caret at right position again.
						this.selectionStart = start + 1;
						this.selectionEnd = this.selectionStart;
					}

					// Release the tab.
				} else if ( 27 === e.keyCode ) {
					isTabTrapped = false;
				}

			}).on( 'keyup change', function( e ) {

				const currentValue = textarea.val();

				// Nothing has changed, do nothing.
				if ( currentValue === oldValue ) {
					return;
				}

				// Clear up the content.
				const cleanedCurrentValue = cleanTextarea( currentValue, disallowedCharsArray );

				// Set the current value as the old one for future iterations.
				textarea.val( cleanedCurrentValue );
				oldValue = cleanedCurrentValue;

				let textboxValuesArray = cleanedCurrentValue.split( /[\r\n]+/gm ),
					tags = $mainWrapper.find( '.sui-multistrings-list li:not(.sui-multistrings-input)' ),
					tagsTitles = [];

				for ( let tag of tags ) {
					tagsTitles.push( $( tag ).attr( 'title' ) );
				}

				const areEqual = compareArrays( textboxValuesArray, tagsTitles );

				// The existing elements changed, update the existing tags.
				if ( ! areEqual ) {

					$mainWrapper.find( '.sui-multistrings-list li:not(.sui-multistrings-input)' ).remove();

					for ( let value of textboxValuesArray ) {
						value = value.trim();
						if ( value.length ) {

							// Print new value on the list.
							const html = buildItem( value );
							$( html ).insertBefore( $mainWrapper.find( '.sui-multistrings-input' ) );
						}
					}

					// Bind the event to remove the tags.
					bindRemoveTag( $mainWrapper );
				}

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

		function cleanTextarea( string, disallowedCharsArray, isLoad = false ) {

			const disallowedString = getRegexPatternForDisallowedChars( disallowedCharsArray ),
				regex = new RegExp( `[${disallowedString}]+|((\\r\\n|\\n|\\r)\$)|^\\s*$`, 'gm' );

			let clearedString = string.replace( regex, '' );

			if ( ! isLoad ) {

				// Avoid removing the last newline if it existed.
				const endsInNewline = string.match( /\n$/ );
				if ( endsInNewline ) {
					clearedString += '\n';
				}
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

					const $mainWrapper = multistrings.closest( '.sui-multistrings-wrap' ),
						disallowedCharsArray = getDisallowedChars( $mainWrapper );

					insertStringOnLoad( multistrings, uniqueId, disallowedCharsArray );

					handleInsertTags( $mainWrapper, disallowedCharsArray );
					handleTextareaChange( $mainWrapper, disallowedCharsArray );
					bindFocus( $mainWrapper );

				});
			}
		}

		init();

		return this;

	};

	SUI.multistrings();

}( jQuery ) );
