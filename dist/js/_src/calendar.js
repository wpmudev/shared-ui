// ( function( $ ) {
// 	var start = moment().subtract( 29, 'days' );
//     var end = moment();
//     $( '#reportrange' ).daterangepicker({
// 		'autoApply': true,
// 		ranges: {
// 			'Today': [ moment(), moment() ],
// 			'Tomorrow': [ moment().add( 1, 'days' ), moment().add( 1, 'days' ) ],
// 			'Yesterday': [ moment().subtract( 1, 'days' ), moment().subtract( 1, 'days' ) ],
// 			'This Week': [ moment().startOf( 'week' ), moment().endOf( 'week' ) ],
// 			'This Month': [ moment().startOf( 'month' ), moment().endOf( 'month' ) ]
// 		},
// 		'locale': {
// 			'format': 'MMMM DD, YYYY',
// 			'separator': ' - ',
// 			'applyLabel': 'Apply',
// 			'cancelLabel': 'Cancel',
// 			'fromLabel': 'From',
// 			'toLabel': 'To',
// 			'customRangeLabel': 'Custom',
// 			'weekLabel': 'W',
// 			'daysOfWeek': [
// 				'Su',
// 				'Mo',
// 				'Tu',
// 				'We',
// 				'Th',
// 				'Fr',
// 				'Sa'
// 			],
// 			'monthNames': [
// 				'January',
// 				'February',
// 				'March',
// 				'April',
// 				'May',
// 				'June',
// 				'July',
// 				'August',
// 				'September',
// 				'October',
// 				'November',
// 				'December'
// 			],
// 			'firstDay': 1
// 		},
// 		'alwaysShowCalendars': true,
// 		'startDate': start,
// 		'endDate': end
// 	});
// }( jQuery ) );