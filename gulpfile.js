'use strict';

// Import `src` and `dest` from gulp for use in the task.
const { src, dest, task } = require( 'gulp' );

/**
 * Supported Packages
 * List here all dependencies necessary to run required tasks.
 *
 * @since 1.0.0
 */
const fs           = require( 'fs' );
const gulp         = require( 'gulp' );
const chalk        = require( 'chalk' );
const autoprefixer = require( 'gulp-autoprefixer' );
const cleanCSS     = require( 'gulp-clean-css' );
const concat       = require( 'gulp-concat' );
const eslint       = require( 'gulp-eslint7' );
const header       = require( 'gulp-header' );
const rename       = require( 'gulp-rename' );
const replace      = require( 'gulp-replace' );
const sass         = require( 'gulp-sass' )( require( 'sass' ) );
const uglify       = require( 'gulp-uglify-es' ).default;
const babel        = require( 'gulp-babel' );
const ghPages      = require('gulp-gh-pages');

/**
 * WPMU DEV Banner
 * Print this on SUI scripts.
 *
 * @since 1.0.0
 */
const banner = [
	'/*!',
	' * WPMU DEV Shared UI',
	' * Copyright 2018 - 2021 Incsub (https://incsub.com)',
	' * Licensed under GPL v3 (http://www.gnu.org/licenses/gpl-3.0.html)',
	' */',
	''
].join( '\n' );

/**
 * SUI Version
 * Get the latest project version from package.json.
 *
 * @return {string} version
 */
function getVersion() {
	const json = JSON.parse( fs.readFileSync( './package.json' ) );
	return json.version;
}

/**
 * SUI Version (Class)
 * Get the latest project version from package.json in the form of a CSS class.
 *
 * @param {boolean} selector - prepends a `.` to the body class
 * @return {string} body class
 */
function getBodyClass( selector = true ) {
	let v = getVersion();
	let p = selector ? '.' : '';
	return `${p}sui-${v.replace( /\./g, '-' ) }`;
}

/**
 * List of Supported Browsers
 *
 * @since 1.0.0
 */
const browsersList = [
	'last 2 version',
	'> 1%'
];

/**
 * Uglify options.
 *
 * @since 1.0.0
 */
const uglifyOptions = {
	compress: {
		// eslint-disable-next-line camelcase
		drop_console: true
	}
};

/**
 * Development Paths & Files
 *
 * @since 2.0.0
 */
const library = {
	source: {},
	output: {},
	watch: {}
};

library.source.styles = './assets/scss/shared-ui/';
library.output.styles = './_dist/library/dist/css/';

library.watch.styles = [
	library.source.styles + '**/**/*.scss'
];

library.source.scripts = './assets/js/shared-ui/';
library.output.scripts = './_dist/library/dist/js/';

library.watch.scripts = [
	library.source.scripts + '**/**/*.js'
];

const showcase = {
	source: {},
	output: {},
	watch: {}
};

showcase.source.styles = './assets/scss/showcase/';
showcase.output.styles = './assets/css/';

showcase.watch.styles = [
	showcase.source.styles + '**/*.scss'
];

showcase.source.scripts = './assets/js/showcase/';
showcase.output.scripts = './assets/js/';

showcase.watch.scripts = [
	showcase.source.scripts + '**/**/*.js'
];

/**
 * Development Functions.
 *
 * @since 2.11.1
 */

// SUI styles.
function suiCss() {
	return gulp.src( library.watch.styles )
		.pipe( sass({ outputStyle: 'expanded' }).on( 'error', sass.logError ) )
		.pipe( autoprefixer( browsersList ) )
		.pipe( header( banner ) )
		.pipe( gulp.dest( library.output.styles ) )
		.pipe( cleanCSS() )
		.pipe( rename({ suffix: '.min' }) )
		.pipe( gulp.dest( library.output.styles ) )
		;
}

