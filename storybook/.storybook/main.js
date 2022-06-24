module.exports = {
	stories: [
		'../packages/**/*.stories.mdx',
		'../packages/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-links',
	],
	framework: '@storybook/html',
};
