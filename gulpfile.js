var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var uglifycss = require('gulp-uglifycss');
var runSequence = require('run-sequence');

// clear old file
gulp.task('clean', function() {
  del.sync(['dist/*']);
});

// scripts
gulp.task('scripts', function() {
    return gulp.src('src/calendar.js')
        .pipe(uglify())    //压缩
        .pipe(rename('calendar.min.js'))
        .pipe(gulp.dest('dist/'));  //输出
});

// CSS
gulp.task('csss', function() {
    return gulp.src('src/calendar.css')
        .pipe(uglifycss())
        .pipe(rename('calendar.min.css'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', function() {
    runSequence('clean', ['scripts', 'csss']);
});
