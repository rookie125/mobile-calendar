var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var uglifycss = require('gulp-uglifycss');

// 处理JS
gulp.task('scripts', function() {
    return gulp.src('src/calendar.js')
        .pipe(uglify())    //压缩
        .pipe(rename('calendar.min.js'))
        .pipe(gulp.dest('src/'));  //输出
});

// 处理CSS
gulp.task('csss', function() {
    return gulp.src('src/calendar.css')
        .pipe(uglifycss())
        .pipe(rename('calendar.min.css'))
        .pipe(gulp.dest('src/'));
});

gulp.task('default', function() {
    gulp.run('scripts', 'csss');

    // 监听文件变化
    gulp.watch('src/calendar.js', function(){
        gulp.run('scripts');
    });

    gulp.watch('src/calendar.css', function(){
        gulp.run('csss');
    });
});
