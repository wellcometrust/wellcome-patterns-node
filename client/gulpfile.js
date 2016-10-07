const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack-stream');
const livereload = require('gulp-livereload');
const webpackConfig = require('./webpack.config.js');

const sources = {
  css: {
    manifests: [
      'scss/application.scss',
      'scss/styleguide.scss'
    ],
    all: 'scss/**/*.scss',
    distPath: '../dist/assets/css'
  },
  js: {
    entry: './js/app.js',
    distPath: '../dist/assets/js/',
    all: 'js/**/*.js'
  }
};

gulp.task('styles', () => {
  return gulp.src(sources.css.manifests)
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .on('error', sass.logError)
    .pipe(autoprefixer({
      browsers: [
        '> 0.01%',
        'last 2 versions',
        'Firefox ESR',
        'IE 9',
        'opera 12.1']
    }))
    .pipe(gulp.dest(sources.css.distPath))
    .pipe(livereload());
});

gulp.task('js', () => {
  return gulp.src(sources.js.entry)
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest(sources.js.distPath));
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch(sources.css.all, ['styles']);
  gulp.watch(sources.js.all, ['js']);
});

gulp.task('default', ['styles', 'scripts']);
