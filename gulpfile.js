var gulp =          require('gulp');
var clean =         require('gulp-clean');
var watch =         require('gulp-watch');
var htmlmin =       require('gulp-htmlmin');
var htmlify =       require('gulp-angular-htmlify');
var concat =        require('gulp-concat');
var uglify =        require('gulp-uglify');
var less =          require('gulp-less');
var autoprefixer =  require('gulp-autoprefixer');
var minifycss =     require('gulp-minify-css');
var rename =        require('gulp-rename');
// var imagemin =      require('gulp-imagemin');
var cache =         require('gulp-cache');
var changed =       require('gulp-changed');
var util =          require('gulp-util');

var paths = {
  views: ['source/**/*.html'],
  scripts: ['source/scripts/**/*.js'],
  styles: ['source/styles/all.less'],
  statics: ['source/statics/**/*']
};

var dest = {
  build:  'build'
};
dest.views = dest.build;
dest.scripts = dest.build + '/assets';
dest.styles = dest.build + '/assets';
dest.statics = dest.build + '/assets';

gulp.task('clean', function () {  
  return gulp.src(dest.build, {read: false})
    .pipe(clean());
});

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

// Minify HTML views
gulp.task('views', function() {
  return gulp.src(paths.views)
    .pipe(htmlify())
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest(dest.views))
    .on('error', util.log);
});
  
// Minify and copy all JavaScript (except vendor scripts)
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    // .pipe(coffee())
    .pipe(concat('all.js'))
    .pipe(gulp.dest(dest.scripts))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(dest.scripts))
    .on('error', util.log);
});
  
// Compile Less, autoprefix, and minify the resulting CSS
gulp.task('styles', function () {
  return gulp.src(paths.styles)
    // .pipe(changed(dest.styles)) // exclude unmodified files
    .pipe(less())
    // .pipe(autoprefixer())
    .pipe(gulp.dest(dest.styles))
    .pipe(minifycss())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(dest.styles))
    .on('error', util.log);
});

// Copy all static assets
gulp.task('statics', function() {
 return gulp.src(paths.statics)
    // Pass in options to the task
    .pipe(gulp.dest(dest.statics))
    .on('error', util.log);
});
  
// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.views, ['views']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(['source/less/**/*.less'], ['styles']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['views', 'scripts', 'styles', 'statics', 'watch']);
