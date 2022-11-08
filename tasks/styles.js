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
    `!${appSrc}/scss/vendors/**/*`,
    `!${appSrc}/scss/vendors.scss`
  ])
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(gulpif(config[mode].css.app.maps, sourcemaps.init()))
    .pipe(
      sass({
        importer: sassTildeImporter,
        outputStyle: 'expanded',
        includePaths: ['./node_modules/']
      }).on('error', sass.logError)
    )
    .pipe(cssimport({ includePaths: ['./node_modules/'] }))
    .pipe(postcss(postcssConfig('app')[mode].plugins))
    .pipe(gulpif(config[mode].css.app.maps, sourcemaps.write()))
    .pipe(
      rename({
        // basename: 'app',
        suffix: config[mode].css.app.min ? '.min' : '',
        extname: '.css'
      })
    )
    .pipe(dest(isMode('dev') ? `${appSrc}/css` : `${appBuild}/css`))
    .pipe(gulpif(isMode('dev'), stream()));
};

/**
 * CSS: Vendors
 */
const stylesVendors = () => {
  return src(
    [
      config[mode].css.vendors.separate
        ? `${appSrc}/scss/vendors/**/*.scss`
        : false,
      `${appSrc}/scss/vendors.scss`
    ].filter(Boolean)
  )
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(gulpif(config[mode].css.vendors.maps, sourcemaps.init()))
    .pipe(
      sass({
        importer: sassTildeImporter,
        outputStyle: 'expanded',
        includePaths: ['./node_modules/']
      }).on('error', sass.logError)
    )
    .pipe(cssimport({ includePaths: ['./node_modules/'] }))
    .pipe(postcss(postcssConfig('vendors')[mode].plugins))
    .pipe(gulpif(config[mode].css.vendors.maps, sourcemaps.write()))
    .pipe(
      rename((path) => {
        if (path.basename !== 'vendors') {
          path.dirname += '/vendors';
        }

        path.basename += config[mode].css.vendors.min ? '.min' : '';
        path.extname = '.css';
      })
    )
    .pipe(dest(isMode('dev') ? `${appSrc}/css` : `${appBuild}/css`))
    .pipe(gulpif(isMode('dev'), stream()));
};

module.exports = {
  stylesApp,
  stylesVendors
};
