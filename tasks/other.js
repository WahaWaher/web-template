const { src, dest } = require('gulp');
const replace = require('replace-in-file');
// Configs
const { paths } = require('../project.config');
const { appSrc, appBuild } = paths;

/**
 * Copy rest from "src/" to "build/"
 */
const copyRootOther = () => {
  return src([
    `${appSrc}/*.*`,
    `${appSrc}/.*`,
    `!${appSrc}/index.html`,
    `!${appSrc}/404.html`,
    `!${appSrc}/index.php`,
    `!${appSrc}/404.php`
  ]).pipe(dest(`${appBuild}`));
};

/**
 * Copy Custom
 */
const copyCustom =
  (sources = [], dests = appBuild) =>
  () =>
    src(sources).pipe(dest(dests));

/**
 * Copy Icon Fonts
 */
const copyIconFonts = async () => {
  try {
    const resChangefontDisplay = await replace({
      files: `${appSrc}/modules/app-icon-font/style.scss`,
      from: /font-display: block;/g,
      to: 'font-display: swap;'
    });

    const resRemoveSvgFont = await replace({
      files: `${appSrc}/modules/app-icon-font/style.scss`,
      from: /(,[.\r\n].*format\('svg'\))/gim,
      to: ''
    });

    console.info('AppIconFont: Font Display changed to "swap"');
    console.info('AppIconFont: SVG fonts has been removed');
  } catch (err) {
    console.error('AppIconFont: Error when modifying files:', err);
  }

  return src(`${appSrc}/modules/app-icon-font/fonts/*.{woff,ttf}`).pipe(
    dest(`${appSrc}/fonts/AppIconFont`)
  );
};

module.exports = {
  copyRootOther,
  copyCustom,
  copyIconFonts
};
