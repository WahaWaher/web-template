const del = require('del');
// Configs
const { paths } = require('../project.config');
const { appSrc, appBuild } = paths;
const { jsDist } = paths.dev;

/**
 * Remove "build" folder
 */
const cleanBuild = () => del(`${appBuild}/**/*`);

/**
 * Clean generated CSS
 */
const cleanCSS = () => del(`${appSrc}/css/**/*`);

/**
 * Clean generated JS
 */
const cleanJS = () => del(`${jsDist}/**/*`);

module.exports = {
  cleanBuild,
  cleanCSS,
  cleanJS
};
