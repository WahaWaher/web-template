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
      vendors: {
        min: false,
        maps: false,
        separate: true
      }
    },
    js: {
      app: {
        min: false
      },
      vendors: {
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
      vendors: {
        min: true,
        maps: false,
        separate: false
      }
    },
    js: {
      app: {
        min: true
      },
      vendors: {
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
    `css/vendors${config[mode].css.vendors.min ? '.min' : ''}.css`,
    `css/app${config[mode].css.app.min ? '.min' : ''}.css`
  ],
  js: [
    `js/pre${config[mode].js.pre.min ? '.min' : ''}.js`,
    `js/vendors${config[mode].js.vendors.min ? '.min' : ''}.js`,
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
