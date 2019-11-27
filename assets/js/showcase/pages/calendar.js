( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageCalendar = function( page ) {

		var body = $( 'body' ),
			page = 'showcase-page-' + page
			;

		if ( page !== body.attr( 'id' ) ) {
			return;
		}

		function calendarSimple( element ) {

			element = $( element );

			element.datepicker({
				minDate: -5,
				beforeShow: function( input, inst ) {
					$( '#ui-datepicker-div' ).addClass( 'sui-calendar' );
				},
				'dateFormat': 'd MM yy'
			});
		}

		function calendarRange( element ) {

			element = $( element );

			let start  = moment().subtract( 29, 'days' ),
				end    = moment();

			element.daterangepicker({
				'autoApply': true,
				ranges: {
					'Today': [ moment(), moment() ],
					'Tomorrow': [ moment().add( 1, 'days' ), moment().add( 1, 'days' ) ],
					'1 week': [ moment().startOf( 'week' ), moment().endOf( 'week' ) ],
					'30 days': [ moment().startOf( 'month' ), moment().endOf( 'month' ) ]
				},
				'locale': {
					'format': 'MMMM DD, YYYY',
					'separator': ' - ',
					'customRangeLabel': 'Custom',
					'daysOfWeek': [
						'Su',
						'Mo',
						'Tu',
						'We',
						'Th',
						'Fr',
						'Sa'
					],
					'monthNames': [
						'January',
						'February',
						'March',
						'April',
						'May',
						'June',
						'July',
						'August',
						'September',
						'October',
						'November',
						'December'
					]
				},
				'alwaysShowCalendars': true,
				'startDate': start,
				'endDate': end
			}, function( start, end, label ) {
				console.log( 'New date range selected: ' + start.format( 'YYYY-MM-DD' ) + ' to ' + end.format( 'YYYY-MM-DD' ) + ' (predefined range: ' + label + ')' );
			});
		}

		function init() {

			calendarSimple( '#date-simple-default' );
			calendarSimple( '#date-simple-error' );

			calendarRange( '#date-range-default' );
			calendarRange( '#date-range-error' );

		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pageCalendar( 'calendar' );

	});

}( jQuery ) );
