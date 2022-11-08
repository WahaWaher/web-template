const { src, dest } = require('gulp');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const imageResize = require('gulp-image-resize');
const ico = require('gulp-to-ico');
const svgSprite = require('gulp-svg-sprite');
// Configs
const { paths, isMode } = require('../project.config');
const { appSrc, appBuild } = paths;

/**
 * Favicon generation
 */
const genFavicons = () => {
  return src(`${appSrc}/img/favicon/original.png`)
    .pipe(imageResize({ width: 114, height: 114 }))
    .pipe(rename('apple-touch-icon-114x114.png'))
    .pipe(dest(`${appSrc}/img/favicon`))

    .pipe(imageResize({ width: 72, height: 72 }))
    .pipe(rename('apple-touch-icon-72x72.png'))
    .pipe(dest(`${appSrc}/img/favicon`))

    .pipe(imageResize({ width: 57, height: 57 }))
    .pipe(rename('apple-touch-icon.png'))
    .pipe(dest(`${appSrc}/img/favicon`))

    .pipe(ico('favicon.ico', { resize: true, sizes: [32, 32] }))
    .pipe(dest(appSrc));
};

/**
 * SVG-sprite generation
 */
const genSprite = () => {
  return src(`${appSrc}/svg/app-sprite-icons/*.svg`)
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            example: {
              dest: 'app-sprite-preview.html'
            },
            dest: '',
            sprite: 'app-sprite.svg'
          }
        }
      })
    )
    .pipe(dest(`${isMode('dev') ? appSrc : appBuild}/svg/`));
};

/**
 * Сopy images
 */
const copyIMG = () => {
  return src([
    `${appSrc}/img/**/*.{jpg,jpeg,png,gif,svg}`,
    `!${appSrc}/img/favicon/original.*`
  ]).pipe(dest(`${appBuild}/img`));
};

/**
 * Сopy/Сompress svg to build
 */
const copySVG = () => {
  return src([
    `${appSrc}/svg/**/*.svg`,
    `!${appSrc}/svg/app-sprite.svg`,
    `!${appSrc}/svg/app-sprite-icons/**/*`
  ]).pipe(dest(`${appBuild}/svg/`));
};

module.exports = {
  genFavicons,
  genSprite,
  copySVG,
  copyIMG
};
