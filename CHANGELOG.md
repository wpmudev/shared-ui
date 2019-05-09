v2.3.26
- [Fix] Tree selectors: Prevent WordPress default styles to overwrite and break button styles.


v2.3.25
- [New] Upgrade page.
			Dev Notes: See https://wpmudev.github.io/shared-ui/#upgrade-page for sample markup.
- [New] Reviews.io widget used on Upgrade Page.
- [Enhance] Update icon font file to latest.
- [Enhance] Tree selectors: Item text is now clickable and can open/close the sub-menu.
- [Enhance] Tree selectors: Cursor not allowed for disabled items.
- [Enhance] Tree selectors: Make clickable arrows area bigger.
- [Enhance] Tree selectors: Improve text + icon vertical alignment.
- [Enhance] Tree selectors: Support checkbox input and divs as part of the markup.
			Dev Notes: For more info go to https://wpmudev.github.io/shared-ui/#trees and read "Documentation" tab. If something is not clear ping @Leigh on #sui-plugins channel.


v2.3.24
- [Enhance] Pagination styles on small screens.
- [Enhance] Pagination tags styles.
- [Fix] Accordions color accessibility.
- [New] Fancy tree with SUI styles.
			Dev Notes: Inspect https://wpmudev.github.io/shared-ui/#trees for sample markup.
- [New] Simple tree element.
			Dev Notes: Inspect https://wpmudev.github.io/shared-ui/#trees for sample markup.


v2.3.23
- [Fix] Broken color pickers for IE browser.
- [Enhance] Add namespace to toggle show password click event so event is only applied once to the button.
- [Enhance] Update icon font file to latest which contains x and y glyphs.
- [New] Side tabs function. Works with radio inputs only.
			Dev Notes: Inspect https://wpmudev.github.io/shared-ui/#tabs for sample markup.
- [Enhance] Dialogs improved content fade in and out animation.


v2.3.22
- [Fix] Color accessibility - button hover color.
- [Fix] Color accessibility - Accordion item left border.
- [Fix] Buttons - On mobile buttons with long texts not wrapping.


