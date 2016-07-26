var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function() {
  return gulp.src('./public/less/style.less')
	.pipe(less())
	.pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
  gulp.watch(['./public/less/**/*.less'], ['less']);
});

gulp.task('default', ['less']);