var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var notify = require("gulp-notify");
var sass = require('gulp-sass');
var sassJspm = require('sass-jspm-importer');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function() {
  return gulp.src(paths.source)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(to5(assign({}, compilerOptions, {modules: 'system'})))
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function() {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

// compile scss files to the output directory
gulp.task('build-scss', function () {
  gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      functions: sassJspm.resolve_function('/jspm_packages/'),
      importer: sassJspm.importer
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.stylesOutput));
});

// copy all the fonts
gulp.task('copy-fonts', function() {
  return gulp.src([paths.fonts])
    .pipe(gulp.dest(paths.fontsOutput));
});

// copy all the images
gulp.task('copy-images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.imagesOutput));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html', 'build-scss', 'copy-fonts', 'copy-images'],
    callback
  );
});
