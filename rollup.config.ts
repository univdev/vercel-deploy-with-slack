import multiInput from 'rollup-plugin-multi-input';
import ts from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: ['src/**/*.ts'],
	output: {
		format: 'es',
    dir: './dist'
	},
  plugins: [
    resolve(),
    ts(),
    multiInput(),
    commonjs(),
  ],
}