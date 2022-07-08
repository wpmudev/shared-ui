module.exports = {
	stories: [
		'../packages/**/*.stories.mdx',
		'../packages/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		{
			name: '@storybook/preset-scss',
			options: {
				cssLoaderOptions: {
					modules: true,
					localIdentName: '[name]__[local]--[hash:base64:5]',
				},
			},
		},
	],
	// webpackFinal: async (config) => {
	// 	console.log(config.resolve);

	// 	// Return the altered configs.
	// 	return config;
	// },
	framework: '@storybook/html',
};
