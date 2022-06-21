#!/usr/bin/env node

/**
 * @license
 * Copyright (C) 2022 Incsub LLC.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * THIS PROGRAM IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL, BUT WITHOUT
 * ANY WARRANTY; WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR
 * FITNESSFOR A PARTICULAR PURPOSE.
 *
 * SEE THE GNU GENERAL PUBLIC LICENSE FOR MORE DETAILS.
 */

const rollup = require('rollup');
const path = require('path');
const del = require('rollup-plugin-delete');
const scss = require('rollup-plugin-scss');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

const currentWorkingPath = process.cwd();
const { src, name } = require(path.join(currentWorkingPath, 'package.json'));

const inputPath = path.join(currentWorkingPath, src);

// Little workaround to get package name without scope.
const fileName = name.replace('@wpmudev/', '');

// See below for details on the options.
const inputOptions = {
	input: inputPath,
	plugins: [
		del({
			targets: ['dist/*'],
			verbose: true,
		}),
		scss({
			output: true,
			outputStyle: 'compressed',
			sourceMap: true,
			sass: require('node-sass'),
			processor: () => postcss([autoprefixer()]),
			verbose: true,
		}),
	],
};

const outputOptions = [
	{
		file: `dist/css/${fileName}.js`,
		format: 'esm',
	},
];

async function build() {
	// Initial message.
	console.log('👷 Preparing to build packages.');

	// Create bundle.
	const bundle = await rollup.rollup(inputOptions);

	// Loop through the options and write individual bundles.
	outputOptions.forEach(async (options) => {
		await bundle.write(options);
	});

	// Final message.
	console.log('📦️ Finished building packages.');
}

build();
