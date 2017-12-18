(function ($) {

	loadCircleScore = function(el) {
		var dial = $(el).find('svg circle:last-child'),
			score = $(el).data('score'),
			radius = 42,
			circumference = 2 * Math.PI * radius,
			dashLength = (circumference / 100) * score,
			gapLength = dashLength * 100 - score,
			svg = '\
				<svg class="sui-circle-score" viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\
					<circle stroke-width="16" cx="50" cy="50" r="42" />\
					<circle stroke-width="16" cx="50" cy="50" r="42" stroke-dasharray="0,'+ gapLength +'" />\
				</svg>';

		// Add svg to score element, add loaded class, & change stroke-dasharray to represent target score/percentage.
		$(el).append(svg).addClass('loaded').find('circle:last-child').css('strokeDasharray', dashLength + ' ' + gapLength);
		console.log(dashLength);
	}

	$('.sui-circle-score').each(function () {
		loadCircleScore(this);
	});

}(jQuery));
