const { src, dest } = require('gulp');
const htmlreplace = require('gulp-html-replace');
const rename = require('gulp-rename');
// Configs
const { mode, paths, config, htmlReplacements } = require('../project.config');
const { appSrc, appBuild } = paths;

/**
 * Copy/Replace root HTML from "src/" to "build/"
 */
const rootPagesHTML = () => {
  return src([`${appSrc}/*.html`])
    .pipe(htmlreplace(htmlReplacements))
    .pipe(dest(`${appBuild}`));
};

/**
 * Copy/Replace root PHP from "src/" to "build/"
 */
const rootPagesPHP = () => {
  return src(`${appSrc}/*.php`)
    .pipe(rename({ extname: '.html' }))
    .pipe(htmlreplace(htmlReplacements))
    .pipe(rename({ extname: '.php' }))
    .pipe(dest(appBuild));
};

/**
 * Copy all from "src/layout" to "build/"
 */
const layout = () =>
  src(`${appSrc}/layout/**/*`).pipe(dest(`${appBuild}/layout`));

/**
 * Copy all from "src/pages" to "build/"
 */
const pages = () => src(`${appSrc}/pages/**/*`).pipe(dest(`${appBuild}/pages`));

module.exports = {
  rootPagesHTML,
  rootPagesPHP,
  layout,
  pages
};
