var aceSui = ( function() {

	ace.require([ 'ace/theme/sui' ], function( m ) {

		if ( 'object' == typeof module && 'object' == typeof exports && module ) {
			module.exports = m;
		}
	});

}() );

ace.define( 'ace/theme/sui', [], function( require, exports, module ) {

	var dom = require( '../lib/dom' );

	exports.isDark   = false;
	exports.cssClass = 'ace-sui';
	exports.cssText  = '.ace-sui {' +
	'font-family: "Source Code Pro", "Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro", monospace;' +
		'line-height: 18px;' +
	'}' +
	'.ace-sui .ace_editor {' +
		'border: 2px solid rgb(159, 159, 159);' +
	'}' +
	'.ace-sui .ace_editor.ace_focus {' +
		'border: 2px solid #327FBD;' +
	'}' +
	'.ace-sui .ace_gutter {' +
		'width: 30px;' +
		'background: #666666;' +
		'color: #FFFFFF;' +
		'overflow: hidden;' +
	'}' +
	'.ace-sui .ace_gutter-layer {' +
		'width: 100%;' +
		'text-align: right;' +
	'}' +
	'.ace-sui .ace_gutter-layer .ace_gutter-cell {' +
		'width: 30px;' +
		'padding-right: 9px;' +
		'padding-left: 3px;' +
		'text-align: right;' +
	'}' +
	'.ace-sui .ace_print_margin {' +
		'width: 1px;' +
		'background: #E8E8E8;' +
	'}' +
	'.ace-sui .ace_scroller {' +
		'background-color: #F2F2F2;' +
	'}' +
	'.ace-sui .ace_text-layer {' +
		'cursor: text;' +
		'color: #666666;' +
	'}' +
	'.ace-sui .ace_cursor {' +
		'border-left: 2px solid #000000;' +
	'}' +
	'.ace-sui .ace_cursor.ace_overwrite {' +
		'border-left: 0;' +
		'border-bottom: 1px solid #000000;' +
	'}' +
	'.ace-sui .ace_marker-layer .ace_selection {' +
		'background: rgba(130, 139, 201, 0.5);' +
	'}' +
	'.ace-sui .ace_marker-layer .ace_step {' +
		'background: rgb(198, 219, 174);' +
	'}' +
	'.ace-sui .ace_marker-layer .ace_bracket {' +
		'margin: 0;' +
		'border: 1px solid rgba(147, 161, 161, 0.50);' +
	'}' +
	'.ace-sui .ace_marker-layer .ace_active_line {' +
		'background: #EEE8D5;' +
	'}' +
	'.ace-sui .ace_invisible {' +
		'color: rgba(147, 161, 161, 0.50);' +
	'}' +
	'.ace-sui .ace_keyword {' +
		'color: #859900;' +
	'}' +
	'.ace-sui .ace_keyword.ace_operator {}' +
	'.ace-sui .ace_constant {}' +
	'.ace-sui .ace_constant.ace_language {' +
		'color: #B58900;' +
	'}' +
	'.ace-sui .ace_constant.ace_library {}' +
	'.ace-sui .ace_constant.ace_numeric {' +
		'color: #D33682;' +
	'}' +
	'.ace-sui .ace_invalid {}' +
	'.ace-sui .ace_invalid.ace_illegal {}' +
	'.ace-sui .ace_invalid.ace_deprecated {}' +
	'.ace-sui .ace_support {}' +
	'.ace-sui .ace_support.ace_function {' +
		'color: #268BD2;' +
	'}' +
	'.ace-sui .ace_function.ace_buildin {}' +
	'.ace-sui .ace_string {' +
		'color: #2AA198;' +
	'}' +
	'.ace-sui .ace_string.ace_regexp {' +
		'color: #D30102;' +
	'}' +
	'.ace-sui .ace_comment {' +
		'color: #93A1A1;' +
	'}' +
	'.ace-sui .ace_comment.ace_doc {}' +
	'.ace-sui .ace_comment.ace_doc.ace_tag {}' +
	'.ace-sui .ace_variable {}' +
	'.ace-sui .ace_variable.ace_language {' +
		'color: #268BD2;' +
	'}' +
	'.ace-sui .ace_xml_pe {}' +
	'.ace-sui .ace_collab.ace_user1 {}';

	dom.importCssString( exports.cssText, exports.cssClass );

});
