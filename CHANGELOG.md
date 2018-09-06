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