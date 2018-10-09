v2.3.6

 - [Improvement] Footer
 - [Improvement] Selectors box
 - Enhance/floating sui box
 - [Fix] Tooltips are cut-off on small screens.
 - Add Recaptcha icon.
 - [Bug] Truncated text doesn't work inside settings col.
 - [Fix] Select height is wrong.
 - [Fix] ACE selector overflows container.
 - Development
 - [Improvement] Footer navigation and social links.
 - [Improvement] New variation for side-tabs.
 - [Improvement] Header with floating input.
 - [Fix] Flushed tabs inside box body.
 - [Improvement] Side navigation with floating input.
 - [New] Box selectors for single and multiple options.
 - [New] Color pickers
 - [Improvement] Radio and checkbox options with image.
 - [Improvement] Footer for flexbox accordions
 - [Improvement] Box settings side column width it's bigger than design.
 - [Update] New instagram icon.


v2.3.5

- [Enhance] Update to latest icon font file.
			Dev Notes: Instagram icon has been added. You can use new class:
			"sui-icon-instagram".
- [Enhance] Box settings side column width.
- [New] Radio options with image.
			Dev Notes: Find here https://wpmudev.github.io/shared-ui/#forms the
			demo for this new element. Just click on "Radio" option from sidenav.
- [New] Checkbox options with image.
			Dev Notes: Find here https://wpmudev.github.io/shared-ui/#forms the
			demo for this new element. Just click on "Checkbox" option from sidenav.
- [Enhance] Flexbox accordion footer.
- [New] Color pickers element styles.
			Dev Notes: Demo hasn't been added for this element since wpColorPicker
			doesn't perform correctly. Until then, you can check Hustle project and
			grab branch v4.0 to see some samples.
- [New] Box selectors element, for single and multiple options.
			Dev Notes: Find here https://wpmudev.github.io/shared-ui/#boxes the demo
			for this element, it's placed on the "Selectors Box" section.
- [Enhance] New classes that handles sidenav and header with floating input.
			Dev Notes: This variation is commonly used on wizards or pages that have
			status box element.
- [Fix] Flushed tabs spacing inside box body.
- [Enhance] Side tabs variation for more spacing between navigation and content.
- [Enhance] New footer for FREE and PRO plugins.
			Dev Notes: Two new elements have been added: navigation and social links.
			You can grab here https://wpmudev.github.io/shared-ui/#footer the new footer
			elements markup.


v2.3.4

- [Enhance] Inputs – Add small and medium size variations.
- [Enhance] Search Box - Improve spacing when used inside .sui-box.
- [Enhance] Radio & Checkbox - Add inline and stacked variations.
			Dev Notes: All radio and checkbox elements are inline by default,
			if you need them stacked (listed) you must use new stacked class.
			For more details, please go to https://wpmudev.github.io/shared-ui/#forms
- [Enhance] Pagination – Add filtering box (content) footer.
			Dev Notes: Pagination footer is going to be used in case filtering allows
			some action buttons like "apply" or "cancel".
- [New] File Uploads - New form element.
			Dev Notes: Go to https://wpmudev.github.io/shared-ui/#forms for some samples.
- [New] Image Uploads - New form element.
			Dev Notes: Go to https://wpmudev.github.io/shared-ui/#forms for some samples.
- [Fix] Summary Box - Allow different aspect ratio for rebranded images.
			Dev Notes: White Labelling variations were documented on the SUI demo site.
			For more details, please go to http://localhost:3000/#summary
- [Fix] Border Frame - Improve spacing when another element is placed at the bottom of it.
- [Fix] Table - Prevent styles to be overwritten when parent table uses accordion.
- [Enhance] Accordions - Improve flushed accordions when used inside tabs and side-tabs.


v2.3.3

 - [Enhance] Footer - Update styling and add variables to allow easier manipulation of images.
			 Dev Notes: Check showcase to see updates & changes.
 - [Enhance] Summary - Improve styling and add options.
			 Dev Notes: Check showcase to see updates & changes.
 - [Enhance] Select - Several improvements for select and select2.
 - [Enhance] Boxes - Add a sui-box variation that allow us to show a simple message.
 - [Enhance] Dropdown - allow tooltips on button.
 - [Fix] Dropdown menu links not working


v2.3.2

- [New] Accordion blocks.
- [Enhance] Dropdown menu styles.
- [New] Chartjs styles.
			Dev Notes: This contains basic styles for the element chartjs, but doesn't include an integration with the
			Chartjs bundle.
- [Fix] Prevent accordion from opening or closing when clicking on actions like buttons or toggles.
- [New] Loading animation when accordion opens if item contains chartjs element.

