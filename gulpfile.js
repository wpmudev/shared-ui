'use strict';

const autoprefixer = require( 'gulp-autoprefixer' );
const browserSync  = require( 'browser-sync' ).create();
const chalk        = require( 'chalk' );
const cleanCSS     = require( 'gulp-clean-css' );
const concat       = require( 'gulp-concat' );
const eslint       = require( 'gulp-eslint' );
const fs           = require( 'fs' );
const gulp         = require( 'gulp' );
const header       = require( 'gulp-header' );
const pump         = require( 'pump' );
const rename       = require( 'gulp-rename' );
const replace      = require( 'gulp-replace' );
const sass         = require( 'gulp-sass' );
const uglify       = require( 'gulp-uglify' );
const watch        = require( 'gulp-watch' );

const banner = ['/*!',
	' * WPMU DEV Shared UI',
	' * Copyright 2018 Incsub (https://incsub.com)',
	' * Licensed under GPL v2 (http://www.gnu.org/licenses/gpl-2.0.html)',
	' */',
	''].join('\n');

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

// Build the Shared UI styles.
gulp.task( 'styles:sui', function() {
	gulp.src( './scss/**/*.scss')
		.pipe( sass({ outputStyle: 'expanded' }).on( 'error', sass.logError ) )
		.pipe( autoprefixer())
		.pipe( header( banner ) )
		.pipe( gulp.dest( './dist/css' ) )
		.pipe( cleanCSS() )
		.pipe( rename({ suffix: '.min' }) )
		.pipe( gulp.dest( './dist/css') )
		.pipe( browserSync.stream() );
});

// Build the Shared UI scripts.
gulp.task( 'scripts:sui', function( cb ) {
	pump(
		[
			gulp.src( './js/**/*.js' ),
			replace( 'SUI_BODY_CLASS', getBodyClass() ),
			eslint(),
			eslint.format(),
			eslint.failAfterError(),
            gulp.dest( './dist/js/_src' ),
			concat( 'shared-ui.js'),
			header( banner ),
			gulp.dest( './dist/js/' ),
			uglify(),
			rename({ suffix: '.min' }),
			header( banner ),
			gulp.dest( './dist/js/' ),
			browserSync.stream()
		],
		cb
	);
});

// Build the showcase styles.
gulp.task( 'styles:showcase', function() {
	gulp.src( './showcase-assets/**/*.scss' )
		.pipe( sass({ outputStyle: 'expanded' }).on( 'error', sass.logError ) )
		.pipe( autoprefixer( 'last 2 version', '> 1%' ) )
		.pipe( cleanCSS() )
		.pipe( rename({ suffix: '.min' }) )
		.pipe( gulp.dest( './showcase-assets/build/' ) )
		.pipe( browserSync.stream() );
});

// Build the showcase scripts.
gulp.task( 'scripts:showcase', function( cb ) {
	pump([
			gulp.src( ['./showcase-assets/*.js'] ),
			eslint(),
			eslint.format(),
			eslint.failAfterError(),
			uglify(),
			rename({ suffix: '.min' }),
			gulp.dest( './showcase-assets/build/' ),
			browserSync.stream()
		],
		cb
	);
});

// Initialize BrowserSync server.
gulp.task( 'browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
});

// Watch for changes across project.
gulp.task( 'watch', function() {

	// Watch for SUI styling changes.
	gulp.watch( 'scss/**/*.scss', ['styles:sui'] );

	// Watch for showcase styling changes.
	gulp.watch( ['showcase-assets/*.scss', 'scss/**/*.scss'], ['styles:showcase'] );

	// Watch for SUI js changes.
	gulp.watch( 'js/**/*.js', ['scripts:sui'] );

	// Watch for showcase js changes.
	gulp.watch( 'showcase-assets/*.js', ['scripts:showcase'] );

	// Watch for package.json changes.
	gulp.watch( 'package.json', ['build'] );

	// Watch for HTML changes.
	gulp.watch( '*.html' ).on( 'change', browserSync.reload );

});

// Increase version numbers used in project based off of current package.json.
gulp.task( 'update-versions', function( cb ) {
	const version   = getVersion();
	const bodyClass = getBodyClass( false );

	// Update project SCSS version.
	gulp.src( './scss/_variables.scss' )

		// Update SCSS version.
		.pipe( replace(/^(\$sui-version: ').*(';)$/gm, function( match, p1, p2 ) {

			console.log( chalk.magentaBright( '\n./scss/_variables.scss:' ) );
			console.log( `$sui-version has been updated to ${chalk.green( version )}\n` );

			return `${p1}${version}${p2}`;
		}))

		.pipe( gulp.dest( './scss/' ) );

	// Update showcase HTML versions.
	gulp.src( './index.html' )

		// Update body class version.
		.pipe( replace(/^(<body class=").*(">)$/gm, function( match, p1, p2 ) {

			console.log( chalk.magentaBright( './index.html:' ) );
			console.log( `Demo body class has been updated to ${chalk.green( bodyClass )}\n` );

			return `${p1}${bodyClass}${p2}`;
		}))

		// Update php code example body class.
		.pipe( replace(/(\$classes \.= ').*(';)/gm, function( match, p1, p2 ) {

			console.log( chalk.magentaBright( './index.html:' ) );
			console.log( `Demo php body class code example has been updated to ${chalk.green( bodyClass )}\n` );

			return `${p1}${bodyClass}${p2}`;
		}))

		// Update asset query string versions.
		.pipe( replace(/(\?ver=).*(">)/gm, function( match, p1, p2 ) {

			console.log( chalk.magentaBright( './index.html:' ) );
			console.log( `Asset query string has been updated to ${chalk.green( `?ver=${version}` )}\n` );

			return `${p1}${version}${p2}`;
		}))

		// Update asset query string versions.
		.pipe( replace(/(<p class="demo-sui-version">Version ).*(<\/p>)/gm, function( match, p1, p2 ) {

			console.log( chalk.magentaBright( './index.html:' ) );
			console.log( `Adminbar version has been updated to ${chalk.green( `?ver=${version}` )}\n` );

			return `${p1}${version}${p2}`;
		}))

		.pipe( gulp.dest( './' ) );

});

// Build all Shared UI files with new verions.
gulp.task( 'update-versions:build', [
	'update-versions',
	'build'
]);

// Build all Shared UI files.
gulp.task( 'build:sui', [
	'styles:sui',
	'scripts:sui'
]);

// Build all Showcase files.
gulp.task( 'build:showcase', [
	'styles:showcase',
	'scripts:showcase'
]);

// Build everything.
gulp.task( 'build', [
	'build:sui',
	'build:showcase'
]);

// Start development environment.
gulp.task( 'dev', [
	'build:sui',
	'build:showcase',
	'browser-sync',
	'watch'
]);
