'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	pump = require('pump'),
	postcss = require('gulp-postcss'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer'),
	replace = require('gulp-replace'),
	fs = require('fs');

function getVersion() {
	var json = JSON.parse(fs.readFileSync('./package.json'));
	return json.version;
}

function getBodyClass(selector = true) {
	var v = getVersion();
	var p = selector ? '.' : '';
	return `${p}sui-${v.replace(/\./g, "-")}`;
}

gulp.task('styles', function () {
	gulp.src('./scss/**/*.scss')
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(autoprefixer('last 2 version', '> 1%'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(cleanCSS())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('scripts', function (cb) {
	pump([
			gulp.src('./js/*.js'),
			replace('SUI_BODY_CLASS', getBodyClass()),
			concat('shared-ui.js'),
			gulp.dest('./dist/js/'),
			uglify(),
			rename({ suffix: '.min' }),
			gulp.dest('./dist/js/'),
			browserSync.stream()
		],
		cb
	);
});

gulp.task('showcase-scripts', function (cb) {
	pump([
			gulp.src('./showcase-assets/*.js'),
			replace('SUI_VERSION', getVersion()),
			uglify(),
			rename({ suffix: '.min' }),
			gulp.dest('./showcase-assets/dist/'),
			browserSync.stream()
		],
		cb
	);
});

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});

gulp.task('watch', function () {
	gulp.watch('scss/**/*.scss', ['styles']);
	gulp.watch(['js/*.js', 'package.json'], ['scripts']);
	gulp.watch(['showcase-assets/*.js', 'package.json'], ['showcase-scripts']);
	gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'scripts', 'showcase-scripts', 'browser-sync', 'watch']);
gulp.task('build', ['styles', 'scripts', 'showcase-scripts']);