// SUI scripts.
function suiJs() {

	return gulp.src( library.watch.scripts )
		.pipe( replace( 'SUI_BODY_CLASS', getBodyClass() ) )
		.pipe( eslint( ) )
		.pipe( eslint.format() )
		.pipe( eslint.failAfterError() )
		.pipe( babel({
			presets: [
				[ '@babel/env', {
					modules: false
				} ]
			]
		}) )
		.pipe( gulp.dest( library.output.scripts + '_src' ) )
		.pipe( concat( 'shared-ui.js' ) )
		.pipe( header( banner ) )
		.pipe( gulp.dest( library.output.scripts ) )
		.pipe( uglify( uglifyOptions ) )
		.pipe( rename({ suffix: '.min' }) )
		.pipe( header( banner ) )
		.pipe( gulp.dest( library.output.scripts ) )
		.pipe( gulp.dest( showcase.output.scripts ) )
		;
}

// Showcase copies.
function showcaseCopy() {

	return gulp.src([
		'./node_modules/lunr/lunr.min.js',
		'./node_modules/chart.js/dist/Chart.min.js',
		'./node_modules/jquery/dist/jquery.min.js',
		'./node_modules/clipboard/dist/clipboard.min.js'
	])
		.pipe( gulp.dest( showcase.output.scripts ) )
		;
}

// Showcase styles.
function showcaseCss() {
	return gulp.src( showcase.watch.styles )
		.pipe( sass({ outputStyle: 'expanded' }).on( 'error', sass.logError ) )
		.pipe( autoprefixer( browsersList ) )
		.pipe( header( banner ) )
		.pipe( gulp.dest( showcase.output.styles ) )
		.pipe( cleanCSS() )
		.pipe( rename({ suffix: '.min' }) )
		.pipe( gulp.dest( showcase.output.styles ) )
		;
}

// Showcase scripts.
function showcaseJs() {

	return gulp.src( showcase.watch.scripts )
		.pipe( eslint( ) )
		.pipe( eslint.format() )
		.pipe( eslint.failAfterError() )
		.pipe( babel({
			presets: [
				[ '@babel/env', {
					modules: false
				} ]
			]
		}) )
		.pipe( concat( 'showcase.js' ) )
		.pipe( uglify( uglifyOptions ) )
		.pipe( rename({ suffix: '.min' }) )
		.pipe( gulp.dest( showcase.output.scripts ) )
		;
}

// Watch for changes across project.
function watch() {

	// Watch for SUI styling changes.
	gulp.watch(
		library.watch.styles,
		suiCss
	);

	// Watch for showcase styling changes.
	gulp.watch(
		[
			library.source.styles + '**/**/*.scss',
			showcase.source.styles + '**/*.scss'
		],
		showcaseCss
	);

	// Watch for SUI js changes.
	gulp.watch(
		library.watch.scripts,
		suiJs
	);

	// Watch for showcase js changes.
	gulp.watch(
		[
			library.source.scripts + '**/**/*.js',
			showcase.source.scripts + '**/**/*.js'
		],
		showcaseJs
	);

}

/**
 * Update version and copy elements to
 * _dist folder.
 *
 * @since 2.0.0
 */

// Update SUI version.
function updateConfigVersion() {

	const version   = getVersion();
	const bodyClass = getBodyClass( false );

	return gulp.src( './_config.yml' )
		.pipe( replace( /(suiver: ').*(')/gm, function( match, p1, p2 ) {

			console.log( chalk.magentaBright( './_config.yml:' ) );
			console.log( `${chalk.green( 'suiver' )} has been updated to ${chalk.green( `${version}` )}\n` );

			return `${p1}${version}${p2}`;
		}) )
		.pipe( replace( /(suiclass: ').*(')/gm, function( match, p1, p2 ) {

			console.log( chalk.magentaBright( './_config.yml:' ) );
			console.log( `${chalk.green( 'suiclass' )} suiclass has been updated to ${chalk.green( bodyClass )}\n` );

			return `${p1}${bodyClass}${p2}`;
		}) )
		.pipe( gulp.dest( './' ) )
		;
}

function updateVariablesVersion() {

	const version = getVersion();

	return gulp.src( library.source.styles + '_variables.scss' )
		.pipe( replace( /^(\$sui-version: ').*(';)$/gm, function( match, p1, p2 ) {

			console.log( chalk.magentaBright( '\n./scss/_variables.scss:' ) );
			console.log( `${chalk.green( '$sui-version' )} has been updated to ${chalk.green( version )}\n` );

			return `${p1}${version}${p2}`;
		}) )
		.pipe( gulp.dest( library.source.styles ) )
		;
}

