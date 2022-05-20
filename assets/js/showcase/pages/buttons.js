( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageButtons = ( page ) => {
		var body = $( 'body' ),
			page = 'showcase-page-' + page
			;

		var demo    = $( '.showcase-demo' ),
			options = demo.find( '.showcase-demo__options' ),
			preview = demo.find( '.showcase-demo__preview' )
			;

		if ( page !== body.attr( 'id' ) ) {
			return;
		}

		function changeColor() {
			var option = options.find( '[data-option="color"] select' );

			if ( options.find( '[data-option="color"]' ).length ) {

				option.on( 'change', function() {
					var option = $( this );

					preview.each( function() {
						var type   = $( this ).attr( 'data-type' ),
							button = $( this ).find( '.sui-button' );

						switch ( type ) {
							case 'solid':
							case 'light':
							case 'ghost':
								button
									.removeClass( 'sui-button--' + type + '-blue' )
									.removeClass( 'sui-button--' + type + '-red' )
									.removeClass( 'sui-button--' + type + '-purple' )
									.removeClass( 'sui-button--' + type + '-green' )
									.addClass( 'sui-button--' + type );

								if ( '' !== option.val() ) {
									button.addClass( 'sui-button--' + type + '-' + option.val() );
								}
								break;

							default:
								button
									.removeClass( 'sui-button--blue' )
									.removeClass( 'sui-button--red' )
									.removeClass( 'sui-button--purple' )
									.removeClass( 'sui-button--green' );

								if ( '' !== option.val() ) {
									button.addClass( 'sui-button--' + option.val() );
								}
								break;
						}
					});
				});
			}
		}

		function changeWidth() {
			var option = options.find( '[data-option="width"] input' );

			if ( options.find( '[data-option="width"]' ).length ) {

				option.on( 'click', function() {
					var option = $( this );

					preview.each( function() {
						var button = $( this ).find( '.sui-button' );

						if ( 'full-width' === option.val() ) {
							button.addClass( 'sui-button--full-width' );
						} else {
							button.removeClass( 'sui-button--full-width' );
						}
					});
				});
			}
		}

		function changeHeight() {
			var option = options.find( '[data-option="height"] input' );

			if ( options.find( '[data-option="height"]' ).length ) {

				option.on( 'click', function() {
					var option = $( this );

					preview.each( function() {
						var button = $( this ).find( '.sui-button' );

						button
							.removeClass( 'sui-button--height-40' )
							.removeClass( 'sui-button--height-50' )
							.removeClass( 'sui-button--height-60' )
							.removeClass( 'sui-button--height-70' );

						switch ( option.val() ) {
							case '40':
							case '50':
							case '60':
							case '70':
								button.addClass( 'sui-button--height-' + option.val() );
								break;
						}
					});
				});
			}
		}

		function changeIcon() {
			var option = options.find( '[data-option="icon"] input' );

			if ( options.find( '[data-option="icon"]' ).length ) {

				option.on( 'click', function() {
					var option = $( this );

					preview.each( function() {
						var button = $( this ).find( '.sui-button' );

						button.find( '.sui-button__icon' ).remove();

						switch ( option.val() ) {
							case 'leading':
								button.prepend(
									'<span class="sui-button__icon sui-icon-wpmudev-logo sui-sm" aria-hidden="true"></span>'
								);
								break;
							case 'trailing':
								button.append(
									'<span class="sui-button__icon sui-icon-wpmudev-logo sui-sm" aria-hidden="true"></span>'
								);
								break;
						}
					});
				});
			}
		}

		function init() {
			changeColor();
			changeWidth();
			changeHeight();
			changeIcon();
		}

		init();

		return this;
	};

	DEMO.pageButtons( 'buttons' );

}( jQuery ) );
