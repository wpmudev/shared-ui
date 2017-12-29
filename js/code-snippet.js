(function ($) {

	$('.sui-code-snippet').each(function (i) {
		var id = 'sui-code-snippet-' + i,
			button = '<button class="sui-button" data-clipboard-target="#' + id + '">Copy</button>';

		$(this).wrap('<div class="sui-code-snippet-wrapper"></div>');
		$(this).attr('id', id).after(button);
	});

	new Clipboard('[data-clipboard-target]');

}(jQuery));
