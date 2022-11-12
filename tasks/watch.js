const { watch, parallel } = require('gulp');
// Tasks
const { stylesApp, stylesLibs } = require('./styles');
const { jsApp, jsPre, jsLibs, jsLibsSep, scripts } = require('./scripts');
const { server, reload } = require('./server');
const { genSprite } = require('./images');
const { copyIconFonts } = require('./other');
// Configs
const { paths, mode } = require('../project.config');
const { appSrc, jsSrc } = paths;
const { jsDist } = paths[mode];

/**
 * Watcher
 */
const watcher = () => {
  // Styles
  watch(
    [
      `${appSrc}/scss/**/*.scss`,
      `!${appSrc}/scss/libs/**/*`,
      `!${appSrc}/scss/libs.scss`
    ],
    stylesApp
  );

  // Libstyles
  watch(
    [
      `${appSrc}/scss/libs/**/*`,
      `${appSrc}/scss/_settings.scss`,
      `${appSrc}/scss/libs.scss`
    ],
    stylesLibs
  );

  // IconFont
  watch(
    [`${appSrc}/modules/app-icon-font/**/*`],
    parallel(copyIconFonts, stylesLibs)
  );

  // JavaScript
  watch(`${jsDist}/**/*`).on('change', reload);

  // SVG
  watch([`${appSrc}/svg/app-sprite-icons/**/*.svg`], genSprite).on(
    'change',
    reload
  );

  // HTML
  watch([`${appSrc}/**/*.(html|php)`]).on('all', reload);
};

module.exports = {
  watcher
};
