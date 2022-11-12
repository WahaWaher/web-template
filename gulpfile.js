const { series, parallel } = require('gulp');
// Tasks
const { cleanBuild, cleanCSS, cleanJS } = require('./tasks/clean');
const { stylesApp, stylesLibs } = require('./tasks/styles');
const { scripts } = require('./tasks/scripts');
const { rootPagesHTML, rootPagesPHP } = require('./tasks/pages');
const { copyIMG, genFavicons, genSprite, copySVG } = require('./tasks/images');
const {
  copyFonts,
  fontsClear,
  fontsCollect,
  fontsRename,
  fontsSort,
  fontsConvert
} = require('./tasks/fonts');
const { copyRootOther, copyCustom, copyIconFonts } = require('./tasks/other');
const { watcher } = require('./tasks/watch');
const { server } = require('./tasks/server');
// Configs
const { config, paths } = require('./project.config');
const { appSrc, appBuild } = paths;

/**
 * Development Live Server
 * @cli yarn dev
 */
exports['dev'] = series(
  parallel(cleanCSS, cleanJS),
  parallel(
    [
      stylesApp,
      stylesLibs,
      config.useSprite && genSprite,
      config.useIconFont && copyIconFonts
    ].filter(Boolean)
  ),
  parallel([scripts, server, watcher])
);

/**
 * Production build
 * @cli yarn build
 */
exports['build'] = series(
  cleanBuild,
  parallel(
    [
      stylesApp,
      stylesLibs,
      copyFonts,
      copyIMG,
      copySVG,
      config.useSprite && genSprite,
      config.useIconFont && copyIconFonts,
      rootPagesHTML,
      rootPagesPHP,
      copyRootOther,
      copyCustom([`${appSrc}/parts/**/*`], [`${appBuild}/parts`]),
      copyCustom([`${appSrc}/pages/**/*`], [`${appBuild}/pages`])
    ].filter(Boolean)
  ),
  scripts,
  server
);

/**
 * Task: Generate favicons (png, ico)
 * from original "${src}/img/favicon/original.png"
 *
 * @cli yarn gulp fav
 */
exports['fav'] = series(genFavicons);

/**
 * Task: Generate web fonts from .ttf
 * from: "${src}/fonts"
 * temp directories: "_collected", "_renamed", "_sorted", "_ready"
 *
 * @cli yarn gulp fonts
 */
exports['fonts'] = series(
  fontsClear,
  fontsCollect,
  fontsRename,
  fontsSort,
  fontsConvert
);
