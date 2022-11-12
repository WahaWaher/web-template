const { src, dest } = require('gulp');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const sassTildeImporter = require('node-sass-tilde-importer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const cssimport = require('gulp-cssimport');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const inlineSvg = require('postcss-inline-svg');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
// Configs
const { mode, isMode, config, paths } = require('../project.config');
const { appSrc, appBuild } = paths;
const { server, stream } = require('./server');
const postcssConfig = require('../postcss.config.js');

sass.compiler = require('sass');

/**
 * CSS: App
 */
const stylesApp = () => {
  return src([
    `${appSrc}/scss/**/*.scss`,
    `!${appSrc}/scss/libs/**/*`,
    `!${appSrc}/scss/libs.scss`
  ])
    .pipe(gulpif(config[mode].css.app.maps, sourcemaps.init()))
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(
      sass({
        importer: sassTildeImporter,
        outputStyle: 'expanded',
        includePaths: ['./node_modules/']
      }).on('error', sass.logError)
    )
    .pipe(cssimport({ includePaths: ['./node_modules/'] }))
    .pipe(postcss(postcssConfig('app')[mode].plugins))
    .pipe(
      rename({
        // basename: 'app',
        suffix: config[mode].css.app.min ? '.min' : '',
        extname: '.css'
      })
    )
    .pipe(gulpif(config[mode].css.app.maps, sourcemaps.write('./maps')))
    .pipe(dest(isMode('dev') ? `${appSrc}/css` : `${appBuild}/css`))
    .pipe(gulpif(isMode('dev'), stream()));
};

/**
 * CSS: Libs
 */
const stylesLibs = () => {
  return src(
    [
      config[mode].css.libs.separate
        ? `${appSrc}/scss/libs/**/*.scss`
        : false,
      `${appSrc}/scss/libs.scss`
    ].filter(Boolean)
  )
    .pipe(gulpif(config[mode].css.libs.maps, sourcemaps.init()))
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(
      sass({
        importer: sassTildeImporter,
        outputStyle: 'expanded',
        includePaths: ['./node_modules/']
      }).on('error', sass.logError)
    )
    .pipe(cssimport({ includePaths: ['./node_modules/'] }))
    .pipe(postcss(postcssConfig('libs')[mode].plugins))
    .pipe(
      rename((path) => {
        if (path.basename !== 'libs') {
          path.dirname += '/libs';
        }

        path.basename += config[mode].css.libs.min ? '.min' : '';
        path.extname = '.css';
      })
    )
    .pipe(dest(isMode('dev') ? `${appSrc}/css` : `${appBuild}/css`))
    .pipe(gulpif(config[mode].css.libs.maps, sourcemaps.write('./maps')))
    .pipe(gulpif(isMode('dev'), stream()));
};

module.exports = {
  stylesApp,
  stylesLibs
};
