( function( $ ) {

	// Enable strict mode
	'use strict';

	// Define global SUI object if it doesn't exist
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	SUI.tutorialsSlider = function( sliderContainer ) {

		$( sliderContainer ).find( '.wp-smush-tutorials-button' ).on( 'click', function( e ) {
			const $button = $( e.currentTarget ),
				$sliderContainer = $button.closest( '.wp-smush-tutorials-section' ),
				amountOfSlides = $sliderContainer.find( '.wp-smush-slider-wrapper li' ).length;

			// If there isn't more than 1 slide, we don't need the slider functionality.
			if ( 1 >= amountOfSlides ) {
				return;
			}

			const direction = $button.data( 'direction' ),
				activeSlideNumber = parseInt( $sliderContainer.data( 'active' ) ),
				newActiveNumber = 'next' === direction ? activeSlideNumber + 1 : activeSlideNumber - 1,
				$newActiveSlide = $sliderContainer.find( `[data-slide="${ newActiveNumber }"]` );

			// Return if the following slide doesn't exist for some reason.
			if ( ! $newActiveSlide.length ) {
				return;
			}

			const $activeSlide = $sliderContainer.find( `[data-slide="${ activeSlideNumber }"]` ),
				$nextButton = $sliderContainer.find( '.wp-smush-slider-button-next' ),
				$prevButton = $sliderContainer.find( '.wp-smush-slider-button-prev' );

			// Hide the previous slide, show the new one.
			$activeSlide.attr( 'tabindex', '-1' );
			$activeSlide.addClass( 'sui-hidden' );
			$activeSlide.attr( 'aria-hidden', 'true' );
			$newActiveSlide.attr( 'tabindex', '0' );
			$newActiveSlide.removeClass( 'sui-hidden' );
			$newActiveSlide.attr( 'aria-hidden', 'false' );

			// Update the "active slide" flag.
			$sliderContainer.attr( 'data-active', newActiveNumber );
			$sliderContainer.data( 'active', newActiveNumber );

			// Focus on the new slide.
			$newActiveSlide[0].focus();

			if ( 'next' === direction ) {
				$prevButton.removeAttr( 'disabled' );
				$prevButton.removeAttr( 'aria-disabled' );

				// Hide the 'next' button if we moved forward and we're now in the last slide.
				if ( amountOfSlides === newActiveNumber ) {
					$nextButton.attr( 'disabled', true );
					$nextButton.attr( 'aria-disabled', 'true' );
				}
			} else {
				$nextButton.removeAttr( 'disabled' );
				$nextButton.removeAttr( 'aria-disabled' );

				// Hide the 'prev' button if we moved backward and we're now in the first slide.
				if ( 1 === newActiveNumber ) {
					$prevButton.attr( 'disabled', true );
					$prevButton.attr( 'aria-disabled', 'true' );
				}
			}
		});

		/**
		 * @namespace aria
		 */
		let aria = aria || {};

		// Key codes.
		aria.KeyCode = {
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

		// Handling accessibility for the tutorials tab.
		$( '#smush-box-tutorials div[role="link"]' ).on( 'click', function( e ) {

			let ref = null !== e.target ? e.target : e.srcElement;

			if ( ref ) {
				window.open( ref.getAttribute( 'data-href' ), '_blank' );
			}
		}).on( 'keydown', function( e ) {

			const focusOnNextTut = function( direction ) {
				const current = $( ref ).data( 'tutorial' ),
					next = 'next' === direction ? current + 1 : current - 1;

				let $nextTut = $( `#smush-box-tutorials [data-tutorial="${ next }"]` );

				// When we are at the end and moving forward, or at the beginning and moving backward.
				if ( ! $nextTut.length ) {
					const allTuts = $( '#smush-box-tutorials .wp-smush-tutorial-item' ),
						nextTutKey = 'next' === direction ? 0 : allTuts.length - 1;
					$nextTut = allTuts[ nextTutKey ];
				}

				$nextTut.focus();
			};

			let key = e.which || e.keyCode,
				ref = null !== e.target ? e.target : e.srcElement;

			switch ( key ) {

				case aria.KeyCode.RETURN :
					if ( ref ) {
						window.open( ref.getAttribute( 'data-href' ), '_blank' );
					}
					break;

				case aria.KeyCode.LEFT :
					focusOnNextTut( 'prev' );
					break;

				case aria.KeyCode.RIGHT :
					focusOnNextTut( 'next' );
					break;
			}
		});

	};

	$( 'SUI_BODY_CLASS .wp-smush-tutorials-section' ).each( function() {
		SUI.tutorialsSlider( this );
	});

}( jQuery ) );
