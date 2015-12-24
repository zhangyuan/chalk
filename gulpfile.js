var gulp = require("gulp"),
  connect = require('gulp-connect'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  htmlreplace = require('gulp-html-replace'),
  zip = require('gulp-zip'),
  sass = require('gulp-sass'),
  rev = require('gulp-rev'),
  jasmine = require('gulp-jasmine'),
  Server = require('karma').Server,
  del = require('del');

gulp.task('connect', function(){
  return connect.server({
    root: ['app']
  })
});

gulp.task('connect-build', function(){
  return connect.server({
    root: ['build']
  })
});

gulp.task('html', function(){
  return gulp.src(["app/*.html"])
    .pipe(htmlreplace({
      'css':'stylesheets/application.css'
    }))
    .pipe(gulp.dest("build"));
});

gulp.task('js', function(){
  return gulp.src(["app/javascripts/**/*.js"])
    .pipe(concat('application.js'))
    .pipe(uglify())
    .pipe(gulp.dest("build/javascripts"))
});

gulp.task('css', function(){
  return gulp.src(["app/stylesheets/*"])
    .pipe(concat('application.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest("build/stylesheets"))
});

gulp.task('watch', function(){
  gulp.watch(['app/sass/*.scss'], ['sass']);
});

gulp.task('sass', function () {
  return gulp.src('app/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('app/stylesheets'));
});

gulp.task('build', ['html', 'js', 'css']);

gulp.task('clean', function(cb){
  return del(['build/**'], cb)
});

gulp.task('package', function(){
  return gulp.src('build/**/*')
    .pipe(zip('archive.zip'))
    .pipe(rev())
    .pipe(gulp.dest('dist'));
});

gulp.task('karma', function(done){
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
