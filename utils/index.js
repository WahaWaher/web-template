const fs = require('fs');
const path = require('path');

const mode = process.env.NODE_ENV || 'dev';

const isMode = (x) => x === mode;
const isModePrint = (x, thing) => x === mode ? thing : '';

const getFiles = (dirPath, ext) => {
  return fs
    .readdirSync(dirPath)
    .filter((el) => path.extname(el) === ext && el.charAt(0) !== '_');
};

module.exports = { isMode, isModePrint, mode, getFiles };
