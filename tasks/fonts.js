const { src, dest } = require('gulp');
const merge = require('merge-stream');
const fontkit = require('fontkit');
const rename = require('gulp-rename');
const del = require('del');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
// const ttf2eot = require('gulp-ttf2eot');
// const ttf2svg = require('gulp-ttf-svg');
// Configs
const { paths } = require('../project.config');
const { appSrc, appBuild } = paths;

/**
 * Copy fonts from "src/" to "build/"
 */
const copyFonts = () =>
  src(`${appSrc}/fonts/**/*`).pipe(dest(`${appBuild}/fonts`));

/**
 * Fonts: Clear temp directories
 */
const fontsClear = () => {
  del(`${appSrc}/fonts/_collected`);
  del(`${appSrc}/fonts/_renamed`);
  del(`${appSrc}/fonts/_sorted`);

  return del(`${appSrc}/fonts/_ready`);
};

/**
 * Fonts: Collect all .ttf fonts in single directory
 */
const fontsCollect = () =>
  src(`${appSrc}/fonts/**/*.ttf`)
    .pipe(rename((path) => (path.dirname = '')))
    .pipe(dest(`${appSrc}/fonts/_collected/`));

/**
 * Fonts: Rename all fonts (postscriptName)
 */
const fontsRename = () =>
  src(`./${appSrc}/fonts/_collected/**/*.ttf`)
    .pipe(
      rename((path) => {
        const font = fontkit.openSync(
          `${appSrc}/fonts/_collected/${path.basename}${path.extname}`
        );

        path.basename = font.postscriptName;
      })
    )
    .pipe(dest(`${appSrc}/fonts/_renamed/`));

/**
 * Fonts: Sort all fants (sub directories)
 */
const fontsSort = () =>
  src(`${appSrc}/fonts/_renamed/**/*.ttf`)
    .pipe(
      rename((path) => {
        path.dirname = path.basename;
      })
    )
    .pipe(dest(`${appSrc}/fonts/_sorted/`));

/**
 * Fonts: Convert to web formats
 */
const fontsConvert = () => {
  const from = `${appSrc}/fonts/_sorted/**/*.ttf`;
  const to = `${appSrc}/fonts/_ready/`;

  return merge(
    src(from).pipe(dest(to)),

    src(from).pipe(ttf2woff2()).pipe(dest(to)),

    src(from).pipe(ttf2woff()).pipe(dest(to))

    // src(from)
    //   .pipe(ttf2eot())
    //   .pipe(dest(to)),

    // src(from)
    //   .pipe(ttf2svg())
    //   .pipe(dest(to)),
  );
};

module.exports = {
  copyFonts,
  fontsClear,
  fontsCollect,
  fontsRename,
  fontsSort,
  fontsConvert
};
