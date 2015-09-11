var config = require('../../config')
var filter = require('gulp-filter')
var gulp   = require('gulp')
var minify = require('gulp-minify-css')
var path   = require('path')
var rev    = require('gulp-rev')
var revNapkin = require('gulp-rev-napkin');
var uglify = require('gulp-uglify')

// 4) Rev and compress CSS and JS files (this is done after assets, so that if a
//    referenced asset hash changes, the parent hash will change as well
gulp.task('rev-css', function(){
  return gulp.src(path.join(config.dest.root,'/**/*.css'))
    .pipe(rev())
    .pipe(minify())
    .pipe(gulp.dest(config.dest.root))
    .pipe(revNapkin({verbose: false}))
    .pipe(rev.manifest(path.join(config.dest.root, 'rev-manifest.json'), {merge: true}))
    .pipe(gulp.dest(''))
})
