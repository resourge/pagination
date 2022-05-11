import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import fs from 'fs';
import path from 'path';
import dts from 'rollup-plugin-dts';
import size from 'rollup-plugin-size';
import { terser } from 'rollup-plugin-terser';

import { 
	main,
	module,
	types,
	private as _private,
	publishConfig,
	files,
	author,
	license,
	repository,
	peerDependencies,
	dependencies
} from './package.json';

const external = ['react', '@emotion/css'];
const globals = { react: 'React', '@emotion/css': 'emotionCss' }

const babelPlugins = [
	'babel-plugin-dev-expression'
]

const babelPresetEnv = ['@babel/preset-env', { 
	targets: [
		'defaults',
		'not IE 11',
		'maintained node versions'
	],
	loose: true,
	bugfixes: true
}]

const defaultExtPlugin = [
	size(),
	nodeResolve({
		extensions: ['.tsx', '.ts']
	})
]

function createBanner(libraryName, version, authorName, license) {
	return `/**
 * ${libraryName} v${version}
 *
 * Copyright (c) ${authorName}.
 *
 * This source code is licensed under the ${license} license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license ${license}
 */`;
}
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Package Json info
 */
const VERSION = process.env.PROJECT_VERSION;
const AUTHOR_NAME = author;
const LICENSE = license;

