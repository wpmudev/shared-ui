'use strict';

/**
 * Required Packages
 */

const chalk        = require( 'chalk' );
const fs           = require( 'fs' );
const pump         = require( 'pump' );
const browserSync  = require( 'browser-sync' ).create();

const gulp         = require( 'gulp' );
const autoprefixer = require( 'gulp-autoprefixer' );
const cleanCSS     = require( 'gulp-clean-css' );
const concat       = require( 'gulp-concat' );
const eslint       = require( 'gulp-eslint' );
const header       = require( 'gulp-header' );
const rename       = require( 'gulp-rename' );
const replace      = require( 'gulp-replace' );
const sass         = require( 'gulp-sass' );
const uglify       = require( 'gulp-uglify' );
const watch        = require( 'gulp-watch' );

/**
 * WPMU DEV Banner
 *
 * Print this on SUI scripts.
 */

const banner = [
	'/*!',
	' * WPMU DEV Shared UI',
	' * Copyright 2018 - 2019 Incsub (https://incsub.com)',
	' * Licensed under GPL v2 (http://www.gnu.org/licenses/gpl-2.0.html)',
	' */',
	''
].join( '\n' );

/**
 * Get the latest project version from package.json.
 *
 * @return {string} version
 */

function getVersion() {

	const json = JSON.parse( fs.readFileSync( './package.json' ) );

	return json.version;

}

/**
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
 * Tasks to build Shared UI assets.
 */

// SUI Styles.
gulp.task( 'sui:styles', () => {

	gulp.src( './scss/**/*.scss' )
		.pipe( sass({
			outputStyle: 'expanded'
		}).on( 'error', sass.logError ) )
		.pipe( autoprefixer() )
		.pipe( header( banner ) )
		.pipe( gulp.dest( './dist/css' )
		.pipe( cleanCSS() ) )
		.pipe( rename({
			suffix: '.min'
		}) )
		.pipe( gulp.dest( './dist/css' ) )
		.pipe( browserSync.stream() )
		;
});

// SUI Scripts.
gulp.task( 'sui:scripts', ( cb ) => {

	pump([
		gulp.src( './js/**/*.js' ),
		replace( 'SUI_BODY_CLASS', getBodyClass() ),
		eslint(),
		eslint.format(),
		eslint.failAfterError(),
		gulp.dest( './dist/js/_src' ),
		concat( 'shared-ui.js' ),
		header( banner ),
		gulp.dest( './dist/js/' ),
		uglify(),
		rename({
			suffix: '.min'
		}),
		header( banner ),
		gulp.dest( './dist/js/' ),
		gulp.dest( './showcase/assets/build/' ),
		browserSync.stream()
	], cb );
});

/**
 * Tasks to build showcase assets.
 */

// Showcase Icons Font.
gulp.task( 'showcase:fonts', () => {

	gulp.src( './dist/fonts/*' )
		.pipe( gulp.dest( './showcase/assets/fonts/' ) )
		;
});

// Showcase Images.
gulp.task( 'showcase:images', () => {

	gulp.src( './dist/images/*' )
		.pipe( gulp.dest( './showcase/assets/images/' ) )
		;
});

// Showcase Styles.
gulp.task( 'showcase:styles', () => {

	gulp.src( './showcase/assets/scss/**/*.scss' )
		.pipe( sass({
			outputStyle: 'expanded'
		}).on( 'error', sass.logError ) )
		.pipe( autoprefixer( 'last 2 version', '> 1%' ) )
		.pipe( cleanCSS() )
		.pipe( rename({
			suffix: '.min'
		}) )
		.pipe( gulp.dest( './showcase/assets/build/' ) )
		.pipe( browserSync.stream() )
		;
});

// Showcase Scripts.
gulp.task( 'showcase:scripts', ( cb ) => {

	pump([
		gulp.src([ './showcase/assets/js/**/*.js' ]),
		eslint(),
		eslint.format(),
		eslint.failAfterError(),
		concat( 'showcase.js' ),
		uglify(),
		rename({
			suffix: '.min'
		}),
		gulp.dest( './showcase/assets/build/' ),
		browserSync.stream()
	], cb );
});

/**
 * BrowserSync Server
 *
 * Initialize the server for development environment.
 */
