"use strict";

var path = require('path');
var webpack = require('webpack');

// Plugins
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: "vue-loader"
        }, {
            test: /\.js$/,
            use: "babel-loader",
            include: [path.resolve(__dirname, 'src')]
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: ["vue-style-loader", "css-loader"]
            })
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: 'images/[name].[hash:7].[ext]'
                }
            }]
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "css/style.css"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.tpl.html'
        })
    ]
}