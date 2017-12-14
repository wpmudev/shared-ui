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
