( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.accordionsToggleStatus = function() {

		function toggleStatus( element ) {

			var toggle       = $( element ),
				toggleId     = toggle.attr( 'id' ),
				toggleInput  = $( 'input#' + toggleId ),
				toggleParent = toggleInput.closest( '.sui-accordion-item' )
				;

			if ( toggleInput.is( ':checked' ) ) {

				toggleInput.attr( 'checked', 'checked' );
				toggleInput.checked = true;
				toggleParent.removeClass( 'sui-accordion-item--disabled' );

			} else {

				toggleInput.attr( 'checked', '' );
				toggleInput.removeAttr( 'checked' );
				toggleInput.checked = false;
				toggleParent.addClass( 'sui-accordion-item--disabled' );
				toggleParent.removeClass( 'sui-accordion-item--open' );

			}
		}

		function init() {

			var accordion = $( 'div.sui-accordion-item-header .sui-toggle, tr.sui-accordion-item .sui-toggle' );

			accordion.each( function() {

				var toggle       = $( this ),
					toggleInput  = toggle.find( 'input' )
					;

				// Disable item if toggle is unchecked on load.
				if ( toggleInput.is( ':checked' ) ) {
					toggle.closest( '.sui-accordion-item' ).removeClass( 'sui-accordion-item--disabled' );
				} else {
					toggle.closest( '.sui-accordion-item' ).addClass( 'sui-accordion-item--disabled' );
				}
			});

			accordion.on( 'click', function( e ) {
				toggleStatus( e.target );
			});

		}

		init();

		return this;

	};

	DEMO.accordionsChartBlocks = function() {

		function init() {

			let demoChartPublished = document.getElementById( 'demo-accordion-chart-published' ),
				demoChartDrafted   = document.getElementById( 'demo-accordion-chart-drafted' )
				;

			let monthDays = [
				'Aug 12 2018', 'Aug 13 2018', 'Aug 14 2018', 'Aug 15 2018', 'Aug 16 2018', 'Aug 17 2018', 'Aug 18 2018', 'Aug 19 2018', 'Aug 20 2018', 'Aug 21 2018',
				'Aug 22 2018', 'Aug 23 2018', 'Aug 24 2018', 'Aug 25 2018', 'Aug 26 2018', 'Aug 27 2018', 'Aug 28 2018', 'Aug 29 2018', 'Aug 30 2018', 'Aug 31, 2018',
				'Sep 1, 2018', 'Sep 2, 2018', 'Sep 3, 2018', 'Sep 4, 2018', 'Sep 5, 2018', 'Sep 6, 2018', 'Sep 7, 2018', 'Sep 8, 2018', 'Sep 9, 2018', 'Sep 10, 2018'
			];

			let views = [
				300, 310, 305, 315, 300, 290, 270, 280, 275, 295,
				320, 315, 310, 305, 310, 305, 310, 320, 330, 340,
				330, 320, 315, 320, 325, 320, 315, 310, 305, 310
			];

			let viewsDraft = [
				300, 310, 305, 315, 300, 290, 270, 280, 275, 295,
				320, 315, 310, 305, 310, 305, 310, 320, 330, 340,
				330, 320, 315, 320, 325, 320, 100, 10, 0, 0
			];

			let submissions = [
				220, 230, 220, 225, 215, 230, 200, 210, 205, 195,
				190, 150, 160, 155, 165, 170, 180, 160, 200, 180,
				205, 210, 215, 220, 205, 210, 205, 210, 220, 230
			];

			let submissionsDraft = [
				220, 230, 220, 225, 215, 230, 200, 210, 205, 195,
				190, 150, 160, 155, 165, 170, 180, 160, 200, 180,
				205, 210, 215, 220, 205, 210, 0, 0, 0, 0
			];

			let chartData = {
				labels: monthDays,
				datasets: [
					{
						label: 'Submissions',
						data: submissions,
						backgroundColor: [
							'#E1F6FF'
						],
						borderColor: [
							'#17A8E3'
						],
						borderWidth: 2,
						pointHoverRadius: 5,
						pointHoverBorderColor: '#17A8E3',
						pointHoverBackgroundColor: '#17A8E3'
					},
					{
						label: 'Views',
						data: views,
						backgroundColor: [
							'#F8F8F8'
						],
						borderColor: [
							'#DDDDDD'
						],
						borderWidth: 2,
						pointHoverRadius: 5,
						pointHoverBorderColor: '#DDDDDD',
						pointHoverBackgroundColor: '#DDDDDD'
					}
				]
			};

			let chartDataDraft = {
				labels: monthDays,
				datasets: [
					{
						label: 'Submissions',
						data: submissionsDraft,
						backgroundColor: [
							'#E1F6FF'
						],
						borderColor: [
							'#17A8E3'
						],
						borderWidth: 2,
						pointHoverRadius: 5,
						pointHoverBorderColor: '#17A8E3',
						pointHoverBackgroundColor: '#17A8E3'
					},
					{
						label: 'Views',
						data: viewsDraft,
						backgroundColor: [
							'#F8F8F8'
						],
						borderColor: [
							'#DDDDDD'
						],
						borderWidth: 2,
						pointHoverRadius: 5,
						pointHoverBorderColor: '#DDDDDD',
						pointHoverBackgroundColor: '#DDDDDD'
					}
				]
			};

			let chartOptions = {
				maintainAspectRatio: false,
				legend: {
					display: false
				},
				scales: {
					xAxes: [
						{
							display: false,
							gridLines: {
								color: 'rgba(0, 0, 0, 0)'
							}
						}
					],
					yAxes: [
						{
							display: false,
							gridLines: {
								color: 'rgba(0, 0, 0, 0)'
							},
							ticks: {
								beginAtZero: false,
								min: 0,
								max: 350,
								stepSize: 1
							}
						}
					]
				},
				elements: {
					line: {
						tension: 0
					},
					point: {
						radius: 0
					}
				},
				tooltips: {
					custom: function( tooltip ) {

						if ( ! tooltip ) {
							return;
						}

						// Disable displaying the color box
						tooltip.displayColors = false;
					},
					callbacks: {
						title: function( tooltipItem, data ) {
							if ( 0 === tooltipItem[0].datasetIndex ) {
								return tooltipItem[0].yLabel + ' Submissions';
							} else if ( 1 === tooltipItem[0].datasetIndex ) {
								return tooltipItem[0].yLabel + ' Views';
							}
						},
						label: function( tooltipItem, data ) {
							return tooltipItem.xLabel;
						},

						// Set label text color
						labelTextColor: function( tooltipItem, chart ) {
							return '#AAAAAA';
						}
					}
				}
			};

			let myChart = new Chart( demoChartPublished, {
				type: 'line',
				fill: 'start',
				data: chartData,
				options: chartOptions
			});

			let myChartDraft = new Chart( demoChartDrafted, {
				type: 'line',
				fill: 'start',
				data: chartDataDraft,
				options: chartOptions
			});
		}

		init();

		return this;

	};

	DEMO.pageAccordions = function( page ) {

		var body = $( 'body' ),
			page = 'showcase-page-' + page
			;

		if ( page !== body.attr( 'id' ) ) {
			return;
		}

		DEMO.accordionsToggleStatus();
		DEMO.accordionsChartBlocks();

	};

	$( 'body' ).ready( function() {

		DEMO.pageAccordions( 'accordions' );

	});

}( jQuery ) );
