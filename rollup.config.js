import multiEntry from 'rollup-plugin-multi-entry';
import minify from 'rollup-plugin-minify-es';
import copy from 'rollup-plugin-copy';
//import fs from 'fs'

const rootDirectory = 'src/modules';

const configs = [
	{
		input: `${rootDirectory}/**/*.js`,
		output: {
			file: `dist/index.js`,
			format: 'cjs'
		},
		plugins: [multiEntry(), minify(), copy({ 'types/index.d.ts': 'dist/index.d.ts' })]
	}
];

module.exports = configs;