const getPackage = (
	SOURCE_FOLDER,
	PACKAGE_NAME,
	dependencies,
	peerDependencies,
	keywords
) => {
	const OUTPUT_DIR = `${SOURCE_FOLDER}/dist`
	const SOURCE_INDEX_FILE = `${SOURCE_FOLDER}/src/index.ts`
	const filename = PACKAGE_NAME;
	const { url } = repository;
	const homepage = path.join(url.replace('.git', ''), '/tree/master/', `${SOURCE_FOLDER}/README.md`);

	const packageJSON = {
		name: `@resourge/${PACKAGE_NAME}`,
		version: VERSION,
		unpkg: `./dist/umd/${filename}.production.min.js`,
		main,
		module,
		types,
		private: _private,
		publishConfig,
		files,
		author: AUTHOR_NAME,
		license: LICENSE,
		repository,
		peerDependencies,
		dependencies,
		keywords,
		homepage
	};

	fs.writeFileSync(`${SOURCE_FOLDER}/package.json`, JSON.stringify(packageJSON, null, 4), 'utf-8');

	/**
	 * Folders
	 */
	const CJS_DIR = `${OUTPUT_DIR}/cjs`;
	const UMD_DIR = `${OUTPUT_DIR}/umd`;
	/**
	 * Options
	 */
	const sourcemap = true;
	const banner = createBanner(PACKAGE_NAME, VERSION, AUTHOR_NAME, LICENSE);
	const umdName = PACKAGE_NAME.split('-').map(capitalizeFirstLetter).join('')

	// JS modules for bundlers
	const modules = [
		{
			input: SOURCE_INDEX_FILE,
			output: {
				file: `${OUTPUT_DIR}/index.js`,
				format: 'esm',
				sourcemap,
				banner: banner
			},
			external,
			plugins: [
				...defaultExtPlugin,
				babel({
					exclude: /node_modules/,
					babelHelpers: 'bundled',
					presets: [
						babelPresetEnv,
						'@babel/preset-react',
						'@babel/preset-typescript'
					],
					plugins: babelPlugins,
					extensions: ['.ts', '.tsx']
				})
			]
		},
		{
			input: SOURCE_INDEX_FILE,
			output: [{
				file: `${OUTPUT_DIR}/index.d.ts`,
				format: 'esm',
				banner: banner
			}],
			plugins: [
				size(),
				dts()
			]
		}
	];

	// JS modules for <script type=module>
	const cjsModules = [
		{
			input: SOURCE_INDEX_FILE,
			output: {
				file: `${CJS_DIR}/${filename}.development.js`,
				format: 'cjs',
				sourcemap,
				banner: banner
			},
			external,
			plugins: [
				...defaultExtPlugin,
				babel({
					exclude: /node_modules/,
					babelHelpers: 'bundled',
					presets: [
						'@babel/preset-typescript',
						'@babel/preset-react',
						babelPresetEnv
					],
					plugins: babelPlugins,
					extensions: ['.ts', '.tsx']
				}),
				replace({
					preventAssignment: true,
					'process.env.NODE_ENV': JSON.stringify('development')
				})
			]
		},
		{
			input: SOURCE_INDEX_FILE,
			output: {
				file: `${CJS_DIR}/${filename}.production.min.js`,
				format: 'cjs',
				sourcemap,
				banner: banner
			},
			external,
			plugins: [
				...defaultExtPlugin,
				babel({
					exclude: /node_modules/,
					babelHelpers: 'bundled',
					presets: [
						babelPresetEnv,
						[
							'@babel/preset-react',
							{
								// Compile JSX Spread to Object.assign(), which is reliable in ESM browsers.
								useBuiltIns: true
							}
						],
						'@babel/preset-typescript'
					],
					plugins: babelPlugins,
					extensions: ['.ts', '.tsx']
				}),
				replace({
					preventAssignment: true,
					'process.env.NODE_ENV': JSON.stringify('production')
				}),
				terser({ ecma: 8, safari10: true })
			]
		}
	];

	// UMD modules for <script> tags and CommonJS (node)
	const umdModules = [
		{
			input: SOURCE_INDEX_FILE,
			output: {
				file: `${UMD_DIR}/${filename}.development.js`,
				format: 'umd',
				sourcemap,
				banner: banner,
				globals,
				name: umdName
			},
			external,
			plugins: [
				...defaultExtPlugin,
				babel({
					exclude: /node_modules/,
					babelHelpers: 'bundled',
					presets: [
						babelPresetEnv,
						'@babel/preset-react',
						'@babel/preset-typescript'
					],
					plugins: babelPlugins,
					extensions: ['.ts', '.tsx']
				}),
				replace({
					preventAssignment: true,
					'process.env.NODE_ENV': JSON.stringify('development')
				})
			]
		},
		{
			input: SOURCE_INDEX_FILE,
			output: {
				file: `${UMD_DIR}/${filename}.production.min.js`,
				format: 'umd',
				sourcemap,
				banner: banner,
				globals,
				name: umdName
			},
			external,
			plugins: [
				...defaultExtPlugin,
				babel({
					exclude: /node_modules/,
					babelHelpers: 'bundled',
					presets: [
						babelPresetEnv,
						'@babel/preset-react',
						'@babel/preset-typescript'
					],
					plugins: babelPlugins,
					extensions: ['.ts', '.tsx']
				}),
				replace({
					preventAssignment: true,
					'process.env.NODE_ENV': JSON.stringify('production')
				}),
				terser()
			]
		}
	];

	const mainModule = [
		{
			input: './main.js',
			output: {
				file: `${OUTPUT_DIR}/main.js`,
				format: 'cjs',
				banner: banner
			},
			plugins: [
				size(),
				replace({
					preventAssignment: true,
					devFile: `${UMD_DIR}/${filename}.development.js`.replace(OUTPUT_DIR, '.'),
					prodFile: `${UMD_DIR}/${filename}.production.min.js`.replace(OUTPUT_DIR, '.')
				})
			]
		}
	];

	return [...modules, ...cjsModules, ...umdModules, ...mainModule];
}

export default function rollup() {
	return [
		...getPackage(
			'./src/lib/pagination',
			'pagination',
			undefined,
			undefined,
			[
				'javascript',
				'pagination',
				'typescript'
			]
		),

		...getPackage(
			'./src/lib/react-hook-pagination',
			'react-hook-form',
			Object.fromEntries(Object.entries(dependencies).filter(([key]) => key.includes('react'))),
			Object.fromEntries(Object.entries(peerDependencies).filter(([key]) => key.includes('react'))),
			[
				'javascript',
				'pagination',
				'typescript',
				'react',
				'hooks',
				'react-hooks'
			]
		),

		...getPackage(
			'./src/lib/react-pagination',
			'react-pagination',
			dependencies,
			peerDependencies,
			[
				'javascript',
				'pagination',
				'typescript',
				'react',
				'hooks',
				'react-hooks',
				'react-component'
			]
		)
	];
}
