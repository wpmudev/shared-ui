(function ($) {
	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ('object' !== typeof window.SUI) {
		window.SUI = {};
	}
	SUI.link_dropdown = function(){

		function close_all_dropdowns($except)
		{
			var $dropdowns = $('SUI_BODY_CLASS .sui-dropdown');
			if($except) {
				$dropdowns = $dropdowns.not($except);
			}
			$dropdowns.removeClass('open');
		}

		$('body').click(function (e) {
			var $this = $(e.target),
				$el = $this.closest('.sui-dropdown');

			if ($el.length == 0) {
				close_all_dropdowns();
			}
			else if ($this.is('a')) {
				e.preventDefault();
				close_all_dropdowns($el);

				$el.toggleClass('open');
			}
		});
	};
	SUI.link_dropdown();
}(jQuery));
