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
var imagemin =      require('gulp-imagemin');
var cache =         require('gulp-cache');
var changed =       require('gulp-changed');
var util =          require('gulp-util');

var paths = {
  templates: ['source/**/*.html'],
  scripts:   ['source/js/**/*.js'],
  styles:    ['source/less/all.less'],
  images:    ['source/img/**/*']
  // data:      ['source/data/**/*.json']
};

var dest = {
  build:  'build'
};
dest.templates =  dest.build;
dest.scripts =    dest.build + '/js';
dest.styles =     dest.build + '/css';
dest.images =     dest.build + '/img';
// dest.data =       dest.build + '/data';

gulp.task('clean', function () {  
  return gulp.src(dest.build, {read: false})
    .pipe(clean());
});

// gulp.task('templates', function() {
//   return gulp.src(paths.templates)
//     .pipe(concat('templates.jsx'))
//     .pipe(react())
//     .pipe(gulp.dest(dest.templates))
//     .pipe(uglify())
//     .pipe(rename({extname: '.min.js'}))
//     .pipe(gulp.dest(dest.templates))
//     .on('error', util.log);
// });

// Minify HTML templates
gulp.task('templates', function() {
  return gulp.src(paths.templates)
    .pipe(htmlify())
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest(dest.templates))
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
  
// Copy all static images
gulp.task('images', function() {
 return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(cache(imagemin())) // only compress changed images
    .pipe(gulp.dest(dest.images))
    .on('error', util.log);
});

// Copy over sample data
// gulp.task('data', function() {
//  return gulp.src(paths.data)
//     .pipe(gulp.dest(dest.data))
//     .on('error', util.log);
// });
  
// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(['source/less/**/*.less'], ['styles']);
  gulp.watch(paths.images, ['images']);
  // gulp.watch(paths.data, ['data']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['templates', 'scripts', 'styles', 'images',/* 'data',*/ 'watch']);
