'use strict'

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
const replace = require('@rollup/plugin-replace');

import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
const html = require('@rollup/plugin-html');

import postcss from 'rollup-plugin-postcss';
import csso from 'postcss-csso';
const autoprefixer = require('autoprefixer');

const htmlTemplate = require('./build/html.js');
const banner = require('./build/banner.js');

export default commandLineArgs => {
  const DEMO = commandLineArgs.configDemo === true;
  // this will make Rollup ignore the CLI argument
  delete commandLineArgs.configDemo;

  const libraryName = 'DebugUI';
  const BUNDLE = process.env.BUNDLE === 'true';
  const ESM = process.env.ESM === 'true';

  let outputFile = `index${ESM ? '.esm' : ''}`;
  const external = [];
  const globals = [];
  const postcssPlugins = [
    autoprefixer
  ];
  const plugins = [
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
    typescript({ tsconfig: DEMO ? './tsconfig.demo.json' : './tsconfig.build.json'})
  ];

  if (BUNDLE) {
    outputFile += DEMO ? '' : '.bundle';
    plugins.push(
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true
      }),
      nodeResolve()
    );
  }

  if (DEMO) {
    postcssPlugins.push(csso);
    plugins.push(
      html({
        template: htmlTemplate([
          { type: 'css', file: 'index.css', pos: 'before' },
        ]),
        title: 'Debug Console Demo'
      }),
      serve({
        open: true,
        contentBase: 'demo'
      }),
      livereload('demo'),
    );
  }

  plugins.push(postcss({
    extract: 'index.css',
    plugins: postcssPlugins     
  }));

  const rollupConfig = {
    input: 'src/index.ts',
    output: [
      {
        banner,
        file: DEMO ? `demo/${outputFile}.js` : `dist/${outputFile}.js`,
        format: ESM ? 'es' : 'umd',
        globals,
        sourcemap: true
      }
    ],
    external,
    plugins
  };

  if(!DEMO) {
    rollupConfig.output.push({
      banner,
      file: `dist/${outputFile}.min.js`,
      format: ESM ? 'es' : 'umd',
      globals,
      plugins: [
        terser()
      ],
      sourcemap: true
    });
  }
  
  if (!ESM) {
    for(let i=0, outputs=rollupConfig.output, output; output=outputs[i]; i++) {
      output.name = libraryName;
    }
  }

  return rollupConfig;
}