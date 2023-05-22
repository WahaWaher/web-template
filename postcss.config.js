const inlineSvg = require('postcss-inline-svg');
const sortMediaQueries = require('postcss-sort-media-queries');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
// Configs
const { mode, config } = require('./project.config');

module.exports = (type) => ({
  /**
   * Development
   */
  dev: {
    plugins: [
      inlineSvg,
      autoprefixer({ overrideBrowserslist: ['> 0.2%', 'not ie <= 11'] }),
      config.dev.css[type].min &&
        cssnano({
          preset: ['default', { discardComments: { removeAll: true } }]
        })
    ].filter(Boolean)
  },

  /**
   * Production
   */
  prod: {
    plugins: [
      inlineSvg,
      sortMediaQueries({ sort: 'desctop-first' }),
      autoprefixer({ overrideBrowserslist: ['> 0.2%', 'not ie <= 11'] }),
      config.prod.css[type].min &&
        cssnano({
          preset: ['default', { discardComments: { removeAll: true } }]
        })
    ].filter(Boolean)
  }
});
