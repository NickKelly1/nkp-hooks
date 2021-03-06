// import babel from '@rollup/plugin-babel';
// import resolve from '@rollup/plugin-node-resolve';
// import external from 'rollup-plugin-peer-deps-external';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'es',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: 'tsconfig.build.json', }),
      terser(),
    ],
  },
  //
];
