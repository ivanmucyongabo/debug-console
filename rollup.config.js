'use strict'

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
const html = require('@rollup/plugin-html');

import postcss from 'rollup-plugin-postcss';
import csso from 'postcss-csso';
const autoprefixer = require('autoprefixer');

const htmlTemplate = require('./build/html.js')

const libraryName = 'DebugUI';

/**
 * Output directory structure
 * css/
 * - index.css
 * - index.css.map
 * - index.min.css
 * - index.min.css.map
 * js/
 * - index.bundle.js
 * - index.bundle.js.map
 * - index.bundle.min.js
 * - index.bundle.min.js.map
 * - index.esm.js
 * - index.esm.js.map
 * - index.esm.min.js
 * - index.esm.min.js.map
 * - index.js
 * - index.js.map
 * - index.min.js
 * - index.min.js.map
 * types/
 */

const scripts = 'dist/';
const styles = 'dist/css/;'

var buildConfig = {
  input: 'src/index.ts',
  output: [
    // CommonJs
    {
      file: scripts.concat('index.js'),
      format: 'cjs',
      name: libraryName,
    },
    // CommonJs minified
    {
      file: scripts.concat('index.min.js'),
      format: 'cjs',
      name: libraryName,
      plugins: [
        terser()
      ]
    },
    // ESM
    {
      file: scripts.concat('index.esm.js'),
      format: 'es',
      name: libraryName
    },
    // ESM minified
    {
      file: scripts.concat('index.esm.min.js'),
      format: 'es',
      name: libraryName,
      plugins: [
        terser()
      ]
    },
    // UMD
    {
      file: scripts.concat('index.bundle.js'),
      format: 'umd',
      name: libraryName
    },
    // UMD minified
    {
      file: scripts.concat('index.bundle.min.js'),
      format: 'umd',
      name: libraryName,
      plugins: [
        terser()
      ]
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      // Only transpile our source code
      exclude: 'node_modules/**',
      // Include the helpers in the bundle, at most one copy of each
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current'
            }
          }
        ],
        '@babel/preset-typescript',
      ],
    }),
    typescript({ tsconfig: './tsconfig.build.json' }),
    postcss({
      extract: 'css/index.min.css',
      plugins: [
        autoprefixer,
        csso
      ]
    })
  ]
};

var serveConfig = {
  input: 'src/index.ts',
  output: [
    // Demo
    {
      file: 'demo/index.js',
      format: 'umd',
      name: libraryName,
      sourcemap: true,
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      // Only transpile our source code
      exclude: 'node_modules/**',
      // Include the helpers in the bundle, at most one copy of each
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current'
            }
          }
        ],
        '@babel/preset-typescript',
      ],
    }),
    typescript({ tsconfig: './tsconfig.serve.json' }),
    html({
      template: htmlTemplate([
        { type: 'css', file: 'index.css', pos: 'before' },
      ]),
      title: 'Debug Console Demo'
    }),
    postcss({
      extract: 'index.css',
      plugins: [
        autoprefixer,
        // csso
      ]
    }),
    serve({
      open: true,
      contentBase: 'demo'
    }),
    livereload('demo'),     
  ]  
};

export default commandLineArgs => {
  if (commandLineArgs.configServe === true) {
    return serveConfig;
  }
  return buildConfig;
}