gulp.task( 'browser-sync', () => {
	browserSync.init({
		server: {
			baseDir: './showcase/'
		}
	});
});

/**
 * Watch project changes.
 */
gulp.task( 'watch', () => {

	// Watch for SUI changes.
	gulp.watch( './scss/**/*.scss', [
		'sui:styles'
	]);

	gulp.watch( './js/**/*.js', [
		'sui:scripts'
	]);

	// Watch for showcase changes.
	gulp.watch( './dist/fonts/*', [
		'showcase:fonts'
	]);

	gulp.watch( './dist/images/*', [
		'showcase:images'
	]);

	gulp.watch(
		[ './scss/**/*.scss', './showcase/assets/scss/**/*.scss' ],
		[ 'showcase:styles' ]
	);

	gulp.watch( './showcase/assets/js/**/*.js', [
		'showcase:scripts'
	]);

	// Watch for package changes.
	gulp.watch( 'package.json', [
		'build'
	]);

	// Watch for HTML changes.
	gulp.watch([
		'./showcase/*.html',
		'./showcase/templates/*.html'
	]).on( 'change', browserSync.reload );
});

/**
 * Tasks for correct versioning.
 *
 * Increase version numbers used in project based off of current package.json.
 */
gulp.task( 'sui:version', ( cb ) => {

	const version   = getVersion();
	const bodyClass = getBodyClass( false );

	// Update version on SCSS file.
	gulp.src( './scss/_variables.scss' )
		.pipe( replace(
			/^(\$sui-version: ').*(';)$/gm,
			( match, p1, p2 ) => {
				console.log( chalk.magentaBright( '\n./scss/_variables.scss:' ) );
				console.log( `$sui-version has been updated to ${chalk.green( version )}\n` );
				return `${p1}${version}${p2}`;
			}
		) )
		.pipe( gulp.dest( './scss/' ) )
		;

	// Update body class SUI version HTML pages.
	gulp.src([ './showcase/*.html' ])
		.pipe( replace(
			/(body class=").*(" data-page)/gm,
			( match, p1, p2 ) => {
				console.log( `Demo body class has been updated to ${chalk.green( bodyClass )}\n` );
				return `${p1}${bodyClass}${p2}`;
			}
		) )
		.pipe( gulp.dest( './showcase/' ) )
		;

	// Update assets query string versions.
	gulp.src( './showcase/*.html' )
		.pipe( replace(
			/(\?ver=).*(")/gm,
			( match, p1, p2 ) => {
				console.log( `Asset query string has been updated to ${chalk.green( `?ver=${version}` )}\n` );
				return `${p1}${version}${p2}`;
			}
		) )
		.pipe( './showcase/' )
		;

	// Update PHP body class code example on "Requirements" page.
	gulp.src( './showcase/page-requirements.html' )
		.pipe( replace(
			/(\$classes \.= ').*(';)/gm,
			( match, p1, p2 ) => {
				console.log( `Demo php body class code example has been updated to ${chalk.green( bodyClass )}\n` );
				return `${p1}${bodyClass}${p2}`;
			}
		) )
		.pipe( gulp.dest( './showcase/' ) )
		;

	// Update SUI version on admin bar template.
	gulp.src( './showcase/templates/wpadmin-bar.html' )
		.pipe( replace(
			/(>Version ).*(<)/gm,
			( match, p1, p2 ) => {
				console.log( chalk.magentaBright( './wpadmin-bar.html:' ) );
				console.log( `Adminbar version has been updated to ${chalk.green( `Version ${version}` )}\n` );
				return `${p1}${version}${p2}`;
			}
		) )
		.pipe( gulp.dest( './showcase/templates/' ) )
		;

});

/**
 * Grouped build tasks.
 */

// Build Shared UI files with new version.
gulp.task( 'build:version', [
	'sui:version',
	'build'
]);

// Build Shared UI assets.
gulp.task( 'build:sui', [
	'sui:styles',
	'sui:scripts'
]);

// Build showcase assets.
gulp.task( 'build:showcase', [
	'showcase:styles',
	'showcase:scripts'
]);

// Build everything.
gulp.task( 'build', [
	'build:sui',
	'build:showcase'
]);

// Development environment.
gulp.task( 'dev', [
	'build:sui',
	'build:showcase',
	'browser-sync',
	'watch'
]);
