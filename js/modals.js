(function ($) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ('object' !== typeof window.SUI) {
		window.SUI = {};
	}

	document.addEventListener('DOMContentLoaded', function () {
		var mainEl = $('.sui-wrap');

		// Init the dialog elements.
		$('.sui-dialog').each(function(){
			var dialog = new window.A11yDialog(this, mainEl);

			dialog.on('show', function (dialogEl) {
				$('#' + dialog.node.id).find('.sui-dialog-overlay').removeClass('sui-fade-out');
				$('#' + dialog.node.id).find('.sui-dialog-content').removeClass('sui-bounce-out');
				$('#' + dialog.node.id).find('.sui-dialog-overlay').addClass('sui-fade-in');
				$('#' + dialog.node.id).find('.sui-dialog-content').addClass('sui-bounce-in');

				// Set focus on close button.
				$(dialogEl).find('.sui-dialog-close').focus();
			});
			dialog.on('hide', function (dialogEl) {
				dialogEl.setAttribute('aria-hidden', 'false');
				$('#' + dialog.node.id).find('.sui-dialog-overlay').removeClass('sui-fade-in');
				$('#' + dialog.node.id).find('.sui-dialog-content').removeClass('sui-bounce-in');
				$('#' + dialog.node.id).find('.sui-dialog-overlay').addClass('sui-fade-out');
				$('#' + dialog.node.id).find('.sui-dialog-content').addClass('sui-bounce-out');
				window.setTimeout(function() {
					dialogEl.setAttribute('aria-hidden', 'true');
				}, 300);
			});
		});
	});
}(jQuery));
