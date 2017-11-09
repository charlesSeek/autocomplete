var webpack = require('webpack');
var path = require('path');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module:{
  	rules:[
  		{
  			use:'babel-loader',
  			test:/\.js$/,
  			exclude:/node_modules/

  		},
  		{
  			use: ExtractTextWebpackPlugin.extract({
	          fallback: 'style-loader',
	          use: ['css-loader', 'sass-loader']
	        }),
  			test:/\.scss$/
  		},
  	]
  },
  plugins:[
  	new HtmlWebpackPlugin({
  		template:'./index.html'
  	}),
    new ExtractTextWebpackPlugin('style.css')
  ]
};
