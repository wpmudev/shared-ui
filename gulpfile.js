'use strict';

// Import `src` and `dest` from gulp for use in the task.
const { src, dest } = require( 'gulp' );

/**
 * Supported Packages
 * List here all dependencies necessary to run required tasks.
 *
 * @since 1.0.0
 */
const fs           = require( 'fs' );
const pump         = require( 'pump' );
const gulp         = require( 'gulp' );
const chalk        = require( 'chalk' );
const autoprefixer = require( 'gulp-autoprefixer' );
const clean        = require( 'gulp-clean' );
const cleanCSS     = require( 'gulp-clean-css' );
const concat       = require( 'gulp-concat' );
const eslint       = require( 'gulp-eslint' );
const header       = require( 'gulp-header' );
const rename       = require( 'gulp-rename' );
const replace      = require( 'gulp-replace' );
const sass         = require( 'gulp-sass' );
const uglify       = require( 'gulp-uglify-es' ).default;
const babel        = require( 'gulp-babel' );
const watch        = require( 'gulp-watch' );
const notify       = require( 'gulp-notify' );
const ghpages      = require( 'gh-pages' );

/**
 * Get Package File
 *
 * @since 1.0.0
 */

const pckg = JSON.parse( fs.readFileSync( './package.json' ) );

/**
 * WPMU DEV Banner
 * Print this on SUI scripts.
 *
 * @since 1.0.0
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
 * Development Tasks.
 *
 * @since 2.0.0
 */

// SUI styles.
gulp.task( 'sui:styles', () => {

	gulp.src( library.watch.styles )
		.pipe( sass({ outputStyle: 'expanded' }).on( 'error', sass.logError ) )
		.pipe( autoprefixer( browsersList ) )
		.pipe( header( banner ) )
		.pipe( gulp.dest( library.output.styles ) )
		.pipe( cleanCSS() )
		.pipe( rename({ suffix: '.min' }) )
		.pipe( gulp.dest( library.output.styles ) )
		;
});

// SUI scripts.
gulp.task( 'sui:scripts', ( cb ) => {

	pump([
		gulp.src( library.watch.scripts ),
		replace( 'SUI_BODY_CLASS', getBodyClass() ),
		eslint(),
		eslint.format(),
		eslint.failAfterError(),
		babel({
			presets: [
				[ '@babel/env', {
					modules: false
				} ]
			]
		}),
		gulp.dest( library.output.scripts + '_src' ),
		concat( 'shared-ui.js' ),
		header( banner ),
		gulp.dest( library.output.scripts ),
		uglify( uglifyOptions ),
		rename({ suffix: '.min' }),
		header( banner ),
		gulp.dest( library.output.scripts ),
		gulp.dest( showcase.output.scripts )
	], cb, err => {
		if ( err ) {
			notify().write( err );
		}
		cb();
	});
});

// Showcase copies.
gulp.task( 'dev:jsCopies', () => {

	gulp.src([
		'./node_modules/lunr/lunr.min.js',
		'./node_modules/chart.js/dist/Chart.min.js',
		'./node_modules/jquery/dist/jquery.min.js'
	])
		.pipe( gulp.dest( showcase.output.scripts ) )
		;
});

// Showcase styles.
gulp.task( 'dev:styles', () => {

	gulp.src( showcase.watch.styles )
		.pipe( sass({ outputStyle: 'expanded' }).on( 'error', sass.logError ) )
		.pipe( autoprefixer( browsersList ) )
		.pipe( header( banner ) )
		.pipe( gulp.dest( showcase.output.styles ) )
		.pipe( cleanCSS() )
		.pipe( rename({ suffix: '.min' }) )
		.pipe( gulp.dest( showcase.output.styles ) )
		;
});

// Showcase scripts.
gulp.task( 'dev:scripts', ( cb ) => {

	pump([
		gulp.src( showcase.watch.scripts ),
		eslint(),
		eslint.format(),
		eslint.failAfterError(),
		babel({
			presets: [
				[ '@babel/env', {
					modules: false
				} ]
			]
		}),
		concat( 'showcase.js' ),
		uglify( uglifyOptions ),
		rename({
			suffix: '.min'
		}),
		gulp.dest( showcase.output.scripts )
	], cb, err => {
		if ( err ) {
			notify().write( err );
		}
		cb();
	});
});

