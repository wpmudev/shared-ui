(function ($) {

	// Offset scroll for showcase sidenav.
	function offsetAnchor() {
		if (location.hash.length !== 0) {
			window.scrollTo(window.scrollX, window.scrollY - 60);
		}
	}
	$(document).on('click', '#adminmenu a[href^="#"]', function (event) {
		window.setTimeout(function () {
			offsetAnchor();
		}, 0);
	});
	window.setTimeout(offsetAnchor, 0);

	// Initialize highlight js for demo code blocks.
	$(document).ready(function () {
		$('.demo-code-block .sui-code-snippet').each(function (i, block) {
			hljs.highlightBlock(block);
		});
	});

}(jQuery));
