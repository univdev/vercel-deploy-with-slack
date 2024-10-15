import multiInput from 'rollup-plugin-multi-input';
import ts from '@rollup/plugin-typescript';

export default {
  input: ['src/**/*.ts'],
	output: {
		format: 'es',
    dir: './dist'
	},
  plugins: [ts(), multiInput()],
}