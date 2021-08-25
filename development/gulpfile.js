const gulp = require('gulp');

const { src, dest, watch, series, parallel } = require('gulp');
const sass       = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const twig       = require('gulp-twig');
const babel      = require("gulp-babel");
const eslint     = require('gulp-eslint');
const uglify     = require('gulp-uglify');
const concat     = require('gulp-concat');
const gutil      = require('gulp-util');
const browserify = require('gulp-browserify');
const babelify   = require('babelify');

sass.compiler = require('node-sass');

const paths = {
    styles: {
        src: 'sass/**/*.scss',
        dest: '../build/styles/'
    },
    scripts: {
        src: 'js/**/*.js',
        dest: '../build/js/'
    }
};


function js_compile(){
	return gulp.src('js/customization.js')
		.pipe( eslint() )
		.pipe( eslint.format() )
		.pipe( eslint.failAfterError() )
		.pipe(browserify({
			transform: ['babelify'],
		}))
		.pipe(uglify())
		.pipe(gulp.dest(paths.scripts.dest))
		.on('error', gutil.log);
}


function combile_libs_js(){
	return gulp.src([
			'js/jquery.min.js',
			'js/modernizr-2.0.6.min.js',
			'js/jquery.easing-1.3.pack.js',
			'js/jquery.mousewheel-3.0.6.pack.js',
			'js/jquery.fancybox.min.js',
			'js/jquery.touchSwipe.min.js',
			'js/slick.js',
		])
		.pipe(concat('libs.js'))
		.pipe(gulp.dest(paths.scripts.dest))
		.on('error', gutil.log);
}



function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest));
}


function watch2() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, combile_libs_js);
    gulp.watch(paths.scripts.src, js_compile);
}

function build() {
	styles();
	combile_libs_js();
	js_compile();
}

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.watch = watch2;
exports.build = gulp.series(styles, gulp.parallel(combile_libs_js, js_compile));