// Copy SUI files to "_dist" folder.
function copyMainLibrary() {

	// README and other main files.
	return gulp.src([ './LICENSE', './README.md', './CHANGELOG.md', '.gitignore', 'package.json' ])
		.pipe( gulp.dest( './_dist/library/' ) )
		;
}

// SUI icons font.
function copySuiFont() {

	return gulp.src([
		'./assets/fonts/wpmudev-plugin-icons.eot',
		'./assets/fonts/wpmudev-plugin-icons.svg',
		'./assets/fonts/wpmudev-plugin-icons.ttf',
		'./assets/fonts/wpmudev-plugin-icons.woff',
		'./assets/fonts/wpmudev-plugin-icons.woff2'
	])
		.pipe( gulp.dest( './_dist/library/dist/fonts/' ) )
		.pipe( gulp.dest( './_dist/showcase/assets/fonts/' ) )
		;
}

// Dashicons.
function copyDashicons() {

	return gulp.src([
		'./assets/fonts/dashicons.eot',
		'./assets/fonts/dashicons.svg',
		'./assets/fonts/dashicons.ttf',
		'./assets/fonts/dashicons.woff',
		'./assets/fonts/dashicons.woff2'
	])
		.pipe( gulp.dest( './_dist/showcase/assets/fonts/' ) )
		;
}

// Images.
function copyImages() {

	return gulp.src( './assets/images/*' )
		.pipe( gulp.dest( './_dist/library/dist/images/' ) )
		.pipe( gulp.dest( './_dist/showcase/assets/images/' ) )
		;
}

// Library pre-built styles.
function copyPreBuiltCss() {

	return gulp.src( library.watch.styles )
		.pipe( gulp.dest( './_dist/library/scss/' ) )
		;
}

// Library pre-built scripts.
function copyPreBuiltJs() {

	return gulp.src( library.watch.scripts )
		.pipe( gulp.dest( './_dist/library/js/' ) )
		;
}

// Showcase stylesheets.
function copyCss() {

	return gulp.src( './assets/css/*' )
		.pipe( gulp.dest( './_dist/showcase/assets/css/' ) )
		;
}

// Showcase scripts.
function copyJs() {

	return gulp.src( './assets/js/*.js' )
		.pipe( gulp.dest( './_dist/showcase/assets/js/' ) )
		;
}

// Showcase pages.
function copyPages() {

	return gulp.src([ './*.html', '_config.yml', '.gitignore' ])
		.pipe( gulp.dest( './_dist/showcase/' ) )
		;
}

// Showcase layouts.
function copyLayouts() {

	return gulp.src( './_layouts/*' )
		.pipe( gulp.dest( './_dist/showcase/_layouts/' ) )
		;
}

// Showcase components.
function copyComponents() {

	return gulp.src( './_includes/*' )
		.pipe( gulp.dest( './_dist/showcase/_includes/' ) )
		;
}

/**
 * Publishing tasks.
 * Release library and showcase files to
 * its correct branches.
 *
 * @since 2.0.0
 */

// Release library.
task(
	'publishLibrary',
	() => src( './_dist/library/**/**/*' ).pipe( ghPages({
		remoteUrl: 'https://github.com/wpmudev/shared-ui.git',
		branch: 'master',
		dotfiles: true,
		message: '📦 Shared UI v' + getVersion()
	}) )
);

// Release showcase.
task(
	'publishShowcase',
	() => src( './_dist/showcase/**/**/*' ).pipe( ghPages({
		remoteUrl: 'https://github.com/wpmudev/shared-ui.git',
		branch: 'gh-pages',
		dotfiles: true,
		message: '📦 Shared UI Showcase with SUI v' + getVersion()
	}) )
);

/**
 * Export functions.
 *
 * @since 2.12.0
 */
exports.build = gulp.series(
	suiCss,
	suiJs,
	showcaseCss,
	showcaseCopy,
	showcaseJs
);
exports.update = gulp.series(
	updateConfigVersion,
	updateVariablesVersion
);
exports.copy = gulp.series(
	copyMainLibrary,
	copySuiFont,
	copyDashicons,
	copyImages,
	gulp.parallel(
		copyPreBuiltCss,
		copyPreBuiltJs
	),
	gulp.parallel(
		copyCss,
		copyJs,
		copyPages,
		copyLayouts,
		copyComponents
	)
);

exports.watch = watch;
