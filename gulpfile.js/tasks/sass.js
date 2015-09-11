var config       = require('../config')
if(!config.src.css) return

var gulp         = require('gulp')
var browserSync  = require('browser-sync')
var sass         = require('gulp-sass')
var sourcemaps   = require('gulp-sourcemaps')
var handleErrors = require('../lib/handleErrors')
var autoprefixer = require('gulp-autoprefixer')
var path         = require('path')

var settings = {
  autoprefixer: { browsers: ['last 2 version'] },
  src: path.join(config.src.root, config.src.css, '/**/*.{sass,scss}'),
  dest: path.join(config.dest.root, config.dest.css),
  options: {
    indentedSyntax: true // Enable .sass syntax (.scss still works too)
  }
}

gulp.task('sass', function () {
  return gulp.src(settings.src)
    .pipe(sourcemaps.init())
    .pipe(sass(settings.options))
    .on('error', handleErrors)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(settings.autoprefixer))
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.reload({stream:true}))
})
