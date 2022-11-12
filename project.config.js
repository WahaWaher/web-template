const { isMode, isModePrint, mode } = require('./utils');

/**
 * Paths
 */
const paths = {
  appSrc: 'src',
  appBuild: 'build',
  jsSrc: 'src/ts',
  dev: {
    jsDist: 'src/js'
  },
  prod: {
    jsDist: 'build/js'
  }
};

/**
 * Config
 */
const config = {
  useSprite: true,
  useIconFont: false,

  /**
   * Development
   */
  dev: {
    server: {
      server: paths.appSrc,
      port: 8000,
      // proxy: 'gulp-common-template.loc',
      browser: 'chrome',
      open: false,
      notify: false
    },
    css: {
      // app styles
      app: {
        min: false,
        maps: true
      },
      // vendor styles
      libs: {
        min: false,
        maps: false,
        separate: true
      }
    },
    js: {
      app: {
        min: false
      },
      libs: {
        min: false,
        separate: false
      },
      pre: {
        min: false
      }
    }
  },

  /**
   * Production
   */
  prod: {
    server: {
      server: paths.appBuild,
      port: 8080,
      // proxy: 'gulp-common-template.loc',
      browser: 'chrome',
      open: false,
      notify: false
    },
    css: {
      app: {
        min: true,
        maps: false
      },
      libs: {
        min: true,
        maps: false,
        separate: true
      }
    },
    js: {
      app: {
        min: true
      },
      libs: {
        min: true,
        separate: true
      },
      pre: {
        min: true
      }
    }
  }
};

const htmlReplacements = {
  css: [
    `css/libs${config[mode].css.libs.min ? '.min' : ''}.css`,
    `css/app${config[mode].css.app.min ? '.min' : ''}.css`
  ],
  js: [
    `js/pre${config[mode].js.pre.min ? '.min' : ''}.js`,
    `js/libs${config[mode].js.libs.min ? '.min' : ''}.js`,
    `js/app${config[mode].js.app.min ? '.min' : ''}.js`
  ]
};

module.exports = {
  config,
  paths,
  mode,
  isMode,
  isModePrint,
  htmlReplacements
};
