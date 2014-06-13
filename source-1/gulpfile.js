var gulp =          require('gulp');
var clean =         require('gulp-clean');
var watch =         require('gulp-watch');
var handlebars =    require('gulp-ember-handlebars');
var concat =        require('gulp-concat');
var uglify =        require('gulp-uglify');
var less =          require('gulp-less');
var autoprefixer =  require('gulp-autoprefixer');
var minifycss =     require('gulp-minify-css');
var rename =        require('gulp-rename');
var imagemin =      require('gulp-imagemin');
var cache =         require('gulp-cache');
var changed =       require('gulp-changed');
var gutil =         require('gulp-util');

var paths = {
  templates: ['**/*.{hbs,html}'],
  scripts:   ['js/**/*.js'],
  styles:    ['less/all.less'],
  images:    ['img/**/*']
};

var dest = {
  build:  'dist'
};
dest.scripts =    dest.build + '/js';
dest.styles =     dest.build + '/css';
dest.images =     dest.build + '/img';
dest.templates =  dest.scripts;

gulp.task('clean', function () {  
  return gulp.src(dest.build, {read: false})
    .pipe(clean());
});

gulp.task('templates', function() {
  return gulp.src(paths.templates)
    .pipe(handlebars({outputType: 'browser'}))
    .pipe(concat('template.js'))
    .pipe(gulp.dest(dest.templates))
    .on('error', gutil.log);
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
    .on('error', gutil.log);
});

// Compile Less, autoprefix, and minify the resulting CSS
gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(changed(dest.styles)) // exclude unmodified files
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest(dest.styles))
    .pipe(minifycss())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(dest.styles))
    .on('error', gutil.log);
});

// Copy all static images
gulp.task('images', function() {
 return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(cache(imagemin())) // only compress changed images
    .pipe(gulp.dest(dest.images))
    .on('error', gutil.log);
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(['less/**/*.less'], ['styles']);
  gulp.watch(paths.images, ['images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'styles', 'images', 'watch']);
