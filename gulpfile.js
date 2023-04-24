const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const concat = require('gulp-concat');

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

gulp.task('default', gulp.parallel('sass', 'js', 'watch'));