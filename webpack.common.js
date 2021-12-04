/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const inputPath = path.resolve(__dirname, 'src');
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
	context: inputPath,
	entry: {
		main: './main.tsx',
		intro: './intro.tsx',
		outro: './outro.tsx',
		preview: './preview.tsx'
	},
	output: {
		path: outputPath,
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	plugins: [new HtmlWebpackPlugin(
		{
			filename: 'experiment/index.html',
			template: inputPath + '/pages/root.html',
			chunks: ['main']
		},
	),
	new HtmlWebpackPlugin(
		{
			filename: 'introduction/index.html',
			template: inputPath + '/pages/root.html',
			chunks: ['intro']
		},
	),
	new HtmlWebpackPlugin(
		{
			filename: 'thankyou/index.html',
			template: inputPath + '/pages/root.html',
			chunks: ['outro']
		},
	),
	new HtmlWebpackPlugin(
		{
			filename: 'preview/index.html',
			template: inputPath + '/pages/root.html',
			chunks: ['preview']
		},
	),
	new HtmlWebpackPlugin(
		{
			filename: '/tools/netlify-mock-form.html',
			template: inputPath + '/pages/netlify-mock-form.html'
		}
	),
	new CleanWebpackPlugin()]
};