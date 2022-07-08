module.exports = {
	stories: [
		'../packages/**/*.stories.mdx',
		'../packages/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/preset-scss',
	],
	// webpackFinal: async (config) => {
	// 	console.log(config.resolve);

	// 	// Return the altered configs.
	// 	return config;
	// },
	framework: '@storybook/html',
	core: {
		builder: '@storybook/builder-webpack5',
	},
};
