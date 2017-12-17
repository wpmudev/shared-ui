(function ($) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ('object' !== typeof window.SUI) {
		window.SUI = {};
	}

	SUI.showHidePassword = function() {

		$(".sui-password-group").each(function () {
			var $this = $(this),
				$input = $this.find('input[type="password"]'),
				$button = $this.find('.sui-password-toggle');

			$button.on('click', function () {
				var $inputType = '';
				$(this).toggleClass('is-visible');

				if ($input.hasClass('is-visible')) {
					$input.removeClass('is-visible').addClass('is-hidden');
					$inputType = 'password';
					$button.find('> .sui-screen-reader-text').text('Show Password');
					$button.find('> i').removeClass('sui-ico-eye-hide').addClass('sui-ico-eye');
				} else {
					$input.removeClass('is-hidden').addClass('is-visible');
					$inputType = 'text';
					$button.find('> .sui-screen-reader-text').text('Hide Password');
					$button.find('> i').removeClass('sui-ico-eye').addClass('sui-ico-eye-hide');
				}
				var $repInput = $('<input type=' + $inputType + ' />')
					.attr('id', $input.attr('id'))
					.attr('name', $input.attr('name'))
					.attr('class', $input.attr('class'))
					.val($input.val())
					.insertBefore($input);
				$input.remove();
				$input = $repInput;
				$input.focus();
			});

		});

	}

	SUI.showHidePassword();

}(jQuery));


(function ($) {
	suiSelect = function(el) {
		var jq = $(el),
			wrap, handle, list, value, items;

		if (! jq.is("select")) { return; }
		if (jq.closest(".select-container").length || jq.data("select2") || jq.is(".none-sui") ) { return; }

		// Add the DOM elements to style the select list.
		function setupElement() {
			jq.wrap("<div class='select-container'>");
			jq.hide();

			wrap = jq.parent();
			handle = $("<span class='dropdown-handle'><i class='sui-ico-arrow-down-carats'></i></span>").prependTo(wrap);
			list = $("<div class='select-list-container'></div>").appendTo(wrap);
			value = $("<div class='list-value'>&nbsp;</div>").appendTo(list);
			items = $("<ul class='list-results'></ul>").appendTo(list);

			wrap.addClass(jq.attr("class"));
		}

		// When changing selection using JS, you need to trigger a 'sui:change' event
		// eg: $('select').val('4').trigger('sui:change')
		function handleSelectionChange() {
			jq.on('sui:change',function(){
				//We need to re-populateList to handle dynamic select options added via JS/ajax
				populateList();
				items.find("li").not('.optgroup-label').on("click", function onItemClick(ev) {
					var opt = $(ev.target);
					selectItem(opt, false);
				});
			});
		}

		// Add all the options to the new DOM elements.
		function populateList() {
			items.empty();
			if( jq.find("optgroup").length ){
				jq.find("optgroup").each(function(){
					var optgroup = $(this),
						optgroup_item;
					optgroup_item = $("<ul></ul>").appendTo(items);
					$label = $('<li class="optgroup-label"></li>').text( optgroup.prop('label') );

					optgroup_item.html( $label );
					optgroup_item.addClass('optgroup');

					optgroup.find('option').each(function onPopulateLoop() {
						var opt = $(this),
							item;
						item = $("<li></li>").appendTo(optgroup_item);
						item.text(opt.text());
						item.data("value", opt.val());

						if (opt.val() == jq.val()) {
							selectItem(item);
						}
					});
				});
			}else{
				jq.find("option").each(function onPopulateLoop() {
					var opt = $(this),
						item;
					item = $("<li></li>").appendTo(items);
					item.text(opt.text());
					item.data("value", opt.val());

					if (opt.val() == jq.val()) {
						selectItem(item, true);
					}
				});
			}

		}

		// Toggle the dropdown state between open/closed.
		function stateToggle() {
			if( wrap.find("select").is(":disabled") ) return;

			if (! wrap.hasClass("active")) {
				stateOpen();
			} else {
				stateClose();
			}
		}

		// Close the dropdown list.
		function stateClose(item) {
			if (!item) { item = wrap; }
			item.removeClass("active");
			item.closest("tr").removeClass("select-open");
		}

		// Open the dropdown list.
		function stateOpen() {
			$(".select-container.active").each(function() {
				stateClose($(this));
			});
			wrap.addClass("active");
			wrap.closest("tr").addClass("select-open");
		}

		// Visually mark the specified option as "selected".
		function selectItem(opt, is_init) {
			is_init = typeof is_init === "undefined" ? false : is_init;
			value.text(opt.text());
			$(".current", items).removeClass("current");
			opt.addClass("current");
			stateClose();

			// Also update the select list value.
			jq.val(opt.data("value"));

			if( !is_init )
				jq.trigger("change");
		}

		// Element constructor.
		function init() {
			var sel_id;

			setupElement();
			populateList();
			handleSelectionChange();
			items.find("li").not('.optgroup-label').on("click", function onItemClick(ev) {
				var opt = $(ev.target);
				selectItem(opt, false);
			});

			handle.on("click", stateToggle);
			value.on("click", stateToggle);
			jq.on("focus", stateOpen);

			$(document).click(function onOutsideClick(ev) {
				var jq = $(ev.target),
					sel_id;

				if (jq.closest(".select-container").length) { return; }
				if (jq.is("label") && jq.attr("for")) {
					sel_id = jq.attr("for");
					if ($("select#" + sel_id).length) { return; }
				}

				stateClose();
			});

			sel_id = jq.attr("id");
			if (sel_id) {
				$("label[for=" + sel_id + "]").on("click", stateOpen);
			}
			jq.addClass("wdev-styled");
		}

		init();

		return this;
	};
	// Convert all select lists to fancy sui Select lists.
	$("select").each(function(){
		suiSelect(this);
	});


}($));

