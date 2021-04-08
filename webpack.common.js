/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const inputPath = path.resolve(__dirname, 'src');
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
	context: inputPath,
	entry: {
		'main': './main.ts'
	},
	output: {
		path: outputPath,
		filename: '[name].js'
	},
	devServer: {
		contentBase: outputPath,
		watchContentBase: true,
		disableHostCheck: true,
		port: 8080
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
			template: inputPath + '/index.html'
		},
	),
	new CleanWebpackPlugin()]
};