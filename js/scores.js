( function( $ ) {

    // Enable strict mode.
    'use strict';

    // Define global SUI object if it doesn't exist.
    if ( 'object' !== typeof window.SUI ) {
        window.SUI = {};
    }

    SUI.loadCircleScore = function( el ) {
		var dial          = $( el ).find( 'svg circle:last-child' ),
			score         = $( el ).data( 'score' ),
			radius        = 42,
			circumference = 2 * Math.PI * radius,
			dashLength    = ( circumference / 100 ) * score,
			gapLength     = dashLength * 100 - score,
			svg           =
				'<svg viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n' +
					'<circle stroke-width="16" cx="50" cy="50" r="42" />\n' +
					'<circle stroke-width="16" cx="50" cy="50" r="42" stroke-dasharray="0,' + gapLength + '" />\n' +
				'</svg>\n' +
				'<span class="sui-circle-score-label">' + score + '</span>\n';

		// Add svg to score element, add loaded class, & change stroke-dasharray to represent target score/percentage.
		$( el ).prepend( svg ).addClass( 'loaded' ).find( 'circle:last-child' ).css( 'animation', 'sui' + score + ' 3s forwards' );
	};

	$( 'SUI_BODY_CLASS .sui-circle-score' ).each( function() {
		SUI.loadCircleScore( this );
	});

}( jQuery ) );
