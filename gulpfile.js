var gulp = require('gulp');
var bundle = require('gulp-react-bundle');
 
gulp.task('build', function() {
  bundle('./inc/appRouter.js', './alpha.js');
});
 
gulp.task('build-with-dependency', function() {
  var lib = bundle.lib(['lodash', 'jquery'], './alpha.js');
  bundle('./js/app.js', './build/app.js', lib);
});
