const devServer = require('./server');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		index: ['./src/index.js']
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: true,
			chunks: ['index'],
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	],
	output: {
		path: path.resolve(__dirname, './../dist'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: [
						[
							'@babel/preset-env',
							{
								useBuiltIns: 'entry',
								corejs: 3
							}
						]
					]
				}
			},
			{ test: /\.(png|jpg|gif)$/, use: ['file-loader'] },
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: /header.scss/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /header.scss/,
				use: [
					{
						loader: 'style-loader',
						options: {
							insert: element => {
								const headerContainer = document.querySelector('#shell-header');
								headerContainer.attachShadow({ mode: 'open' });
								headerContainer.shadowRoot.appendChild(element);
							}
						}
					},
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	stats: {
		colors: true
	},
	optimization:{
		usedExports: true
	},
	devServer: devServer.config
};
