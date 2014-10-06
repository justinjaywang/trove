var gulp         = require('gulp');
var watch        = require('gulp-watch');
var util         = require('gulp-util');
var htmlmin      = require('gulp-htmlmin');
var htmlify      = require('gulp-angular-htmlify');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var less         = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifycss    = require('gulp-minify-css');
var rename       = require('gulp-rename');

var paths = {};
paths.views       = 'source/**/*.html';
paths.scripts     = 'source/scripts/**/*.js';
paths.styles      = 'source/styles/all.less';
paths.statics     = 'source/statics/**/*';
paths.rootStatics = 'source/root-statics/**/*';

var dest = { build:  'build' };
dest.views       = dest.build;
dest.scripts     = dest.build + '/assets';
dest.styles      = dest.build + '/assets';
dest.statics     = dest.build + '/assets';
dest.rootStatics = dest.build;

// gulp.task('views', function() {
//   return gulp.src(paths.views)
//     .pipe(concat('views.jsx'))
//     .pipe(react())
//     .pipe(gulp.dest(dest.views))
//     .pipe(uglify())
//     .pipe(rename({extname: '.min.js'}))
//     .pipe(gulp.dest(dest.views))
//     .on('error', util.log);
// });

// minify HTML views
gulp.task('views', function() {
  return gulp.src(paths.views)
    .pipe(htmlify())
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest(dest.views))
    .on('error', util.log);
});
  
// minify and copy non-vendor JavaScript
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('all.js'))
    .pipe(gulp.dest(dest.scripts))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(dest.scripts))
    .on('error', util.log);
});
  
// compile, autoprefix, and minify Less
gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(less())
    // .pipe(autoprefixer())
    .pipe(gulp.dest(dest.styles))
    .pipe(minifycss())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(dest.styles))
    .on('error', util.log);
});

// copy static assets
gulp.task('statics', function() {
 return gulp.src(paths.statics)
    .pipe(gulp.dest(dest.statics))
    .on('error', util.log);
});

// copy static assets to root
gulp.task('rootStatics', function() {
 return gulp.src(paths.rootStatics)
    .pipe(gulp.dest(dest.rootStatics))
    .on('error', util.log);
});
  
// rerun tasks on file changes
gulp.task('watch', function() {
  gulp.watch(paths.views, ['views']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(['source/styles/**/*.less'], ['styles']);
  gulp.watch(paths.statics, ['statics']);
  gulp.watch(paths.rootStatics, ['rootStatics']);
});

// default task
gulp.task('default', [
  'views',
  'scripts',
  'styles',
  'statics',
  'rootStatics',
  'watch'
]);
