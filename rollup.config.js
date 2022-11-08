const path = require('path');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const tsConfigPaths = require('rollup-plugin-ts-paths');
const { getFiles } = require('./utils');
// Configs
const { config, paths, mode, isMode } = require('./project.config.js');
const { jsSrc } = paths;
const { jsDist } = paths[mode];

const rollupConfig = getFiles(jsSrc, '.ts')
  /**
   * App EntryPopints
   */
  .map((file) => {
    const { name } = path.parse(file);

    return {
      input: `${jsSrc}/${file}`,
      external: name !== 'vendors' && ['wdrawer', 'micromodal', 'swiper'],
      output: {
        file: `${jsDist}/${name}${config[mode].js[name].min ? '.min' : ''}.js`,
        format: 'iife',
        sourcemap: isMode('dev'),
        globals: name !== 'vendors' && {
          wdrawer: 'WDrawer',
          micromodal: 'MicroModal',
          swiper: 'Swiper',
        }
      },
      plugins: [
        tsConfigPaths(),
        typescript({ tsconfig: `./tsconfig.${mode}.json` }),
        commonjs(),
        nodeResolve({ browser: true }),
        config[mode].js[name].min && terser({
          format: {
            comments: false,
          },
        })
      ],
      watch: isMode('dev') && {
        clearScreen: false
      }
    };
  })

  /**
   * Vendors (separated)
   */
  .concat(
    config[mode].js.vendors.separate
      ? getFiles(`${jsSrc}/vendors`, '.ts').map((file) => {
          const { name } = path.parse(file);

          return {
            input: `${jsSrc}/vendors/${file}`,
            output: {
              file: `${jsDist}/vendors/${name}${
                config[mode].js.vendors.min ? '.min' : ''
              }.js`,
              format: 'iife',
              sourcemap: isMode('dev')
            },
            plugins: [
              tsConfigPaths(),
              typescript({ tsconfig: `./tsconfig.${mode}.json` }),
              commonjs(),
              nodeResolve({ browser: true }),
              config[mode].js.vendors.min && terser({
                format: {
                  comments: false,
                },
              })
            ],
            watch: isMode('dev') && {
              clearScreen: false
            }
          };
        })
      : []
  );

module.exports = rollupConfig;