v2.3.1

- [New] Add flexbox accordion component with example.
- [Enhance] Make accordion work with and without table component.
			Dev Notes: You can choose to use sui-accordions with and without sui-tabs.
- [Enhance] Pagination filter button with filter content box.
			Dev Notes: IMPORTANT – Filter button has changed structure. You will need to go through your plugin and updated
			every pagination filter button to use new structure.
- [Enhance] Tags have new styles.
			Dev Notes: IMPORTANT – Default tag style has changed and now are gray instead of yellow. You will need to update
			every sui-tag to use sui-tag-warning class if you want to keep it yellow. Upsell tag changed too.
- [Enhance] Improved styles for icon button.
- [Enhance] Tabs and side tabs can be used separately.
			Dev Notes: IMPORTAT – There are some side tabs that doesn't have content, for those cases use sui-side-tabs only,
			without sui-tabs, to avoid conflicts with the JS.
- [Enhance] Improve flushed tabs inside sui-box-body.

v2.3.0

 - [Improvement] Add class sui-color-accessible to sui-wrap to change all components to black and white
 - [Improvement] Enhance/accordions
             Dev Notes: Check all accordions to make sure they're displaying correctly. You may need to update
             the accordion title class. Check showcase for code.

v2.2.10

 - [Enhance] Refactor tabs.
             Dev Notes: IMPORTANT - sui-tabs have changed structure. You will need to go through your plugin and update
             every sui-tab to use the new structure.
 - [New] Add recipient component with example.
 - [Enhance] Dialog alternative design
 - [Improvement] Update horizontal tabs to match newer designs
 - [Improvement] Improve sidenav


v2.2.9

 - [Enhance] Dialog alternative design
 - [Enhance] Update horizontal tabs to match newer designs
 - [Fix] Tabs are overwriting label styles placed inside tab content.


v2.2.8

 - Enhance/update fonts
 - ACE editor theme
 - Enhance/insert variables


v2.2.7

 - [Enhance] Feature/public clipboard js
 - [Fix] Button cut-off on ie
 - [Enhance] Add beta tag and update some colours.
 - [Enhance] Insert Variables Field
 - [Enhance] Improve vertical spacing in Summary
             Dev Notes: Go through plugin and check all summaries to make sure there are no overrides coming
                        from the plugin messing up styles.


v2.2.6

 - [Enhance] Update notification styles
             Dev Notes: Go through plugin and check all notifications are displaying correctly.
                        Remove any instances of sui-notice-sm as they're all one size now.
 - [Enhance] Update to latest font icon file.
 - [Enhance] Add toggle shadow on hover.


v2.2.5

 - [Enhance] Update body-class mixin to take variable $wrap to add another class.
            Dev Notes: The wrap class isn't included in _calendar.scss & _select2.scss
            as the generated code is out of the sui-wrap. PLEASE check your plugin thoroughly to make sure nothing is
            broken from this update.
 - [Enhance] Update icon font and add version to icon font imports.
 - [Fix] Toggle stylings not including hover states.


v2.2.4

 - [Fix] Forms pro tag
 - [Enhance] Update Icon fonts to latest version.
 - [Fix] Remove @-moz-document code as it was causing an error when compiling webpack.

v2.2.3
 - [Improvement] Add support to add sui-tag-pro to form labels.
 - [Bug] Fix up p alignment in small notice with an icon present.
 - [Bug] Fix up small modal p color.
 - [Fix] Icon alignment in buttons and size for large button.
 - [Improvement] Fix up missing icons.
 - [Improvement] New/jquery-calendar
            Dev Notes: See showcase for example on how to use.
 - [Improvement] Enhance/input-styles
 - [Improvement] Update the colours.
 - [Improvement] Tooltip styles
 - [New] Input field with icon
 - [Fix] Form layout when using grid has incorrect spacing
 - [Fix] incorrect input placeholder color.


v2.2.2

 - [New] jQuery UI Calendar (styles only)
            Dev Notes: Plugin needs to include jQuery UI themselves to use the calendar. This is just the styling.
 - [Fix] [Bug] Small Modal Issue
 - [Fix] Remove box-shadow default WordPress styles
 - [Fix] Red ghost button icon doesn't get correct color.


v2.2.1

 - [Fix] When saving in builder, the loading icon shows up over "save".
 - [Fix] Showcase of toggles with label
            Dev Notes: Check your plugin for toggles with labels and check it's using the proper markup.

 - [Fix] Select2 loader on webpack
 - [Fix] Select2 webpack incompatible
 - [Fix] Multi checkbox label failing to extend sui-description styles.
