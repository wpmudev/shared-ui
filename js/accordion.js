(function ($) {


	var accordionTable = $("SUI_BODY_CLASS .sui-accordion");

	accordionTable.off('click', 'button');
	accordionTable.on('click', '.sui-accordion-item', function (e) {
		e.preventDefault();

		var getParentItem = $(this).closest(".sui-accordion-item"),
			getNextAdditionalContentRow = getParentItem.nextUntil(".sui-accordion-item");

		getNextAdditionalContentRow.toggleClass("sui-accordion-item--open");

		if (getNextAdditionalContentRow.hasClass("sui-accordion-item--open")) {
			getParentItem.addClass("sui-accordion-item--open");
		} else {
			getParentItem.removeClass("sui-accordion-item--open");
		}
	});

}(jQuery));
