import './assets/css/custom-storybook.css';

/**
 * Get devices samples from:
 * https://screensiz.es/
 */
const breakpoints = {
	xl: {
		name: 'Dell UltraSharp 24"',
		styles: {
			width: '1920px', // Min 1600px
			height: '1200px',
		},
		type: 'extra-large',
	},
	lg: {
		name: 'MacBook Air 13"',
		styles: {
			width: '1440px', // Min 1200px - Max 1599px
			height: '900px',
		},
		type: 'laptop',
	},
	md: {
		name: 'Asus ZenBook',
		styles: {
			width: '1080px', // Min 1024px - Max 1199px
			height: '1920px',
		},
		type: 'tablet',
	},
	sm: {
		name: 'Nokia Lumia',
		styles: {
			width: '768px', // Min 783px - Max 1023px
			height: '1280px',
		},
		type: 'mobile',
	},
	xs: {
		name: 'iPhone SE',
		styles: {
			width: '640px', // Min 0 - Max 782px
			height: '1136px',
		},
		type: 'smaller',
	},
};

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	backgrounds: {
		disable: true,
	},
	viewport: {
		viewports: breakpoints,
	},
	options: {
		storySort: {
			order: [
				'SUI',
				[
					'Home',
					'Getting Started',
					"What's New",
					['Changelog', 'Monthly Updates', 'Roadmap'],
					'Utilities',
					'Components',
					'*',
				],
			],
		},
	},
};
