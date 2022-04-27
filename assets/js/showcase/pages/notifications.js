( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageNotifications = function( page ) {

		var body = $( 'body' ),
			page = 'showcase-page-' + page
			;

		if ( page !== body.attr( 'id' ) ) {
			return;
		}

		function getRandom( items ) {
			return items[ Math.floor( Math.random() * items.length ) ];
		}

		function randomColor( element ) {

			element.on( 'click', function() {

				const button = $( this ),
					notice = button.closest( '.sui-notice' ),
					colors = [
						'default',
						'blue',
						'green',
						'yellow',
						'purple',
						'red'
					];

				const randomColor = getRandom( colors );

				// Remove all color classes for notices.
				notice.removeClass();

				// Print notice new class.
				notice.addClass( 'sui-notice sui-notice-' + randomColor );

				// Remove all classes.
				button.removeClass();

				// Print new class.
				button.addClass( 'sui-button sui-button-' + randomColor );

			});
		}

		function clearNoticeClass( element ) {
			element
				.removeClass( 'sui-notice-blue' )
				.removeClass( 'sui-notice-green' )
				.removeClass( 'sui-notice-yellow' )
				.removeClass( 'sui-notice-red' )
				.removeClass( 'sui-notice-purple' );
		}

		function setNoticeClass( radios, notice ) {
			radios.each( function() {
				const radio = $( this );

				radio.on( 'click', function() {
					const radio = $( this );
					const floatNotice = $( '#float-notice-' + notice );
					const inlineNotice = $( '#inline-notice-' + notice );

					if ( '' !== radio.val() ) {
						floatNotice.addClass( 'sui-notice-' + radio.val() );
						inlineNotice.addClass( 'sui-notice-' + radio.val() );
					} else {
						clearNoticeClass( floatNotice );
						clearNoticeClass( inlineNotice );
					}
				});
			});
		}

		function setNoticeAttr( radios, attr ) {
			radios.each( function() {
				const radio = $( this );

				radio.on( 'click', function() {
					const radio = $( this );
					const row = radio.closest( '.sui-box-body' );
					const button = row.find( '.show-notice' );
					button.attr( 'data-notice-' + attr, radio.val() );
				});
			});
		}

		function noticeOption( element ) {
			const rows = $( '.notice-design-type' );

			rows.each( function() {
				const row = $( this );

				// Notification Design
				const optionDesign = row.find( 'input[name="' + element + '-design"]' );
				setNoticeClass(
					optionDesign,
					element
				);

				// Notification Type
				const optionType = row.find( 'input[name="' + element + '-notice"]' );
				setNoticeAttr(
					optionType,
					'open'
				);

				// Dismiss Button
				const optionDismiss = row.find( 'input[name="' + element + '-dismiss"]' );
				setNoticeAttr(
					optionDismiss,
					'dismiss'
				);
			});
		}

		function noticeAction( element ) {
			$( '#show-' + element + '-notice' ).on( 'click', function() {
				const button = $( this );
				const body = button.closest( '.sui-box-body' );
				const str = button.attr( 'data-notice-dismiss' );

				let radios = body.find( '.sui-radio input' );

				if ( -1 < str.indexOf( 'true' ) ) {
					radios = body.find( 'input[name="' + element + '-design"]' );
				}

				button.prop( 'disabled', true );
				radios.each( function() {
					const radio = $( this );
					radio.prop( 'disabled', true );
				});

				if ( -1 < str.indexOf( 'true' ) ) {
					$( '#float-notice-' + element + ' .sui-notice-actions button, #inline-notice-' + element + ' .sui-notice-actions button' ).on( 'click', function() {
						button.prop( 'disabled', false );
						radios.each( function() {
							const radio = $( this );
							radio.prop( 'disabled', false );
						});
						body.find( '#' + element + '-design-option-1' ).prop( 'checked', true );
					});
				} else {
					setTimeout( () => {
						button.prop( 'disabled', false );
						radios.each( function() {
							const radio = $( this );
							radio.prop( 'disabled', false );
						});
						body.find( '#' + element + '-design-option-1' ).prop( 'checked', true );
					}, 5000 );
				}
			});
		}

		function init() {
			randomColor( $( '#demo-multiline-random-button' ) );

			// PREVIEW: Sample Notification
			noticeOption( 'general' );
			noticeAction( 'general' );
		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pageNotifications( 'alert-notice' );

	});

}( jQuery ) );
