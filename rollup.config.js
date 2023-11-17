// const eslint = require('@rbnlffl/rollup-plugin-eslint');
const alias = require('@rollup/plugin-alias');
const deleteFiles = require('rollup-plugin-delete');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const copy = require('rollup-plugin-copy');
const { terser } = require('rollup-plugin-terser');
const typescript = require('rollup-plugin-typescript2');

const pkg = require('./package.json');
const tsconfig = require('./tsconfig.json');

const isModule = pkg.type === 'module' || !(/^commonjs$/i.test(tsconfig?.compilerOptions.module));

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const src = `${process.cwd()}/lib`;
const test = `${process.cwd()}/test`;

const paths = tsconfig?.compilerOptions?.paths;
const hasPaths = paths && Object.keys(paths).length > 0;

const config = () => ({
	input: `${process.cwd()}/lib/index.ts`,
	output: {
		file: `${process.cwd()}/dist/index.min.js`,
		exports: 'named',
		format: isModule ? 'esm' : 'cjs',
		sourcemap: isDevelopment,
	},
	external: ['lib/index.ts'],
	plugins: [
		hasPaths && alias({
			entries: Object.fromEntries(Object.entries(paths).map(([key, value]) => ([
				key.replace('/*', ''),
				value.at(0).replace('/*', '').replace('./', `${process.cwd()}/`),
			]))),
		}),
		resolve({
			extensions: ['.ts', '.js', 'json'],
		}),
		// eslint({
		// 	extensions: ['js', 'jsx', 'ts', 'tsx', 'gql', 'graphql'],
		// 	throwOnWarning: isProduction,
		// }),
		typescript({
			clean: true,
			tsconfig: `${process.cwd()}/tsconfig.json`,
			tsconfigOverride: {
				compilerOptions: {
					declaration: true,
					module: 'esnext'
				},
				files: [`${process.cwd()}/lib/index.ts`],
				exclude: [
					'./node_modules',
					'./lib/*.spec.ts',
					'./lib/**/*.spec.ts',
					'./lib/!(index).ts',
					'**/__test__/**/*'
				]
			}
		}),
		commonjs(),
		terser({
			output: {
				comments: false,
			},
		}),
		deleteFiles({
			targets: [
				'dist/index.js',
				'dist/branches/*.js',
				'dist/branches/**/*.js',
				'dist/rules/*.js',
				'dist/rules/**/*.js',
				'dist/utils/*.js',
				'dist/utils/**/*.js',
			],
			hook: 'buildEnd',
		}),
		copy({
			targets: [
				{ src: 'README.md', dest: 'dist' },
				{ src: 'LICENSE', dest: 'dist' },
				{
					src: 'package.json',
					dest: 'dist',
					transform: (content) => {
						const pkgJson = JSON.parse(content.toString());

						pkgJson.main = 'index.min.js';
						pkgJson.module = 'index.min.js';
						pkgJson.typings = 'index.d.ts';

						pkgJson.release.extends = './recommended';

						delete pkgJson.scripts
						delete pkgJson.devDependencies;
						delete pkgJson.engines;
						delete pkgJson.eslintConfig;
						delete pkgJson.prettier;
						delete pkgJson.jest;

						return JSON.stringify(pkgJson, null, 2);
					},
				},
			],
		}),
	].filter(Boolean),
});

module.exports = [config()];
