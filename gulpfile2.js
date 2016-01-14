/* gulpfile.js */

var JSGulp = require('./gulp/JSGulp');

var gulp = require('gulp');

JSGulp.createTask();

gulp.task('watch', ['clean'], function(done) {
  JSGulp.watch();
});

gulp.task('clean', function(done) {
  JSGulp.clean();
});

gulp.task('default', ['watch']);
