( function( $ ) {

	var btns            = $( '.demo-icon' ),
		clipboard       = new ClipboardJS( '.demo-icon' ),
		navbutton       = $( '.sui-vertical-tab a' ),
		toggleAccordion = $( 'div.sui-accordion-item-header .sui-toggle, tr.sui-accordion-item .sui-toggle' ),
		demoPagFilter   = $( '#demo--open-pagination-filter' ),
		sideTabItem     = $( '#demo-side-tabs-options .sui-tab-item' )
		;

	// Offset scroll for showcase sidenav.
	function offsetAnchor() {
		if ( 0 !== location.hash.length ) {
			window.scrollTo( window.scrollX, window.scrollY - 60 );
		}
	}
	$( document ).on( 'click', '#adminmenu a[href^="#"], .demo-internal-link[href^="#"]', function( event ) {
		window.setTimeout( function() {
			offsetAnchor();
		}, 0 );
	});
	window.setTimeout( offsetAnchor, 0 );

	// Initialize highlight js for demo code blocks.
	$( '.demo-code-block .sui-code-snippet' ).each( function( i, block ) {
		hljs.highlightBlock( block );
	});

	$( '.demo-icons i' ).each( function( i, block ) {
		var classes = block.className.split( /\s+/ );
		var iconName = classes[0].replace( 'sui-icon-', '' );
		$( this ).wrap( '<div class="sui-col-md-3 sui-col-sm-4"><button role="button" data-clipboard-text="&lt;i class=&quot;sui-icon-' + iconName + '&quot; aria-hidden=&quot;true&quot;&gt;&lt;/i&gt;" class="demo-icon"></button></div>' ).after( '<span class="demo-icon-name"><span class="sui-screen-reader-text">Example of </span>' + iconName + '</span>' );
	});

	$( '.sui-date .sui-form-control' ).datepicker({
		beforeShow: function( input, inst ) {
			$( '#ui-datepicker-div' ).addClass( 'sui-calendar' );
		},
		'dateFormat': 'd MM yy'
	});

	clipboard.on( 'success', function( e ) {
		console.info( 'Copied:', e.text );
		showTooltip( e.trigger, 'Copied Icon!' );
		e.clearSelection();
	});

	btns.mouseleave( function() {
		$( this ).removeClass( 'sui-tooltip' );
		$( this ).removeAttr( 'aria-label' );
		$( this ).removeAttr( 'data-tooltip' );
	});

	function showTooltip( e, msg ) {
		$( e ).addClass( 'sui-tooltip' );
		$( e ).attr( 'aria-label', msg );
		$( e ).attr( 'data-tooltip', msg );
	}

	// Side navigation
	navbutton.on( 'click', function( e ) {
		currentNav( e.target );
		e.preventDefault();
		e.stopPropagation();
	});

	function currentNav( e ) {
		var navButton  = $( e ),
			navParent  = navButton.closest( '.sui-vertical-tabs' ),
			navWrapper = navButton.closest( '.sui-row-with-sidenav' ),
			navBox     = navWrapper.find( '> div[data-tab]' )
			;

		var navData = $( e ).data( 'tab' ),
			boxData = navWrapper.find( 'div[data-tab="' + navData + '"]' )
			;

		navParent.find( 'li' ).removeClass( 'current' );
		navButton.parent().addClass( 'current' );

		navBox.hide();
		boxData.show();
	}

	// Accordion
	toggleAccordion.each( function() {

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

	toggleAccordion.on( 'click', function( e ) {
		toggleStatus( e.target );
	});

	function toggleStatus( e ) {
		var toggle       = $( e ),
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

	// Pagination filter
	demoPagFilter.on( 'click', function( e ) {
		openFilter( e.target );
		e.preventDefault();
		e.stopPropagation();
	});

	function openFilter( e ) {
		var pagButton  = $( e ),
			pagWrapper = pagButton.closest( '.sui-pagination-wrap' ),
			pagFilter  = pagWrapper.next( '.sui-pagination-filter' )
			;

		pagButton.toggleClass( 'sui-active' );
		pagFilter.toggleClass( 'sui-open' );
	}

}( jQuery ) );


// Chartjs Demo
( function( $ ) {

	var demoChartPublished = document.getElementById( 'demo-accordion-chart-published' ),
		demoChartDrafted   = document.getElementById( 'demo-accordion-chart-drafted' )
		;

	var monthDays = [
		'Aug 12 2018', 'Aug 13 2018', 'Aug 14 2018', 'Aug 15 2018', 'Aug 16 2018', 'Aug 17 2018', 'Aug 18 2018', 'Aug 19 2018', 'Aug 20 2018', 'Aug 21 2018',
		'Aug 22 2018', 'Aug 23 2018', 'Aug 24 2018', 'Aug 25 2018', 'Aug 26 2018', 'Aug 27 2018', 'Aug 28 2018', 'Aug 29 2018', 'Aug 30 2018', 'Aug 31, 2018',
		'Sep 1, 2018', 'Sep 2, 2018', 'Sep 3, 2018', 'Sep 4, 2018', 'Sep 5, 2018', 'Sep 6, 2018', 'Sep 7, 2018', 'Sep 8, 2018', 'Sep 9, 2018', 'Sep 10, 2018'
	];

	var views = [
		300, 310, 305, 315, 300, 290, 270, 280, 275, 295,
		320, 315, 310, 305, 310, 305, 310, 320, 330, 340,
		330, 320, 315, 320, 325, 320, 315, 310, 305, 310
	];

	var viewsDraft = [
		300, 310, 305, 315, 300, 290, 270, 280, 275, 295,
		320, 315, 310, 305, 310, 305, 310, 320, 330, 340,
		330, 320, 315, 320, 325, 320, 100, 10, 0, 0
	];

	var submissions = [
		220, 230, 220, 225, 215, 230, 200, 210, 205, 195,
		190, 150, 160, 155, 165, 170, 180, 160, 200, 180,
		205, 210, 215, 220, 205, 210, 205, 210, 220, 230
	];

	var submissionsDraft = [
		220, 230, 220, 225, 215, 230, 200, 210, 205, 195,
		190, 150, 160, 155, 165, 170, 180, 160, 200, 180,
		205, 210, 215, 220, 205, 210, 0, 0, 0, 0
	];

	var chartData = {
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

	var chartDataDraft = {
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

	var chartOptions = {
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

	var myChart = new Chart( demoChartPublished, {
		type: 'line',
		fill: 'start',
		data: chartData,
		options: chartOptions
	});

	var myChart = new Chart( demoChartDrafted, {
		type: 'line',
		fill: 'start',
		data: chartDataDraft,
		options: chartOptions
	});

}( jQuery ) );
