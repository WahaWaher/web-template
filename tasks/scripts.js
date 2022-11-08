const shell = require('gulp-shell');
// Configs
const { paths, mode, isMode, isModePrint } = require('../project.config');
const { jsDist } = paths[mode];

const scripts = shell.task(
  `cross-env NODE_ENV=${mode} npx rollup -c rollup.config.js ${isModePrint(
    'dev',
    '-w'
  )}`
);

module.exports = {
  scripts
};
