( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exists.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	SUI.multistrings = function() {

		let multistrings = $( '[data-multistrings]' );

		function hideTextarea( element ) {

			element
				.addClass( 'sui-screen-reader-text' ) // Hide element for sighted users, but allow screenreader to interact with it.
				.css({ display: '' }) // Remove hidden styles (if exists).
				;
		}

		function wrapTextarea( element ) {

			if ( ! element.parent().hasClass( 'sui-form-field' ) ) {
				element.wrap( '<div class="sui-form-field"></div>' )
			}
		}

		function buildElement( element ) {

			// Define HTML content.
			let html  = '',
				value = element.val(),
				list,
				input
				;

			html += '<ul class="sui-multistrings" aria-hidden="true">';

				// Insert current available strings.
				if ( 0 !== value.replace( /^\s+|\s+$/g, '' ).length ) {

					let lines = value.replace( /^\s*[\r\n]/gm, '' ).trim().split( /[\r\n,\s]+/gm );

					for ( let i = 0; i < lines.length; i++ ) {
						let title = lines[i];
						html += '<li title="' + title + '">';
							html += '<i class="sui-icon-page sui-sm" aria-hidden="true"></i>';
							html += title;
							html += '<button>';
								html += '<i class="sui-icon-close" aria-hidden="true"></i>';
								html += '<span class="sui-screen-reader-text">Delete</span>';
							html += '</button>';
						html += '</li>';
					}
				}

				// Input field to new string.
				html += '<li class="sui-multistrings-input">';
					html += '<label class="sui-screen-reader-text">Hidden label</label>';
					html += '<input type="text" autocomplete="off" />';
				html += '</li>';

			html += '</ul>';

			$( html ).insertAfter( element );

			list  = element.next( '.sui-multistrings' );
			input = list.find( '.sui-multistrings-input input' );

			insertString( input, element );

		}

		function insertString( input, element ) {

			let last, curValue, newValue, curTrim, newTrim;

			// Get last item from list.
			last = input.parent( 'li' );

			input.on( 'keyup', function( e ) {

				/**
				 * Detect if clicked on special key to insert content.
				 *
				 *  13: enter
				 *  32: space
				 * 188: comma
				 */
				if ( 13 === e.keyCode || 32 === e.keyCode || 188 === e.keyCode ) {

					curValue = element.val();
					newValue = input.val();

					// Remove "comma" or "space" when inserted.
					if ( 32 === e.keyCode || 188 === e.keyCode ) {
						newValue = input.val().slice( 0, -1 );
					}

					curTrim = curValue.replace( /^\s*[\r\n]/gm, '' ).trim().split( /[\r\n,\s]+/gm );
					newTrim = newValue.replace( /^\s*[\r\n]/gm, '' ).trim().split( /[\r\n,\s]+/gm );

					// Check on empty spaces.
					if ( 0 !== newValue.replace( /^\s+|\s+$/g, '' ).length ) {

						// Print new value on textarea.
						element.val( curTrim + ',' + newTrim );

						// Print new value on the list.
						$( '<li title="' + newValue + '">' +
							'<i class="sui-icon-page sui-sm" aria-hidden="true"></i>' +
							newValue +
							'<button>' +
								'<i class="sui-icon-close" aria-hidden="true"></i>' +
								'<span class="sui-screen-reader-text">Delete</span>' +
							'</button>' +
						'</li>' ).insertBefore( last );

						// Clear input value.
						input.val( '' );
					} else {

						// Empty input value when isolated "comma" or "space" has been inserted.
						if ( 32 === e.keyCode || 188 === e.keyCode ) {
							input.val( '' );
						}
					}
				}
			});
		}

		function init() {

			multistrings.each( function() {

				multistrings = $( this );

				if ( ! multistrings.is( 'textarea' ) ) {
					throw new Error( 'Multistring with id="' + multistrings.attr( 'id' ) + '" needs to be "textarea".' );
				}

				if ( true === multistrings.attr( 'data-multistrings' ) || 'true' === multistrings.attr( 'data-multistrings' ) ) {
					hideTextarea( multistrings );
					wrapTextarea( multistrings );
					buildElement( multistrings );
				}
			});
		}

		init();

		return this;

	};

	SUI.multistrings();

}( jQuery ) );
