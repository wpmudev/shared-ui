var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	postcss = require('gulp-postcss'),
	mqpacker = require('css-mqpacker'),
	cleanCSS = require('gulp-clean-css'),
	rename = require("gulp-rename"),
	browserSync = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function () {
	gulp.src('./scss/**/*.scss')
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(autoprefixer('last 2 version', '> 1%'))
		.pipe(postcss([mqpacker]))
		.pipe(gulp.dest('./dist/css'))
		.pipe(cleanCSS())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('scripts', function () {
	gulp.src('./js/*.js')
		.pipe(concat('shared-ui.js'))
		.pipe(gulp.dest('./dist/js/'));
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
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'scripts', 'browser-sync', 'watch']);
