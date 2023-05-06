const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const concat = require('gulp-concat');

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Watch files
gulp.task('watch', function () {
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("css/*.css").on('change', browserSync.reload);
    gulp.watch("js/*.js").on('change', browserSync.reload);
});

gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function () {
  return gulp.src('js/*.js')
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', gulp.series('sass'));
  gulp.watch('js/**/*.js', gulp.series('js'));
});


gulp.task('copy-images', function() {
  return gulp.src('img/**/*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('default', gulp.parallel('sass', 'js', 'copy-images', 'browser-sync', 'watch'));

// New build task for deployment
gulp.task('build', gulp.parallel('sass', 'js', 'copy-images'));
