var path = require( 'path' );

// As Webpack only understands JS, we'll use this plugin to extract the CSS to a file
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// If there's an error, the console will beep
const SystemBellPlugin = require('system-bell-webpack-plugin');

var sassConfig = Object.assign( {}, {
	entry: './scss/shared-ui.scss',
	output: {
		filename: "shared-ui.css",
		path: path.resolve( __dirname, 'dist/css' )
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /(node_modules|bower_components)/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
				})
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: '../image/'
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: '../fonts/'
					}
				}
			}
		]
	},
	devtool: 'source-map', // Generates source Maps for these files
	plugins: [
		new ExtractTextPlugin("shared-ui.css"),
		new SystemBellPlugin()
	],
	watchOptions: {
		poll: 500
	}
});

var adminConfig = Object.assign( {}, {
	entry: './js/',
	output: {
		filename: "shared-ui.min.js",
		path: path.resolve( __dirname, 'dist/js' )
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	},
	devtool: 'source-map', // Generates source Maps for these files
	plugins: [
		new SystemBellPlugin()
	]
} );

module.exports = [ sassConfig, adminConfig ];
