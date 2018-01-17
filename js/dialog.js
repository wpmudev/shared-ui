(function ($) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ('object' !== typeof window.SUI) {
		window.SUI = {};
	}

	document.addEventListener('DOMContentLoaded', function () {
		var mainEl = document.getElementById('wpbody');

		// Init the dialog elements
		$('.sui-dialog').each(function(){
			var dialog = new window.A11yDialog(this, mainEl);

			dialog.on('show', function () {
				$('#' + dialog.node.id).find('.dialog-overlay').removeClass('sui-fade-out');
				$('#' + dialog.node.id).find('.dialog-content').removeClass('sui-bounce-out');
				$('#' + dialog.node.id).find('.dialog-overlay').addClass('sui-fade-in');
				$('#' + dialog.node.id).find('.dialog-content').addClass('sui-bounce-in');

			});
			dialog.on('hide', function () {
				$('#' + dialog.node.id).find('.dialog-overlay').removeClass('sui-fade-in');
				$('#' + dialog.node.id).find('.dialog-content').removeClass('sui-bounce-in');
				$('#' + dialog.node.id).find('.dialog-overlay').addClass('sui-fade-out');
				$('#' + dialog.node.id).find('.dialog-content').addClass('sui-bounce-out');
			});
		});

	});

}($));
