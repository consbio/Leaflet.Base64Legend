var gulp = require('gulp');
var minify = require('gulp-minify');


gulp.task('build', function () {
    gulp.src('L.Control.Base64Legend.js')
        .pipe(minify({noSource: true}))
        .pipe(gulp.dest('./'))
});

gulp.task('watch', function () {
    gulp.watch('L.Control.Base64Legend.js', ['build']);
});

gulp.task('default', ['build', 'watch']);


