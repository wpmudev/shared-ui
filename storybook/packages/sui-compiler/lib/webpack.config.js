const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
	mode: 'production',
	target: 'node',
	plugins: [
		new webpack.BannerPlugin({
			banner: '#!/usr/bin/env node',
			raw: true,
		}),
		new WebpackShellPlugin({
			onBuildEnd: ['chmod +x dist/mycommand'],
		}),
	],
};
