const { watch, parallel } = require('gulp');
// Tasks
const { stylesApp, stylesVendors } = require('./styles');
const { jsApp, jsPre, jsVendors, jsVendorsSep, scripts } = require('./scripts');
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
      `!${appSrc}/scss/vendors/**/*`,
      `!${appSrc}/scss/vendors.scss`
    ],
    stylesApp
  );

  // VendorStyles
  watch(
    [
      `${appSrc}/scss/vendors/**/*`,
      `${appSrc}/scss/_settings.scss`,
      `${appSrc}/scss/vendors.scss`
    ],
    stylesVendors
  );

  // IconFont
  watch(
    [`${appSrc}/modules/app-icon-font/**/*`],
    parallel(copyIconFonts, stylesVendors)
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
