( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	SUI.sliderBack = function( el ) {

		var slider = $( el ),
			dialog = slider.closest( '.sui-dialog' ),
			slides = slider.find( '.sui-slider-content > li' )
			;

		var navigation = slider.find( '.sui-slider-navigation' ),
			navButtons = navigation.find( 'button' ),
			btnBack    = navigation.find( '.sui-prev' ),
			btnNext    = navigation.find( '.sui-next' )
			;

		if ( ! dialog.hasClass( 'sui-dialog-onboard' ) ) {
			return;
		}

		function init() {

			var currSlide = slider.find( '.sui-slider-content > li.sui-current' ),
				prevSlide = currSlide.prev()
				;

			if ( ! prevSlide.length ) {

				if ( slider.hasClass( 'sui-infinite' ) ) {

					prevSlide = slider.find( '.sui-slider-content > li:last' );

					currSlide.removeClass( 'sui-current' );
					currSlide.removeClass( 'sui-loaded' );

					prevSlide.addClass( 'sui-current' );
					prevSlide.addClass( 'fadeInLeft' );

					navButtons.prop( 'disabled', true );

					setTimeout( function() {
						prevSlide.addClass( 'sui-loaded' );
						prevSlide.removeClass( 'fadeInLeft' );
					}, 600 );

					setTimeout( function() {
						navButtons.prop( 'disabled', false );
					}, 650 );
				}

			} else {

				currSlide.removeClass( 'sui-current' );
				currSlide.removeClass( 'sui-loaded' );

				prevSlide.addClass( 'sui-current' );
				prevSlide.addClass( 'fadeInLeft' );

				navButtons.prop( 'disabled', true );

				if ( ! slider.hasClass( 'sui-infinite' ) ) {

					btnNext.removeClass( 'sui-hidden' );

					if ( slides.first().data( 'slide' ) === prevSlide.data( 'slide' ) ) {
						btnBack.addClass( 'sui-hidden' );
					}
				}

				setTimeout( function() {
					prevSlide.addClass( 'sui-loaded' );
					prevSlide.removeClass( 'fadeInLeft' );
				}, 600 );

				setTimeout( function() {
					navButtons.prop( 'disabled', false );
				}, 650 );
			}
		}

		init();

		return this;
	};

	SUI.sliderNext = function( el ) {

		var slider = $( el ),
			dialog = slider.closest( '.sui-dialog' ),
			slides = slider.find( '.sui-slider-content > li' )
			;

		var navigation = slider.find( '.sui-slider-navigation' ),
			navButtons = navigation.find( 'button' ),
			btnBack    = navigation.find( '.sui-prev' ),
			btnNext    = navigation.find( '.sui-next' )
			;

		if ( ! dialog.hasClass( 'sui-dialog-onboard' ) ) {
			return;
		}

		function init() {

			var currSlide = slider.find( '.sui-slider-content > li.sui-current' ),
				nextSlide = currSlide.next()
				;

			if ( ! nextSlide.length ) {

				if ( slider.hasClass( 'sui-infinite' ) ) {

					nextSlide = slider.find( '.sui-slider-content > li:first' );

					currSlide.removeClass( 'sui-current' );
					currSlide.removeClass( 'sui-loaded' );

					nextSlide.addClass( 'sui-current' );
					nextSlide.addClass( 'fadeInRight' );

					navButtons.prop( 'disabled', true );

					setTimeout( function() {
						nextSlide.addClass( 'sui-loaded' );
						nextSlide.removeClass( 'fadeInRight' );
					}, 600 );

					setTimeout( function() {
						navButtons.prop( 'disabled', false );
					}, 650 );

				}

			} else {

				currSlide.removeClass( 'sui-current' );
				currSlide.removeClass( 'sui-loaded' );

				nextSlide.addClass( 'sui-current' );
				nextSlide.addClass( 'fadeInRight' );

				navButtons.prop( 'disabled', true );

				if ( ! slider.hasClass( 'sui-infinite' ) ) {

					btnBack.removeClass( 'sui-hidden' );

					if ( slides.length === nextSlide.data( 'slide' ) ) {
						btnNext.addClass( 'sui-hidden' );
					}
				}

				setTimeout( function() {
					nextSlide.addClass( 'sui-loaded' );
					nextSlide.removeClass( 'fadeInRight' );
				}, 600 );

				setTimeout( function() {
					navButtons.prop( 'disabled', false );
				}, 650 );

			}
		}

		init();

		return this;
	};

	SUI.sliderStep = function( el ) {

		var slider = $( el ),
			dialog = slider.closest( '.sui-dialog' )
			;

		var slides = slider.find( '.sui-slider-content' ),
			slide  = slides.find( '> li' )
			;

		var steps  = slider.find( '.sui-slider-steps' ),
			step   = steps.find( 'li' ),
			button = step.find( 'button' )
			;

		var navigation = slider.find( '.sui-slider-navigation' ),
			navButtons = navigation.find( 'button' ),
			navBack    = navigation.find( '.sui-prev' ),
			navNext    = navigation.find( '.sui-next' )
			;

		if ( ! dialog.hasClass( 'sui-dialog-onboard' ) && ! steps.hasClass( 'sui-clickable' ) ) {
			return;
		}

		function reset() {

			// Remove current class
			slide.removeClass( 'sui-current' );

			// Remove loaded state
			slide.removeClass( 'sui-loaded' );

		}

		function load( element ) {

			var button  = $( element ),
				index   = button.data( 'slide' )
				;

			var curSlide = button.closest( 'li[data-slide]' ),
				newSlide  = slides.find( '> li[data-slide="' + index + '"]' )
				;

			newSlide.addClass( 'sui-current' );

			if ( curSlide.data( 'slide' ) < newSlide.data( 'slide' ) ) {
				newSlide.addClass( 'fadeInRight' );
			} else {
				newSlide.addClass( 'fadeInLeft' );
			}

			navButtons.prop( 'disabled', true );

			if ( ! slider.hasClass( 'sui-infinite' ) ) {

				if ( 1 === newSlide.data( 'slide' ) ) {
					navBack.addClass( 'sui-hidden' );
					navNext.removeClass( 'sui-hidden' );
				}

				if ( slide.length === newSlide.data( 'slide' ) ) {
					navBack.removeClass( 'sui-hidden' );
					navNext.addClass( 'sui-hidden' );
				}
			}

			setTimeout( function() {

				newSlide.addClass( 'sui-loaded' );

				if ( curSlide.data( 'slide' ) < newSlide.data( 'slide' ) ) {
					newSlide.removeClass( 'fadeInRight' );
				} else {
					newSlide.removeClass( 'fadeInLeft' );
				}
			}, 600 );

			setTimeout( function() {
				navButtons.prop( 'disabled', false );
			}, 650 );
		}

		function init() {

			if ( button.length ) {

				button.on( 'click', function( e ) {

					reset();

					load( this );

					e.preventDefault();
					e.stopPropagation();

				});
			}
		}

		init();

		return this;
	};

	SUI.dialogSlider = function( el ) {

		var slider   = $( el ),
			dialog   = slider.closest( '.sui-dialog' ),
			btnBack  = slider.find( '.sui-slider-navigation .sui-prev' ),
			btnNext  = slider.find( '.sui-slider-navigation .sui-next' ),
			tourBack = slider.find( '*[data-a11y-dialog-tour-back]' ),
			tourNext = slider.find( '*[data-a11y-dialog-tour-next]' ),
			steps    = slider.find( '.sui-slider-steps' )
			;

		if ( ! dialog.hasClass( 'sui-dialog-onboard' ) || slider.hasClass( 'sui-slider-off' ) ) {
			return;
		}

		function init() {

			if ( btnBack.length ) {

				btnBack.on( 'click', function( e ) {

					SUI.sliderBack( slider );

					e.preventDefault();

				});
			}

			if ( tourBack.length ) {

				tourBack.on( 'click', function( e ) {

					SUI.sliderBack( slider );

					e.preventDefault();

				});
			}

			if ( btnNext.length ) {

				btnNext.on( 'click', function( e ) {

					SUI.sliderNext( slider );

					e.preventDefault();

				});
			}

			if ( tourNext.length ) {

				tourNext.on( 'click', function( e ) {

					SUI.sliderNext( slider );

					e.preventDefault();

				});
			}

			if ( steps.length ) {
				SUI.sliderStep( slider );
			}
		}

		init();

		return this;
	};

	$( '.sui-2-3-26 .sui-slider' ).each( function() {
		SUI.dialogSlider( this );
	});

}( jQuery ) );