v2.3.21
- [New] On boarding dialog styles.
- [New] Slider - To be used with on boarding dialogs (only).
- [Fix] WordPress editor media buttons alignment on small screens.
- [Fix] Fix toggles when high contrast mode is on for windows 10.
- [Enhance] New Icon font.
			Dev Notes: If you're using the check icon by it's unicode character (which you shouldn't be) you will need to change it from "\3a9" to "\28".


v2.3.20
- [Enhance] Box builder header with multiple options.
- [Enhance] Box builder footer can hide elements using sui-hidden class.
- [Enhance] Box builder empty message with image.
- [Enhance] Add `sui-hidden-important` class for instances where blocks aren't hidden because of higher CSS weight.
- [Fix] Dynamic fields dropdown overlaps sticky box.
- [Fix] Fancy Select - Stop converting multiple as it's not supported.


v2.3.19
- [Fix] Select2 border color.
- [Fix] WP Editor styles to match markup when loaded via JS.
- [Enhance] Buttons - Removed fixed height.
- [Fix] Pagination Filters - Corrected the close button on the filter on Firefox.
- [Fix] Typography - Fix lineheight of `<small>` tag.
- [Enhance] Icons - Add Automate icon."


v2.3.18
- [Enhance] Box builder fields now support images.
- [Enhance] Box builder styles variation to match react component.
- [Enhance] Box builder variation to get a flushed element.
- [Enhance] Add default class (gray) to accordions.
			Dev Notes: Inspect https://wpmudev.github.io/shared-ui/#accordions for classes.
- [Fix] Remove maintain focus from dialogs to fix issue with wp editors in modals.


v2.3.17
- [Fix] Box Selectors – Set list top and bottom spacing to 30px.
- [Fix] Flushed accordions inside tabs content not aligning to left and right edges.
- [Fix] Box settings have issues displaying properly in IE.
- [Enhance] Dashed Button - Add sui-lg variant.
- [Enhance] Dropdown options with red color variation.
- [Enhance] Modal - Allow user to change animation when showing and hiding
- [Enhance] Pagination Filter - Add example tooltip on the filter for devs to follow.


v2.3.16
- [Enhance] Color Accessibility - Improve ACE editor.
- [Enhance] Accordions - Change icon size to 16px and make sure it's aligned middle.
- [Enhance] Accordions - update default styles for text in sui-accordion-item-body. Add content header class.
- [Enhance] Modals - Make Dialog able to scroll outside the modal itself.
- [Fix] IE11 - Flex for modal buttons and settings rows. (Fuck Internet Explorer)
- [Enhance] Color Accessibility - Improve components.

v2.3.15
- [Enhance] Box builder fields need an accordion variation.
- [Bug] Fix pagination active filters.
- [Enhance] Color Accessibility - Improve components select, select2, active tab in subnav, sui box, selector box and ace selector.
- [Enhance] Add styles for <hr>.
- [Bug] Fix recipients line height.


v2.3.14
- [Enhance] Wysiwyg editor content links need to be the same blue from SUI.
- [Enhance] Add Pagination Active Filters.
- [Enhance] Accessibility improvements for links and ace selectors
- [New] Add status dot


v2.3.13
- [Fix] Select2 with icon using sui-control-with-icon positioning.
- [Fix] Icon buttons alignment when using "a" tag.
- [Fix] Correct margins for buttons inside dropdown element.
- [Fix] Icon buttons hide tooltips.
- [Enhance] All buttons variations should have the same disabled background and color.
- [Enhance] Add color accessible styles for tabs, checkboxes, radio and wp editor.
- [Fix] Update footer link for The Hub in free footer.
- [Fix] Remove transition from sortable items which were causing errors with js sortable.


v2.3.12
- [Fix] Small tag not correct styling.
- [Enhance] Tabs - Remove JS state saving. Add ability to open a tab from url hash.
			Dev Notes: Check that your sui-tabs are still working fine.
- [Enhance] Button styles are more organized now and color variations can
   be easily handled through _colors.scss file.
			Dev Notes: See https://wpmudev.github.io/shared-ui/#buttons for
			more details on changes.
- [Enhance] Input with button field now support regular and icon buttons.
- [Enhance] Buttons now support orange and yellow colors.
- [Enhance] Showcase for buttons, for a better understanding of the element.
- [Enhance] Button color "primary" variation has been removed and replaced with
   "blue" color, this to make sure we get color variations based on colors and not
   just random names.
			Dev Notes: See https://wpmudev.github.io/shared-ui/#buttons for
			details of how we're handling color variations now.


v2.3.11
- [Fix] Sidenav floating input overlapping default WordPress notifications.


v2.3.10

 - [Enhance] Upsell notice style and color.
 - [Enhance] Add purple and orange as option…
 - [Enhance] Select dropdown options with icons.
 - [Enhance] Sticky box shadow when box becomes sticky
 - [Enhance] Accordion blocks responsive design.
 - [Enhance] ACE add ability to load html editor
 - [Enhance] Side navigation styles and sticky class.
 - [Fix] Pagination result with filter button only not having enough separation.


v2.3.9

 - [New] Box builder element
			Dev Notes: See https://wpmudev.github.io/shared-ui/#builder-box
			for details of new element.
 - [Fix] Check if form field has password input.
 - [Enhance] Select samples and documentation
 - [Enhance] Progress bars new design.
 - [Fix] Child accordions don't open.
 - [Bug] Vertical spacing reduced on summary boxes after white-label changes.
 - [Bug] Fix typo on sample code for dropdown element.

v2.3.8

 - [Improvement] Add target font.
 - [Bug] Change unicode of check icon causing webpack to break.
 - [Improvement] Add SUI WP Editor styles as a separate file.

v2.3.7

- [Fix] Side tabs shouldn't shrink.
- [Fix] Sticky box not working with sidenav and sui-box.
- [Fix] Password script to show/hide text.
- [Fix] Password script to switch eye icon depending password visibility.
- [New] Loading notice.
			Dev Notes: See https://wpmudev.github.io/shared-ui/#notifications
			for changes.
- [New] Box settings has a new variation without border.
			Dev Notes: See https://wpmudev.github.io/shared-ui/#boxes for changes.
- [Enhance] New variation to have reduced spacing on box selectors.
- [Enhance] Add text beside input field.
- [Enhance] Move textarea field to new docs section.
- [Enhance] Password field has an improved markup.
			Dev Notes: Even when old markup is still supported, it is recommended to
			switch to new markup. To review changes see: https://wpmudev.github.io/shared-ui/#forms
- [Enhance] Support for floating header image on alternative design.
			Dev Notes: This floating image is commonly used by designers on
			dialogs to setup Integrations.
- [Enhance] Update to latest icon font file.
			Dev Notes: Target icon, used in Defender, has been added. You can use new
			class: "sui-icon-target".


v2.3.6

 - [Enhance] Footer - Three types - Pro, free and free with cross-sell
			Dev Notes: See https://wpmudev.github.io/shared-ui/#footer for changes
 - [Enhance] Selectors box - 4 and 5 columns now available
 - [Enhance] Sticky sui-box using sui-box-sticky class
 - [Fix] Tooltips are cut-off on small screens.
			Dev Notes: See https://wpmudev.github.io/shared-ui/#tooltips for changes
 - [Enhance] Add Recaptcha icon - sui-icon-recaptcha
 - [Bug] Truncated text doesn't work inside settings col.
 - [Fix] Select height is wrong.
 - [Fix] ACE selector overflows container.


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

 - [Enhance] Add class sui-color-accessible to sui-wrap to change all components to black and white
 - [Enhance] Enhance/accordions
             Dev Notes: Check all accordions to make sure they're displaying correctly. You may need to update
             the accordion title class. Check showcase for code.

v2.2.10

 - [Enhance] Refactor tabs.
             Dev Notes: IMPORTANT - sui-tabs have changed structure. You will need to go through your plugin and update
             every sui-tab to use the new structure.
 - [New] Add recipient component with example.
 - [Enhance] Dialog alternative design
 - [Enhance] Update horizontal tabs to match newer designs
 - [Enhance] Improve sidenav


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
 - [Enhance] Add support to add sui-tag-pro to form labels.
 - [Bug] Fix up p alignment in small notice with an icon present.
 - [Bug] Fix up small modal p color.
 - [Fix] Icon alignment in buttons and size for large button.
 - [Enhance] Fix up missing icons.
 - [Enhance] New/jquery-calendar
            Dev Notes: See showcase for example on how to use.
 - [Enhance] Enhance/input-styles
 - [Enhance] Update the colours.
 - [Enhance] Tooltip styles
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
