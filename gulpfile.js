'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rimraf = require('rimraf');
var notifier = require('node-notifier');
var nunjucksRender = require('gulp-nunjucks-render');
var htmlbeautify = require('gulp-html-beautify');
var cssBase64 = require('gulp-css-base64');

var DEBUG = process.env.DEBUG == "false" ? false : true;
console.log(DEBUG)
var TARGET = process.env.npm_lifecycle_event;

gulp.task('serve', function () {
    var config;
    if (DEBUG) {
        config = {
            server: "./src",
            port: 3000,
            logPrefix: TARGET,
            browser: "chrome"
        }
    } else {
        config = {
            server: "./dist",
            port: 3000,
            logPrefix: TARGET,
            browser: "chrome"
        }
    }

    browserSync.init(config);

    if (DEBUG) {
        gulp.watch("src/fonts/**/*").on('change', browserSync.reload);
        gulp.watch("src/images/**/*").on('change', browserSync.reload);
        gulp.watch("src/js/**/*.js").on('change', browserSync.reload);
        gulp.watch("src/css/**/*.css").on('change', browserSync.reload);
        gulp.watch("src/scss/**/*.scss", ['scss']);
        gulp.watch("src/*.html").on('change', browserSync.reload);
    } else {
        gulp.watch("src/fonts/**/*", ['fonts']);
        gulp.watch("src/images/**/*", ['images']);
        gulp.watch("src/js/**/*.js", ['js']);
        gulp.watch(["src/css/**/*.css", "!src/css/style.css"], ['css']);
        gulp.watch("src/scss/**/*.scss", ['scss']);
        gulp.watch(["src/*.nunjucks", "src/templates/**/*.nunjucks"], ['html']);
    }

});

// delete dist
gulp.task('rimraf', function (cb) {
    rimraf('./dist', cb);
});

// images
gulp.task('images', function () {
    if (!DEBUG) {
        return gulp.src('src/images/**/*')
            // .pipe(imagemin())
            .pipe(gulp.dest('dist/images'))
            .pipe(browserSync.stream());
    }
});

// fonts
gulp.task('fonts', function () {
    if (!DEBUG) {
        return gulp.src('src/fonts/**/*')
            .pipe(gulp.dest('dist/fonts'))
            .pipe(browserSync.stream());
    }

});
// video
gulp.task('video', function () {
    if (!DEBUG) {
        return gulp.src('src/video/**/*')
            .pipe(gulp.dest('dist/video'))
            .pipe(browserSync.stream());
    }

});

// js
gulp.task('js', function () {
    if (!DEBUG) {
        return gulp.src('src/js/**/*.js')
            .pipe(uglify())
            .pipe(gulp.dest("dist/js"))
            .pipe(browserSync.stream());
    }
});

// css
gulp.task('css', function () {
    if (!DEBUG) {
        return gulp.src("src/css/**/*.css")
            .pipe(csso())
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.stream());
    }
});


// sass
gulp.task('scss', function () {

    if (DEBUG) {
        return gulp.src("src/scss/style.scss")
            .pipe(sass().on('error', sass.logError))
            .pipe(cssBase64())
            .pipe(autoprefixer({
                browsers: ['last 10 versions'],
                cascade: true
            }))
            .pipe(gulp.dest("src/css"));
        // .pipe(browserSync.stream());
    } else {
        return gulp.src("src/scss/**/*.scss")
            .pipe(sass().on('error', sass.logError))
            .pipe(cssBase64())
            .pipe(autoprefixer({
                browsers: ['last 10 versions'],
                cascade: false
            }))
            .pipe(csso())
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.stream());


    }
});

// html
gulp.task('html', function () {
    if (!DEBUG) {
        return gulp.src("src/*.html")
            // .pipe(htmlbeautify())
            .pipe(gulp.dest("dist/"))
            .pipe(browserSync.stream());
    }
});

gulp.task('syncServe', function (callback) {
    runSequence(
        'rimraf',
        // 'fonts',
        // 'images',
        // 'css',
        'scss',
        // 'js',
        // 'html',
        'serve',
        callback);
});

gulp.task('syncBuild', function (callback) {
    runSequence(
        'rimraf',
        'fonts',
        'images',
        'video',
        'css',
        'scss',
        'js',
        'html',
        callback);
});

gulp.task('default', ['syncServe']);

gulp.task('build', ['syncBuild']);
