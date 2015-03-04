var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var uglifycss = require('gulp-uglifycss');

// 处理JS
gulp.task('scripts', function() {
    return gulp.src('script/main.js')
        .pipe(uglify())    //压缩
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('script/'));  //输出
});

// 处理CSS
gulp.task('csss', function() {
    return gulp.src('css/style.css')
        .pipe(uglifycss())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('css'));
});

gulp.task('default', function() {
    gulp.run('scripts', 'csss');

    // 监听文件变化
    gulp.watch('script/main.js', function(){
        gulp.run('scripts');
    });

    gulp.watch('css/style.css', function(){
        gulp.run('csss');
    });
});