(function ($) {
	suiTabs = function(el) {
		var jq = $(el).closest('.sui-tabs');

		if (!jq.length) {
			return;
		}

		// Resize the tab-area after short delay.
		function resizeArea() {
			window.setTimeout(resizeAreaHandler, 20);
		}

		// Resize the tab area to match the current tab.
		function resizeAreaHandler() {
			var current = jq.find('.sui-tab > input:checked').parent(),
				content = current.find('.sui-tab-content');

			jq.height(content.outerHeight() + current.outerHeight() - 6);
		}

		// Updates the URL hash to keep tab open during page refresh
		function updateHash() {
			var current = jq.find('.sui-tab > input:checked');

			current.parent().find('label').addClass( 'active' );

			if (current.attr('id').length) {
				self.updateHash(current.attr('id'));
			}
			resizeArea();
		}

		// Open the tab that is specified in window URL hash
		function switchTab() {
			var curTab,
				route = window.location.hash.replace(/[^\w-_]/g, '');

			if (route) {
				curTab = jq.find('input#' + route);
				jq.find( '.sui-tab label.active' ).removeClass( 'active' );
				curTab.parent().find('label').addClass( 'active' );
				if (curTab.length && !curTab.prop('checked')) {
					curTab.prop('checked', true);
					scrollWindow();
				}
			}
		}

		// Scroll the window to top of the tab list.
		function scrollWindow() {
			resizeArea();
			$('html, body').scrollTop(
				jq.offset().top
				- parseInt($('html').css('paddingTop'))
				- 20
			);
		}

		// Constructor.
		function init() {
			jq.on('click', '.sui-tab > input[type=radio]', updateHash);
			$(window).on('hashchange', switchTab);
			var current = jq.find('.sui-tab > input:checked');
			current.parent().find('label').addClass( 'active' );

			resizeArea();
			switchTab();
		}

		init();

		return this;
	};

	updateHash = function(newHash) {
		newHash = newHash.replace( /^#/, '' );

		var fx,
			node = $( '#' + newHash );

		if (node.length) {
			// Remove the ID value from the actual element.
			node.attr('id', '');

			// Create a dummy element at current position with the specific ID.
			fx = $('<div></div>')
				.css({
					position: 'absolute',
					visibility: 'hidden',
					top: $(document).scrollTop() + 'px'
				})
				.attr('id', newHash)
				.appendTo(document.body);
		}

		// Change hash value in the URL. Browser will scroll to _current position_.
		document.location.hash = newHash;

		// Undo the changes from first part.
		if (node.length) {
			fx.remove();
			node.attr('id', newHash);
		}
	};

	// Initialize all tab-areas.
	$(".sui-tabs").each(function(){
		suiTabs(this);
	});


}($));

(function ($) {

	console.log('this is test-component.js');

}(jQuery));
