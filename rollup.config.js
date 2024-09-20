import alias from '@rollup/plugin-alias';
import deleteFiles from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import ignoreImport from 'rollup-plugin-ignore-import';
import progress from 'rollup-plugin-progress';

import tsconfig from './tsconfig.json' with { type: 'json' };

const isDevelopment = process.env.NODE_ENV === 'development';
const paths = tsconfig?.compilerOptions?.paths;
const hasPaths = paths && Object.keys(paths).length > 0;

export default [
	{
		input: `${process.cwd()}/lib/index.ts`,
		output: {
			entryFileNames: '[name].min.js',
			dir: `${process.cwd()}/dist/`,
			format: 'esm',
		},
		plugins: [
			progress(),
			hasPaths && alias({
				entries: Object.fromEntries(Object.entries(paths).map(([key, value]) => ([
					key.replace('/*', ''),
					value.at(0).replace('/*', '').replace('./', `${process.cwd()}/`),
				]))),
			}),
			resolve({
				extensions: ['.ts', '.js', 'json'],
			}),
			typescript({
				clean: true,
				tsconfig: `${process.cwd()}/tsconfig.json`,
				tsconfigOverride: {
					compilerOptions: {
						declaration: true,
					},
					include: [
						'./lib',
						'./typings',
					],
					exclude: [
						'./node_modules',
						'./lib/!(index).ts',
						'./lib/*.spec.ts',
						'./lib/**/*.spec.ts',
						'**/__test__/**/*',
						'./test',
					],
				},
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
					'dist/templates/*.js',
					'dist/templates/**/*.js',
					'dist/utils/*.js',
					'dist/utils/**/*.js',
				],
				hook: 'buildEnd',
			}),
		].filter(Boolean),
	},

	{
		input: [
			`${process.cwd()}/lib/canary.ts`,
			`${process.cwd()}/lib/gitflow.ts`,
			`${process.cwd()}/lib/modular.ts`,
			`${process.cwd()}/lib/react.ts`,
			`${process.cwd()}/lib/recommended.ts`,
			`${process.cwd()}/lib/staged.ts`,
			`${process.cwd()}/lib/streamlined.ts`,
		],
		output: [
			{
				dir: `${process.cwd()}/dist/`,
				exports: 'named',
				format: 'esm',
				sourcemap: isDevelopment,
			},
		],
		external: ['lib/index.ts'],
		plugins: [
			progress(),
			hasPaths && alias({
				entries: Object.fromEntries(Object.entries(paths).map(([key, value]) => ([
					key.replace('/*', ''),
					value.at(0).replace('/*', '').replace('./', `${process.cwd()}/`),
				]))),
			}),
			resolve({
				extensions: ['.ts', '.js', 'json'],
			}),
			ignoreImport({
				include: ['.'],
			}),
			typescript({
				clean: true,
				tsconfig: `${process.cwd()}/tsconfig.json`,
				tsconfigOverride: {
					compilerOptions: {
						declaration: false,
						rootDir: './lib/',
					},
					files: [
						`${process.cwd()}/lib/canary.ts`,
						`${process.cwd()}/lib/gitflow.ts`,
						`${process.cwd()}/lib/modular.ts`,
						`${process.cwd()}/lib/react.ts`,
						`${process.cwd()}/lib/recommended.ts`,
						`${process.cwd()}/lib/staged.ts`,
						`${process.cwd()}/lib/streamlined.ts`,
					],
					include: [
						'./lib',
						'./typings',
					],
					exclude: [
						'./node_modules',
						'./lib/index.ts',
						'./lib/*.spec.ts',
						'./lib/**/*.spec.ts',
						'**/__test__/**/*',
						'./test',
					]
				}
			}),
			commonjs(),
			copy({
				targets: [
					{ src: 'README.md', dest: 'dist' },
					{ src: 'LICENSE', dest: 'dist' },
					{
						src: 'package.json',
						dest: 'dist',
						transform: (content) => {
							const pkgJson = JSON.parse(content.toString());

							pkgJson.exports = {
								'.': './index.min.js',
								'./canary': './canary.js',
								'./gitflow': './gitflow.js',
								'./modular': './modular.js',
								'./react': './react.js',
								'./recommended': './recommended.js',
								'./staged': './staged.js',
								'./streamlined': './streamlined.js'
							};

							pkgJson.typings = './index.d.ts';
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
			deleteFiles({
				targets: [
					'./dist/canary.d.ts',
					'./dist/gitflow.d.ts',
					'./dist/modular.d.ts',
					'./dist/react.d.ts',
					'./dist/recommended.d.ts',
					'./dist/staged.d.ts',
					'./dist/streamlined.d.ts',
				],
				hook: 'buildEnd',
			}),
		].filter(Boolean),
	},
];