// Watch for changes across project.
gulp.task( 'watch', () => {

	// Watch for SUI styling changes.
	gulp.watch(
		library.watch.styles,
		[ 'sui:styles' ]
	);

	// Watch for showcase styling changes.
	gulp.watch(
		[
			library.source.styles + '**/**/*.scss',
			showcase.source.styles + '**/*.scss'
		],
		[ 'dev:styles' ]
	);

	// Watch for SUI js changes.
	gulp.watch(
		library.watch.scripts,
		[ 'sui:scripts' ]
	);

	// Watch for showcase js changes.
	gulp.watch(
		[
			library.source.scripts + '**/**/*.js',
			showcase.source.scripts + '**/**/*.js'
		],
		[ 'dev:scripts' ]
	);
});

/**
 * Update version and copy elements to
 * _dist folder.
 *
 * @since 2.0.0
 */

// Update SUI version.
gulp.task( 'update-version', () => {

	const version   = getVersion();
	const bodyClass = getBodyClass( false );

	gulp.src( './_config.yml' )
		.pipe( replace( /(suiver: ').*(')/gm, function( match, p1, p2 ) {

			console.log( chalk.magentaBright( './_config.yml:' ) );
			console.log( `Update SUI version to ${chalk.green( `suiver: ${version}` )}\n` );

			return `${p1}${version}${p2}`;
		}) )
		.pipe( replace( /(suiclass: ').*(')/gm, function( match, p1, p2 ) {

			console.log( chalk.magentaBright( './_config.yml:' ) );
			console.log( `Update SUI class to ${chalk.green( bodyClass )}\n` );

			return `${p1}${bodyClass}${p2}`;
		}) )
		.pipe( gulp.dest( './' ) )
		;

	gulp.src( library.source.styles + '_variables.scss' )
		.pipe( replace( /^(\$sui-version: ').*(';)$/gm, function( match, p1, p2 ) {

			console.log( chalk.magentaBright( '\n./scss/_variables.scss:' ) );
			console.log( `$sui-version has been updated to ${chalk.green( version )}\n` );

			return `${p1}${version}${p2}`;
		}) )
		.pipe( gulp.dest( library.source.styles ) )
		;
});

// Copy SUI files to "_dist" folder.
gulp.task( 'copy-files', () => {

	// README and other main files.
	gulp.src([ './LICENSE', './README.md', './CHANGELOG.md', '.gitignore', 'package.json' ])
		.pipe( gulp.dest( './_dist/library/' ) )
		;

	// Icon fonts.
	gulp.src( './assets/fonts/*' )
		.pipe( gulp.dest( './_dist/library/dist/fonts/' ) )
		.pipe( gulp.dest( './_dist/showcase/assets/fonts/' ) )
		;

	// Images.
	gulp.src( './assets/images/*' )
		.pipe( gulp.dest( './_dist/library/dist/images/' ) )
		.pipe( gulp.dest( './_dist/showcase/assets/images/' ) )
		;

	// Library pre-built styles.
	gulp.src( library.watch.styles )
		.pipe( gulp.dest( './_dist/library/scss/' ) )
		;

	// Library pre-built scripts.
	gulp.src( library.watch.scripts )
		.pipe( gulp.dest( './_dist/library/js/' ) )
		;

	// Showcase stylesheets.
	gulp.src( './assets/css/*' )
		.pipe( gulp.dest( './_dist/showcase/assets/css/' ) )
		;

	// Showcase scripts.
	gulp.src( './assets/js/*.js' )
		.pipe( gulp.dest( './_dist/showcase/assets/js/' ) )
		;

	// Showcase pages.
	gulp.src([ './*.html', '_config.yml', '.gitignore' ])
		.pipe( gulp.dest( './_dist/showcase/' ) )
		;

	// Showcase layouts.
	gulp.src( './_layouts/*' )
		.pipe( gulp.dest( './_dist/showcase/_layouts/' ) )
		;

	// Showcase components.
	gulp.src( './_includes/*' )
		.pipe( gulp.dest( './_dist/showcase/_includes/' ) )
		;
});

/**
 * Publishing tasks.
 * Release library and showcase files to
 * its correct branches.
 *
 * @since 2.0.0
 */

// Release library.
gulp.task( 'publish:sui', () => {

	ghpages.publish( '_dist/library/', {
		branch: 'master',
		repo: 'https://github.com/iamleigh/sui-showcase-jekyll-test.git',
		dest: '',
		dotfiles: true,
		message: 'New version released.'
	});
});

// Release showcase.
gulp.task( 'publish:dev', () => {

	ghpages.publish( '_dist/showcase/', {
		branch: 'gh-pages',
		repo: 'https://github.com/iamleigh/sui-showcase-jekyll-test.git',
		dest: '',
		dotfiles: true,
		message: 'Update showcase with latest SUI changes.'
	});
});
