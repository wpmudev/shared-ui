import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

import suiLogo from './logo.png';

const suiTheme = create({
	// Base theme.
	colorPrimary: 'hsl(213, 68%, 11%)',
	colorSecondary: 'hsl(214, 84%, 56%)',

	// Branding.
	brandTitle: 'Shared UI',
	brandImage: suiLogo,
	brandUrl: 'https://github.com/wpmudev/shared-ui/',

	// Main UI.
	appBg: 'hsl(213, 68%, 11%)',
	appBorderColor: 'hsl(0, 0%, 90%)',

	// Toolbar UI.
	barTextColor: 'hsl(0, 0%, 67%)',
	barSelectedColor: 'hsl(214, 84%, 56%)',
	barBg: 'hsl(0, 0%, 100%)',
});

addons.setConfig({
	theme: suiTheme,
});
