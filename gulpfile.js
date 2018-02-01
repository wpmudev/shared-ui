'use strict';

const autoprefixer = require( 'gulp-autoprefixer' );
const browserSync  = require( 'browser-sync' ).create();
const cleanCSS     = require( 'gulp-clean-css' );
const concat       = require( 'gulp-concat' );
const eslint       = require( 'gulp-eslint' );
const fs           = require( 'fs' );
const gulp         = require( 'gulp' );
const pump         = require( 'pump' );
const rename       = require( 'gulp-rename' );
const replace      = require( 'gulp-replace' );
const sass         = require( 'gulp-sass' );
const uglify       = require( 'gulp-uglify' );
const watch        = require( 'gulp-watch' );

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
		.pipe( replace( 'SUI_BODY_CLASS', getBodyClass() ) )
		.pipe( autoprefixer())
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
			gulp.src( './js/*.js' ),
			replace( 'SUI_BODY_CLASS', getBodyClass() ),
			eslint(),
			eslint.format(),
			eslint.failAfterError(),
			concat( 'shared-ui.js'),
			gulp.dest( './dist/js/' ),
			uglify(),
			rename({ suffix: '.min' }),
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
			replace( 'SUI_VERSION', getVersion() ),
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
	gulp.watch( 'showcase-assets/*.scss', ['styles:showcase'] );

	// Watch for SUI js changes.
	gulp.watch( 'js/*.js', ['scripts:sui'] );

	// Watch for showcase js changes.
	gulp.watch( 'showcase-assets/*.js', ['scripts:showcase'] );

	// Watch for package.json changes.
	gulp.watch( 'package.json', ['build'] );

	// Watch for HTML changes.
	gulp.watch( '*.html' ).on( 'change', browserSync.reload );

});

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
