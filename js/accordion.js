(function ($) {

	$('SHARED_UI_VERSION .sui-accordion-item').each(function () {

		$('.sui-accordion-item').on('click', function () {
			$(this).toggleClass('sui-accordion-item--open');
		});

	});

}(jQuery));
